import { common as DapCommon } from 'dap-util'
import { PluginType } from '../../core/tool'
import { ComponentInternalInstance, h } from 'vue'
import { AlexEditor, AlexElement, AlexElementsRangeType } from 'alex-editor'
import Icon from '../../components/icon/icon.vue'
import { hasTableInRange } from '../../core/function'
import { getMathformulaElementByRange } from '../mathformula'

export type PanelOptionsType = {
	//排序
	sequence?: number
	//工具提示内容
	title?: string
	//按钮是否显示左侧边框
	leftBorder?: boolean
	//按钮是否显示右侧边框
	rightBorder?: boolean
	//按钮是否禁用
	disabled?: boolean
}

/**
 * 是否面板元素
 * @param el
 * @returns
 */
export const isPanel = (el: AlexElement) => {
	return el.parsedom == 'div' && el.hasMarks() && el.marks!['data-editify-panel']
}

/**
 * 判断某个元素是否在面板元素内
 * @param el
 * @returns
 */
export const isUnderPanel = (el: AlexElement): boolean => {
	if (isPanel(el)) {
		return true
	}
	if (el.parent) {
		return isUnderPanel(el.parent)
	}
	return false
}

/**
 * 根据某个元素获取所在的面板元素，如果不在面板元素内则返回null
 * @param el
 * @returns
 */
export const getPanelElement = (el: AlexElement): AlexElement | null => {
	if (isPanel(el)) {
		return el
	}
	if (el.parent) {
		return getPanelElement(el.parent)
	}
	return null
}

/**
 * 选区是否含有面板元素
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export const hasPanelInRange = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => {
	if (!editor.range) {
		return false
	}
	if (editor.range.anchor.isEqual(editor.range.focus)) {
		return isUnderPanel(editor.range.anchor.element)
	}
	return dataRangeCaches.flatList.some(item => {
		return isUnderPanel(item.element)
	})
}

/**
 * 选区是否在某个面板元素下，如果是返回该面板元素否则返回null
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export const getPanelElementByRange = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => {
	if (!editor.range) {
		return null
	}
	if (editor.range.anchor.element.isEqual(editor.range.focus.element)) {
		return getPanelElement(editor.range.anchor.element)
	}
	const arr = dataRangeCaches.list.map(item => {
		return getPanelElement(item.element)
	})
	let hasNull = arr.some(el => {
		return el == null
	})
	//如果存在null，则表示有的选区元素不在公式元素下，返回null
	if (hasNull) {
		return null
	}
	//如果只有一个元素，则返回该元素
	if (arr.length == 1) {
		return arr[0]!
	}
	//默认数组中的元素都相等
	let flag = true
	for (let i = 1; i < arr.length; i++) {
		if (!arr[i]!.isEqual(arr[0]!)) {
			flag = false
			break
		}
	}
	//如果相等，则返回该元素
	if (flag) {
		return arr[0]
	}
	return null
}

/**
 * 面板插件
 * @param options
 * @returns
 */
export const panel = (options?: PanelOptionsType) => {
	if (!DapCommon.isObject(options)) {
		options = {}
	}
	const plugin: PluginType = (editifyInstance: ComponentInternalInstance, editTrans: (key: string) => any) => {
		//是否禁用该插件按钮
		let isDisabled: boolean = false
		//表格和面板如果在选区内，或者选区在数学公式下则禁言该菜单按钮
		if (editifyInstance.exposed!.editor.value) {
			isDisabled = !!getPanelElementByRange(editifyInstance.exposed!.editor.value, editifyInstance.exposed!.dataRangeCaches.value) || hasTableInRange(editifyInstance.exposed!.editor.value, editifyInstance.exposed!.dataRangeCaches.value) || !!getMathformulaElementByRange(editifyInstance.exposed!.editor.value, editifyInstance.exposed!.dataRangeCaches.value)
		}
		return {
			//插件名称
			name: 'panel',
			//菜单项配置
			menu: {
				sequence: options!.sequence || 102,
				extraDisabled: (name: string) => {
					//如果光标选区内有面板，则禁用有序列表、无需列表、任务列表、引用、代码块、表格和标题菜单
					if (name == 'orderList' || name == 'unorderList' || name == 'task' || name == 'blockquote' || name == 'codeBlock' || name == 'table' || name == 'heading') {
						return hasPanelInRange(editifyInstance.exposed!.editor.value, editifyInstance.exposed!.dataRangeCaches.value)
					}
					return false
				},
				extend: {
					type: 'default',
					title: options!.title || editTrans('insertPanel'),
					leftBorder: options!.leftBorder,
					rightBorder: options!.rightBorder,
					hideScroll: true,
					active: false,
					disabled: isDisabled || options!.disabled,
					default: () => h(Icon, { value: 'panel' }),
					onOperate: () => {
						const panelElement = AlexElement.create({
							type: 'block',
							parsedom: 'div',
							marks: {
								'data-editify-panel': 'true'
							},
							children: [
								{
									type: 'inblock',
									parsedom: 'div',
									behavior: 'block',
									children: [
										{
											type: 'text',
											textcontent: editTrans('panelTitle')
										}
									]
								},
								{
									type: 'inblock',
									parsedom: 'div',
									behavior: 'block',
									children: [
										{
											type: 'text',
											textcontent: editTrans('panelContent')
										}
									]
								}
							]
						})
						//获取编辑器对象
						const editor = <AlexEditor>editifyInstance.exposed!.editor.value
						//插入编辑器
						editor.insertElement(panelElement)
						//面板后面插入段落
						const paragraph = AlexElement.create({
							type: 'block',
							parsedom: AlexElement.BLOCK_NODE,
							children: [
								{
									type: 'closed',
									parsedom: 'br'
								}
							]
						})
						editor.addElementAfter(paragraph, panelElement)
						//移动光标到新插入的元素
						editor.range!.anchor.moveToEnd(panelElement.children![0])
						editor.range!.focus.moveToEnd(panelElement.children![0])
						//渲染
						editor.formatElementStack()
						editor.domRender()
						editor.rangeRender()
					}
				}
			},
			//粘贴保留的属性
			pasteKeepMarks: () => {
				return {
					'data-editify-panel': 'true'
				}
			}
		}
	}
	return plugin
}

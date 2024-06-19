import { common as DapCommon, color as DapColor } from 'dap-util'
import { ComponentInternalInstance, h } from 'vue'
import { AlexEditor, AlexElement, AlexElementsRangeType } from 'alex-editor'
import { PluginType } from '@/core/tool'
import Icon from '@/components/icon/icon.vue'
import { elementToParagraph, hasPreInRange, hasTableInRange } from '@/core/function'
import { hasPanelInRange } from '@/plugins/panel'

export type InfoBlockOptionsType = {
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
 * 是否信息元素
 * @param el
 * @returns
 */
export const isInfoBlock = (el: AlexElement) => {
	return el.parsedom == 'div' && el.hasMarks() && el.marks!['data-editify-info']
}

/**
 * 判断某个元素是否在信息元素内
 * @param el
 * @returns
 */
export const isUnderInfoBlock = (el: AlexElement): boolean => {
	if (isInfoBlock(el)) {
		return true
	}
	if (el.parent) {
		return isUnderInfoBlock(el.parent)
	}
	return false
}

/**
 * 根据某个元素获取所在的信息元素，如果不在信息元素内则返回null
 * @param el
 * @returns
 */
export const getInfoBlockElement = (el: AlexElement): AlexElement | null => {
	if (isInfoBlock(el)) {
		return el
	}
	if (el.parent) {
		return getInfoBlockElement(el.parent)
	}
	return null
}

/**
 * 选区是否含有信息元素
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export const hasInfoBlockInRange = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => {
	if (!editor.range) {
		return false
	}
	if (editor.range.anchor.isEqual(editor.range.focus)) {
		return isUnderInfoBlock(editor.range.anchor.element)
	}
	return dataRangeCaches.flatList.some(item => {
		return isUnderInfoBlock(item.element)
	})
}

/**
 * 选区是否都在信息块内
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export const isRangeInInfoBlock = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => {
	if (!editor.range) {
		return false
	}
	if (editor.range.anchor.isEqual(editor.range.focus)) {
		return isUnderInfoBlock(editor.range.anchor.element)
	}
	return dataRangeCaches.flatList.every(item => {
		return isUnderInfoBlock(item.element)
	})
}

/**
 * 选区是否在某个信息元素下，如果是返回该信息元素否则返回null
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export const getInfoBlockElementByRange = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => {
	if (!editor.range) {
		return null
	}
	if (editor.range.anchor.element.isEqual(editor.range.focus.element)) {
		return getInfoBlockElement(editor.range.anchor.element)
	}
	const arr = dataRangeCaches.list.map(item => {
		return getInfoBlockElement(item.element)
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
 * 信息插件
 * @param options
 * @returns
 */
export const infoBlock = (options?: InfoBlockOptionsType) => {
	if (!DapCommon.isObject(options)) {
		options = {}
	}
	const plugin: PluginType = (editifyInstance: ComponentInternalInstance, editTrans: (key: string) => any) => {
		let isDisabled: boolean = false
		//光标在表格、代码块和面板中则禁用
		if (editifyInstance.exposed!.editor.value) {
			isDisabled = hasTableInRange(editifyInstance.exposed!.editor.value, editifyInstance.exposed!.dataRangeCaches.value) || hasPreInRange(editifyInstance.exposed!.editor.value, editifyInstance.exposed!.dataRangeCaches.value) || hasPanelInRange(editifyInstance.exposed!.editor.value, editifyInstance.exposed!.dataRangeCaches.value)
		}
		return {
			//插件名称
			name: 'infoBlock',
			//菜单项配置
			menu: {
				sequence: options!.sequence || 103,
				extend: {
					type: 'default',
					title: options!.title || editTrans('insertInfoBlock'),
					leftBorder: options!.leftBorder,
					rightBorder: options!.rightBorder,
					hideScroll: true,
					active: editifyInstance.exposed!.editor.value ? isRangeInInfoBlock(editifyInstance.exposed!.editor.value, editifyInstance.exposed!.dataRangeCaches.value) : false,
					disabled: isDisabled || options!.disabled,
					default: () => h(Icon, { value: 'info' }),
					onOperate: () => {
						const editor = <AlexEditor>editifyInstance.exposed!.editor.value
						const dataRangeCaches = <AlexElementsRangeType>editifyInstance.exposed!.dataRangeCaches.value
						//是否都在引用里
						const flag = isRangeInInfoBlock(editor, dataRangeCaches)
						//起点和终点在一起
						if (editor.range!.anchor.isEqual(editor.range!.focus)) {
							const block = editor.range!.anchor.element.getBlock()
							elementToParagraph(block)
							if (!flag) {
								block.parsedom = 'div'
								block.marks = {
									'data-editify-info': 'true'
								}
							}
						}
						//起点和终点不在一起
						else {
							let blocks: AlexElement[] = []
							dataRangeCaches.list.forEach(item => {
								const block = item.element.getBlock()
								const exist = blocks.some(el => block.isEqual(el))
								if (!exist) {
									blocks.push(block)
								}
							})
							blocks.forEach(block => {
								elementToParagraph(block)
								if (!flag) {
									block.parsedom = 'div'
									block.marks = {
										'data-editify-info': 'true'
									}
								}
							})
						}
						//渲染
						editor.formatElementStack()
						editor.domRender()
						editor.rangeRender()
					}
				}
			},
			//粘贴保留的属性
			pasteKeepMarks: (element: AlexElement) => {
				if (isInfoBlock(element)) {
					return {
						'data-editify-info': 'true'
					}
				}
				return {}
			},
			renderRule: (el: AlexElement) => {
				if (isInfoBlock(el)) {
					const color = DapColor.hex2rgb(editifyInstance.props.color as string)
					if (el.hasStyles()) {
						el.styles!['background-color'] = `rgba(${color[0]},${color[1]},${color[2]},0.15)`
						el.styles!['color'] = editifyInstance.props.color
					} else {
						el.styles = {
							'background-color': `rgba(${color[0]},${color[1]},${color[2]},0.15)`,
							color: editifyInstance.props.color
						}
					}
				}
			}
		}
	}
	return plugin
}

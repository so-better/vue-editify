import { common as DapCommon } from 'dap-util'
import { PluginType } from '../../core/tool'
import { ComponentInternalInstance, h } from 'vue'
import Icon from '../../components/icon/icon.vue'
import { AlexEditor, AlexElement } from 'alex-editor'
import katex from 'katex'
import 'katex/dist/katex.css'

export type MathformulaOptionsType = {
	//排序
	sequence?: number
	//工具提示内容
	title?: string
	//按钮是否显示左侧边框
	leftBorder?: boolean
	//按钮是否显示右侧边框
	rightBorder?: boolean
}

/**
 * 数学公式插件
 * @param options
 * @returns
 */
export const mathformula = (options?: MathformulaOptionsType) => {
	if (!DapCommon.isObject(options)) {
		options = {}
	}
	const plugin: PluginType = (editifyInstance: ComponentInternalInstance, editTrans: (key: string) => any) => {
		return {
			name: 'mathformula',
			//菜单项配置
			menu: {
				sequence: options!.sequence || 101,
				extend: {
					type: 'default',
					title: options!.title || editTrans('insertMathformula'),
					leftBorder: options!.leftBorder,
					rightBorder: options!.rightBorder,
					hideScroll: true,
					disabled: false,
					default: () => h(Icon, { value: 'mathformula' }),
					onOperate: () => {
						const html = katex.renderToString(`c = \\pm\\sqrt{a^2 + b^2}`, {
							output: 'html'
						})
						const editor = <AlexEditor>editifyInstance.exposed!.editor.value
						const elements = editor.parseHtml(html)
						for (let i = 0; i < elements.length; i++) {
							if (i == 0) {
								editor.insertElement(elements[i])
							} else {
								editor.insertElement(elements[i], false)
							}
						}
						//渲染
						editor.formatElementStack()
						editor.domRender()
						editor.rangeRender()
					}
					// layer: (_name: string, btnInstance: InstanceType<typeof Button>) => {}
				}
			},
			//updateView: () => {}
			extraKeepTags: ['svg', 'path'],
			customParseNode: (el: AlexElement) => {
				if (el.hasMarks()! && el.marks!['class'] && el.marks!['class'] == 'katex') {
					;[el, ...AlexElement.flatElements(el.children!)].forEach((item, index) => {
						if (item.parsedom == 'path') {
							item.type = 'closed'
						} else if (!item.isClosed()) {
							const spaceText = AlexElement.getSpaceElement()
							spaceText.parent = item
							if (item.hasChildren()) {
								item.children!.push(spaceText)
							} else {
								item.children = [spaceText]
							}
							if (item.hasMarks()) {
								item.marks!['data-editify-mathformula'] = index
							} else {
								item.marks = {
									'data-editify-mathformula': index
								}
							}
						}
					})
				}
				return el
			}
			//pasteKeepMarks: {},
			//pasteKeepStyles: {}
			//renderRule: (el: AlexElement) => {}
		}
	}
	return plugin
}

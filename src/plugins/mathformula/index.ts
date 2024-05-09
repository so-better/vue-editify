import { common as DapCommon, element as DapElement } from 'dap-util'
import { ObjectType, PluginType, cloneData } from '../../core/tool'
import { ComponentInternalInstance, h } from 'vue'

import { AlexEditor, AlexElement, AlexElementsRangeType } from 'alex-editor'
import 'katex/dist/katex.css'
import KaTex from 'katex'
import Icon from '../../components/icon/icon.vue'
import Button from '../../components/button/button.vue'
import InsertMathformula from './insertMathformula/insertMathformula.vue'
import { hasLinkInRange, hasPreInRange } from '../../core/function'

export type MathformulaOptionsType = {
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
 * 是否公式元素
 * @param el
 * @returns
 */
export const isMathformula = (el: AlexElement) => {
	return el.parsedom == 'span' && el.hasMarks() && el.marks!['data-editify-mathformula']
}

//是否在公式元素下
export const isUnderMathformula = (el: AlexElement): boolean => {
	if (isMathformula(el)) {
		return true
	}
	if (el.parent) {
		return isUnderMathformula(el.parent)
	}
	return false
}

//获取公式元素
export const getMathformulaElement = (el: AlexElement): AlexElement | null => {
	if (isMathformula(el)) {
		return el
	}
	if (el.parent) {
		return getMathformulaElement(el.parent)
	}
	return null
}

/**
 * 选区是否含有公式元素
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export const hasMathformulaInRange = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => {
	if (!editor.range) {
		return false
	}
	if (editor.range.anchor.isEqual(editor.range.focus)) {
		return isUnderMathformula(editor.range.anchor.element)
	}
	return dataRangeCaches.flatList.some(item => {
		return isUnderMathformula(item.element)
	})
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
		let isDisabled = false
		//如果光标范围内有数学公式、链接、代码块则禁用
		if (editifyInstance.exposed!.editor.value) {
			isDisabled = hasMathformulaInRange(editifyInstance.exposed!.editor.value, editifyInstance.exposed!.dataRangeCaches.value) || hasPreInRange(editifyInstance.exposed!.editor.value, editifyInstance.exposed!.dataRangeCaches.value) || hasLinkInRange(editifyInstance.exposed!.editor.value, editifyInstance.exposed!.dataRangeCaches.value)
		}
		return {
			name: 'mathformula',
			//菜单项配置
			menu: {
				sequence: options!.sequence || 101,
				extraDisabled: (name: string) => {
					//如果光标选区内有数学公式则禁用链接菜单、代码块菜单
					if (name == 'link' || name == 'image' || name == 'video' || name == 'table' || name == 'codeBlock') {
						return hasMathformulaInRange(editifyInstance.exposed!.editor.value, editifyInstance.exposed!.dataRangeCaches.value)
					}
					return false
				},
				extend: {
					type: 'select',
					title: options!.title || editTrans('insertMathformula'),
					leftBorder: options!.leftBorder,
					rightBorder: options!.rightBorder,
					hideScroll: true,
					active: false,
					disabled: isDisabled || options!.disabled,
					default: () => h(Icon, { value: 'mathformula' }),
					layer: (_name: string, btnInstance: InstanceType<typeof Button>) => {
						return h(InsertMathformula, {
							color: <string | null>editifyInstance.props.color,
							onInsert: (content: string) => {
								if (content) {
									//获取编辑器对象
									const editor = <AlexEditor>editifyInstance.exposed!.editor.value
									//渲染LaTex为mathml并转为dom
									const dom = DapElement.string2dom(
										KaTex.renderToString(content, {
											output: 'mathml',
											throwOnError: false
										})
									) as HTMLElement
									//设置最终的html内容
									const html = `<span data-editify-mathformula="true" contenteditable="false" class="katex" >${dom.innerHTML}</span>`
									//html内容转为元素数组
									const elements = editor.parseHtml(html)
									//插入编辑器
									editor.insertElement(elements[0])
									//移动光标到新插入的元素
									editor.range!.anchor.moveToEnd(elements[0])
									editor.range!.focus.moveToEnd(elements[0])
									//渲染
									editor.formatElementStack()
									editor.domRender()
									editor.rangeRender()
								}
								//关闭浮层
								btnInstance.show = false
							}
						})
					}
				}
			},
			//额外保留的标签
			extraKeepTags: ['math', 'mrow', 'mi', 'mo', 'mn', 'msup', 'msub', 'mfrac', 'msqrt', 'mroot', 'munder', 'mover', 'munderover', 'mtable', 'mtr', 'mtd', 'mtext', 'mspace', 'mmultiscripts', 'menclose', 'mglyph', 'maction', 'maligngroup', 'malignmark', 'mprescripts', 'none', 'mpadded', 'ms', 'mphantom', 'mstyle', 'merror', 'mscarries', 'mscarry', 'msline', 'msgroup', 'msrow', 'mscolumn', 'mstack', 'mlongdiv', 'mlabeledtr', 'mlabeledmultiscripts', 'semantics', 'msubsup'],
			//粘贴保留的属性
			pasteKeepMarks: el => {
				let marks: ObjectType = {}
				if (isMathformula(el) || isUnderMathformula(el)) {
					marks = cloneData(el.marks!)
				}
				return marks
			},
			//粘贴保留的样式
			pasteKeepStyles: el => {
				let styles: ObjectType = {}
				if (isMathformula(el) || isUnderMathformula(el)) {
					styles = cloneData(el.styles!)
				}
				return styles
			},
			//node转元素的额外处理
			customParseNode: (el: AlexElement) => {
				if (el.parsedom == 'span' && el.hasMarks() && el.marks!['data-editify-mathformula']) {
					AlexElement.flatElements(el.children!).forEach(item => {
						//锁定元素防止合并
						item.locked = true
						//没有子元素的非文本元素设为自闭合元素
						if (!item.isText() && !item.hasChildren()) {
							item.type = 'closed'
						}
					})
				}
				return el
			},
			//自定义渲染规范
			renderRule: (el: AlexElement) => {
				//给元素设置两侧的空白字符
				if (el.parsedom == 'span' && el.hasMarks() && el.marks!['data-editify-mathformula']) {
					//获取editor对象
					const editor = <AlexEditor>editifyInstance.exposed!.editor.value
					//前一个元素
					const previousElement = editor.getPreviousElement(el)
					//后一个元素
					const newTextElement = editor.getNextElement(el)
					//如果不存在前一个元素或者前一个元素不是空白元素则设置空白元素
					if (!previousElement || !previousElement.isSpaceText()) {
						const spaceText = AlexElement.getSpaceElement()
						editor.addElementBefore(spaceText, el)
					}
					//如果不存在后一个元素或者后一个元素不是空白元素则设置空白元素
					if (!newTextElement || !newTextElement.isSpaceText()) {
						const spaceText = AlexElement.getSpaceElement()
						editor.addElementAfter(spaceText, el)
					}
					//如果光标在元素上则更新光标位置
					if (editor.range && el.isContains(editor.range.anchor.element)) {
						editor.range.anchor.moveToEnd(editor.getNextElement(el)!)
					}
					if (editor.range && el.isContains(editor.range.focus.element)) {
						editor.range.focus.moveToEnd(editor.getNextElement(el)!)
					}
				}
			}
		}
	}
	return plugin
}

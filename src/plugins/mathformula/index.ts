import { ComponentInternalInstance, h } from 'vue'
import { common as DapCommon } from 'dap-util'
import { AlexEditor, AlexElement, AlexElementsRangeType } from 'alex-editor'
import 'katex/dist/katex.css'
import KaTex from 'katex'
import { ObjectType, PluginType, cloneData } from '@/core/tool'
import { hasLinkInRange, hasPreInRange } from '@/core/function'
import { Icon } from '@/components/icon'
import { Button } from '@/components/button'
import { InsertMathformula } from './insertMathformula'

export type MathformulaOptionsType = {
	//工具提示内容
	title?: string
	//按钮是否显示左侧边框
	leftBorder?: boolean
	//按钮是否显示右侧边框
	rightBorder?: boolean
	//按钮是否禁用
	disabled?: boolean
	//公式异常处理
	handleError?: (error: Error) => void
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
		let isDisabled: boolean = false
		//如果光标范围内有链接、代码块则禁用
		if (editifyInstance.exposed!.editor.value) {
			isDisabled = hasPreInRange(editifyInstance.exposed!.editor.value, editifyInstance.exposed!.dataRangeCaches.value) || hasLinkInRange(editifyInstance.exposed!.editor.value, editifyInstance.exposed!.dataRangeCaches.value)
		}
		//数学公式文本框内置LaTex文本内容
		let defaultLaTexContent: string = ''
		return {
			//插件名称
			name: 'mathformula',
			//菜单项配置
			menu: {
				extraDisabled: (name: string) => {
					//如果光标选区内有数学公式则禁用链接、图片、视频、表格和代码块菜单
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
					active: editifyInstance.exposed!.editor.value ? !!getMathformulaElementByRange(editifyInstance.exposed!.editor.value, editifyInstance.exposed!.dataRangeCaches.value) : false,
					disabled: isDisabled || options!.disabled,
					//浮层展开时触发的事件
					onLayerShow() {
						//获取选区所在的数学公式元素
						const mathformulaElement = getMathformulaElementByRange(editifyInstance.exposed!.editor.value, editifyInstance.exposed!.dataRangeCaches.value)
						//如果该元素存在，则设置默认的LaTex文本内容
						if (mathformulaElement) {
							defaultLaTexContent = mathformulaElement.marks!['data-editify-mathformula'] || ''
						}
					},
					default: () => h(Icon, { value: 'mathformula' }),
					layer: (_name: string, btnInstance: InstanceType<typeof Button>) => {
						return h(InsertMathformula, {
							color: <string | null>editifyInstance.props.color,
							defaultLaTexContent: defaultLaTexContent,
							onInsert: (content: string) => {
								//如果公式文本框有内容则进行下一步处理
								if (content) {
									//获取编辑器对象
									const editor = <AlexEditor>editifyInstance.exposed!.editor.value
									//获取选区所在的数学公式元素
									const mathformulaElement = getMathformulaElementByRange(editifyInstance.exposed!.editor.value, editifyInstance.exposed!.dataRangeCaches.value)
									//如果在数学公式下
									if (mathformulaElement) {
										//清除该数学公式
										mathformulaElement.toEmpty()
										//移动光标到后一个元素上
										editor.range!.anchor.moveToStart(editor.getNextElement(mathformulaElement)!)
										editor.range!.focus.moveToStart(editor.getNextElement(mathformulaElement)!)
									}
									//定义转换后的mathml内容
									let mathml: string = ''
									try {
										//获取转换后的mathml
										mathml = KaTex.renderToString(content, {
											output: 'mathml',
											throwOnError: true
										})
									} catch (error) {
										mathml = ''
										if (typeof options!.handleError == 'function') {
											options!.handleError(error as Error)
										}
									}
									//如果mathml存在则表示数学公式渲染成功则插入到编辑器
									if (mathml) {
										//设置最终的html内容
										const html = `<span data-editify-mathformula="${content}" contenteditable="false">${mathml}</span>`
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

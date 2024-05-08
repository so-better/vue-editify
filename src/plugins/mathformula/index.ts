import { common as DapCommon, element as DapElement } from 'dap-util'
import { PluginType } from '../../core/tool'
import { ComponentInternalInstance, h } from 'vue'
import Icon from '../../components/icon/icon.vue'
import { AlexEditor } from 'alex-editor'
import KaTex from 'katex'

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
						const express = `\\lim_{x \\to \\infty} f(x)`
						const node = DapElement.string2dom(
							KaTex.renderToString(express, {
								output: 'mathml',
								throwOnError: false
							})
						) as HTMLElement
						const mathml = `<span data-editify-mathformula="true" contenteditable="false">${node.innerHTML}</span>`
						const editor = <AlexEditor>editifyInstance.exposed!.editor.value
						const elements = editor.parseHtml(mathml)
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
			extraKeepTags: ['math', 'mrow', 'mi', 'mo', 'mn', 'msup', 'msub', 'mfrac', 'msqrt', 'mroot', 'munder', 'mover', 'munderover', 'mtable', 'mtr', 'mtd', 'mtext', 'mspace', 'mmultiscripts', 'menclose', 'mglyph', 'maction', 'maligngroup', 'malignmark', 'mprescripts', 'none', 'mpadded', 'ms', 'mphantom', 'mstyle', 'merror', 'mscarries', 'mscarry', 'msline', 'msgroup', 'msrow', 'mscolumn', 'mstack', 'mlongdiv', 'mlabeledtr', 'mlabeledmultiscripts', 'semantics'],
			pasteKeepMarks: {
				'data-editify-mathformula': ['span'],
				display: ['math'],
				encoding: ['annotation'],
				rowspacing: ['mtable'],
				columnalign: ['mtable'],
				columnspacing: ['mtable'],
				fence: ['mo'],
				xmlns: ['math'],
				scriptlevel: ['mstyle'],
				displaystyle: ['mstyle'],
				mathvariant: ['mi'],
				actiontype: ['maction'],
				selection: ['maction'],
				groupalign: ['maligngroup', 'malignmark'],
				edge: ['maligngroup', 'malignmark'],
				rowalign: ['mrow'],
				mathsize: ['mi'],
				mathcolor: ['mi'],
				dir: ['mi'],
				linethickness: ['mfrac']
			}
			//renderRule: (el: AlexElement) => {}
		}
	}
	return plugin
}

import { computed, defineComponent, h, inject, PropType, ref, Ref } from 'vue'
import { AlexEditor, AlexElementsRangeType } from 'alex-editor'
import 'katex/dist/katex.css'
import KaTex from 'katex'
import { MenuMathformulaButtonType } from '@/core/tool'
import { Button } from '@/components/button'
import { getMatchElementByRange, hasLinkInRange, hasPreInRange } from '@/core/function'
import { Icon } from '@/components/icon'
import { InsertMathformula } from '@/components/insertMathformula'

/**
 * feature名称
 */
const FEATURE_NAME = 'mathformula'

/**
 * 数学公式额外保留的标签
 */
export const extraKeepTagsForMathformula = ['math', 'mrow', 'mi', 'mo', 'mn', 'msup', 'msub', 'mfrac', 'msqrt', 'mroot', 'munder', 'mover', 'munderover', 'mtable', 'mtr', 'mtd', 'mtext', 'mspace', 'mmultiscripts', 'menclose', 'mglyph', 'maction', 'maligngroup', 'malignmark', 'mprescripts', 'none', 'mpadded', 'ms', 'mphantom', 'mstyle', 'merror', 'mscarries', 'mscarry', 'msline', 'msgroup', 'msrow', 'mscolumn', 'mstack', 'mlongdiv', 'mlabeledtr', 'mlabeledmultiscripts', 'semantics', 'msubsup']

/**
 * 菜单栏 - 插入数学公式
 */
export const MathformulaMenuButton = defineComponent(
	props => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const dataRangeCaches = inject<Ref<AlexElementsRangeType>>('dataRangeCaches')!
		const $editTrans = inject<(key: string) => any>('$editTrans')!
		const isSourceView = inject<Ref<boolean>>('isSourceView')!

		const btnRef = ref<InstanceType<typeof Button> | null>(null)

		const defaultLaTexContent = computed<string>(() => {
			//获取选区所在的数学公式元素
			const mathformulaElement = getMatchElementByRange(editor.value, dataRangeCaches.value, {
				parsedom: 'span',
				marks: {
					'data-editify-mathformula': true
				}
			})
			if (mathformulaElement) {
				return mathformulaElement.marks!['data-editify-mathformula'] || ''
			}
			return ''
		})

		return () => {
			return props.config.show
				? h(
						Button,
						{
							ref: btnRef,
							name: FEATURE_NAME,
							tooltip: props.tooltip,
							color: props.color,
							zIndex: props.zIndex,
							type: 'select',
							hideScroll: true,
							title: $editTrans('insertMathformula'),
							leftBorder: props.config.leftBorder,
							rightBorder: props.config.rightBorder,
							active: !!getMatchElementByRange(editor.value, dataRangeCaches.value, {
								parsedom: 'span',
								marks: {
									'data-editify-mathformula': true
								}
							}),
							disabled: props.disabled || isSourceView.value || hasPreInRange(editor.value, dataRangeCaches.value) || hasLinkInRange(editor.value, dataRangeCaches.value) || props.config.disabled
						},
						{
							default: () =>
								h(Icon, {
									value: 'mathformula'
								}),
							layer: () =>
								h(InsertMathformula, {
									color: props.color,
									defaultLaTexContent: defaultLaTexContent.value,
									onInsert: (content: string) => {
										//如果公式文本框有内容则进行下一步处理
										if (content) {
											//获取选区所在的数学公式元素
											const mathformulaElement = getMatchElementByRange(editor.value, dataRangeCaches.value, {
												parsedom: 'span',
												marks: {
													'data-editify-mathformula': true
												}
											})
											//如果在数学公式下
											if (mathformulaElement) {
												//清除该数学公式
												mathformulaElement.toEmpty()
												//移动光标到后一个元素上
												editor.value.range!.anchor.moveToStart(editor.value.getNextElement(mathformulaElement)!)
												editor.value.range!.focus.moveToStart(editor.value.getNextElement(mathformulaElement)!)
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
												if (typeof props.config!.handleError == 'function') {
													props.config!.handleError(error as Error)
												}
											}
											//如果mathml存在则表示数学公式渲染成功则插入到编辑器
											if (mathml) {
												//设置最终的html内容
												const html = `<span data-editify-mathformula="${content}" contenteditable="false">${mathml}</span>`
												//html内容转为元素数组
												const elements = editor.value.parseHtml(html)
												//插入编辑器
												editor.value.insertElement(elements[0])
												//移动光标到新插入的元素
												editor.value.range!.anchor.moveToEnd(elements[0])
												editor.value.range!.focus.moveToEnd(elements[0])
												//渲染
												editor.value.formatElementStack()
												editor.value.domRender()
												editor.value.rangeRender()
											}
										}
										//关闭浮层
										btnRef.value!.show = false
									}
								})
						}
				  )
				: null
		}
	},
	{
		name: `_${FEATURE_NAME}`,
		props: {
			color: String,
			zIndex: Number,
			config: Object as PropType<MenuMathformulaButtonType>,
			tooltip: Boolean,
			disabled: Boolean
		}
	}
)

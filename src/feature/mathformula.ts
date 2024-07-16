import { computed, defineComponent, h, inject, PropType, ref, Ref } from 'vue'
import { AlexEditor, AlexElementsRangeType } from 'alex-editor'
import { MenuMathformulaButtonType } from '@/core/tool'
import { Button } from '@/components/button'
import { getMatchElementByRange, hasLinkInRange, hasPreInRange, insertMathformula } from '@/core/function'
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
										//插入数学公式
										insertMathformula(editor.value, dataRangeCaches.value, content, props.config.handleError)
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

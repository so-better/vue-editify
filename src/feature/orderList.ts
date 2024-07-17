import { computed, defineComponent, h, inject, PropType, Ref } from 'vue'
import { AlexElementsRangeType, AlexEditor } from 'alex-editor'
import { MenuButtonType } from '@/core/tool'
import { getMatchElementByRange, hasPanelInRange, hasPreInRange, hasTableInRange, rangeIsInList, setList } from '@/core/function'
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'

/**
 * feature名称
 */
const FEATURE_NAME = 'orderList'

/**
 * 工具栏 - 有序列表
 */
export const OrderListToolbar = defineComponent(
	props => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const dataRangeCaches = inject<Ref<AlexElementsRangeType>>('dataRangeCaches')!
		const $editTrans = inject<(key: string) => any>('$editTrans')!

		const active = computed<(val: 'decimal' | 'lower-roman' | 'upper-roman' | 'lower-alpha' | 'upper-alpha' | 'lower-greek' | 'cjk-ideographic') => boolean>(() => {
			return val => {
				const el = getMatchElementByRange(editor.value, dataRangeCaches.value, {
					parsedom: 'div',
					marks: {
						'data-editify-list': 'ol'
					}
				})
				if (el && el.marks!['data-editify-list-style']) {
					return el.marks!['data-editify-list-style'] == val
				}
				return val == 'decimal'
			}
		})

		return () => {
			return [
				h(
					Button,
					{
						name: 'decimal',
						title: $editTrans('decimal'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						active: active.value('decimal'),
						onOperate: () => {}
					},
					{
						default: () => h(Icon, { value: 'list-decimal', style: { fontSize: '20px' } })
					}
				),
				h(
					Button,
					{
						name: 'cjk-ideographic',
						title: $editTrans('cjkIdeographic'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						active: active.value('cjk-ideographic'),
						onOperate: () => {}
					},
					{
						default: () => h(Icon, { value: 'list-cjk-ideographic', style: { fontSize: '20px' } })
					}
				),
				h(
					Button,
					{
						name: 'lower-roman',
						title: $editTrans('lowerRoman'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						active: active.value('lower-roman'),
						onOperate: () => {}
					},
					{
						default: () => h(Icon, { value: 'list-lower-roman', style: { fontSize: '20px' } })
					}
				),
				h(
					Button,
					{
						name: 'upper-roman',
						title: $editTrans('upperRoman'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						active: active.value('upper-roman'),
						onOperate: () => {}
					},
					{
						default: () => h(Icon, { value: 'list-upper-roman', style: { fontSize: '20px' } })
					}
				),
				h(
					Button,
					{
						name: 'lower-alpha',
						title: $editTrans('lowerAlpha'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						active: active.value('lower-alpha'),
						onOperate: () => {}
					},
					{
						default: () => h(Icon, { value: 'list-lower-alpha', style: { fontSize: '20px' } })
					}
				),
				h(
					Button,
					{
						name: 'upper-alpha',
						title: $editTrans('upperAlpha'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						active: active.value('upper-alpha'),
						onOperate: () => {}
					},
					{
						default: () => h(Icon, { value: 'list-upper-alpha', style: { fontSize: '20px' } })
					}
				),
				h(
					Button,
					{
						name: 'lower-greek',
						title: $editTrans('lowerGreek'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						active: active.value('lower-greek'),
						onOperate: () => {}
					},
					{
						default: () => h(Icon, { value: 'list-lower-greek', style: { fontSize: '20px' } })
					}
				)
			]
		}
	},
	{
		name: `_${FEATURE_NAME}`,
		props: {
			color: String,
			zIndex: Number,
			tooltip: Boolean
		}
	}
)

/**
 * 菜单栏 - 有序列表
 */
export const OrderListMenuButton = defineComponent(
	props => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const dataRangeCaches = inject<Ref<AlexElementsRangeType>>('dataRangeCaches')!
		const $editTrans = inject<(key: string) => any>('$editTrans')!
		const isSourceView = inject<Ref<boolean>>('isSourceView')!

		return () => {
			return props.config.show
				? h(
						Button,
						{
							name: FEATURE_NAME,
							tooltip: props.tooltip,
							color: props.color,
							zIndex: props.zIndex,
							title: $editTrans('orderList'),
							leftBorder: props.config.leftBorder,
							rightBorder: props.config.rightBorder,
							active: rangeIsInList(editor.value, dataRangeCaches.value, true),
							disabled: props.disabled || isSourceView.value || hasPreInRange(editor.value, dataRangeCaches.value) || hasTableInRange(editor.value, dataRangeCaches.value) || hasPanelInRange(editor.value, dataRangeCaches.value) || props.config.disabled,
							onOperate: () => {
								setList(editor.value, dataRangeCaches.value, true)
								editor.value.domRender()
								editor.value.rangeRender()
							}
						},
						{
							default: () => h(Icon, { value: 'list-ordered' })
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
			config: Object as PropType<MenuButtonType>,
			tooltip: Boolean,
			disabled: Boolean
		}
	}
)

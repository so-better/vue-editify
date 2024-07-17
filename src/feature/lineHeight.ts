import { computed, defineComponent, h, inject, PropType, Ref } from 'vue'
import { AlexElementsRangeType, AlexEditor } from 'alex-editor'
import { common as DapCommon } from 'dap-util'
import { MenuDisplayButtonType } from '@/core/tool'
import { hasPreInRange, setLineHeight } from '@/core/function'
import { Button, ButtonOptionsItemType } from '@/components/button'

/**
 * feature名称
 */
const FEATURE_NAME = 'lineHeight'

/**
 * 菜单栏 - 行高
 */
export const LineHeightMenuButton = defineComponent(
	props => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const dataRangeCaches = inject<Ref<AlexElementsRangeType>>('dataRangeCaches')!
		const $editTrans = inject<(key: string) => any>('$editTrans')!
		const isSourceView = inject<Ref<boolean>>('isSourceView')!
		const rangeKey = inject<Ref<number | null>>('rangeKey')!

		const selectVal = computed<string>(() => {
			const findHeightItem = props.config.options!.find((item: string | number | ButtonOptionsItemType) => {
				let val: string | number | ButtonOptionsItemType = item
				if (DapCommon.isObject(item)) {
					val = (item as ButtonOptionsItemType).value!
				}
				if (rangeKey.value && editor.value.range && editor.value.range.anchor.isEqual(editor.value.range!.focus)) {
					const block = editor.value.range!.anchor.element.getBlock()
					return block.hasStyles() && block.styles!['line-height'] == val
				}
				return dataRangeCaches.value.list.every(el => {
					if (el.element.isBlock() || el.element.isInblock()) {
						return el.element.hasStyles() && el.element.styles!['line-height'] == val
					}
					const block = el.element.getBlock()
					const inblock = el.element.getInblock()
					if (inblock) {
						return inblock.hasStyles() && inblock.styles!['line-height'] == val
					}
					return block.hasStyles() && block.styles!['line-height'] == val
				})
			})
			return findHeightItem ? (DapCommon.isObject(findHeightItem) ? ((findHeightItem as ButtonOptionsItemType).value as string) : (findHeightItem as string)) : (props.config.defaultValue as string)
		})

		return () => {
			return props.config.show
				? h(Button, {
						name: FEATURE_NAME,
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						type: 'display',
						displayConfig: {
							options: props.config.options,
							value: selectVal.value,
							width: props.config.width,
							maxHeight: props.config.maxHeight
						},
						title: $editTrans('lineHeight'),
						leftBorder: props.config.leftBorder,
						rightBorder: props.config.rightBorder,
						disabled: props.disabled || isSourceView.value || hasPreInRange(editor.value, dataRangeCaches.value) || props.config.disabled,
						active: false,
						onOperate: (_name, val) => {
							setLineHeight(editor.value, dataRangeCaches.value, val as string | number)
							editor.value.domRender()
							editor.value.rangeRender()
						}
				  })
				: null
		}
	},
	{
		name: `_${FEATURE_NAME}`,
		props: {
			color: String,
			zIndex: Number,
			config: Object as PropType<MenuDisplayButtonType>,
			tooltip: Boolean,
			disabled: Boolean
		}
	}
)

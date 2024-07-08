import { computed, defineComponent, h, inject, PropType, Ref, ref } from 'vue'
import { AlexElementsRangeType, AlexEditor } from 'alex-editor'
import { common as DapCommon } from 'dap-util'
import { MenuDisplayButtonType } from '@/core/tool'
import { setLineHeight } from '@/core/function'
import { Button, ButtonOptionsItemType } from '@/components/button'

/**
 * feature名称
 */
const FEATURE_NAME = 'lineHeight'

/**
 * 工具栏 - 行高
 */
export const LineHeightToolbarButton = defineComponent(
	(props, { expose }) => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const dataRangeCaches = inject<Ref<AlexElementsRangeType>>('dataRangeCaches')!
		const $editTrans = inject<(key: string) => any>('$editTrans')!

		const btnRef = ref<InstanceType<typeof Button> | null>(null)

		const selectVal = computed<string | number>(() => {
			const findHeightItem = props.config.options!.find((item: string | number | ButtonOptionsItemType) => {
				let val: string | number | ButtonOptionsItemType = item
				if (DapCommon.isObject(item)) {
					val = (<ButtonOptionsItemType>item).value!
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
			return findHeightItem ? (DapCommon.isObject(findHeightItem) ? ((findHeightItem as ButtonOptionsItemType).value as string | number) : (findHeightItem as string | number)) : (props.config.defaultValue as string | number)
		})

		expose({
			btnRef
		})

		return () => {
			return props.config.show
				? h(Button, {
						ref: btnRef,
						name: FEATURE_NAME,
						type: 'display',
						title: $editTrans('lineHeight'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						leftBorder: props.config.leftBorder,
						rightBorder: props.config.rightBorder,
						active: false,
						disabled: props.disabled,
						displayConfig: {
							options: props.config.options,
							value: selectVal.value,
							width: props.config.width,
							maxHeight: props.config.maxHeight
						},
						onOperate: (_name: string, val: string) => {
							setLineHeight(editor.value, dataRangeCaches.value, val)
							editor.value.formatElementStack()
							editor.value.domRender()
							editor.value.rangeRender()
						}
				  })
				: null
		}
	},
	{
		name: FEATURE_NAME,
		props: {
			color: String as PropType<string | null>,
			zIndex: Number,
			config: Object as PropType<MenuDisplayButtonType>,
			tooltip: Boolean,
			disabled: Boolean
		}
	}
)

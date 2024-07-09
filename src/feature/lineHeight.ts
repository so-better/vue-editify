import { computed, defineComponent, h, inject, PropType, Ref, ref } from 'vue'
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
		name: `_${FEATURE_NAME}`,
		props: {
			color: String as PropType<string | null>,
			zIndex: Number,
			config: Object as PropType<MenuDisplayButtonType>,
			tooltip: Boolean,
			disabled: Boolean
		}
	}
)

/**
 * 菜单栏 - 行高
 */
export const LineHeightMenuButton = defineComponent(
	props => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const dataRangeCaches = inject<Ref<AlexElementsRangeType>>('dataRangeCaches')!
		const $editTrans = inject<(key: string) => any>('$editTrans')!
		const isSourceView = inject<Ref<boolean>>('isSourceView')!

		const selectVal = computed<string>(() => {
			const findHeightItem = props.config.options!.find((item: string | number | ButtonOptionsItemType) => {
				let val: string | number | ButtonOptionsItemType = item
				if (DapCommon.isObject(item)) {
					val = (item as ButtonOptionsItemType).value!
				}
				if (editor.value && editor.value.range && editor.value.range.anchor.isEqual(editor.value.range!.focus)) {
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
						disabled: props.disabled || isSourceView.value || !editor.value || hasPreInRange(editor.value, dataRangeCaches.value),
						active: false,
						onOperate: (_name, val) => {
							if (!editor.value.range) {
								return
							}
							setLineHeight(editor.value, dataRangeCaches.value, <string | number>val)
							editor.value.formatElementStack()
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
			color: String as PropType<string | null>,
			zIndex: Number,
			config: Object as PropType<MenuDisplayButtonType>,
			tooltip: Boolean,
			disabled: Boolean
		}
	}
)

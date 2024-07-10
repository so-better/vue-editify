import { computed, defineComponent, h, inject, PropType, Ref, ref } from 'vue'
import { AlexElementsRangeType, AlexEditor } from 'alex-editor'
import { common as DapCommon } from 'dap-util'
import { MenuDisplayButtonType } from '@/core/tool'
import { hasPreInRange, queryTextStyle, setTextStyle } from '@/core/function'
import { Button, ButtonOptionsItemType } from '@/components/button'

/**
 * feature名称
 */
const FEATURE_NAME = 'fontFamily'

/**
 * 工具栏 - 字体
 */
export const FontFamilyToolbarButton = defineComponent(
	(props, { expose }) => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const dataRangeCaches = inject<Ref<AlexElementsRangeType>>('dataRangeCaches')!
		const $editTrans = inject<(key: string) => any>('$editTrans')!

		const btnRef = ref<InstanceType<typeof Button> | null>(null)

		const selectVal = computed<string>(() => {
			const findFamilyItem = props.config.options!.find((item: string | number | ButtonOptionsItemType) => {
				if (DapCommon.isObject(item)) {
					return queryTextStyle(editor.value, dataRangeCaches.value, 'font-family', (item as ButtonOptionsItemType).value)
				}
				return queryTextStyle(editor.value, dataRangeCaches.value, 'font-family', item as string)
			})
			return findFamilyItem ? (DapCommon.isObject(findFamilyItem) ? ((findFamilyItem as ButtonOptionsItemType).value as string) : (findFamilyItem as string)) : (props.config.defaultValue as string)
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
						title: $editTrans('fontFamily'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						leftBorder: props.config.leftBorder,
						rightBorder: props.config.rightBorder,
						active: false,
						disabled: props.config.disabled,
						displayConfig: {
							options: props.config.options,
							value: selectVal.value,
							width: props.config.width,
							maxHeight: props.config.maxHeight
						},
						onOperate: (_name: string, val: string) => {
							setTextStyle(editor.value, dataRangeCaches.value, {
								'font-family': val
							})
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
			tooltip: Boolean
		}
	}
)

/**
 * 菜单栏 - 字体
 */
export const FontFamilyMenuButton = defineComponent(
	props => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const dataRangeCaches = inject<Ref<AlexElementsRangeType>>('dataRangeCaches')!
		const $editTrans = inject<(key: string) => any>('$editTrans')!
		const isSourceView = inject<Ref<boolean>>('isSourceView')!

		const selectVal = computed<string>(() => {
			const findFamilyItem = props.config.options!.find((item: string | number | ButtonOptionsItemType) => {
				if (DapCommon.isObject(item)) {
					return queryTextStyle(editor.value, dataRangeCaches.value, 'font-family', (item as ButtonOptionsItemType).value)
				}
				return queryTextStyle(editor.value, dataRangeCaches.value, 'font-family', item as string)
			})
			return findFamilyItem ? (DapCommon.isObject(findFamilyItem) ? ((findFamilyItem as ButtonOptionsItemType).value as string) : (findFamilyItem as string)) : (props.config.defaultValue as string)
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
						title: $editTrans('fontFamily'),
						leftBorder: props.config.leftBorder,
						rightBorder: props.config.rightBorder,
						active: false,
						disabled: props.disabled || isSourceView.value || hasPreInRange(editor.value, dataRangeCaches.value) || props.config.disabled,
						onOperate: (_name, val) => {
							setTextStyle(editor.value, dataRangeCaches.value, {
								'font-family': val
							})
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

import { computed, defineComponent, h, inject, PropType, Ref, ref } from 'vue'
import { AlexElementsRangeType, AlexEditor } from 'alex-editor'
import { common as DapCommon } from 'dap-util'
import { MenuSelectButtonType } from '@/core/tool'
import { hasPreInRange, queryTextStyle, setTextStyle } from '@/core/function'
import { Button, ButtonOptionsItemType } from '@/components/button'
import { Icon } from '@/components/icon'
import { Colors } from '@/components/colors'

/**
 * feature名称
 */
const FEATURE_NAME = 'foreColor'

/**
 * 工具栏 - 前景色
 */
export const ForeColorToolbarButton = defineComponent(
	(props, { expose }) => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const dataRangeCaches = inject<Ref<AlexElementsRangeType>>('dataRangeCaches')!
		const $editTrans = inject<(key: string) => any>('$editTrans')!

		const btnRef = ref<InstanceType<typeof Button> | null>(null)

		const selectVal = computed<string>(() => {
			const findForeColorItem = props.config.options!.find((item: string | number | ButtonOptionsItemType) => {
				if (DapCommon.isObject(item)) {
					return queryTextStyle(editor.value, dataRangeCaches.value, 'color', (item as ButtonOptionsItemType).value)
				}
				return queryTextStyle(editor.value, dataRangeCaches.value, 'color', item as string | number)
			})
			return findForeColorItem ? (DapCommon.isObject(findForeColorItem) ? ((findForeColorItem as ButtonOptionsItemType).value as string) : (findForeColorItem as string)) : ''
		})

		expose({
			btnRef
		})

		return () => {
			return props.config.show
				? h(
						Button,
						{
							ref: btnRef,
							name: FEATURE_NAME,
							type: 'select',
							title: $editTrans('foreColor'),
							tooltip: props.tooltip,
							color: props.color,
							zIndex: props.zIndex,
							leftBorder: props.config.leftBorder,
							rightBorder: props.config.rightBorder,
							active: false,
							disabled: props.config.disabled,
							selectConfig: {
								options: props.config.options!
							},
							hideScroll: true
						},
						{
							default: () => h(Icon, { value: 'font-color' }),
							layer: ({ options }: { options: ButtonOptionsItemType[] }) => {
								return h(Colors, {
									tooltip: props.tooltip,
									color: props.color,
									value: selectVal.value,
									data: options,
									onChange: (val: string) => {
										setTextStyle(editor.value, dataRangeCaches.value, {
											color: val
										})
										btnRef.value!.show = false
										editor.value.formatElementStack()
										editor.value.domRender()
										editor.value.rangeRender()
									}
								})
							}
						}
				  )
				: null
		}
	},
	{
		name: `_${FEATURE_NAME}`,
		props: {
			color: String as PropType<string | null>,
			zIndex: Number,
			config: Object as PropType<MenuSelectButtonType>,
			tooltip: Boolean
		}
	}
)

/**
 * 菜单栏 - 前景色
 */
export const ForeColorMenuButton = defineComponent(
	props => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const dataRangeCaches = inject<Ref<AlexElementsRangeType>>('dataRangeCaches')!
		const $editTrans = inject<(key: string) => any>('$editTrans')!
		const isSourceView = inject<Ref<boolean>>('isSourceView')!

		const btnRef = ref<InstanceType<typeof Button> | null>(null)

		const selectVal = computed<string>(() => {
			const findForeColorItem = props.config.options!.find((item: string | number | ButtonOptionsItemType) => {
				if (DapCommon.isObject(item)) {
					return queryTextStyle(editor.value, dataRangeCaches.value, 'color', (item as ButtonOptionsItemType).value)
				}
				return editor.value && queryTextStyle(editor.value, dataRangeCaches.value, 'color', <string>item)
			})
			return findForeColorItem ? (DapCommon.isObject(findForeColorItem) ? ((findForeColorItem as ButtonOptionsItemType).value as string) : (findForeColorItem as string)) : ''
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
							selectConfig: {
								options: props.config.options!
							},
							hideScroll: true,
							title: $editTrans('foreColor'),
							leftBorder: props.config.leftBorder,
							rightBorder: props.config.rightBorder,
							disabled: props.disabled || isSourceView.value || !editor.value || hasPreInRange(editor.value, dataRangeCaches.value),
							active: false
						},
						{
							default: () => h(Icon, { value: 'font-color' }),
							layer: ({ options }: { options: ButtonOptionsItemType[] }) => {
								return h(Colors, {
									tooltip: props.tooltip,
									color: props.color,
									value: selectVal.value,
									data: options,
									onChange: (val: string) => {
										setTextStyle(editor.value, dataRangeCaches.value, {
											color: val
										})
										editor.value.formatElementStack()
										editor.value.domRender()
										editor.value.rangeRender()
										btnRef.value!.show = false
									}
								})
							}
						}
				  )
				: null
		}
	},
	{
		name: `_${FEATURE_NAME}`,
		props: {
			color: String as PropType<string | null>,
			zIndex: Number,
			config: Object as PropType<MenuSelectButtonType>,
			tooltip: Boolean,
			disabled: Boolean
		}
	}
)

import { computed, defineComponent, h, inject, PropType, Ref, ref } from 'vue'
import { AlexElementsRangeType, AlexEditor } from 'alex-editor'
import { common as DapCommon } from 'dap-util'
import { MenuSelectButtonType } from '@/core/tool'
import { queryTextStyle, setAlign, setTextStyle } from '@/core/function'
import { Button, ButtonOptionsItemType } from '@/components/button'
import { Icon } from '@/components/icon'
import { Colors } from '@/components/colors'

/**
 * feature名称
 */
const FEATURE_NAME = 'backColor'

/**
 * 工具栏 - 背景色
 */
export const BackColorToolbarButton = defineComponent(
	(props, { expose }) => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const dataRangeCaches = inject<Ref<AlexElementsRangeType>>('dataRangeCaches')!
		const $editTrans = inject<(key: string) => any>('$editTrans')!

		const btnRef = ref<InstanceType<typeof Button> | null>(null)

		const selectVal = computed<string>(() => {
			const findBackColorItem = props.config.options!.find((item: string | number | ButtonOptionsItemType) => {
				if (DapCommon.isObject(item)) {
					return queryTextStyle(editor.value, dataRangeCaches.value, 'background-color', (item as ButtonOptionsItemType).value)
				}
				return queryTextStyle(editor.value, dataRangeCaches.value, 'background-color', item as string | number)
			})
			return findBackColorItem ? (DapCommon.isObject(findBackColorItem) ? ((findBackColorItem as ButtonOptionsItemType).value as string) : (findBackColorItem as string)) : ''
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
							title: $editTrans('backColor'),
							tooltip: props.tooltip,
							color: props.color,
							zIndex: props.zIndex,
							leftBorder: props.config.leftBorder,
							rightBorder: props.config.rightBorder,
							active: false,
							disabled: props.disabled,
							selectConfig: {
								options: props.config.options
							},
							hideScroll: true,
							onOperate: (_name: string, val: string) => {
								setAlign(editor.value, dataRangeCaches.value, val as 'left' | 'right' | 'center' | 'justify')
								editor.value.formatElementStack()
								editor.value.domRender()
								editor.value.rangeRender()
							}
						},
						{
							default: () => h(Icon, { value: 'brush' }),
							layer: ({ options }: { options: ButtonOptionsItemType[] }) => {
								return h(Colors, {
									tooltip: props.tooltip,
									color: props.color,
									value: selectVal.value,
									data: options,
									onChange: (val: string) => {
										setTextStyle(editor.value, dataRangeCaches.value, {
											'background-color': val
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
		name: FEATURE_NAME,
		props: {
			color: String as PropType<string | null>,
			zIndex: Number,
			config: Object as PropType<MenuSelectButtonType>,
			tooltip: Boolean,
			disabled: Boolean
		}
	}
)

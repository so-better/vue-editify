import { computed, defineComponent, h, inject, PropType, ref, Ref } from 'vue'
import { AlexElementsRangeType, AlexEditor } from 'alex-editor'
import { common as DapCommon } from 'dap-util'
import { MenuDisplayButtonType } from '@/core/tool'
import { hasPreInRange, hasTableInRange, setHeading } from '@/core/function'
import { Button, ButtonOptionsItemType } from '@/components/button'

/**
 * feature名称
 */
const FEATURE_NAME = 'heading'

/**
 * 菜单栏 - 标题
 */
export const HeadingMenuButton = defineComponent(
	(props, { expose }) => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const dataRangeCaches = inject<Ref<AlexElementsRangeType>>('dataRangeCaches')!
		const $editTrans = inject<(key: string) => any>('$editTrans')!
		const isSourceView = inject<Ref<boolean>>('isSourceView')!
		const rangeKey = inject<Ref<number | null>>('rangeKey')!

		const btnRef = ref<InstanceType<typeof Button> | null>(null)

		const selectVal = computed<string>(() => {
			const findHeadingItem = props.config.options!.find((item: string | number | ButtonOptionsItemType) => {
				let val: string | number | ButtonOptionsItemType = item
				if (DapCommon.isObject(item)) {
					val = (item as ButtonOptionsItemType).value!
				}
				if (rangeKey.value && editor.value.range && editor.value.range.anchor.isEqual(editor.value.range!.focus)) {
					return editor.value.range.anchor.element.getBlock().parsedom == val
				}
				return dataRangeCaches.value.list.every(el => {
					if (el.element.isBlock()) {
						return el.element.parsedom == val
					}
					return el.element.getBlock().parsedom == val
				})
			})
			return findHeadingItem ? (DapCommon.isObject(findHeadingItem) ? ((findHeadingItem as ButtonOptionsItemType).value as string) : (findHeadingItem as string)) : (props.config.defaultValue as string)
		})

		expose({
			btnRef
		})

		return () => {
			return props.config.show
				? h(Button, {
						ref: btnRef,
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
						title: `${$editTrans('heading')}${props.config.shortcut?.title ? `【${props.config.shortcut?.title}】` : ''}`,
						leftBorder: props.config.leftBorder,
						rightBorder: props.config.rightBorder,
						active: false,
						disabled: props.disabled || isSourceView.value || hasPreInRange(editor.value, dataRangeCaches.value) || hasTableInRange(editor.value, dataRangeCaches.value) || props.config.disabled,
						onOperate: (_name: string, val: string) => {
							setHeading(editor.value, dataRangeCaches.value, val)
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

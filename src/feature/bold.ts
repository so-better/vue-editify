import { computed, defineComponent, h, inject, PropType, Ref, ref } from 'vue'
import { AlexElementsRangeType, AlexEditor } from 'alex-editor'
import { MenuButtonType } from '@/core/tool'
import { hasPreInRange, queryTextStyle, removeTextStyle, setTextStyle } from '@/core/function'
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'

/**
 * feature名称
 */
const FEATURE_NAME = 'bold'

/**
 * 工具栏 - 加粗
 */
export const BoldToolbarButton = defineComponent(
	(props, { expose }) => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const dataRangeCaches = inject<Ref<AlexElementsRangeType>>('dataRangeCaches')!
		const $editTrans = inject<(key: string) => any>('$editTrans')!

		const btnRef = ref<InstanceType<typeof Button> | null>(null)

		const active = computed<boolean>(() => queryTextStyle(editor.value, dataRangeCaches.value, 'font-weight', 'bold') || queryTextStyle(editor.value, dataRangeCaches.value, 'font-weight', '700'))

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
							title: $editTrans('bold'),
							tooltip: props.tooltip,
							color: props.color,
							zIndex: props.zIndex,
							leftBorder: props.config.leftBorder,
							rightBorder: props.config.rightBorder,
							active: active.value,
							disabled: props.disabled,
							onOperate: () => {
								if (active.value) {
									removeTextStyle(editor.value, dataRangeCaches.value, ['font-weight'])
								} else {
									setTextStyle(editor.value, dataRangeCaches.value, {
										'font-weight': 'bold'
									})
								}
								editor.value.formatElementStack()
								editor.value.domRender()
								editor.value.rangeRender()
							}
						},
						{
							default: () => h(Icon, { value: 'bold' })
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
			config: Object as PropType<MenuButtonType>,
			tooltip: Boolean,
			disabled: Boolean
		}
	}
)

/**
 * 菜单栏 - 加粗
 */
export const BoldMenuButton = defineComponent(
	props => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const dataRangeCaches = inject<Ref<AlexElementsRangeType>>('dataRangeCaches')!
		const $editTrans = inject<(key: string) => any>('$editTrans')!
		const isSourceView = inject<Ref<boolean>>('isSourceView')!

		const active = computed<boolean>(() => editor.value && (queryTextStyle(editor.value, dataRangeCaches.value, 'font-weight', 'bold') || queryTextStyle(editor.value, dataRangeCaches.value, 'font-weight', '700')))

		return () => {
			return props.config.show
				? h(
						Button,
						{
							name: FEATURE_NAME,
							tooltip: props.tooltip,
							color: props.color,
							zIndex: props.zIndex,
							title: $editTrans('bold'),
							leftBorder: props.config.leftBorder,
							rightBorder: props.config.rightBorder,
							disabled: props.disabled || isSourceView.value || !editor.value || hasPreInRange(editor.value, dataRangeCaches.value),
							active: active.value,
							onOperate: () => {
								if (!editor.value.range) {
									return
								}
								if (active.value) {
									removeTextStyle(editor.value, dataRangeCaches.value, ['font-weight'])
								} else {
									setTextStyle(editor.value, dataRangeCaches.value, {
										'font-weight': 'bold'
									})
								}
								editor.value.formatElementStack()
								editor.value.domRender()
								editor.value.rangeRender()
							}
						},
						() => h(Icon, { value: 'bold' })
				  )
				: null
		}
	},
	{
		name: `_${FEATURE_NAME}`,
		props: {
			color: String as PropType<string | null>,
			zIndex: Number,
			config: Object as PropType<MenuButtonType>,
			tooltip: Boolean,
			disabled: Boolean
		}
	}
)

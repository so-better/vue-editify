import { computed, defineComponent, h, inject, PropType, Ref, ref } from 'vue'
import { AlexElementsRangeType, AlexEditor } from 'alex-editor'
import { MenuButtonType } from '@/core/tool'
import { hasPreInRange, queryTextStyle, removeTextStyle, setTextStyle } from '@/core/function'
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'

/**
 * feature名称
 */
const FEATURE_NAME = 'sub'

/**
 * 工具栏 - 下标
 */
export const SubToolbarButton = defineComponent(
	(props, { expose }) => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const dataRangeCaches = inject<Ref<AlexElementsRangeType>>('dataRangeCaches')!
		const $editTrans = inject<(key: string) => any>('$editTrans')!

		const btnRef = ref<InstanceType<typeof Button> | null>(null)

		const active = computed<boolean>(() => {
			return queryTextStyle(editor.value, dataRangeCaches.value, 'vertical-align', 'sub')
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
							title: $editTrans('sub'),
							tooltip: props.tooltip,
							color: props.color,
							zIndex: props.zIndex,
							leftBorder: props.config.leftBorder,
							rightBorder: props.config.rightBorder,
							active: active.value,
							disabled: props.config.disabled,
							onOperate: () => {
								if (active.value) {
									removeTextStyle(editor.value, dataRangeCaches.value, ['vertical-align'])
								} else {
									setTextStyle(editor.value, dataRangeCaches.value, {
										'vertical-align': 'sub'
									})
								}
								editor.value.domRender()
								editor.value.rangeRender()
							}
						},
						{
							default: () => h(Icon, { value: 'subscript' })
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
			tooltip: Boolean
		}
	}
)

/**
 * 菜单栏 - 下标
 */
export const SubMenuButton = defineComponent(
	props => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const dataRangeCaches = inject<Ref<AlexElementsRangeType>>('dataRangeCaches')!
		const $editTrans = inject<(key: string) => any>('$editTrans')!
		const isSourceView = inject<Ref<boolean>>('isSourceView')!

		const active = computed<boolean>(() => {
			return queryTextStyle(editor.value, dataRangeCaches.value, 'vertical-align', 'sub')
		})

		return () => {
			return props.config.show
				? h(
						Button,
						{
							name: FEATURE_NAME,
							tooltip: props.tooltip,
							color: props.color,
							zIndex: props.zIndex,
							title: `${$editTrans('sub')}${props.config.shortcut?.title ? `【${props.config.shortcut?.title}】` : ''}`,
							leftBorder: props.config.leftBorder,
							rightBorder: props.config.rightBorder,
							disabled: props.disabled || isSourceView.value || hasPreInRange(editor.value, dataRangeCaches.value) || props.config.disabled,
							active: active.value,
							onOperate: () => {
								if (active.value) {
									removeTextStyle(editor.value, dataRangeCaches.value, ['vertical-align'])
								} else {
									setTextStyle(editor.value, dataRangeCaches.value, {
										'vertical-align': 'sub'
									})
								}
								editor.value.domRender()
								editor.value.rangeRender()
							}
						},
						{
							default: () => h(Icon, { value: 'subscript' })
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

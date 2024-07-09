import { defineComponent, h, inject, PropType, ref, Ref, watch } from 'vue'
import { AlexEditor, AlexElementsRangeType } from 'alex-editor'
import { Button } from '@/components/button'
import { MenuButtonType } from '@/core/tool'
import { Icon } from '@/components/icon'

/**
 * feature名称
 */
const FEATURE_NAME = 'redo'

/**
 * 菜单栏 - 重做
 */
export const RedoMenuButton = defineComponent(
	props => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const dataRangeCaches = inject<Ref<AlexElementsRangeType>>('dataRangeCaches')!
		const $editTrans = inject<(key: string) => any>('$editTrans')!
		const isSourceView = inject<Ref<boolean>>('isSourceView')!
		const redo = inject<() => void>('redo')!

		const disabled = ref<boolean>(false)

		watch(
			() => dataRangeCaches.value,
			() => {
				if (editor.value && editor.value.history) {
					disabled.value = !editor.value.history.get(1)
				}
				return false
			},
			{
				immediate: true
			}
		)

		return () => {
			return props.config.show
				? h(
						Button,
						{
							name: FEATURE_NAME,
							tooltip: props.tooltip,
							color: props.color,
							zIndex: props.zIndex,
							title: $editTrans('redo'),
							leftBorder: props.config.leftBorder,
							rightBorder: props.config.rightBorder,
							disabled: props.disabled || isSourceView.value || disabled.value,
							active: false,
							onOperate: () => {
								if (!editor.value.range) {
									return
								}
								redo()
							}
						},
						{
							default: () => h(Icon, { value: 'redo' })
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

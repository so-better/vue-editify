import { defineComponent, h, inject, PropType, Ref } from 'vue'
import { AlexEditor } from 'alex-editor'
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
		const $editTrans = inject<(key: string) => any>('$editTrans')!
		const isSourceView = inject<Ref<boolean>>('isSourceView')!
		const rangeKey = inject<Ref<number | null>>('rangeKey')!
		const redo = inject<() => void>('redo')!

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
							active: false,
							disabled: props.disabled || isSourceView.value || (rangeKey.value && editor.value.history && !editor.value.history.get(1)) || props.config.disabled,
							onOperate: () => redo()
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
			color: String,
			zIndex: Number,
			config: Object as PropType<MenuButtonType>,
			tooltip: Boolean,
			disabled: Boolean
		}
	}
)

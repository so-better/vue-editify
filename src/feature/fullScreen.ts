import { defineComponent, h, inject, PropType, Ref } from 'vue'
import { AlexEditor } from 'alex-editor'
import { Button } from '@/components/button'
import { MenuButtonType } from '@/core/tool'
import { Icon } from '@/components/icon'

/**
 * feature名称
 */
const FEATURE_NAME = 'fullScreen'

/**
 * 菜单栏 - 全屏
 */
export const FullScreenMenuButton = defineComponent(
	props => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const $editTrans = inject<(key: string) => any>('$editTrans')!
		const isFullScreen = inject<Ref<boolean>>('isFullScreen')!

		return () => {
			return props.config.show
				? h(
						Button,
						{
							name: FEATURE_NAME,
							tooltip: props.tooltip,
							color: props.color,
							zIndex: props.zIndex,
							title: $editTrans('fullScreen'),
							leftBorder: props.config.leftBorder,
							rightBorder: props.config.rightBorder,
							active: isFullScreen.value,
							disabled: props.disabled || props.config.disabled,
							onOperate: () => {
								isFullScreen.value = !isFullScreen.value
								editor.value.rangeRender()
							}
						},
						{
							default: () => h(Icon, { value: 'full-screen' })
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

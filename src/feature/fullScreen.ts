import { defineComponent, h, inject, PropType, ref, Ref } from 'vue'
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
	(props, { expose }) => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const $editTrans = inject<(key: string) => any>('$editTrans')!
		const isFullScreen = inject<Ref<boolean>>('isFullScreen')!

		const btnRef = ref<InstanceType<typeof Button> | null>(null)

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
							tooltip: props.tooltip,
							color: props.color,
							zIndex: props.zIndex,
							title: `${$editTrans('fullScreen')}${props.config.shortcut?.title ? `【${props.config.shortcut?.title}】` : ''}`,
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
			color: String,
			zIndex: Number,
			config: Object as PropType<MenuButtonType>,
			tooltip: Boolean,
			disabled: Boolean
		}
	}
)

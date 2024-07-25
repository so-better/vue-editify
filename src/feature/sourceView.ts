import { defineComponent, h, inject, PropType, ref, Ref } from 'vue'
import { AlexEditor } from 'alex-editor'
import { Button } from '@/components/button'
import { MenuButtonType } from '@/core/tool'
import { Icon } from '@/components/icon'

/**
 * feature名称
 */
const FEATURE_NAME = 'sourceView'

/**
 * 菜单栏 - 代码视图
 */
export const SourceViewMenuButton = defineComponent(
	(props, { expose }) => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const $editTrans = inject<(key: string) => any>('$editTrans')!
		const isSourceView = inject<Ref<boolean>>('isSourceView')!

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
							title: `${$editTrans('sourceView')}${props.config.shortcut?.title ? `【${props.config.shortcut?.title}】` : ''}`,
							leftBorder: props.config.leftBorder,
							rightBorder: props.config.rightBorder,
							active: isSourceView.value,
							disabled: props.disabled || props.config.disabled,
							onOperate: () => {
								isSourceView.value = !isSourceView.value
								if (!isSourceView.value) {
									editor.value.rangeRender()
								}
							}
						},
						{
							default: () => h(Icon, { value: 'source-view' })
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

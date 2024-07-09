import { defineComponent, h, inject, PropType, Ref } from 'vue'
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
	props => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const $editTrans = inject<(key: string) => any>('$editTrans')!
		const isSourceView = inject<Ref<boolean>>('isSourceView')!

		return () => {
			return props.config.show
				? h(
						Button,
						{
							name: FEATURE_NAME,
							tooltip: props.tooltip,
							color: props.color,
							zIndex: props.zIndex,
							title: $editTrans('sourceView'),
							leftBorder: props.config.leftBorder,
							rightBorder: props.config.rightBorder,
							disabled: false,
							active: isSourceView.value,
							onOperate: () => {
								if (!editor.value.range) {
									return
								}
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
			color: String as PropType<string | null>,
			zIndex: Number,
			config: Object as PropType<MenuButtonType>,
			tooltip: Boolean,
			disabled: Boolean
		}
	}
)

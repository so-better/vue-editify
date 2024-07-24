import { defineComponent, h, inject, PropType, Ref } from 'vue'
import { AlexEditor, AlexElementsRangeType } from 'alex-editor'
import { Button } from '@/components/button'
import { MenuButtonType } from '@/core/tool'
import { Icon } from '@/components/icon'
import { hasPanelInRange, hasPreInRange, hasTableInRange, insertInfoBlock, rangeIsInInfoBlock } from '@/core/function'

/**
 * feature名称
 */
const FEATURE_NAME = 'infoBlock'

/**
 * 菜单栏 - 信息块
 */
export const InfoBlockMenuButton = defineComponent(
	props => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const dataRangeCaches = inject<Ref<AlexElementsRangeType>>('dataRangeCaches')!
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
							title: `${$editTrans('insertInfoBlock')}${props.config.shortcut?.title ? `【${props.config.shortcut?.title}】` : ''}`,
							leftBorder: props.config.leftBorder,
							rightBorder: props.config.rightBorder,
							active: rangeIsInInfoBlock(editor.value, dataRangeCaches.value),
							disabled: props.disabled || isSourceView.value || hasPanelInRange(editor.value, dataRangeCaches.value) || hasTableInRange(editor.value, dataRangeCaches.value) || hasPreInRange(editor.value, dataRangeCaches.value) || props.config.disabled,
							onOperate: () => {
								//插入信息块
								insertInfoBlock(editor.value, dataRangeCaches.value)
								//渲染
								editor.value.domRender()
								editor.value.rangeRender()
							}
						},
						{
							default: () => h(Icon, { value: 'info' })
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

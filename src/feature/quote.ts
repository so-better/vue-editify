import { defineComponent, h, inject, PropType, Ref } from 'vue'
import { AlexEditor, AlexElementsRangeType } from 'alex-editor'
import { Button } from '@/components/button'
import { MenuSelectButtonType } from '@/core/tool'
import { Icon } from '@/components/icon'
import { hasPreInRange, hasTableInRange, rangeIsInQuote, setQuote } from '@/core/function'

/**
 * feature名称
 */
const FEATURE_NAME = 'quote'

/**
 * 菜单栏 - 引用
 */
export const QuoteMenuButton = defineComponent(
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
							title: `${$editTrans('quote')}${props.config.shortcut?.title ? `【${props.config.shortcut?.title}】` : ''}`,
							leftBorder: props.config.leftBorder,
							rightBorder: props.config.rightBorder,
							active: rangeIsInQuote(editor.value, dataRangeCaches.value),
							disabled: props.disabled || isSourceView.value || hasPreInRange(editor.value, dataRangeCaches.value) || hasTableInRange(editor.value, dataRangeCaches.value) || props.config.disabled,
							onOperate: () => {
								setQuote(editor.value, dataRangeCaches.value)
								editor.value.domRender()
								editor.value.rangeRender()
							}
						},
						{
							default: () => h(Icon, { value: 'quote' })
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
			config: Object as PropType<MenuSelectButtonType>,
			tooltip: Boolean,
			disabled: Boolean
		}
	}
)

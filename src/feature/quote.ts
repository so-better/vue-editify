import { defineComponent, h, inject, PropType, Ref } from 'vue'
import { AlexEditor, AlexElementsRangeType } from 'alex-editor'
import { Button } from '@/components/button'
import { MenuSelectButtonType } from '@/core/tool'
import { Icon } from '@/components/icon'
import { hasPreInRange, hasTableInRange, isRangeInQuote, setQuote } from '@/core/function'

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
							title: $editTrans('quote'),
							leftBorder: props.config.leftBorder,
							rightBorder: props.config.rightBorder,
							disabled: props.disabled || isSourceView.value || !editor.value || hasPreInRange(editor.value, dataRangeCaches.value) || hasTableInRange(editor.value, dataRangeCaches.value),
							active: editor.value && isRangeInQuote(editor.value, dataRangeCaches.value),
							onOperate: () => {
								if (!editor.value.range) {
									return
								}
								setQuote(editor.value, dataRangeCaches.value)
								editor.value.formatElementStack()
								editor.value.domRender()
								editor.value.rangeRender()
							}
						},
						() => h(Icon, { value: 'quote' })
				  )
				: null
		}
	},
	{
		name: `_${FEATURE_NAME}`,
		props: {
			color: String as PropType<string | null>,
			zIndex: Number,
			config: Object as PropType<MenuSelectButtonType>,
			tooltip: Boolean,
			disabled: Boolean
		}
	}
)

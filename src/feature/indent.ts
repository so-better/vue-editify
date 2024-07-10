import { defineComponent, h, inject, PropType, Ref } from 'vue'
import { AlexEditor, AlexElementsRangeType } from 'alex-editor'
import { Button } from '@/components/button'
import { MenuSelectButtonType } from '@/core/tool'
import { Icon } from '@/components/icon'
import { hasPreInRange, hasTableInRange, setIndentDecrease, setIndentIncrease } from '@/core/function'

/**
 * feature名称
 */
const FEATURE_NAME = 'indent'

/**
 * 菜单栏 - 缩进
 */
export const IndentMenuButton = defineComponent(
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
							type: 'select',
							title: $editTrans('indent'),
							selectConfig: {
								options: props.config.options,
								width: props.config.width,
								maxHeight: props.config.maxHeight
							},
							leftBorder: props.config.leftBorder,
							rightBorder: props.config.rightBorder,
							active: false,
							disabled: props.disabled || isSourceView.value || hasPreInRange(editor.value, dataRangeCaches.value) || hasTableInRange(editor.value, dataRangeCaches.value) || props.config.disabled,
							onOperate: (_name, val: string) => {
								if (val == 'indent-increase') {
									setIndentIncrease(editor.value, dataRangeCaches.value)
								}
								//减少缩进
								else if (val == 'indent-decrease') {
									setIndentDecrease(editor.value, dataRangeCaches.value)
								}
								editor.value.formatElementStack()
								editor.value.domRender()
								editor.value.rangeRender()
							}
						},
						{
							default: () => h(Icon, { value: 'indent-increase' })
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

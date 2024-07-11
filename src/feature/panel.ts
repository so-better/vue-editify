import { defineComponent, h, inject, PropType, Ref } from 'vue'
import { AlexEditor, AlexElement, AlexElementsRangeType } from 'alex-editor'
import { Button } from '@/components/button'
import { MenuButtonType } from '@/core/tool'
import { Icon } from '@/components/icon'
import { hasMathformulaInRange, hasPanelInRange, hasTableInRange } from '@/core/function'

/**
 * feature名称
 */
const FEATURE_NAME = 'panel'

/**
 * 菜单栏 - 插入面板
 */
export const PanelMenuButton = defineComponent(
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
							title: $editTrans('insertPanel'),
							leftBorder: props.config.leftBorder,
							rightBorder: props.config.rightBorder,
							active: false,
							disabled: props.disabled || isSourceView.value || hasPanelInRange(editor.value, dataRangeCaches.value) || hasTableInRange(editor.value, dataRangeCaches.value) || hasMathformulaInRange(editor.value, dataRangeCaches.value) || props.config.disabled,
							onOperate: () => {
								const panelElement = AlexElement.create({
									type: 'block',
									parsedom: 'div',
									marks: {
										'data-editify-panel': 'true'
									},
									children: [
										{
											type: 'inblock',
											parsedom: 'div',
											behavior: 'block',
											children: [
												{
													type: 'text',
													textcontent: $editTrans('panelTitle')
												}
											]
										},
										{
											type: 'inblock',
											parsedom: 'div',
											behavior: 'block',
											children: [
												{
													type: 'text',
													textcontent: $editTrans('panelContent')
												}
											]
										}
									]
								})
								editor.value.insertElement(panelElement)
								//面板后面插入段落
								const paragraph = AlexElement.create({
									type: 'block',
									parsedom: AlexElement.BLOCK_NODE,
									children: [
										{
											type: 'closed',
											parsedom: 'br'
										}
									]
								})
								editor.value.addElementAfter(paragraph, panelElement)
								//移动光标到新插入的元素
								editor.value.range!.anchor.moveToEnd(panelElement.children![0])
								editor.value.range!.focus.moveToEnd(panelElement.children![0])
								//渲染
								editor.value.domRender()
								editor.value.rangeRender()
							}
						},
						{
							default: () => h(Icon, { value: 'panel' })
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

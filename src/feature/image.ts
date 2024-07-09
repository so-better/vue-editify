import { defineComponent, h, inject, PropType, Ref } from 'vue'
import { AlexEditor, AlexElementsRangeType } from 'alex-editor'
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'
import { getMatchElementByRange } from '@/core/function'

/**
 * feature名称
 */
const FEATURE_NAME = 'image'

/**
 * 工具栏 - 图片操作
 */
export const ImageToolbar = defineComponent(
	(props, { emit }) => {
		return () => {
			const editor = inject<Ref<AlexEditor>>('editor')!
			const dataRangeCaches = inject<Ref<AlexElementsRangeType>>('dataRangeCaches')!
			const $editTrans = inject<(key: string) => any>('$editTrans')!

			//设置图片宽度
			const setWidth = (value: string) => {
				const element = editor.value.range!.anchor.element
				if (element) {
					const styles = {
						width: value
					}
					if (element.hasStyles()) {
						element.styles = Object.assign(element.styles!, styles)
					} else {
						element.styles = styles
					}
					editor.value.formatElementStack()
					editor.value.domRender()
					editor.value.rangeRender()
					//更新工具条位置
					setTimeout(() => {
						emit('reset-toolbar')
					}, 0)
				}
			}

			return [
				//30%
				h(
					Button,
					{
						name: 'set30Width',
						title: $editTrans('width30'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						onOperate: () => setWidth('30%')
					},
					{
						default: () => ' 30% '
					}
				),
				//50%
				h(
					Button,
					{
						name: 'set50Width',
						title: $editTrans('width50'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						onOperate: () => setWidth('50%')
					},
					{
						default: () => ' 50% '
					}
				),
				//100%
				h(
					Button,
					{
						name: 'set100Width',
						title: $editTrans('width100'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						onOperate: () => setWidth('100%')
					},
					{
						default: () => ' 100% '
					}
				),
				//宽度自适应
				h(
					Button,
					{
						name: 'setAutoWidth',
						title: $editTrans('auto'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						onOperate: () => setWidth('auto')
					},
					{
						default: () => h(Icon, { value: 'auto-width' })
					}
				),
				//删除图片
				h(
					Button,
					{
						name: 'deleteImage',
						title: $editTrans('deleteImage'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						onOperate: () => {
							const element = getMatchElementByRange(editor.value, dataRangeCaches.value, { parsedom: 'img' })
							if (element) {
								element.toEmpty()
								editor.value.formatElementStack()
								editor.value.domRender()
								editor.value.rangeRender()
							}
						}
					},
					{
						default: () => h(Icon, { value: 'delete' })
					}
				)
			]
		}
	},
	{
		name: `_${FEATURE_NAME}`,
		props: {
			color: String as PropType<string | null>,
			zIndex: Number,
			tooltip: Boolean
		},
		emits: ['reset-toolbar']
	}
)

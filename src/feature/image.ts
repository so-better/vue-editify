import { defineComponent, h, inject, PropType, ref, Ref } from 'vue'
import { AlexEditor, AlexElementsRangeType } from 'alex-editor'
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'
import { getMatchElementByRange, hasMathformulaInRange, hasPreInRange, insertImage } from '@/core/function'
import { InsertImage } from '@/components/insertImage'
import { MenuImageButtonType } from '@/core/tool'

/**
 * feature名称
 */
const FEATURE_NAME = 'image'

/**
 * 工具栏 - 图片操作
 */
export const ImageToolbar = defineComponent(
	(props, { emit }) => {
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
				editor.value.domRender()
				editor.value.rangeRender()
				//更新工具条位置
				setTimeout(() => {
					emit('reset-toolbar')
				}, 0)
			}
		}

		return () => {
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
			color: String,
			zIndex: Number,
			tooltip: Boolean
		},
		emits: ['reset-toolbar']
	}
)

/**
 * 菜单栏 - 插入图片
 */
export const ImageMenuButton = defineComponent(
	props => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const dataRangeCaches = inject<Ref<AlexElementsRangeType>>('dataRangeCaches')!
		const $editTrans = inject<(key: string) => any>('$editTrans')!
		const isSourceView = inject<Ref<boolean>>('isSourceView')!

		const btnRef = ref<InstanceType<typeof Button> | null>(null)

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
							type: 'select',
							hideScroll: true,
							title: `${$editTrans('insertImage')}${props.config.shortcut?.title ? `【${props.config.shortcut?.title}】` : ''}`,
							leftBorder: props.config.leftBorder,
							rightBorder: props.config.rightBorder,
							active: false,
							disabled: props.disabled || isSourceView.value || hasPreInRange(editor.value, dataRangeCaches.value) || hasMathformulaInRange(editor.value, dataRangeCaches.value) || props.config.disabled
						},
						{
							default: () =>
								h(Icon, {
									value: 'image'
								}),
							layer: () =>
								h(InsertImage, {
									color: props.color,
									allowedFileType: props.config.allowedFileType,
									multiple: props.config.multiple,
									maxSize: props.config.maxSize,
									minSize: props.config.minSize,
									customUpload: props.config.customUpload,
									handleError: props.config.handleError,
									onChange: () => {
										btnRef.value!.layerRef!.setPosition()
									},
									onInsert: (val: string[]) => {
										//过滤掉空的地址
										const urls = val.filter(url => {
											return !!url
										})
										//如果数组为0
										if (urls.length == 0) {
											return
										}
										//遍历每个地址进行插入
										urls.forEach(url => {
											insertImage(editor.value, url)
										})
										editor.value.domRender()
										editor.value.rangeRender()
										btnRef.value!.show = false
									}
								})
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
			config: Object as PropType<MenuImageButtonType>,
			tooltip: Boolean,
			disabled: Boolean
		}
	}
)

import { defineComponent, h, inject, PropType, ref, Ref } from 'vue'
import { AlexEditor, AlexElement, AlexElementsRangeType } from 'alex-editor'
import { MenuAttachmentButtonType, ObjectType } from '@/core/tool'
import { Button } from '@/components/button'
import { hasMathformulaInRange, hasPreInRange } from '@/core/function'
import { Icon } from '@/components/icon'
import { InsertAttachment } from '@/components/insertAttachment'

/**
 * feature名称
 */
const FEATURE_NAME = 'attachment'

/**
 * 菜单栏 - 插入附件
 */
export const AttachmentMenuButton = defineComponent(
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
							title: $editTrans('insertAttachment'),
							leftBorder: props.config.leftBorder,
							rightBorder: props.config.rightBorder,
							active: false,
							disabled: props.disabled || isSourceView.value || hasPreInRange(editor.value, dataRangeCaches.value) || hasMathformulaInRange(editor.value, dataRangeCaches.value) || props.config.disabled
						},
						{
							default: () =>
								h(Icon, {
									value: 'attachment'
								}),
							layer: () =>
								h(InsertAttachment, {
									color: props.color,
									accept: props.config.accept,
									allowedFileType: props.config.allowedFileType,
									multiple: props.config.multiple,
									maxSize: props.config.maxSize,
									minSize: props.config.minSize,
									customUpload: props.config.customUpload,
									handleError: props.config.handleError,
									onChange: () => btnRef.value!.layerRef!.setPosition(),
									onInsert: (name: string, urls: string[]) => {
										//过滤掉空的地址
										urls = urls.filter(url => {
											return !!url
										})
										//如果有地址存在
										if (urls.length) {
											//遍历地址数组
											urls.forEach(url => {
												const marks: ObjectType = {
													'data-editify-attachment': url,
													'data-editify-attachment-name': name || $editTrans('attachmentDefaultName')
												}
												//创建元素
												const attachmentElement = AlexElement.create({
													type: 'closed',
													parsedom: 'span',
													marks
												})
												//插入编辑器
												editor.value.insertElement(attachmentElement)
												//移动光标到新插入的元素
												editor.value.range!.anchor.moveToEnd(attachmentElement)
												editor.value.range!.focus.moveToEnd(attachmentElement)
											})
											//渲染
											editor.value.domRender()
											editor.value.rangeRender()
										}
										//关闭浮层
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
			config: Object as PropType<MenuAttachmentButtonType>,
			tooltip: Boolean,
			disabled: Boolean
		}
	}
)

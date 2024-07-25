import { defineComponent, h, inject, PropType, ref, Ref } from 'vue'
import { AlexEditor, AlexElementsRangeType } from 'alex-editor'
import { MenuAttachmentButtonType } from '@/core/tool'
import { Button } from '@/components/button'
import { hasMathformulaInRange, hasPreInRange, insertAttachment } from '@/core/function'
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
	(props, { expose }) => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const dataRangeCaches = inject<Ref<AlexElementsRangeType>>('dataRangeCaches')!
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
							type: 'select',
							hideScroll: true,
							title: `${$editTrans('insertAttachment')}${props.config.shortcut?.title ? `【${props.config.shortcut?.title}】` : ''}`,
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
										//如果数组为0
										if (urls.length == 0) {
											return
										}
										//遍历地址数组
										urls.forEach(url => {
											insertAttachment(editor.value, url, name || $editTrans('attachmentDefaultName'))
										})
										//渲染
										editor.value.domRender()
										editor.value.rangeRender()
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

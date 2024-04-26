import { ComponentInternalInstance, h } from 'vue'
import { AlexEditor, AlexElement } from 'alex-editor'
import { ObjectType, PluginType } from '../../core/tool'
import Layer from '../../components/layer/layer.vue'
import Button from '../../components/button/button.vue'
import Icon from '../../components/icon/icon.vue'
import InsertAttachment from './insertAttachment/insertAttachment.vue'
import { InsertAttachmentUploadErrorType } from './insertAttachment/props'
import { event as DapEvent, common as DapCommon } from 'dap-util'
import { hasPreInRange } from '../../core/function'

export type AttachmentOptionsType = {
	//排序
	sequence?: number
	//工具提示内容
	title?: string
	//按钮是否显示左侧边框
	leftBorder?: boolean
	//按钮是否显示右侧边框
	rightBorder?: boolean
	//定义可选择的文件类型，默认不限制类型，设定此参数后选择文件时会自动过滤非符合的文件类型
	accept?: 'rar' | 'zip' | 'txt' | 'image' | 'video' | 'audio' | 'html' | 'doc' | 'xml' | 'js' | 'json' | 'ppt' | 'pdf' | null
	//支持的类型数组
	allowedFileType?: string[]
	//是否多选
	multiple?: boolean
	//选择的单个文件最大值，单位kb，不设置将不限制
	maxSize?: number
	//选择的单个文件最小值，单位kb，不设置将不限制
	minSize?: number
	//是否自定义上传附件
	customUpload?: (files: File[]) => string[] | Promise<string[]>
	//处理上传附件异常
	handleError?: (error: InsertAttachmentUploadErrorType, file: File) => void
}

export const attachment = (options?: AttachmentOptionsType) => {
	if (!DapCommon.isObject(options)) {
		options = {}
	}
	const plugin: PluginType = (editifyInstance: ComponentInternalInstance, color: string | null, editTrans: (key: string) => any) => {
		return {
			//附件菜单项配置
			menu: {
				sequence: {
					attachment: options!.sequence || 100
				},
				extends: {
					attachment: {
						type: 'select',
						title: options!.title || editTrans('insertAttachment'),
						leftBorder: options!.leftBorder,
						rightBorder: options!.rightBorder,
						disabled: editifyInstance.exposed!.editor.value ? hasPreInRange(editifyInstance.exposed!.editor.value, editifyInstance.exposed!.dataRangeCaches.value) : false,
						default: () => h(Icon, { value: 'attachment' }),
						layer: (_name: string, btnInstance: InstanceType<typeof Button>) =>
							h(InsertAttachment, {
								color: color,
								accept: options!.accept,
								allowedFileType: options!.allowedFileType || [],
								multiple: !!options!.multiple,
								maxSize: options!.maxSize,
								minSize: options!.minSize,
								customUpload: options!.customUpload,
								handleError: options!.handleError,
								onChange: () => {
									;(<InstanceType<typeof Layer>>btnInstance.$refs.layerRef).setPosition()
								},
								onInsert: (url: string) => {
									const marks: ObjectType = {
										'data-attachment': url,
										'data-attachment-name': editTrans('attachmentDownloadName'),
										contenteditable: 'false'
									}
									//创建元素
									const attachmentElement = new AlexElement('closed', 'span', marks, null, null)
									//获取editor对象
									const editor = <AlexEditor>editifyInstance.exposed!.editor.value
									//插入编辑器
									editor.insertElement(attachmentElement)
									//创建空文本元素
									const beforeText = AlexElement.getSpaceElement()
									const afterText = AlexElement.getSpaceElement()
									//将空白文本元素插入附件两端
									editor.addElementAfter(afterText, attachmentElement)
									editor.addElementBefore(beforeText, attachmentElement)
									//移动光标到新插入的元素
									editor.range!.anchor.moveToStart(afterText)
									editor.range!.focus.moveToStart(afterText)
									//渲染
									editor.formatElementStack()
									editor.domRender()
									editor.rangeRender()
									//关闭浮层
									btnInstance.show = false
								}
							})
					}
				}
			},
			//找到附件元素点击下载
			updateView: () => {
				const editor = <AlexEditor>editifyInstance.exposed!.editor.value
				AlexElement.flatElements(editor.stack).forEach(el => {
					if (el.parsedom == 'span' && el.hasMarks() && el.marks!['data-attachment']) {
						DapEvent.off(<HTMLElement>el.elm, 'click')
						DapEvent.on(<HTMLElement>el.elm, 'click', () => {
							const url = el.marks!['data-attachment']
							const a = document.createElement('a')
							a.setAttribute('target', '_blank')
							a.setAttribute('href', url)
							a.setAttribute('download', editTrans('attachmentDownloadName'))
							a.click()
						})
					}
				})
			},
			//span含有data-attachment的元素设为自闭合元素
			customParseNode: (el: AlexElement) => {
				if (el.hasMarks() && el.marks!['data-attachment'] && el.parsedom == 'span') {
					el.type = 'closed'
				}
				return el
			},
			//span元素粘贴保留data-attachment
			pasteKeepMarks: {
				'data-attachment': ['span'],
				'data-attachment-name': ['span']
			},
			//自定义渲染规范
			renderRule: (el: AlexElement) => {
				if (el.type == 'closed' && el.hasMarks() && el.marks!['data-attachment']) {
					//设置title
					el.marks!['title'] = editTrans('downloadAttachment')
					//获取editor对象
					const editor = <AlexEditor>editifyInstance.exposed!.editor.value
					//前一个元素
					const previousElement = editor.getPreviousElement(el)
					//后一个元素
					const newTextElement = editor.getNextElement(el)
					//如果不存在前一个元素或者前一个元素不是空白元素则设置空白元素
					if (!previousElement || !previousElement.isSpaceText()) {
						const spaceText = AlexElement.getSpaceElement()
						editor.addElementBefore(spaceText, el)
					}
					//如果不存在后一个元素或者后一个元素不是空白元素则设置空白元素
					if (!newTextElement || !newTextElement.isSpaceText()) {
						const spaceText = AlexElement.getSpaceElement()
						editor.addElementAfter(spaceText, el)
					}
				}
			}
		}
	}
	return plugin
}

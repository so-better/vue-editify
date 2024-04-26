import { ComponentInternalInstance, h } from 'vue'
import { AlexElement } from 'alex-editor'
import { PluginResultType, PluginType } from '../../core/tool'
import Layer from '../../components/layer/layer.vue'
import Button from '../../components/button/button.vue'
import Icon from '../../components/icon/icon.vue'
import InsertAttachment from './insertAttachment/insertAttachment.vue'
import { InsertAttachmentUploadErrorType } from './insertAttachment/props'

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

export const attachment = (options: AttachmentOptionsType) => {
	const plugin: PluginType = (editifyInstance: ComponentInternalInstance, color: string | null, editTrans: (key: string) => any) => {
		const pluginResult: PluginResultType = {
			menu: {
				sequence: {
					attachment: options.sequence || 100
				},
				extends: {
					attachment: {
						type: 'select',
						title: options.title || editTrans('insertAttachment'),
						leftBorder: options.leftBorder,
						rightBorder: options.rightBorder,
						default: () => h(Icon, { value: 'attachment' }),
						layer: (_name: string, btnInstance: InstanceType<typeof Button>) =>
							h(InsertAttachment, {
								color: color,
								allowedFileType: options.allowedFileType || [],
								multiple: !!options.multiple,
								maxSize: options.maxSize,
								minSize: options.minSize,
								customUpload: options.customUpload,
								handleError: options.handleError,
								onChange: () => {
									;(<InstanceType<typeof Layer>>btnInstance.$refs.layerRef).setPosition()
								},
								onInsert: (url: string) => {
									//创建元素
									const attachmentElement = new AlexElement('closed', 'span', { 'data-attachment': url, contenteditable: 'false' }, null, null)
									//插入编辑器
									editifyInstance.exposed!.editor.value!.insertElement(attachmentElement)
									//移动光标到新插入的元素
									editifyInstance.exposed!.editor.value!.range!.anchor.moveToStart(attachmentElement)
									editifyInstance.exposed!.editor.value!.range!.focus.moveToStart(attachmentElement)
									editifyInstance.exposed!.editor.value!.formatElementStack()
									editifyInstance.exposed!.editor.value!.domRender()
									btnInstance.show = false
								}
							})
					}
				}
			},
			updateView: (instance: ComponentInternalInstance) => {
				//赋予点击事件
				console.log(instance)
			},
			customParseNode: (el: AlexElement) => {
				//span含有data-attachment的元素设为自闭合元素
				if (el.hasMarks() && el.marks!['data-attachment'] && el.parsedom == 'span') {
					el.type = 'closed'
				}
				return el
			},
			//span元素粘贴保留data-attachment
			pasteKeepMarks: {
				'data-attachment': ['span']
			},
			renderRule: (el: AlexElement) => {
				//设置title标记
				if (el.type == 'closed' && el.hasMarks() && el.marks!['data-attachment']) {
					el.marks!['title'] = editTrans('downloadAttachment')
				}
			}
		}
		return pluginResult
	}
	return plugin
}

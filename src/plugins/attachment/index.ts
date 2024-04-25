import { h } from 'vue'
import AlexEditor, { AlexElement } from 'alex-editor'
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
	//支持的类型数组
	accept?: string[]
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
	const plugin: PluginType = (editTrans: (key: string) => any, color: string | null, editor: AlexEditor) => {
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
						layer: () =>
							h(InsertAttachment, {
								color: color,
								accept: options.accept || [],
								multiple: !!options.multiple,
								maxSize: options.maxSize,
								minSize: options.minSize,
								customUpload: options.customUpload,
								handleError: options.handleError,
								onChange: (instance: InstanceType<typeof InsertAttachment>) => {
									;(<InstanceType<typeof Layer>>instance.$parent!.$parent).setPosition()
								},
								onInsert: (url: string, instance: InstanceType<typeof InsertAttachment>) => {
									//创建元素
									const attachmentElement = new AlexElement('closed', 'span', { 'data-attachment': url, contenteditable: 'false' }, null, null)
									//插入编辑器
									editor.insertElement(attachmentElement)
									//移动光标到新插入的元素
									editor.range!.anchor.moveToStart(attachmentElement)
									editor.range!.focus.moveToStart(attachmentElement)
									editor.formatElementStack()
									editor.domRender()
									;(<InstanceType<typeof Button>>instance.$parent!.$parent!.$parent!).show = false
								}
							})
					}
				}
			},
			updateView: () => {},
			customParseNode: (el: AlexElement) => {
				return el
			}
		}
		return pluginResult
	}
	return plugin
}

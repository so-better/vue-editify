import { ExtractPublicPropTypes, PropType } from 'vue'

export type InsertAttachmentUploadErrorType = 'suffixError' | 'maxSizeError' | 'minSizeError'

export const InsertAttachmentProps = {
	//主题色
	color: {
		type: String as PropType<string | null>,
		default: ''
	},
	//可选择的文件类型
	accept: {
		type: String,
		default: null
	},
	//支持的类型数组
	allowedFileType: {
		type: Array as PropType<string[]>,
		default: null
	},
	//是否支持多选
	multiple: {
		type: Boolean,
		default: false
	},
	//单个文件最大值
	maxSize: {
		type: Number,
		default: null
	},
	//单个文件最小值
	minSize: {
		type: Number,
		default: null
	},
	//是否自定义上传附件
	customUpload: {
		type: Function as PropType<((files: File[]) => string[]) | ((files: File[]) => Promise<string[]>)>,
		default: null
	},
	//处理上传附件异常
	handleError: {
		type: Function as PropType<(error: InsertAttachmentUploadErrorType, file: File) => void>,
		default: null
	}
}

export type InsertAttachmentPropsType = ExtractPublicPropTypes<typeof InsertAttachmentProps>

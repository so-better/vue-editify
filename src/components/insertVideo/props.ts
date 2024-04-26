import { ExtractPublicPropTypes, PropType } from 'vue'

export type InsertVideoUploadErrorType = 'suffixError' | 'maxSizeError' | 'minSizeError'

export const InsertVideoProps = {
	//主题色
	color: {
		type: String as PropType<string | null>,
		default: ''
	},
	//支持的视频类型数组
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
	//是否自定义上传视频
	customUpload: {
		type: Function as PropType<(files: File[]) => string[] | Promise<string[]>>,
		default: null
	},
	//处理上传视频异常
	handleError: {
		type: Function as PropType<(error: InsertVideoUploadErrorType, file: File) => void>,
		default: null
	}
}

export type InsertVideoPropsType = ExtractPublicPropTypes<typeof InsertVideoProps>

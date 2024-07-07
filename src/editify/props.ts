import { common as DapCommon } from 'dap-util'
import { ExtractPublicPropTypes, PropType } from 'vue'
import { AlexElement } from 'alex-editor'
import { PluginType, MenuConfigType, ObjectType, ToolbarConfigType } from '@/core/tool'
import { LocaleType } from '@/locale'

export type EditifyResizeParamsType = {
	element: AlexElement | null
	start: number
}

export type EditifyToolbarOptionsType = {
	show: boolean
	node: string | null
	type: 'text' | 'link' | 'image' | 'video' | 'table' | 'codeBlock'
}

export const EditifyProps = {
	//国际化语言类型
	locale: {
		type: String as PropType<LocaleType>,
		default: 'zh_CN'
	},
	//编辑器内容
	modelValue: {
		type: String,
		default: '<p><br></p>'
	},
	//占位符
	placeholder: {
		type: String,
		default: ''
	},
	//是否自动获取焦点
	autofocus: {
		type: Boolean,
		default: false
	},
	//是否禁用编辑器
	disabled: {
		type: Boolean,
		default: false
	},
	//是否允许复制
	allowCopy: {
		type: Boolean,
		default: true
	},
	//是否允许粘贴
	allowPaste: {
		type: Boolean,
		default: true
	},
	//是否允许剪切
	allowCut: {
		type: Boolean,
		default: true
	},
	//是否允许粘贴html
	allowPasteHtml: {
		type: Boolean,
		default: false
	},
	//是否显示边框
	border: {
		type: Boolean,
		default: false
	},
	//主题色
	color: {
		type: String as PropType<string | null>,
		default: '#03a8f3',
		validator(value: any) {
			return DapCommon.matchingText(value, 'hex')
		}
	},
	//视频宽高比
	videoRatio: {
		type: Number,
		default: 16 / 9
	},
	//工具条按钮设置
	toolbar: {
		type: Object as PropType<ToolbarConfigType>,
		default: null
	},
	//是否显示字数统计
	showWordLength: {
		type: Boolean,
		default: false
	},
	//自定义粘贴纯文字
	customTextPaste: {
		type: Function as PropType<(data: string) => void | Promise<void>>,
		default: null
	},
	//自定义粘贴html
	customHtmlPaste: {
		type: Function as PropType<(elements: AlexElement[]) => void | Promise<void>>,
		default: null
	},
	//自定义粘贴图片
	customImagePaste: {
		type: Function as PropType<(file: File) => void | Promise<void>>,
		default: null
	},
	//自定义粘贴视频
	customVideoPaste: {
		type: Function as PropType<(file: File) => void | Promise<void>>,
		default: null
	},
	//自定义粘贴文件
	customFilePaste: {
		type: Function as PropType<(file: File) => void | Promise<void>>,
		default: null
	},
	//菜单栏配置
	menu: {
		type: Object as PropType<MenuConfigType>,
		default: null
	},
	//粘贴html时对非文本元素额外保留标记的自定义处理
	pasteKeepMarks: {
		type: Function as PropType<(el: AlexElement) => ObjectType>,
		default: null
	},
	//粘贴html时对非文本元素额外保留样式的自定义处理
	pasteKeepStyles: {
		type: Function as PropType<(el: AlexElement) => ObjectType>,
		default: null
	},
	//自定义node转元素时的处理
	customParseNode: {
		type: Function as PropType<(el: AlexElement) => AlexElement>,
		default: null
	},
	//node转为元素时需要额外保留的标签数组
	extraKeepTags: {
		type: Array as PropType<string[]>,
		default: function () {
			return []
		}
	},
	//自定义额外的渲染规范
	renderRules: {
		type: Array as PropType<((el: AlexElement) => void)[]>,
		default: function () {
			return []
		}
	},
	//自适应高度
	autoheight: {
		type: Boolean,
		default: false
	},
	//是否使用tab快捷键
	tab: {
		type: Boolean,
		default: true
	},
	//插件数组
	plugins: {
		type: Array as PropType<PluginType[]>,
		default: function () {
			return []
		}
	},
	//是否使用深色模式
	dark: {
		type: Boolean,
		default: false
	},
	//编辑器基本z-index
	zIndex: {
		type: Number,
		default: 1
	}
}

export type EditifyPropsType = ExtractPublicPropTypes<typeof EditifyProps>

import { common as DapCommon, string as DapString, color as DapColor } from 'dap-util'
import { languages } from '../hljs'
import { AlexElement } from 'alex-editor'
import { ButtonOptionsItemType, ButtonTypeType } from '../components/button/props'
import { LocaleType } from '../locale'
import { InsertImageUploadErrorType } from '../components/insertImage/props'
import { ComponentInternalInstance, VNode } from 'vue'
import Button from '../components/button/button.vue'

export type ObjectType = {
	[key: string]: any
}

export type ButtonOptionsConfigType = {
	heading?: (string | number | ButtonOptionsItemType)[]
	indent?: (string | number | ButtonOptionsItemType)[]
	align?: (string | number | ButtonOptionsItemType)[]
	fontSize?: (string | number | ButtonOptionsItemType)[]
	fontFamily?: (string | number | ButtonOptionsItemType)[]
	lineHeight?: (string | number | ButtonOptionsItemType)[]
	foreColor?: (string | number | ButtonOptionsItemType)[]
	backColor?: (string | number | ButtonOptionsItemType)[]
}

export interface MenuButtonType {
	show?: boolean
	leftBorder?: boolean
	rightBorder?: boolean
}

export interface MenuSelectButtonType extends MenuButtonType {
	options?: (string | number | ButtonOptionsItemType)[]
	width?: number | ''
	maxHeight?: number | ''
}

export interface MenuDisplayButtonType extends MenuSelectButtonType {
	defaultValue?: string | number
}

export interface MenuImageButtonType extends MenuButtonType {
	allowedFileType?: string[]
	multiple?: boolean
	maxSize?: number | null
	minSize?: number | null
	customUpload?: (((files: File[]) => string[]) | Promise<string[]>) | null
	handleError?: ((error: InsertImageUploadErrorType, file: File) => void) | null
}

export interface MenuVideoButtonType extends MenuButtonType {
	allowedFileType?: string[]
	multiple?: boolean
	maxSize?: number | null
	minSize?: number | null
	customUpload?: (((files: File[]) => string[]) | Promise<string[]>) | null
	handleError?: ((error: InsertImageUploadErrorType, file: File) => void) | null
}

export interface MenuTableButtonType extends MenuButtonType {
	maxRows?: number
	maxColumns?: number
}

export type MenuCustomButtonType = {
	type?: ButtonTypeType
	title?: string
	leftBorder?: boolean
	rightBorder?: boolean
	disabled?: boolean
	active?: boolean
	width?: number
	maxHeight?: number
	options?: ButtonOptionsItemType[]
	value?: string | number
	hideScroll?: boolean
	onLayerShow?: (name: string, btnInstance: InstanceType<typeof Button>) => void
	onLayerShown?: (name: string, btnInstance: InstanceType<typeof Button>) => void
	onLayerHidden?: (name: string, btnInstance: InstanceType<typeof Button>) => void
	onOperate?: (name: string, value: string | number | undefined, btnInstance: InstanceType<typeof Button>) => void
	default?: (name: string, btnInstance: InstanceType<typeof Button>) => VNode
	layer?: (name: string, btnInstance: InstanceType<typeof Button>) => VNode
	option?: (name: string, btnInstance: InstanceType<typeof Button>) => VNode
}

export type CodeBlockToolbarType = {
	languages?: MenuSelectButtonType
}

export type TextToolbarType = {
	heading?: MenuDisplayButtonType
	align?: MenuSelectButtonType
	orderList?: MenuButtonType
	unorderList?: MenuButtonType
	task?: MenuButtonType
	bold?: MenuButtonType
	italic?: MenuButtonType
	strikethrough?: MenuButtonType
	underline?: MenuButtonType
	code?: MenuButtonType
	super?: MenuButtonType
	sub?: MenuButtonType
	fontSize?: MenuDisplayButtonType
	fontFamily?: MenuDisplayButtonType
	lineHeight?: MenuDisplayButtonType
	foreColor?: MenuSelectButtonType
	backColor?: MenuSelectButtonType
	formatClear?: MenuButtonType
}

export type ToolbarConfigType = {
	use?: boolean
	style?: ObjectType | null
	tooltip?: boolean
	codeBlock?: CodeBlockToolbarType
	text?: TextToolbarType
	extraDisabled?: ((name: string) => boolean) | null
}

export type MenuSequenceType = {
	[key: string]: number | undefined
	undo?: number
	redo?: number
	heading?: number
	indent?: number
	quote?: number
	align?: number
	orderList?: number
	unorderList?: number
	task?: number
	bold?: number
	underline?: number
	italic?: number
	strikethrough?: number
	code?: number
	super?: number
	sub?: number
	formatClear?: number
	fontSize?: number
	fontFamily?: number
	lineHeight?: number
	foreColor?: number
	backColor?: number
	link?: number
	image?: number
	video?: number
	table?: number
	codeBlock?: number
	sourceView?: number
	fullScreen?: number
}

export type MenuModeType = 'default' | 'inner' | 'fixed'

export type MenuExtendType = {
	[name: string]: MenuCustomButtonType
}

export type MenuConfigType = {
	use?: boolean
	tooltip?: boolean
	mode?: MenuModeType
	extraDisabled?: ((name: string) => boolean) | null
	style?: ObjectType | null
	sequence?: MenuSequenceType
	undo?: MenuButtonType
	redo?: MenuButtonType
	heading?: MenuDisplayButtonType
	indent?: MenuSelectButtonType
	quote?: MenuButtonType
	align?: MenuSelectButtonType
	orderList?: MenuButtonType
	unorderList?: MenuButtonType
	task?: MenuButtonType
	bold?: MenuButtonType
	underline?: MenuButtonType
	italic?: MenuButtonType
	strikethrough?: MenuButtonType
	code?: MenuButtonType
	super?: MenuButtonType
	sub?: MenuButtonType
	formatClear?: MenuButtonType
	fontSize?: MenuDisplayButtonType
	fontFamily?: MenuDisplayButtonType
	lineHeight?: MenuDisplayButtonType
	foreColor?: MenuSelectButtonType
	backColor?: MenuSelectButtonType
	link?: MenuButtonType
	image?: MenuImageButtonType
	video?: MenuVideoButtonType
	table?: MenuTableButtonType
	//代码块
	codeBlock?: MenuButtonType
	//代码视图
	sourceView?: MenuButtonType
	//全屏
	fullScreen?: MenuButtonType
	//拓展菜单，每个key表示拓展菜单的唯一名称，value是对象，包含type/title/rightBorder/leftBorder/disabled/active/width/maxHeight/options/value/hideScroll/onLayerShow/onLayerShown/onLayerHidden/onOperate/default/layer/option属性
	extends?: MenuExtendType
}

export type PluginResultType = {
	menu?: MenuConfigType
	updateView?: (editifyInstance: ComponentInternalInstance) => void
	customParseNode?: (element: AlexElement) => AlexElement
	renderRule?: (el: AlexElement) => void
	pasteKeepStyles?: ObjectType
	pasteKeepMarks?: ObjectType
}

export type PluginType = (editifyInstance: ComponentInternalInstance, color: string | null, editTrans: (key: string) => any) => PluginResultType

//粘贴html时保留的数据
export const pasteKeepData: ObjectType = {
	//粘贴html时元素保留的样式（全部元素）
	marks: {
		'data-editify-list': ['div'],
		'data-editify-value': ['div'],
		'data-editify-code': ['span'],
		'data-editify-task': ['div'],
		contenteditable: '*',
		src: ['img', 'video'],
		autoplay: ['video'],
		loop: ['video'],
		muted: ['video'],
		href: ['a'],
		target: ['a'],
		alt: ['img'],
		controls: ['video'],
		name: '*',
		disabled: '*',
		colspan: ['td']
	},
	//粘贴html时非文本元素保留的样式
	styles: {
		'text-indent': '*',
		'text-align': '*'
	}
}

//对象平替值方法
export const mergeObject = function (o1: ObjectType, o2: ObjectType) {
	if (!DapCommon.isObject(o1) && DapCommon.isObject(o2)) {
		return null
	}
	for (let key in o2) {
		//如果o1和o2的相同属性都是对象并且不是数组，则继续merge
		if (DapCommon.isObject(o2[key]) && !Array.isArray(o2[key]) && DapCommon.isObject(o1[key]) && !Array.isArray(o1[key])) {
			o1[key] = mergeObject(o1[key], o2[key])
		}
		//否则直接将o2的值给o1
		else {
			o1[key] = o2[key]
		}
	}
	return o1
}

//判断对象是否含有某个属性或者属性值是否一致
export const queryHasValue = function (obj: ObjectType, name: string, value?: string | number) {
	//如果value不存在则判断是否拥有属性name
	if (value == null || value == undefined) {
		return obj.hasOwnProperty(name)
	}
	//固有的值
	let ownValue = obj[name]
	//如果ownValue不存在则直接返回false
	if (ownValue == null || ownValue == undefined) {
		return false
	}
	//如果value是字符串，则先将值转为小写
	if (typeof value == 'string') {
		value = value.toLocaleLowerCase()
	}
	//如果ownValue是字符串，则先将值转为小写
	if (typeof ownValue == 'string') {
		ownValue = ownValue.toLocaleLowerCase()
	}
	//如果value是rgb或者rgba格式，则去除空格
	if (typeof value == 'string' && value && (DapCommon.matchingText(value, 'rgb') || DapCommon.matchingText(value, 'rgba'))) {
		value = DapString.trim(value, true)
	}
	//如果ownValue是rgb或者rgba格式，则去除空格
	if (typeof ownValue == 'string' && ownValue && (DapCommon.matchingText(ownValue, 'rgb') || DapCommon.matchingText(ownValue, 'rgba'))) {
		ownValue = DapString.trim(ownValue, true)
	}
	//如果是十六进制值，转为rgb值
	if (typeof value == 'string' && value && DapCommon.matchingText(value, 'hex')) {
		const arr = DapColor.hex2rgb(value)
		value = `rgb(${arr[0]},${arr[1]},${arr[2]})`
	}
	//如果是十六进制值，转为rgb值
	if (typeof ownValue == 'string' && ownValue && DapCommon.matchingText(ownValue, 'hex')) {
		const arr = DapColor.hex2rgb(ownValue)
		ownValue = `rgb(${arr[0]},${arr[1]},${arr[2]})`
	}
	return ownValue == value
}

//深拷贝函数
export const cloneData = function (data: any) {
	if (DapCommon.isObject(data) || Array.isArray(data)) {
		return JSON.parse(JSON.stringify(data))
	}
	return data
}

//根据行元素获取colgroup的col数量
export const getColNumbers = function (row: AlexElement) {
	const children = row.children || []
	let num = 0
	children.forEach(td => {
		if (td.hasMarks() && td.marks!.hasOwnProperty('colspan')) {
			const span = Number(td.marks!.colspan)
			if (!isNaN(span)) {
				num += span
			}
		} else {
			num += 1
		}
	})
	return num
}

//获取菜单按钮列表数据配置
export const getButtonOptionsConfig = function (editTrans: (key: string) => any): ButtonOptionsConfigType {
	return {
		//标题配置
		heading: [
			{
				label: editTrans('text'),
				value: 'p'
			},
			{
				label: editTrans('h1'),
				value: 'h1',
				style: {
					fontSize: '26px',
					fontWeight: 'bold'
				}
			},
			{
				label: editTrans('h2'),
				value: 'h2',
				style: {
					fontSize: '24px',
					fontWeight: 'bold'
				}
			},
			{
				label: editTrans('h3'),
				value: 'h3',
				style: {
					fontSize: '22px',
					fontWeight: 'bold'
				}
			},
			{
				label: editTrans('h4'),
				value: 'h4',
				style: {
					fontSize: '20px',
					fontWeight: 'bold'
				}
			},
			{
				label: editTrans('h5'),
				value: 'h5',
				style: {
					fontSize: '18px',
					fontWeight: 'bold'
				}
			},
			{
				label: editTrans('h6'),
				value: 'h6',
				style: {
					fontSize: '16px',
					fontWeight: 'bold'
				}
			}
		],
		//缩进配置
		indent: [
			{
				label: editTrans('indentIncrease'),
				value: 'indent-increase',
				icon: 'indent-increase'
			},
			{
				label: editTrans('indentDecrease'),
				value: 'indent-decrease',
				icon: 'indent-decrease'
			}
		],
		//对齐方式
		align: [
			{
				label: editTrans('alignLeft'),
				value: 'left',
				icon: 'align-left'
			},
			{
				label: editTrans('alignRight'),
				value: 'right',
				icon: 'align-right'
			},
			{
				label: editTrans('alignCenter'),
				value: 'center',
				icon: 'align-center'
			},
			{
				label: editTrans('alignJustify'),
				value: 'justify',
				icon: 'align-justify'
			}
		],
		//字号配置
		fontSize: [
			{
				label: editTrans('defaultSize'),
				value: ''
			},
			{
				label: '12px',
				value: '12px'
			},
			{
				label: '14px',
				value: '14px'
			},
			{
				label: '16px',
				value: '16px'
			},
			{
				label: '18px',
				value: '18px'
			},
			{
				label: '20px',
				value: '20px'
			},
			{
				label: '24px',
				value: '24px'
			},
			{
				label: '28px',
				value: '28px'
			},
			{
				label: '32px',
				value: '32px'
			},
			{
				label: '36px',
				value: '36px'
			},
			{
				label: '40px',
				value: '40px'
			}
		],
		//字体配置
		fontFamily: [
			{
				label: editTrans('defaultFontFamily'),
				value: ''
			},
			{
				label: '黑体',
				value: '黑体,黑体-简'
			},
			{
				label: '华文仿宋',
				value: '华文仿宋'
			},
			{
				label: '楷体',
				value: '楷体,楷体-简'
			},
			{
				label: '华文楷体',
				value: '华文楷体'
			},
			{
				label: '宋体',
				value: '宋体,宋体-简'
			},
			{
				label: 'Arial',
				value: 'Arial'
			},
			{
				label: 'Consolas',
				value: 'Consolas,monospace'
			}
		],
		//行高配置
		lineHeight: [
			{
				label: editTrans('defaultLineHeight'),
				value: ''
			},
			1,
			1.15,
			1.5,
			2,
			2.5,
			3
		],
		//前景色配置
		foreColor: ['#000000', '#505050', '#808080', '#BBBBBB', '#CCCCCC', '#EEEEEE', '#F7F7F7', '#FFFFFF', '#EC1A0A', '#FF9900', '#FFFF00', '#07C160', '#00FFFF', '#0B73DE', '#9C00FF', '#FF00FF', '#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE', '#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD', '#e45649', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5', '#CE0000', '#E79439', '#EFC631', '#50a14f', '#4A7B8C', '#03A8F3', '#634AA5', '#A54A7B', '#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842', '#630000', '#7B3900', '#986801', '#295218', '#083139', '#003163', '#21104A', '#4A1031'],
		//背景色配置
		backColor: ['#000000', '#505050', '#808080', '#BBBBBB', '#CCCCCC', '#EEEEEE', '#F7F7F7', '#FFFFFF', '#EC1A0A', '#FF9900', '#FFFF00', '#07C160', '#00FFFF', '#0B73DE', '#9C00FF', '#FF00FF', '#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE', '#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD', '#e45649', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5', '#CE0000', '#E79439', '#EFC631', '#50a14f', '#4A7B8C', '#03A8F3', '#634AA5', '#A54A7B', '#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842', '#630000', '#7B3900', '#986801', '#295218', '#083139', '#003163', '#21104A', '#4A1031']
	}
}

//工具条全量配置
export const getToolbarConfig = function (editTrans: (key: string) => any, editLocale: LocaleType): ToolbarConfigType {
	return {
		//是否使用工具条
		use: true,
		// 工具条的样式设置
		style: null,
		// 是否使用工具提示
		tooltip: true,
		// 代码块工具条配置
		codeBlock: {
			//语言列表
			languages: {
				//是否显示此工具
				show: true,
				//列表配置
				options: [
					{
						label: editTrans('autoRecognize'),
						value: ''
					},
					...languages
				],
				//浮层宽度
				width: 120,
				//浮层最大高度
				maxHeight: 180,
				//左侧边框是否显示
				leftBorder: true,
				//右侧边框是否显示
				rightBorder: false
			}
		},
		//文本工具条配置
		text: {
			//标题
			heading: {
				//是否显示此工具
				show: true,
				//列表配置
				options: getButtonOptionsConfig(editTrans).heading,
				//按钮默认显示的值
				defaultValue: 'p',
				//浮层宽度
				width: editLocale == 'en_US' ? 150 : 130,
				//浮层最大高度
				maxHeight: '',
				//左侧边框是否显示
				leftBorder: false,
				//右侧边框是否显示
				rightBorder: true
			},
			//对齐方式
			align: {
				//是否显示此工具
				show: false,
				//列表配置
				options: getButtonOptionsConfig(editTrans).align,
				//浮层宽度
				width: editLocale == 'zh_CN' ? 110 : 130,
				//浮层最大高度
				maxHeight: '',
				//左侧边框是否显示
				leftBorder: false,
				//右侧边框是否显示
				rightBorder: false
			},
			//有序列表
			orderList: {
				//是否显示此工具
				show: false,
				//左侧边框是否显示
				leftBorder: false,
				//右侧边框是否显示
				rightBorder: false
			},
			//无序列表
			unorderList: {
				//是否显示此工具
				show: false,
				//左侧边框是否显示
				leftBorder: false,
				//右侧边框是否显示
				rightBorder: false
			},
			//任务列表
			task: {
				//是否显示此工具
				show: false,
				//左侧边框是否显示
				leftBorder: false,
				//右侧边框是否显示
				rightBorder: false
			},
			//粗体
			bold: {
				//是否显示此工具
				show: true,
				//左侧边框是否显示
				leftBorder: false,
				//右侧边框是否显示
				rightBorder: false
			},
			//斜体
			italic: {
				//是否显示此工具
				show: true,
				//左侧边框是否显示
				leftBorder: false,
				//右侧边框是否显示
				rightBorder: false
			},
			//删除线
			strikethrough: {
				//是否显示此工具
				show: true,
				//左侧边框是否显示
				leftBorder: false,
				//右侧边框是否显示
				rightBorder: false
			},
			//下划线
			underline: {
				//是否显示此工具
				show: true,
				//左侧边框是否显示
				leftBorder: false,
				//右侧边框是否显示
				rightBorder: false
			},
			//行内代码
			code: {
				//是否显示此工具
				show: true,
				//左侧边框是否显示
				leftBorder: false,
				//右侧边框是否显示
				rightBorder: false
			},
			//上标
			super: {
				//是否显示此工具
				show: false,
				//左侧边框是否显示
				leftBorder: false,
				//右侧边框是否显示
				rightBorder: false
			},
			//下标
			sub: {
				//是否显示此工具
				show: false,
				//左侧边框是否显示
				leftBorder: false,
				//右侧边框是否显示
				rightBorder: false
			},
			//字号
			fontSize: {
				//是否显示此工具
				show: true,
				//列表配置
				options: getButtonOptionsConfig(editTrans).fontSize,
				//按钮默认显示的值
				defaultValue: '',
				//浮层宽度
				width: 100,
				//浮层最大高度
				maxHeight: 200,
				//左侧边框是否显示
				leftBorder: true,
				//右侧边框是否显示
				rightBorder: false
			},
			//字体
			fontFamily: {
				//是否显示此工具
				show: false,
				//列表配置
				options: getButtonOptionsConfig(editTrans).fontFamily,
				//按钮默认显示的值
				defaultValue: '',
				//浮层宽度
				width: 100,
				//浮层最大高度
				maxHeight: 200,
				//左侧边框是否显示
				leftBorder: false,
				//右侧边框是否显示
				rightBorder: false
			},
			//行高
			lineHeight: {
				//是否显示此工具
				show: false,
				//列表配置
				options: getButtonOptionsConfig(editTrans).lineHeight,
				//按钮默认显示的值
				defaultValue: '',
				//浮层宽度
				width: 90,
				//浮层最大高度
				maxHeight: '',
				//左侧边框是否显示
				leftBorder: false,
				//右侧边框是否显示
				rightBorder: false
			},
			//前景色
			foreColor: {
				//是否显示此工具
				show: true,
				//列表配置
				options: getButtonOptionsConfig(editTrans).foreColor,
				//左侧边框是否显示
				leftBorder: false,
				//右侧边框是否显示
				rightBorder: false
			},
			//背景色
			backColor: {
				//是否显示此工具
				show: true,
				//列表配置
				options: getButtonOptionsConfig(editTrans).backColor,
				//左侧边框是否显示
				leftBorder: false,
				//右侧边框是否显示
				rightBorder: false
			},
			//清除格式
			formatClear: {
				//是否显示此工具
				show: true,
				//左侧边框是否显示
				leftBorder: true,
				//右侧边框是否显示
				rightBorder: false
			}
		},
		//（只对文本工具条中的按钮生效）添加额外的按钮禁用判定，回调参数为name，this指向组件实例
		extraDisabled: null
	}
}

//菜单栏全量配置
export const getMenuConfig = function (editTrans: (key: string) => any, editLocale: LocaleType): MenuConfigType {
	return {
		//是否使用菜单栏
		use: true,
		//是否使用工具提示
		tooltip: true,
		//菜单栏显示模式，支持default/inner/fixed
		mode: 'default',
		//添加额外的按钮禁用判定，回调参数为name，this指向组件实例
		extraDisabled: null,
		//菜单栏的样式自定义
		style: null,
		//菜单排序
		sequence: {
			undo: 0,
			redo: 1,
			heading: 2,
			indent: 3,
			quote: 4,
			align: 5,
			orderList: 6,
			unorderList: 7,
			task: 8,
			bold: 9,
			underline: 10,
			italic: 11,
			strikethrough: 12,
			code: 13,
			super: 14,
			sub: 15,
			formatClear: 16,
			fontSize: 17,
			fontFamily: 18,
			lineHeight: 19,
			foreColor: 20,
			backColor: 21,
			link: 22,
			image: 23,
			video: 24,
			table: 25,
			codeBlock: 26,
			sourceView: 27,
			fullScreen: 28
		},
		//撤销按钮配置
		undo: {
			//是否显示此按钮
			show: true,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false
		},
		//重做按钮配置
		redo: {
			//是否显示此按钮
			show: true,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false
		},
		//标题
		heading: {
			//是否显示此按钮
			show: true,
			//列表配置
			options: getButtonOptionsConfig(editTrans).heading,
			//按钮默认显示的值
			defaultValue: 'p',
			//浮层宽度
			width: editLocale == 'en_US' ? 150 : 130,
			//浮层最大高度
			maxHeight: '',
			//左侧边框是否显示
			leftBorder: true,
			//右侧边框是否显示
			rightBorder: false
		},
		//缩进
		indent: {
			//是否显示此工具
			show: true,
			//列表配置
			options: getButtonOptionsConfig(editTrans).indent,
			//浮层宽度
			width: editLocale == 'en_US' ? 150 : 110,
			//浮层最大高度
			maxHeight: '',
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false
		},
		//引用按钮配置
		quote: {
			//是否显示此按钮
			show: true,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false
		},
		//对齐方式
		align: {
			//是否显示此工具
			show: true,
			//列表配置
			options: getButtonOptionsConfig(editTrans).align,
			//浮层宽度
			width: editLocale == 'zh_CN' ? 110 : 130,
			//浮层最大高度
			maxHeight: '',
			//左侧边框是否显示
			leftBorder: true,
			//右侧边框是否显示
			rightBorder: false
		},
		//有序列表按钮配置
		orderList: {
			//是否显示此按钮
			show: true,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false
		},
		//无序列表按钮配置
		unorderList: {
			//是否显示此按钮
			show: true,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false
		},
		//任务列表按钮配置
		task: {
			//是否显示此按钮
			show: true,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false
		},
		//粗体按钮配置
		bold: {
			//是否显示此按钮
			show: true,
			//左侧边框是否显示
			leftBorder: true,
			//右侧边框是否显示
			rightBorder: false
		},
		//下划线按钮配置
		underline: {
			//是否显示此按钮
			show: true,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false
		},
		//斜体按钮配置
		italic: {
			//是否显示此按钮
			show: true,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false
		},
		//删除线按钮配置
		strikethrough: {
			//是否显示此按钮
			show: true,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false
		},
		//行内代码按钮配置
		code: {
			//是否显示此按钮
			show: true,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false
		},
		//上标
		super: {
			//是否显示此工具
			show: true,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false
		},
		//下标
		sub: {
			//是否显示此工具
			show: true,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false
		},
		//清除格式
		formatClear: {
			//是否显示此工具
			show: true,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false
		},
		//字号
		fontSize: {
			//是否显示此工具
			show: true,
			//列表配置
			options: getButtonOptionsConfig(editTrans).fontSize,
			//按钮默认显示的值
			defaultValue: '',
			//浮层宽度
			width: 100,
			//浮层最大高度
			maxHeight: 200,
			//左侧边框是否显示
			leftBorder: true,
			//右侧边框是否显示
			rightBorder: false
		},
		//字体
		fontFamily: {
			//是否显示此工具
			show: true,
			//列表配置
			options: getButtonOptionsConfig(editTrans).fontFamily,
			//按钮默认显示的值
			defaultValue: '',
			//浮层宽度
			width: 100,
			//浮层最大高度
			maxHeight: 200,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false
		},
		//行高
		lineHeight: {
			//是否显示此工具
			show: true,
			//列表配置
			options: getButtonOptionsConfig(editTrans).lineHeight,
			//按钮默认显示的值
			defaultValue: '',
			//浮层宽度
			width: 90,
			//浮层最大高度
			maxHeight: '',
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false
		},
		//前景色
		foreColor: {
			//是否显示此工具
			show: true,
			//列表配置
			options: getButtonOptionsConfig(editTrans).foreColor,
			//左侧边框是否显示
			leftBorder: true,
			//右侧边框是否显示
			rightBorder: false
		},
		//背景色
		backColor: {
			//是否显示此工具
			show: true,
			//列表配置
			options: getButtonOptionsConfig(editTrans).backColor,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false
		},
		//链接
		link: {
			//是否显示此工具
			show: true,
			//左侧边框是否显示
			leftBorder: true,
			//右侧边框是否显示
			rightBorder: false
		},
		//图片
		image: {
			//是否显示此工具
			show: true,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false,
			//图片支持上传的类型，不区分大小写
			allowedFileType: ['jpg', 'png', 'jpeg', 'webp', 'jfif', 'ico', 'gif', 'svg', 'psd'],
			//是否多选图片
			multiple: false,
			//单张图片的最大值，单位kb
			maxSize: null,
			//单张图片的最小值，单位kb
			minSize: null,
			//自定义上传图片
			customUpload: null,
			//异常处理函数
			handleError: null
		},
		//视频
		video: {
			//是否显示此工具
			show: true,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false,
			//视频支持上传的类型，不区分大小写
			allowedFileType: ['mp4', 'avi', 'mpg', 'wmv', 'mov', 'rm', 'swf', 'flv'],
			//是否多选视频
			multiple: false,
			//单个视频的的最大值，单位kb
			maxSize: null,
			//单个视频的最小值，单位kb
			minSize: null,
			//自定义上传视频
			customUpload: null,
			//异常处理函数
			handleError: null
		},
		//表格
		table: {
			//是否显示此工具
			show: true,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false,
			//创建时表格的最大行数
			maxRows: 10,
			//创建时表格的最大列数
			maxColumns: 10
		},
		//代码块
		codeBlock: {
			//是否显示此工具
			show: true,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false
		},
		//代码视图
		sourceView: {
			//是否显示此工具
			show: false,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false
		},
		//全屏
		fullScreen: {
			//是否显示此工具
			show: false,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false
		},
		//拓展菜单，每个key表示拓展菜单的唯一名称，value是对象，包含type/title/rightBorder/leftBorder/disabled/active/width/maxHeight/options/value/hideScroll/onLayerShow/onLayerShown/onLayerHidden/onOperate/default/layer/option属性
		extends: {}
	}
}

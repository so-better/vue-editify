import { App, Component, Ref, VNode } from 'vue'
import { AlexEditor, AlexElementsRangeType } from 'alex-editor'
import { common as DapCommon, string as DapString, color as DapColor, element as DapElement } from 'dap-util'
import { languages } from '@/hljs'
import { LocaleType } from '@/locale'
import { Button, ButtonOptionsItemType, ButtonTypeType } from '@/components/button'
import { InsertImageUploadErrorType } from '@/components/insertImage'
import { InsertAttachmentUploadErrorType } from '@/components/insertAttachment'
import { config as shortcutConfig } from './shortcut'

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

export type ShortcutType = {
	title: string
	define: ((event: KeyboardEvent) => boolean | { [code: string]: boolean }) | null
	operation?: (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, isSourceView: Ref<boolean>, isFullScreen: Ref<boolean>, code?: string) => void
}

export interface MenuButtonType {
	show?: boolean
	leftBorder?: boolean
	rightBorder?: boolean
	disabled?: boolean
	shortcut?: ShortcutType
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
	maxSize?: number
	minSize?: number
	customUpload?: ((files: File[]) => string[]) | ((files: File[]) => Promise<string[]>)
	handleError?: (error: InsertImageUploadErrorType, file: File) => void
}

export interface MenuVideoButtonType extends MenuButtonType {
	allowedFileType?: string[]
	multiple?: boolean
	maxSize?: number
	minSize?: number
	customUpload?: ((files: File[]) => string[]) | ((files: File[]) => Promise<string[]>)
	handleError?: (error: InsertImageUploadErrorType, file: File) => void
}

export interface MenuTableButtonType extends MenuButtonType {
	maxRows?: number
	maxColumns?: number
}

export interface MenuAttachmentButtonType extends MenuButtonType {
	accept?: string
	allowedFileType?: string[]
	multiple?: boolean
	maxSize?: number
	minSize?: number
	customUpload?: ((files: File[]) => string[]) | ((files: File[]) => Promise<string[]>)
	//处理上传附件异常
	handleError?: (error: InsertAttachmentUploadErrorType, file: File) => void
}

export interface MenuMathformulaButtonType extends MenuButtonType {
	handleError?: (error: Error) => void
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
	shortcut?: ShortcutType
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
	bold?: MenuButtonType
	italic?: MenuButtonType
	strikethrough?: MenuButtonType
	underline?: MenuButtonType
	code?: MenuButtonType
	super?: MenuButtonType
	sub?: MenuButtonType
	fontSize?: MenuDisplayButtonType
	fontFamily?: MenuDisplayButtonType
	foreColor?: MenuSelectButtonType
	backColor?: MenuSelectButtonType
	formatClear?: MenuButtonType
}

export type ToolbarConfigType = {
	use?: boolean
	style?: ObjectType
	tooltip?: boolean
	codeBlock?: CodeBlockToolbarType
	text?: TextToolbarType
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
	attachment?: number
	mathformula?: number
	infoBlock?: number
}

export type MenuModeType = 'default' | 'inner' | 'fixed'

export type MenuExtendType = {
	[name: string]: MenuCustomButtonType
}

export type MenuConfigType = {
	use?: boolean
	tooltip?: boolean
	mode?: MenuModeType
	style?: ObjectType
	sequence?: MenuSequenceType
	undo?: MenuButtonType
	redo?: MenuButtonType
	heading?: MenuDisplayButtonType
	indent?: MenuSelectButtonType
	quote?: MenuButtonType
	separator?: MenuButtonType
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
	codeBlock?: MenuButtonType
	sourceView?: MenuButtonType
	fullScreen?: MenuButtonType
	attachment?: MenuAttachmentButtonType
	mathformula?: MenuMathformulaButtonType
	infoBlock?: MenuButtonType
	extends?: MenuExtendType
}

export type SFCWithInstall<T> = T & { install(app: App): void }

/**
 * 对象平替值方法
 * @param o1
 * @param o2
 * @returns
 */
export const mergeObject = (o1: ObjectType, o2: ObjectType) => {
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

/**
 * 判断对象是否含有某个属性或者属性值是否一致
 * @param obj
 * @param name
 * @param value
 * @returns
 */
export const queryHasValue = (obj: ObjectType, name: string, value?: string | number) => {
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

/**
 * 获取菜单按钮列表数据配置
 * @param editTrans
 * @returns
 */
export const getButtonOptionsConfig = (editTrans: (key: string) => any): ButtonOptionsConfigType => {
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

/**
 * 工具条全量配置
 * @param editTrans
 * @param editLocale
 * @returns
 */
export const getToolbarConfig = (editTrans: (key: string) => any): ToolbarConfigType => {
	return {
		//是否使用工具条
		use: true,
		// 工具条的样式设置
		style: undefined,
		// 是否使用工具提示
		tooltip: true,
		// 代码块工具条配置
		codeBlock: {
			//语言列表
			languages: {
				//是否显示此工具
				show: true,
				//是否禁用此工具
				disabled: false,
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
			//粗体
			bold: {
				//是否显示此工具
				show: true,
				//是否禁用此工具
				disabled: false,
				//左侧边框是否显示
				leftBorder: false,
				//右侧边框是否显示
				rightBorder: false
			},
			//斜体
			italic: {
				//是否显示此工具
				show: true,
				//是否禁用此工具
				disabled: false,
				//左侧边框是否显示
				leftBorder: false,
				//右侧边框是否显示
				rightBorder: false
			},
			//删除线
			strikethrough: {
				//是否显示此工具
				show: true,
				//是否禁用此工具
				disabled: false,
				//左侧边框是否显示
				leftBorder: false,
				//右侧边框是否显示
				rightBorder: false
			},
			//下划线
			underline: {
				//是否显示此工具
				show: true,
				//是否禁用此工具
				disabled: false,
				//左侧边框是否显示
				leftBorder: false,
				//右侧边框是否显示
				rightBorder: false
			},
			//行内代码
			code: {
				//是否显示此工具
				show: false,
				//是否禁用此工具
				disabled: false,
				//左侧边框是否显示
				leftBorder: false,
				//右侧边框是否显示
				rightBorder: false
			},
			//上标
			super: {
				//是否显示此工具
				show: false,
				//是否禁用此工具
				disabled: false,
				//左侧边框是否显示
				leftBorder: false,
				//右侧边框是否显示
				rightBorder: false
			},
			//下标
			sub: {
				//是否显示此工具
				show: false,
				//是否禁用此工具
				disabled: false,
				//左侧边框是否显示
				leftBorder: false,
				//右侧边框是否显示
				rightBorder: false
			},
			//字号
			fontSize: {
				//是否显示此工具
				show: true,
				//是否禁用此工具
				disabled: false,
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
				//是否禁用此工具
				disabled: false,
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
			//前景色
			foreColor: {
				//是否显示此工具
				show: true,
				//是否禁用此工具
				disabled: false,
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
				//是否禁用此工具
				disabled: false,
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
				//是否禁用此工具
				disabled: false,
				//左侧边框是否显示
				leftBorder: true,
				//右侧边框是否显示
				rightBorder: false
			}
		}
	}
}

/**
 * 菜单栏全量配置
 * @param editTrans
 * @param editLocale
 * @returns
 */
export const getMenuConfig = (editTrans: (key: string) => any, editLocale: LocaleType): MenuConfigType => {
	return {
		//是否使用菜单栏
		use: true,
		//是否使用工具提示
		tooltip: true,
		//菜单栏显示模式，支持default/inner/fixed
		mode: 'default',
		//菜单栏的样式自定义
		style: undefined,
		//菜单排序
		sequence: {
			undo: 0,
			redo: 1,
			heading: 2,
			indent: 3,
			quote: 4,
			separator: 5,
			align: 6,
			orderList: 7,
			unorderList: 8,
			task: 9,
			bold: 10,
			underline: 11,
			italic: 12,
			strikethrough: 13,
			code: 14,
			super: 15,
			sub: 16,
			formatClear: 17,
			fontSize: 18,
			fontFamily: 19,
			lineHeight: 20,
			foreColor: 21,
			backColor: 22,
			link: 23,
			image: 24,
			video: 25,
			table: 26,
			codeBlock: 27,
			attachment: 28,
			mathformula: 29,
			infoBlock: 30,
			sourceView: 31,
			fullScreen: 32
		},
		//撤销按钮配置
		undo: {
			//是否显示此按钮
			show: true,
			//是否禁用此按钮
			disabled: false,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false
		},
		//重做按钮配置
		redo: {
			//是否显示此按钮
			show: true,
			//是否禁用此按钮
			disabled: false,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false
		},
		//标题
		heading: {
			//是否显示此按钮
			show: true,
			//是否禁用此按钮
			disabled: false,
			//列表配置
			options: getButtonOptionsConfig(editTrans).heading,
			//按钮默认显示的值
			defaultValue: 'p',
			//浮层宽度
			width: editLocale == 'zh_CN' ? 130 : 150,
			//浮层最大高度
			maxHeight: '',
			//左侧边框是否显示
			leftBorder: true,
			//右侧边框是否显示
			rightBorder: false,
			//快捷键
			shortcut: shortcutConfig.heading
		},
		//缩进
		indent: {
			//是否显示此按钮
			show: true,
			//是否禁用此按钮
			disabled: false,
			//列表配置
			options: getButtonOptionsConfig(editTrans).indent,
			//浮层宽度
			width: editLocale == 'zh_CN' ? 110 : 150,
			//浮层最大高度
			maxHeight: '',
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false,
			//快捷键
			shortcut: shortcutConfig.indent
		},
		//引用
		quote: {
			//是否显示此按钮
			show: true,
			//是否禁用此按钮
			disabled: false,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false,
			//快捷键
			shortcut: shortcutConfig.quote
		},
		//分隔线
		separator: {
			//是否显示此按钮
			show: true,
			//是否禁用此按钮
			disabled: false,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false,
			//快捷键
			shortcut: shortcutConfig.separator
		},
		//对齐方式
		align: {
			//是否显示此按钮
			show: true,
			//是否禁用此按钮
			disabled: false,
			//列表配置
			options: getButtonOptionsConfig(editTrans).align,
			//浮层宽度
			width: editLocale == 'zh_CN' ? 110 : 130,
			//浮层最大高度
			maxHeight: '',
			//左侧边框是否显示
			leftBorder: true,
			//右侧边框是否显示
			rightBorder: false,
			//快捷键
			shortcut: shortcutConfig.align
		},
		//有序列表
		orderList: {
			//是否显示此按钮
			show: true,
			//是否禁用此按钮
			disabled: false,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false,
			//快捷键
			shortcut: shortcutConfig.orderList
		},
		//无序列表
		unorderList: {
			//是否显示此按钮
			show: true,
			//是否禁用此按钮
			disabled: false,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false,
			//快捷键
			shortcut: shortcutConfig.unorderList
		},
		//任务列表
		task: {
			//是否显示此按钮
			show: true,
			//是否禁用此按钮
			disabled: false,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false,
			//快捷键
			shortcut: shortcutConfig.task
		},
		//粗体
		bold: {
			//是否显示此按钮
			show: true,
			//是否禁用此按钮
			disabled: false,
			//左侧边框是否显示
			leftBorder: true,
			//右侧边框是否显示
			rightBorder: false,
			//快捷键
			shortcut: shortcutConfig.bold
		},
		//下划线
		underline: {
			//是否显示此按钮
			show: true,
			//是否禁用此按钮
			disabled: false,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false,
			//快捷键
			shortcut: shortcutConfig.underline
		},
		//斜体
		italic: {
			//是否显示此按钮
			show: true,
			//是否禁用此按钮
			disabled: false,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false,
			//快捷键
			shortcut: shortcutConfig.italic
		},
		//删除线
		strikethrough: {
			//是否显示此按钮
			show: true,
			//是否禁用此按钮
			disabled: false,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false,
			//快捷键
			shortcut: shortcutConfig.strikethrough
		},
		//行内代码
		code: {
			//是否显示此按钮
			show: true,
			//是否禁用此按钮
			disabled: false,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false,
			//快捷键
			shortcut: shortcutConfig.code
		},
		//上标
		super: {
			//是否显示此按钮
			show: true,
			//是否禁用此按钮
			disabled: false,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false,
			//快捷键
			shortcut: shortcutConfig.super
		},
		//下标
		sub: {
			//是否显示此按钮
			show: true,
			//是否禁用此按钮
			disabled: false,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false,
			//快捷键
			shortcut: shortcutConfig.sub
		},
		//清除格式
		formatClear: {
			//是否显示此按钮
			show: true,
			//是否禁用此按钮
			disabled: false,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false,
			//快捷键
			shortcut: shortcutConfig.formatClear
		},
		//字号
		fontSize: {
			//是否显示此按钮
			show: true,
			//是否禁用此按钮
			disabled: false,
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
			rightBorder: false,
			//快捷键
			shortcut: shortcutConfig.fontSize
		},
		//字体
		fontFamily: {
			//是否显示此按钮
			show: true,
			//是否禁用此按钮
			disabled: false,
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
			rightBorder: false,
			//快捷键
			shortcut: shortcutConfig.fontFamily
		},
		//行高
		lineHeight: {
			//是否显示此按钮
			show: true,
			//是否禁用此按钮
			disabled: false,
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
			rightBorder: false,
			//快捷键
			shortcut: shortcutConfig.lineHeight
		},
		//前景色
		foreColor: {
			//是否显示此按钮
			show: true,
			//是否禁用此按钮
			disabled: false,
			//列表配置
			options: getButtonOptionsConfig(editTrans).foreColor,
			//左侧边框是否显示
			leftBorder: true,
			//右侧边框是否显示
			rightBorder: false,
			//快捷键
			shortcut: shortcutConfig.foreColor
		},
		//背景色
		backColor: {
			//是否显示此按钮
			show: true,
			//是否禁用此按钮
			disabled: false,
			//列表配置
			options: getButtonOptionsConfig(editTrans).backColor,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false,
			//快捷键
			shortcut: shortcutConfig.backColor
		},
		//链接
		link: {
			//是否显示此按钮
			show: true,
			//是否禁用此按钮
			disabled: false,
			//左侧边框是否显示
			leftBorder: true,
			//右侧边框是否显示
			rightBorder: false,
			//快捷键
			shortcut: shortcutConfig.link
		},
		//图片
		image: {
			//是否显示此按钮
			show: true,
			//是否禁用此按钮
			disabled: false,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false,
			//图片支持上传的类型，不区分大小写
			allowedFileType: ['jpg', 'png', 'jpeg', 'webp', 'jfif', 'ico', 'gif', 'svg', 'psd'],
			//是否多选图片
			multiple: false,
			//单张图片的最大值，单位kb
			maxSize: undefined,
			//单张图片的最小值，单位kb
			minSize: undefined,
			//自定义上传图片
			customUpload: undefined,
			//异常处理函数
			handleError: undefined,
			//快捷键
			shortcut: shortcutConfig.image
		},
		//视频
		video: {
			//是否显示此按钮
			show: true,
			//是否禁用此按钮
			disabled: false,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false,
			//视频支持上传的类型，不区分大小写
			allowedFileType: ['mp4', 'avi', 'mpg', 'wmv', 'mov', 'rm', 'swf', 'flv'],
			//是否多选视频
			multiple: false,
			//单个视频的的最大值，单位kb
			maxSize: undefined,
			//单个视频的最小值，单位kb
			minSize: undefined,
			//自定义上传视频
			customUpload: undefined,
			//异常处理函数
			handleError: undefined,
			//快捷键
			shortcut: shortcutConfig.video
		},
		//表格
		table: {
			//是否显示此按钮
			show: true,
			//是否禁用此按钮
			disabled: false,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false,
			//创建时表格的最大行数
			maxRows: 10,
			//创建时表格的最大列数
			maxColumns: 10,
			//快捷键
			shortcut: shortcutConfig.table
		},
		//代码块
		codeBlock: {
			//是否显示此按钮
			show: true,
			//是否禁用此按钮
			disabled: false,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false,
			//快捷键
			shortcut: shortcutConfig.codeBlock
		},
		//代码视图
		sourceView: {
			//是否显示此按钮
			show: false,
			//是否禁用此按钮
			disabled: false,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false,
			//快捷键
			shortcut: shortcutConfig.sourceView
		},
		//全屏
		fullScreen: {
			//是否显示此按钮
			show: false,
			//是否禁用此按钮
			disabled: false,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false,
			//快捷键
			shortcut: shortcutConfig.fullScreen
		},
		//附件
		attachment: {
			//是否显示此按钮
			show: false,
			//是否禁用此按钮
			disabled: false,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false,
			//可选择的附件类型，默认不限制类型，设定此参数后选择文件时会自动过滤非符合的文件类型
			accept: '',
			//附件支持上传的类型，不区分大小写
			allowedFileType: [],
			//是否多选附件
			multiple: false,
			//单个附件的的最大值，单位kb
			maxSize: undefined,
			//单个附件的最小值，单位kb
			minSize: undefined,
			//自定义上传附件
			customUpload: undefined,
			//异常处理函数
			handleError: undefined,
			//快捷键
			shortcut: shortcutConfig.attachment
		},
		//数学公式
		mathformula: {
			//是否显示此按钮
			show: false,
			//是否禁用此按钮
			disabled: false,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false,
			//异常处理函数
			handleError: undefined,
			//快捷键
			shortcut: shortcutConfig.mathformula
		},
		//信息块
		infoBlock: {
			//是否显示此按钮
			show: false,
			//是否禁用此按钮
			disabled: false,
			//左侧边框是否显示
			leftBorder: false,
			//右侧边框是否显示
			rightBorder: false,
			//快捷键
			shortcut: shortcutConfig.infoBlock
		},
		//拓展菜单
		extends: {}
	}
}

/**
 * 给组件增加install属性
 * @param component
 * @returns
 */
export const withInstall = <T extends Component>(component: T) => {
	;(component as SFCWithInstall<T>).install = (app: App) => {
		app.component(component.name!, component)
	}
	return component as SFCWithInstall<typeof component>
}

/**
 * 是否点击了编辑器以外的元素
 * @param editor
 * @param el
 * @returns
 */
export const clickIsOut = (editor: HTMLElement, el: HTMLElement) => {
	if (DapElement.isContains(editor, el)) {
		return false
	}
	const hasClass = (elm: HTMLElement): boolean => {
		const flag = Array.from(elm.classList).some(cls => cls == 'editify-layer')
		if (flag) {
			return true
		}
		if (!elm.parentElement) {
			return false
		}
		return hasClass(elm.parentElement)
	}
	if (hasClass(el)) {
		return false
	}
	return true
}

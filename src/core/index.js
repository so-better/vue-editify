import { AlexElement } from 'alex-editor'
import { getHljsHtml, languages } from '../hljs'
import Dap from 'dap-util'

//粘贴html时保留的数据
export const pasteKeepData = {
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

//编辑器props属性
export const editorProps = {
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
	//编辑内容高度
	height: {
		type: String,
		default: '600px'
	},
	//是否自适应高度
	autoheight: {
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
		type: String,
		default: '#03a8f3',
		validator(value) {
			return Dap.common.matchingText(value, 'hex')
		}
	},
	//视频宽高比
	videoRatio: {
		type: Number,
		default: 16 / 9
	},
	//工具条按钮设置
	toolbar: {
		type: Object,
		default: null
	},
	//是否显示字数统计
	showWordLength: {
		type: Boolean,
		default: false
	},
	//自定义粘贴图片
	customImagePaste: {
		type: Function,
		default: null
	},
	//自定义粘贴视频
	customVideoPaste: {
		type: Function,
		default: null
	},
	//菜单栏配置
	menu: {
		type: Object,
		default: null
	}
}

//获取colgroup的col数量
export const getColNumbers = row => {
	const children = row?.children || []
	let num = 0
	children.forEach(td => {
		if (td.hasMarks() && td.marks.hasOwnProperty('colspan')) {
			const span = Number(td.marks.colspan)
			if (!isNaN(span)) {
				num += span
			}
		} else {
			num += 1
		}
	})
	return num
}

//对象平替值方法
export const mergeObject = (o1, o2) => {
	if (!Dap.common.isObject(o1) && Dap.common.isObject(o2)) {
		return null
	}
	for (let key in o2) {
		//如果o1和o2的相同属性都是对象并且不是数组，则继续merge
		if (Dap.common.isObject(o2[key]) && !Array.isArray(o2[key]) && Dap.common.isObject(o1[key]) && !Array.isArray(o1[key])) {
			o1[key] = mergeObject(o1[key], o2[key])
		}
		//否则直接将o2的值给o1
		else {
			o1[key] = o2[key]
		}
	}
	return o1
}

//判断是否列表
export const blockIsList = (element, ordered = false) => {
	return element.type == 'block' && element.parsedom == 'div' && element.hasMarks() && element.marks['data-editify-list'] == (ordered ? 'ol' : 'ul')
}

//判断是否任务列表
export const blockIsTask = element => {
	return element.type == 'block' && element.parsedom == 'div' && element.hasMarks() && element.marks.hasOwnProperty('data-editify-task')
}

//将某个块元素转为段落
export const blockToParagraph = element => {
	element.marks = null
	element.styles = null
	element.parsedom = AlexElement.BLOCK_NODE
}

//其他元素转为列表
export const blockToList = (element, ordered = false) => {
	//如果是列表则返回
	if (blockIsList(element, ordered)) {
		return
	}
	//先转为段落
	blockToParagraph(element)
	//然后转为列表
	element.parsedom = 'div'
	if (!element.hasMarks()) {
		element.marks = {}
	}
	element.marks['data-editify-list'] = ordered ? 'ol' : 'ul'
}

//其他元素转为任务列表
export const blockToTask = element => {
	//如果是任务列表则返回
	if (blockIsTask(element)) {
		return
	}
	//先转为段落
	blockToParagraph(element)
	//然后转为任务列表
	element.parsedom = 'div'
	if (!element.hasMarks()) {
		element.marks = {}
	}
	element.marks['data-editify-task'] = 'uncheck'
}

//元素格式化时转换ol和li标签
export const parseList = function (element) {
	//ol标签和ul标签转为div
	if (element.parsedom == 'ol' || element.parsedom == 'ul') {
		if (element.hasChildren()) {
			element.children.forEach((el, index) => {
				const newEl = el.clone()
				newEl.parsedom = 'div'
				newEl.type = 'block'
				if (!newEl.hasMarks()) {
					newEl.marks = {}
				}
				newEl.marks['data-editify-list'] = element.parsedom
				if (element.parsedom == 'ol') {
					newEl.marks['data-editify-value'] = index + 1
				}
				//插入到该元素之后
				this.addElementAfter(newEl, element)
			})
		}
		element.toEmpty()
	}
	//有序列表的序号处理
	if (element.type == 'block' && element.hasMarks() && element.marks['data-editify-list'] == 'ol') {
		//获取前一个元素
		const previousElement = this.getPreviousElement(element)
		//如果前一个元素存在并且也是有序列表
		if (previousElement && previousElement.hasMarks() && previousElement.marks['data-editify-list'] == 'ol') {
			const previousValue = Number(previousElement.marks['data-editify-value'])
			element.marks['data-editify-value'] = previousValue + 1
		}
		//前一个元素不是有序列表，则从0开始
		else {
			element.marks['data-editify-value'] = 1
		}
	}
}

//元素格式化时转换code标签
export const parseCode = function (element) {
	if (element.parsedom == 'code') {
		element.parsedom = 'span'
		const marks = {
			'data-editify-code': true
		}
		if (element.hasMarks()) {
			Object.assign(element.marks, marks)
		} else {
			element.marks = marks
		}
	}
}

//元素格式化时处理媒体元素和链接
export const mediaHandle = function (element) {
	//图片、视频和链接设置marks
	if (element.parsedom == 'img' || element.parsedom == 'video' || element.parsedom == 'a') {
		const marks = {
			'data-editify-element': element.key
		}
		if (element.hasMarks()) {
			Object.assign(element.marks, marks)
		} else {
			element.marks = marks
		}
	}

	//视频的特殊处理，两侧无元素时在两侧加上空白文本
	if (element.parsedom == 'video') {
		const previousElement = this.getPreviousElement(element)
		const newTextElement = this.getNextElement(element)
		//如果不存在前一个元素
		if (!previousElement || previousElement.isEmpty()) {
			const spaceText = AlexElement.getSpaceElement()
			this.addElementBefore(spaceText, element)
		}
		//如果不存在后一个元素
		if (!newTextElement || newTextElement.isEmpty()) {
			const spaceText = AlexElement.getSpaceElement()
			this.addElementAfter(spaceText, element)
		}
	}
}

//元素格式化时处理表格
export const tableHandle = function (element) {
	if (element.parsedom == 'table') {
		const marks = {
			'data-editify-element': element.key
		}
		if (element.hasMarks()) {
			Object.assign(element.marks, marks)
		} else {
			element.marks = marks
		}
		const elements = AlexElement.flatElements(element.children)
		const rows = elements.filter(el => {
			return el.parsedom == 'tr'
		})
		let colgroup = elements.find(el => {
			return el.parsedom == 'colgroup'
		})
		if (colgroup) {
			colgroup.children.forEach(col => {
				if (!col.hasMarks()) {
					col.marks = {
						width: 'auto'
					}
				} else if (!col.marks['width']) {
					col.marks['width'] = 'auto'
				}
			})
		} else {
			colgroup = new AlexElement('inblock', 'colgroup', null, null, null)
			const colNumber = getColNumbers(rows[0])
			for (let i = colNumber - 1; i >= 0; i--) {
				const col = new AlexElement(
					'closed',
					'col',
					{
						width: 'auto'
					},
					null,
					null
				)
				this.addElementTo(col, colgroup)
			}
		}
		element.children = []
		const tbody = new AlexElement('inblock', 'tbody', null, null, null)
		rows.reverse().forEach(row => {
			this.addElementTo(row, tbody)
		})
		this.addElementTo(tbody, element)
		this.addElementTo(colgroup, element)
	} else if (element.parsedom == 'th') {
		element.parsedom = 'td'
	}
}

//更新代码块内的光标位置
const updateRangeInPre = function (element, originalTextElements, newElements) {
	if (!this.range) {
		return
	}
	//如果虚拟光标的起点在代码块内对虚拟光标的起点进行重新定位
	if (this.range.anchor.element.getBlock().isEqual(element)) {
		//获取起点所在文本元素的在所有文本元素中的序列
		const elIndex = originalTextElements.findIndex(el => this.range.anchor.element.isEqual(el))
		//起点在整个代码内容中的位置
		const offset = originalTextElements.filter((el, i) => i < elIndex).reduce((total, item, i) => total + item.textContent.length, 0) + this.range.anchor.offset
		//获取pre下新的子孙元素中全部的文本元素
		const newTextElements = AlexElement.flatElements(newElements).filter(el => el.isText() && !el.isEmpty())
		let i = 0
		let index = 0
		//遍历
		while (i < newTextElements.length) {
			let newIndex = index + newTextElements[i].textContent.length
			if (offset >= index && offset <= newIndex) {
				this.range.anchor.element = newTextElements[i]
				this.range.anchor.offset = offset - index
				break
			}
			i++
			index = newIndex
		}
	}
	//如果虚拟光标的终点在代码块内需要对虚拟光标的终点进行重新定位
	if (this.range.focus.element.getBlock().isEqual(element)) {
		//获取终点所在文本元素的在所有文本元素中的序列
		const elIndex = originalTextElements.findIndex(el => this.range.focus.element.isEqual(el))
		//终点在整个代码内容中的位置
		const offset = originalTextElements.filter((el, i) => i < elIndex).reduce((total, item, i) => total + item.textContent.length, 0) + this.range.focus.offset
		//获取全部的新文本元素
		const newTextElements = AlexElement.flatElements(newElements).filter(el => el.isText() && !el.isEmpty())
		let i = 0
		let index = 0
		//遍历
		while (i < newTextElements.length) {
			let newIndex = index + newTextElements[i].textContent.length
			if (offset >= index && offset <= newIndex) {
				this.range.focus.element = newTextElements[i]
				this.range.focus.offset = offset - index
				break
			}
			i++
			index = newIndex
		}
	}
}

//元素格式化时处理pre，将pre的内容根据语言进行样式处理
export const preHandle = function (element, highlight, languages) {
	//如果是代码块进行处理
	if ((element.isBlock() || element.isInblock()) && element.isPreStyle()) {
		const marks = {
			'data-editify-element': element.key
		}
		if (element.hasMarks()) {
			Object.assign(element.marks, marks)
		} else {
			element.marks = marks
		}
		//高亮处理
		if (highlight && element.hasChildren()) {
			//获取语言类型
			let language = element.marks['data-editify-hljs'] || ''
			if (language && languages && !languages.includes(language)) {
				language = ''
			}
			//获取pre标签下所有的文本元素
			const originalTextElements = AlexElement.flatElements(element.children).filter(el => el.isText() && !el.isEmpty())
			//获取pre下的代码文本值
			const textContent = originalTextElements.reduce((val, item) => {
				return val + item.textContent
			}, '')
			//将文本元素的内容转为经过hljs处理的内容
			const html = getHljsHtml(textContent, language)
			if (html) {
				//将经过hljs处理的内容转为元素数组
				const newElements = this.parseHtml(html)
				//处理光标位置
				updateRangeInPre.apply(this, [element, originalTextElements, newElements])
				//将新文本元素全部加入到pre子元素数组中
				element.children = newElements
				newElements.forEach(newEl => {
					newEl.parent = element
				})
			}
		}
	}
}

//获取菜单按钮列表数据配置
export const getButtonOptionsConfig = function (editTrans, editLocale) {
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
					fontSize: '22px',
					fontWeight: 'bold'
				}
			},
			{
				label: editTrans('h2'),
				value: 'h2',
				style: {
					fontSize: '20px',
					fontWeight: 'bold'
				}
			},
			{
				label: editTrans('h3'),
				value: 'h3',
				style: {
					fontSize: '18px',
					fontWeight: 'bold'
				}
			},
			{
				label: editTrans('h4'),
				value: 'h4',
				style: {
					fontSize: '16px',
					fontWeight: 'bold'
				}
			},
			{
				label: editTrans('h5'),
				value: 'h5',
				style: {
					fontSize: '15px',
					fontWeight: 'bold'
				}
			},
			{
				label: editTrans('h6'),
				value: 'h6',
				style: {
					fontSize: '14px',
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
export const getToolbarConfig = function (editTrans, editLocale) {
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
				width: 100,
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
				options: getButtonOptionsConfig(editTrans, editLocale).heading,
				//按钮默认显示的值
				defaultValue: 'p',
				//浮层宽度
				width: editLocale == 'en_US' ? 140 : 120,
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
				options: getButtonOptionsConfig(editTrans, editLocale).align,
				//浮层宽度
				width: editLocale == 'zh_CN' ? 100 : 130,
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
				show: false,
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
				options: getButtonOptionsConfig(editTrans, editLocale).fontSize,
				//按钮默认显示的值
				defaultValue: '',
				//浮层宽度
				width: 90,
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
				options: getButtonOptionsConfig(editTrans, editLocale).fontFamily,
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
				options: getButtonOptionsConfig(editTrans, editLocale).lineHeight,
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
				options: getButtonOptionsConfig(editTrans, editLocale).foreColor,
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
				options: getButtonOptionsConfig(editTrans, editLocale).backColor,
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
export const getMenuConfig = function (editTrans, editLocale) {
	return {
		//是否使用菜单栏
		use: true,
		//是否使用工具提示
		tooltip: true,
		//菜单栏显示模式，支持default/inner/fixed/custom
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
			sourceView: 27
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
			options: getButtonOptionsConfig(editTrans, editLocale).heading,
			//按钮默认显示的值
			defaultValue: 'p',
			//浮层宽度
			width: editLocale == 'en_US' ? 140 : 120,
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
			options: getButtonOptionsConfig(editTrans, editLocale).indent,
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
			options: getButtonOptionsConfig(editTrans, editLocale).align,
			//浮层宽度
			width: editLocale == 'zh_CN' ? 100 : 130,
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
			options: getButtonOptionsConfig(editTrans, editLocale).fontSize,
			//按钮默认显示的值
			defaultValue: '',
			//浮层宽度
			width: 90,
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
			options: getButtonOptionsConfig(editTrans, editLocale).fontFamily,
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
			options: getButtonOptionsConfig(editTrans, editLocale).lineHeight,
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
			options: getButtonOptionsConfig(editTrans, editLocale).foreColor,
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
			options: getButtonOptionsConfig(editTrans, editLocale).backColor,
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
			accept: ['jpg', 'png', 'jpeg', 'webp', 'jfif', 'ico', 'gif', 'svg', 'psd'],
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
			//图片支持上传的类型，不区分大小写
			accept: ['mp4', 'avi', 'mpg', 'wmv', 'mov', 'rm', 'swf', 'flv'],
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
			show: true,
			//左侧边框是否显示
			leftBorder: true,
			//右侧边框是否显示
			rightBorder: false
		},
		//拓展菜单，每个key表示拓展菜单的唯一名称，value是对象，包含type/title/rightBorder/leftBorder/disabled/active/width/maxHeight/options/value/hideScroll/onLayerShow/onLayerShown/onLayerHidden/onOperate/default/layer/option属性
		extends: {}
	}
}

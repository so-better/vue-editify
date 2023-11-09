import { AlexElement } from 'alex-editor'
import { getHljsHtml, languages } from '../hljs'
import Dap from 'dap-util'

//粘贴html时保留的数据
export const pasteKeepData = {
	//粘贴html时所有元素需要保留的属性
	marks: ['data-editify-list', 'data-editify-value', 'data-editify-code', 'src', 'autoplay', 'loop', 'muted', 'href', 'target', 'alt', 'controls', 'name', 'disabled'],
	//粘贴html时根级块元素和内部块元素保留的样式
	styles: ['text-indent', 'text-align']
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
	//代码块是否高亮
	highlight: {
		type: Boolean,
		default: false
	},
	//代码块高亮语言列表
	highlightLanguages: {
		type: Array,
		default: function () {
			return languages
		}
	},
	//视频宽高比
	videoRatio: {
		type: Number,
		default: 16 / 9
	}
}

//判断是否列表
export const isList = (element, ordered = false) => {
	return element.type == 'block' && element.parsedom == 'div' && element.hasMarks() && element.marks['data-editify-list'] == (ordered ? 'ol' : 'ul')
}

//将某个块元素转为段落
export const blockToParagraph = element => {
	//如果是有序列表或者无序列表
	if (isList(element, true) || isList(element, false)) {
		let marks = {}
		for (let key in element.marks) {
			if (key != 'data-editify-list' && key != 'data-editify-value') {
				marks[key] = element.marks[key]
			}
		}
		element.marks = marks
	}
	element.parsedom = AlexElement.BLOCK_NODE
}

//其他元素转为列表
export const blockToList = (element, ordered = false) => {
	element.parsedom = 'div'
	if (!element.hasMarks()) {
		element.marks = {}
	}
	element.marks['data-editify-list'] = ordered ? 'ol' : 'ul'
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
			for (let i = rows[0].children.length - 1; i >= 0; i--) {
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
export const preHandle = function (element, highlight, highlightLanguages) {
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
			if (language && !highlightLanguages.includes(language)) {
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

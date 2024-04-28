import { AlexEditor, AlexElement } from 'alex-editor'
import { LanguagesItemType, getHljsHtml } from '../hljs'
import { getColNumbers } from './tool'
import { isList, isTask } from './function'
import { common as DapCommon } from 'dap-util'

/**
 * 更新代码块内的光标位置
 * @param editor
 * @param element
 * @param originalTextElements
 * @param newElements
 * @returns
 */
const updateRangeInPre = (editor: AlexEditor, element: AlexElement, originalTextElements: AlexElement[], newElements: AlexElement[]) => {
	if (!editor.range) {
		return
	}
	//如果虚拟光标的起点在代码块内对虚拟光标的起点进行重新定位
	if (editor.range.anchor.element.getBlock().isEqual(element)) {
		//获取起点所在文本元素的在所有文本元素中的序列
		const elIndex = originalTextElements.findIndex(el => editor.range!.anchor.element.isEqual(el))
		//起点在整个代码内容中的位置
		const offset = originalTextElements.filter((_el, i) => i < elIndex).reduce((total, item) => total + item.textContent!.length, 0) + editor.range.anchor.offset
		//获取pre下新的子孙元素中全部的文本元素
		const newTextElements = AlexElement.flatElements(newElements).filter(el => el.isText() && !el.isEmpty())
		let i = 0
		let index = 0
		//遍历
		while (i < newTextElements.length) {
			let newIndex = index + newTextElements[i].textContent!.length
			if (offset >= index && offset <= newIndex) {
				editor.range.anchor.element = newTextElements[i]
				editor.range.anchor.offset = offset - index
				break
			}
			i++
			index = newIndex
		}
	}
	//如果虚拟光标的终点在代码块内需要对虚拟光标的终点进行重新定位
	if (editor.range.focus.element.getBlock().isEqual(element)) {
		//获取终点所在文本元素的在所有文本元素中的序列
		const elIndex = originalTextElements.findIndex(el => editor.range!.focus.element.isEqual(el))
		//终点在整个代码内容中的位置
		const offset = originalTextElements.filter((_el, i) => i < elIndex).reduce((total, item) => total + item.textContent!.length, 0) + editor.range.focus.offset
		//获取全部的新文本元素
		const newTextElements = AlexElement.flatElements(newElements).filter(el => el.isText() && !el.isEmpty())
		let i = 0
		let index = 0
		//遍历
		while (i < newTextElements.length) {
			let newIndex = index + newTextElements[i].textContent!.length
			if (offset >= index && offset <= newIndex) {
				editor.range.focus.element = newTextElements[i]
				editor.range.focus.offset = offset - index
				break
			}
			i++
			index = newIndex
		}
	}
}

/**
 * 元素格式化时转换ol和li标签
 * @param editor
 * @param element
 */
export const parseList = (editor: AlexEditor, element: AlexElement) => {
	//ol标签和ul标签转为div
	if (element.parsedom == 'ol' || element.parsedom == 'ul') {
		if (element.hasChildren()) {
			element.children!.forEach(el => {
				const newEl = el.clone()
				newEl.parsedom = 'div'
				newEl.type = element.type
				if (!newEl.hasMarks()) {
					newEl.marks = {}
				}
				newEl.marks!['data-editify-list'] = element.parsedom
				//插入到该元素之前
				editor.addElementBefore(newEl, element)
			})
		}
		element.toEmpty()
	}
}

/**
 * 元素格式化时处理有序列表的序号值
 * @param editor
 * @param element
 */
export const orderdListHandle = function (editor: AlexEditor, element: AlexElement) {
	//有序列表的序号处理
	if (isList(element, true)) {
		//获取前一个元素
		const previousElement = editor.getPreviousElement(element)
		//如果前一个元素存在并且也是有序列表
		if (previousElement && isList(previousElement, true)) {
			const previousValue = Number(previousElement.marks!['data-editify-value'])
			element.marks!['data-editify-value'] = previousValue + 1
		}
		//前一个元素不是有序列表，则从0开始
		else {
			element.marks!['data-editify-value'] = 1
		}
	}
}

/**
 * 元素格式化时处理媒体元素和链接
 * @param editor
 * @param element
 */
export const mediaHandle = function (editor: AlexEditor, element: AlexElement) {
	//图片、视频和链接设置marks
	if (element.parsedom == 'img' || element.parsedom == 'video' || element.parsedom == 'a') {
		const marks = {
			'data-editify-element': element.key
		}
		if (element.hasMarks()) {
			Object.assign(element.marks!, marks)
		} else {
			element.marks = marks
		}
	}

	//视频的特殊处理，两侧无元素时在两侧加上空白文本
	if (element.parsedom == 'video') {
		const previousElement = editor.getPreviousElement(element)
		const newTextElement = editor.getNextElement(element)
		//如果不存在前一个元素
		if (!previousElement || previousElement.isEmpty()) {
			const spaceText = AlexElement.getSpaceElement()
			editor.addElementBefore(spaceText, element)
		}
		//如果不存在后一个元素
		if (!newTextElement || newTextElement.isEmpty()) {
			const spaceText = AlexElement.getSpaceElement()
			editor.addElementAfter(spaceText, element)
		}
	}
}

/**
 * 元素格式化时处理表格
 * @param editor
 * @param element
 */
export const tableHandle = function (editor: AlexEditor, element: AlexElement) {
	if (element.parsedom == 'table') {
		const marks = {
			'data-editify-element': element.key
		}
		if (element.hasMarks()) {
			Object.assign(element.marks!, marks)
		} else {
			element.marks = marks
		}
		const styles = {
			'white-space': 'pre-wrap',
			'word-break': 'break-word'
		}
		if (element.hasStyles()) {
			Object.assign(element.styles!, styles)
		} else {
			element.styles = styles
		}
		const elements = AlexElement.flatElements(element.children!)
		const rows = elements.filter(el => {
			return el.parsedom == 'tr'
		})
		let colgroup = elements.find(el => {
			return el.parsedom == 'colgroup'
		})
		if (colgroup) {
			colgroup.children!.forEach(col => {
				if (!col.hasMarks()) {
					col.marks = {
						width: 'auto'
					}
				} else if (!col.marks!['width']) {
					col.marks!['width'] = 'auto'
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
				editor.addElementTo(col, colgroup)
			}
		}
		element.children = []
		const tbody = new AlexElement('inblock', 'tbody', null, null, null)
		rows.reverse().forEach(row => {
			editor.addElementTo(row, tbody)
		})
		editor.addElementTo(tbody, element)
		editor.addElementTo(colgroup, element)
	}
	if (element.parsedom == 'th') {
		element.parsedom = 'td'
	}
}

/**
 * 元素格式化时处理pre，将pre的内容根据语言进行样式处理
 * @param editor
 * @param element
 * @param highlight
 * @param languages
 */
export const preHandle = function (editor: AlexEditor, element: AlexElement, highlight: boolean, languages: (string | LanguagesItemType)[]) {
	//如果是代码块进行处理
	if (element.parsedom == 'pre') {
		const marks = {
			'data-editify-element': element.key
		}
		if (element.hasMarks()) {
			Object.assign(element.marks!, marks)
		} else {
			element.marks = marks
		}
		//高亮处理
		if (highlight && element.hasChildren()) {
			//获取语言类型
			let language: string = element.marks!['data-editify-hljs'] || ''
			if (language && languages) {
				//语言类型是否是列表内的
				const flag = languages.some(item => {
					if (DapCommon.isObject(item)) {
						return (<LanguagesItemType>item).value == language
					}
					return <string>item == language
				})
				//如果不是列表内的则清除
				if (!flag) {
					language = ''
				}
			}
			//获取pre标签下所有的文本元素
			const originalTextElements = AlexElement.flatElements(element.children!).filter(el => el.isText() && !el.isEmpty())
			//获取pre下的代码文本值
			const textContent = originalTextElements.reduce((val, item) => {
				return val + item.textContent
			}, '')
			//将文本元素的内容转为经过hljs处理的内容
			const html = getHljsHtml(textContent, language)
			if (html) {
				//将经过hljs处理的内容转为元素数组
				const newElements = editor.parseHtml(html)
				//将新文本元素全部加入到pre子元素数组中
				element.children = newElements
				newElements.forEach(newEl => {
					newEl.parent = element
				})
				//处理光标位置
				updateRangeInPre(editor, element, originalTextElements, newElements)
			} else {
				//将换行元素加入到pre子元素数组中
				const breakElement = new AlexElement('closed', 'br', null, null, null)
				element.children = [breakElement]
				breakElement.parent = element
				if (editor.range) {
					editor.range.anchor.moveToStart(breakElement)
					editor.range.focus.moveToStart(breakElement)
				}
			}
		}
	}
}

/**
 * 元素格式化时处理一些特殊的内部块元素，转为根级块元素
 * @param editor
 * @param element
 */
export const specialInblockHandle = function (editor: AlexEditor, element: AlexElement) {
	if (element.hasChildren()) {
		element.children!.forEach(el => {
			if (isList(el, true) || isList(el, false) || isTask(el) || ['blockquote', 'pre', 'table', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'].includes(el.parsedom!)) {
				const newEl = el.clone()
				newEl.type = 'block'
				const block = element.getBlock()
				editor.addElementAfter(newEl, block)
				el.toEmpty()
			}
		})
	}
}

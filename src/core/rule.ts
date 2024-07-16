import { AlexEditor, AlexElement, AlexElementCreateConfigType } from 'alex-editor'
import { common as DapCommon, color as DapColor } from 'dap-util'
import { LanguagesItemType, getHljsHtml } from '@/hljs'
import { getTableSize, getCellSpanNumber, elementIsList, elementIsTask, elementIsAttachment, elementIsMathformula, elementIsInfoBlock, elementIsPanel, autocompleteTableCells, autoHideMergedTableCells, updateRangeInPre } from './function'

/**
 * 元素格式化时转换ol和li标签
 * @param editor
 * @param element
 */
export const listHandle = (editor: AlexEditor, element: AlexElement) => {
	//ol标签和ul标签转为div
	if ((element.parsedom == 'ol' || element.parsedom == 'ul') && element.hasChildren()) {
		element.children!.forEach(el => {
			el.type = element.type
			el.parsedom = 'div'
			if (el.hasMarks()) {
				el.marks!['data-editify-list'] = element.parsedom
			} else {
				el.marks = {
					'data-editify-list': element.parsedom
				}
			}
			el.marks!['data-editify-list-style'] = 'decimal'
			//插入到该元素之前
			editor.addElementBefore(el, element)
		})
		element.children = []
	}
}

/**
 * 元素格式化时处理常规元素（图片、视频、分隔线、行内代码）
 * @param editor
 * @param element
 */
export const commonElementHandle = (editor: AlexEditor, element: AlexElement) => {
	//图片、视频和链接设置marks
	if (element.parsedom && ['img', 'video', 'a'].includes(element.parsedom)) {
		const marks = {
			'data-editify-element': element.key
		}
		if (element.hasMarks()) {
			Object.assign(element.marks!, marks)
		} else {
			element.marks = marks
		}
	}
	//视频或者分隔线的特殊处理，两侧无元素时在两侧加上空白文本
	if (element.parsedom == 'video' || element.parsedom == 'hr') {
		const previousElement = editor.getPreviousElement(element)
		const newTextElement = editor.getNextElement(element)
		//如果不存在前一个元素或者前一个元素不是空白元素则设置空白元素
		if (!previousElement || !previousElement.isSpaceText()) {
			const spaceText = AlexElement.getSpaceElement()
			editor.addElementBefore(spaceText, element)
		}
		//如果不存在后一个元素或者后一个元素不是空白元素则设置空白元素
		if (!newTextElement || !newTextElement.isSpaceText()) {
			const spaceText = AlexElement.getSpaceElement()
			editor.addElementAfter(spaceText, element)
		}
		//如果光标在视频上则更新光标位置
		if (editor.range && element.isContains(editor.range.anchor.element)) {
			editor.range.anchor.moveToEnd(editor.getNextElement(element)!)
		}
		if (editor.range && element.isContains(editor.range.focus.element)) {
			editor.range.focus.moveToEnd(editor.getNextElement(element)!)
		}
	}
	//将code转为span[data-editify-code]
	if (element.parsedom == 'code') {
		element.parsedom = 'span'
		const marks = {
			'data-editify-code': true
		}
		if (element.hasMarks()) {
			Object.assign(element.marks!, marks)
		} else {
			element.marks = marks
		}
	}
}

/**
 * 元素格式化时处理表格：th转为td
 * @param editor
 * @param element
 */
export const tableThTdHandle = (_editor: AlexEditor, element: AlexElement) => {
	if (element.parsedom == 'th') {
		element.parsedom = 'td'
	}
}

/**
 * 元素格式化时处理表格：格式化表格
 * @param editor
 * @param element
 */
export const tableFormatHandle = (editor: AlexEditor, element: AlexElement) => {
	if (element.hasChildren() && element.parsedom == 'table') {
		//设置key到marks上
		if (element.hasMarks()) {
			Object.assign(element.marks!, {
				'data-editify-element': element.key
			})
		} else {
			element.marks = {
				'data-editify-element': element.key
			}
		}
		//扁平化处理子元素
		const elements = AlexElement.flatElements(element.children!)
		//所有的行元素
		const rows = elements.filter(el => el.parsedom == 'tr')
		//获取表格实际应该的规格
		const { rowNumber, columnNumber } = getTableSize(rows)
		//获取表格的colgroup元素
		let colgroup = elements.find(el => el.parsedom == 'colgroup')
		//如果colgroup元素存在
		if (colgroup) {
			//遍历每个col元素设置默认的width:'auto
			colgroup.children!.forEach(col => {
				//如果没有任何标记
				if (!col.hasMarks()) {
					col.marks = {
						width: 'auto'
					}
				}
				//如果没有width标记
				else if (!col.marks!['width']) {
					col.marks!['width'] = 'auto'
				}
			})
			//对缺少的col元素进行补全
			const length = colgroup.children!.length
			if (length < columnNumber) {
				for (let i = 0; i < columnNumber - length; i++) {
					const col = AlexElement.create({
						type: 'closed',
						parsedom: 'col',
						marks: {
							width: 'auto'
						}
					})
					editor.addElementTo(col, colgroup, colgroup.children!.length)
				}
			}
		}
		//如果colgroup元素不存在则新建
		else {
			const children: AlexElementCreateConfigType[] = []
			for (let i = columnNumber - 1; i >= 0; i--) {
				children.push({
					type: 'closed',
					parsedom: 'col',
					marks: {
						width: 'auto'
					}
				})
			}
			colgroup = AlexElement.create({
				type: 'inblock',
				parsedom: 'colgroup',
				children
			})
		}
		//自动补全表格的单元格
		autocompleteTableCells(editor, rows, rowNumber, columnNumber)
		//清空表格
		element.children = []
		//创建tbody元素
		const tbody = AlexElement.create({
			type: 'inblock',
			parsedom: 'tbody'
		})
		//将rows全部加入表格中
		rows.forEach(row => {
			const index = tbody.hasChildren() ? tbody.children!.length : 0
			editor.addElementTo(row, tbody, index)
		})
		editor.addElementTo(tbody, element)
		editor.addElementTo(colgroup, element)
		//对表格单元格合并状态进行处理
		autoHideMergedTableCells(editor, rows)
	}
}

/**
 * 元素格式化时处理表格：处理光标在表格隐藏单元格内的情况
 * @param editor
 * @param element
 */
export const tableRangeMergedHandle = (editor: AlexEditor, element: AlexElement) => {
	//如果元素是被隐藏的单元格，并且光标在该单元格内
	if (element.parsedom == 'td' && element.hasMarks() && element.marks!['data-editify-merged'] && editor.range) {
		//单元格向左查找设置焦点
		const queryLeftSetRange = (_element: AlexElement, callback: (ele: AlexElement) => void) => {
			//是否已查找到
			let success = false
			//获取前一个单元格
			let el = editor.getPreviousElement(_element)
			let tempIndex = 1
			//如果前一个单元格存在则循环
			while (el) {
				//获取单元格的colspan
				const { colspan } = getCellSpanNumber(el)
				//如果单元格是跨列的并且是跨当前单元格的
				if (el.hasMarks() && !el.marks!['data-editify-merged'] && colspan > tempIndex) {
					success = true
					callback(el)
					break
				}
				//不是则继续向上查找
				else {
					el = editor.getPreviousElement(el)
					tempIndex++
				}
			}
			return success
		}
		//单元格向上查找设置焦点
		const queryUpSetRange = (_element: AlexElement, callback: (ele: AlexElement) => void) => {
			//是否已查找到
			let success = false
			//单元格在行中的序列
			const index = _element.parent!.children!.findIndex(item => item.isEqual(_element))
			//获取前一行元素
			let el = editor.getPreviousElement(_element.parent!)
			let tempIndex = 1
			//如果前一行元素存在则循环
			while (el) {
				//获取前一行中同列的单元格
				const previousColumn = el.children![index]
				//获取单元格的rowspan
				const { rowspan } = getCellSpanNumber(previousColumn)
				//如果单元格是跨行的并且是跨当前单元格的
				if (previousColumn.hasMarks() && !previousColumn.marks!['data-editify-merged'] && rowspan > tempIndex) {
					success = true
					callback(previousColumn)
					break
				}
				//不是则继续向上查找
				else {
					el = editor.getPreviousElement(el)
					tempIndex++
				}
			}
			return success
		}
		//起点在该单元格下
		if (element.isContains(editor.range.anchor.element)) {
			const success = queryLeftSetRange(element, ele => {
				editor.range!.anchor.moveToEnd(ele)
			})
			if (!success) {
				queryUpSetRange(element, ele => {
					editor.range!.anchor.moveToEnd(ele)
				})
			}
		}
		//终点在该单元格下
		if (element.isContains(editor.range.focus.element)) {
			const success = queryLeftSetRange(element, ele => {
				editor.range!.focus.moveToEnd(ele)
			})
			if (!success) {
				queryUpSetRange(element, ele => {
					editor.range!.focus.moveToEnd(ele)
				})
			}
		}
	}
}

/**
 * 元素格式化时处理pre，将pre的内容根据语言进行样式处理
 * @param editor
 * @param element
 * @param highlight
 * @param languages
 */
export const preHandle = (editor: AlexEditor, element: AlexElement, highlight: boolean, languages: (string | LanguagesItemType)[]) => {
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
						return (item as LanguagesItemType).value == language
					}
					return (item as string) == language
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
				const breakElement = AlexElement.create({
					type: 'closed',
					parsedom: 'br'
				})
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
 * 元素格式化时处理附件元素
 * @param editor
 * @param element
 * @param $editTrans
 */
export const attachmentHandle = (editor: AlexEditor, element: AlexElement, $editTrans: (key: string) => any) => {
	if (!element.isEmpty() && elementIsAttachment(element)) {
		//设置title
		element.marks!['title'] = $editTrans('attachmentDownloadTitle')
		//如果名称没有则设置名称
		if (!element.marks!['data-editify-attachment-name']) {
			element.marks!['data-editify-attachment-name'] = $editTrans('attachmentDefaultName')
		}
		//前一个元素
		const previousElement = editor.getPreviousElement(element)
		//后一个元素
		const newTextElement = editor.getNextElement(element)
		//如果不存在前一个元素或者前一个元素不是空白元素则设置空白元素
		if (!previousElement || !previousElement.isSpaceText()) {
			const spaceText = AlexElement.getSpaceElement()
			editor.addElementBefore(spaceText, element)
		}
		//如果不存在后一个元素或者后一个元素不是空白元素则设置空白元素
		if (!newTextElement || !newTextElement.isSpaceText()) {
			const spaceText = AlexElement.getSpaceElement()
			editor.addElementAfter(spaceText, element)
		}
		//如果光标在元素上则更新光标位置
		if (editor.range && element.isContains(editor.range.anchor.element)) {
			editor.range.anchor.moveToEnd(editor.getNextElement(element)!)
		}
		if (editor.range && element.isContains(editor.range.focus.element)) {
			editor.range.focus.moveToEnd(editor.getNextElement(element)!)
		}
	}
}

/**
 * 元素格式化时处理数学公式元素
 * @param editor
 * @param element
 */
export const mathformulaHandle = (editor: AlexEditor, element: AlexElement) => {
	//给元素设置两侧的空白字符
	if (!element.isEmpty() && elementIsMathformula(element)) {
		//前一个元素
		const previousElement = editor.getPreviousElement(element)
		//后一个元素
		const newTextElement = editor.getNextElement(element)
		//如果不存在前一个元素或者前一个元素不是空白元素则设置空白元素
		if (!previousElement || !previousElement.isSpaceText()) {
			const spaceText = AlexElement.getSpaceElement()
			editor.addElementBefore(spaceText, element)
		}
		//如果不存在后一个元素或者后一个元素不是空白元素则设置空白元素
		if (!newTextElement || !newTextElement.isSpaceText()) {
			const spaceText = AlexElement.getSpaceElement()
			editor.addElementAfter(spaceText, element)
		}
		//如果光标在元素上则更新光标位置
		if (editor.range && element.isContains(editor.range.anchor.element)) {
			editor.range.anchor.moveToEnd(editor.getNextElement(element)!)
		}
		if (editor.range && element.isContains(editor.range.focus.element)) {
			editor.range.focus.moveToEnd(editor.getNextElement(element)!)
		}
	}
}

/**
 * 元素格式化时处理信息块元素
 * @param editor
 * @param element
 * @param color
 */
export const infoBlockHandle = (_editor: AlexEditor, element: AlexElement, color: string) => {
	if (elementIsInfoBlock(element) && color) {
		const parseColor = DapColor.hex2rgb(color)
		if (element.hasStyles()) {
			element.styles!['background-color'] = `rgba(${parseColor[0]},${parseColor[1]},${parseColor[2]},0.15)`
			element.styles!['color'] = color
		} else {
			element.styles = {
				'background-color': `rgba(${parseColor[0]},${parseColor[1]},${parseColor[2]},0.15)`,
				color: color
			}
		}
	}
}

/**
 * 元素格式化时处理一些特殊的内部块元素，转为根级块元素
 * @param editor
 * @param element
 */
export const specialInblockHandle = (editor: AlexEditor, element: AlexElement) => {
	if (element.hasChildren()) {
		element.children!.forEach(el => {
			if (elementIsList(el, true) || elementIsList(el, false) || elementIsTask(el) || elementIsInfoBlock(el) || elementIsPanel(el) || ['blockquote', 'pre', 'table', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'].includes(el.parsedom!)) {
				const newEl = el.clone()
				newEl.type = 'block'
				const block = element.getBlock()
				editor.addElementAfter(newEl, block)
				el.toEmpty()
			}
		})
	}
}

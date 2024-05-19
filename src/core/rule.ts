import { AlexEditor, AlexElement } from 'alex-editor'
import { LanguagesItemType, getHljsHtml } from '../hljs'
import { isList, isTask, getTableSize, getCellSpanNumber } from './function'
import { common as DapCommon } from 'dap-util'

/**
 * 自动补全表格行和列
 * @param editor
 * @param rowElements
 * @param rowNumber
 * @param columnNumber
 */
const autocompleteTableCells = (editor: AlexEditor, rowElements: AlexElement[], rowNumber: number, columnNumber: number) => {
	//遍历所有的单元格
	AlexElement.flatElements(rowElements).forEach(item => {
		if (item.parsedom == 'td' && item.hasMarks()) {
			//删除被合并的标识
			if (item.marks!['data-editify-merged']) {
				delete item.marks!['data-editify-merged']
			}
			//获取colspan
			const colspan = isNaN(Number(item.marks!['colspan'])) ? 1 : Number(item.marks!['colspan'])
			//获取rowspan
			const rowspan = isNaN(Number(item.marks!['rowspan'])) ? 1 : Number(item.marks!['rowspan'])
			//针对colspan>1的单元格在后面补全隐藏的单元格
			if (colspan > 1) {
				let i = 1
				//补全的数量小于需要补全的数量并且列总数量小于理论数量
				while (i < colspan && item.parent!.children!.length < columnNumber) {
					const column = new AlexElement(
						'inblock',
						'td',
						{
							'data-editify-merged': 'true'
						},
						null,
						null
					)
					const breakElement = new AlexElement('closed', 'br', null, null, null)
					editor.addElementTo(breakElement, column)
					editor.addElementAfter(column, item)
					i++
				}
			}
			//针对rowspan>1的单元格在后面的行中对应位置补全隐藏的单元格
			if (rowspan > 1) {
				let el = item
				let i = 1
				while (i < rowspan && editor.getNextElement(el.parent!) && editor.getNextElement(el.parent!)!.children!.length < columnNumber) {
					//下一行
					const nextRow = editor.getNextElement(el.parent!)!
					//单元格在行中的序列
					const index = el.parent!.children!.findIndex(item => item.isEqual(el))
					//下一行对应的单元格
					const nextCell = nextRow.children![index]
					//根据当前单元格的跨列数补充符合跨列数的隐藏单元格
					for (let j = 0; j < colspan; j++) {
						const column = new AlexElement(
							'inblock',
							'td',
							{
								'data-editify-merged': 'true'
							},
							null,
							null
						)
						const breakElement = new AlexElement('closed', 'br', null, null, null)
						editor.addElementTo(breakElement, column)
						if (nextCell) {
							editor.addElementBefore(column, nextCell)
						} else {
							editor.addElementTo(column, nextRow, nextRow.children!.length)
						}
					}
					el = nextRow.children![index]
					i++
				}
			}
		}
	})
	//遍历每一行，如果还缺少列则在后面补全列
	rowElements.forEach(rowElement => {
		//遍历该行的单元格获取总列数
		const number = rowElement.children!.length
		if (number < columnNumber) {
			for (let i = 0; i < columnNumber - number; i++) {
				const column = new AlexElement('inblock', 'td', null, null, null)
				const breakElement = new AlexElement('closed', 'br', null, null, null)
				editor.addElementTo(breakElement, column)
				editor.addElementTo(column, rowElement, rowElement.children!.length)
			}
		}
	})
	//获取总行数
	const length = rowElements.length
	//判断总行数是否小于实际行数则补全行
	if (length < rowNumber) {
		for (let i = 0; i < rowNumber - length; i++) {
			const row = new AlexElement('inblock', 'tr', null, null, null)
			for (let j = 0; j < columnNumber; j++) {
				const column = new AlexElement('inblock', 'td', null, null, null)
				const breakElement = new AlexElement('closed', 'br', null, null, null)
				editor.addElementTo(breakElement, column)
				editor.addElementTo(column, row)
			}
			rowElements.push(row)
		}
	}
}

/**
 * 自动隐藏被合并的单元格
 * @param editor
 * @param rowElements
 */
const autoHideMergedTableCells = (editor: AlexEditor, rowElements: AlexElement[]) => {
	const cells = AlexElement.flatElements(rowElements).filter(item => item.parsedom == 'td')
	cells.forEach(cell => {
		if (cell.hasMarks() && !cell.marks!['data-editify-merged']) {
			//获取colspan
			const colspan = isNaN(Number(cell.marks!['colspan'])) ? 1 : Number(cell.marks!['colspan'])
			//获取rowspan
			const rowspan = isNaN(Number(cell.marks!['rowspan'])) ? 1 : Number(cell.marks!['rowspan'])
			//如果是跨列单元格，隐藏该单元格同行后的colspan-1个单元格
			if (colspan > 1) {
				let el = cell
				let i = 1
				while (i < colspan) {
					const nextCell = editor.getNextElement(el)!
					if (nextCell) {
						if (nextCell.hasMarks()) {
							nextCell.marks!['data-editify-merged'] = 'true'
						} else {
							nextCell.marks = {
								'data-editify-merged': 'true'
							}
						}
						el = nextCell
						i++
					} else {
						break
					}
				}
			}
			//如果是跨行单元格，隐藏该单元格同列后的rowspan-1行单元格
			if (rowspan > 1) {
				const index = cell.parent!.children!.findIndex(item => item.isEqual(cell))
				let el = cell
				let i = 1
				while (i < rowspan && el && editor.getNextElement(el.parent!)) {
					const nextRow = editor.getNextElement(el.parent!)!
					//根据跨行单元格占据的列数，在后的rowspan-1行中隐藏colspan个单元格
					for (let j = index; j < index + colspan; j++) {
						const current = nextRow.children![j]
						if (current) {
							if (current.hasMarks()) {
								current.marks!['data-editify-merged'] = 'true'
							} else {
								current.marks = {
									'data-editify-merged': 'true'
								}
							}
						}
					}
					el = nextRow.children![index]
					i++
				}
			}
		}
	})
}

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
				if (newEl.hasMarks()) {
					newEl.marks!['data-editify-list'] = element.parsedom
				} else {
					newEl.marks = {
						'data-editify-list': element.parsedom
					}
				}
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
export const orderdListHandle = (editor: AlexEditor, element: AlexElement) => {
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
 * 元素格式化时处理常规元素（图片、视频、分隔线、行内代码）
 * @param editor
 * @param element
 */
export const commonElementHandle = (editor: AlexEditor, element: AlexElement) => {
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
		//所有的行元素
		const rows = elements.filter(el => {
			return el.parsedom == 'tr'
		})
		//获取表格实际应该的规格
		const { rowNumber, columnNumber } = getTableSize(rows)
		//colgroup元素
		let colgroup = elements.find(el => {
			return el.parsedom == 'colgroup'
		})
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
					const col = new AlexElement(
						'closed',
						'col',
						{
							width: 'auto'
						},
						null,
						null
					)
					editor.addElementTo(col, colgroup, colgroup.children!.length)
				}
			}
		}
		//如果colgroup元素不存在则新建
		else {
			colgroup = new AlexElement('inblock', 'colgroup', null, null, null)
			for (let i = columnNumber - 1; i >= 0; i--) {
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
		//自动补全表格的单元格
		autocompleteTableCells(editor, rows, rowNumber, columnNumber)
		//清空表格
		element.children = []
		//创建tbody元素
		const tbody = new AlexElement('inblock', 'tbody', null, null, null)
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
export const specialInblockHandle = (editor: AlexEditor, element: AlexElement) => {
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

/**
 * 这里的方法都是对编辑器内容元素进行判断或者操作的方法，不涉及到格式化、dom渲染和光标渲染
 */
import { common as DapCommon } from 'dap-util'
import { AlexElement, AlexElementsRangeType, AlexEditor, AlexElementCreateConfigType } from 'alex-editor'
import { cloneData, queryHasValue, getButtonOptionsConfig, ObjectType } from './tool'
import { ButtonOptionsItemType } from '@/components/button/props'

export type ElementMatchConfigType = {
	parsedom?: string
	marks?: ObjectType
	styles?: ObjectType
}

/**
 * 清空单元格的内容并隐藏
 * @param editor
 * @param cell
 */
export const setTableCellMerged = (cell: AlexElement) => {
	const breakEl = AlexElement.create({
		type: 'closed',
		parsedom: 'br'
	})
	cell.children = [breakEl]
	breakEl.parent = cell
	if (cell.hasMarks()) {
		cell.marks!['data-editify-merged'] = 'true'
	} else {
		cell.marks = {
			'data-editify-merged': 'true'
		}
	}
}

/**
 * 判断被隐藏的单元格是属于跨行的单元格还是跨列的单元格，返回跨行或者跨列的单元格
 * @param editor
 * @param cell
 * @returns
 */
export const getCellMergeElement = (editor: AlexEditor, cell: AlexElement) => {
	const queryLeft = () => {
		//跨列的单元格
		let crossColumnElement = null
		//获取前一个单元格
		let el = editor.getPreviousElement(cell)
		let temIndex = 1
		//如果前一个单元格存在
		while (el) {
			const { colspan } = getCellSpanNumber(el)
			//是否隐藏的单元格
			const isMergedCell = el.hasMarks() && el.marks!['data-editify-merged']
			//不是隐藏的单元格并且是跨列的单元格
			if (!isMergedCell && colspan > temIndex) {
				crossColumnElement = el
				break
			}
			//否则继续向左查询
			else {
				el = editor.getPreviousElement(el)
				temIndex++
			}
		}
		return crossColumnElement
	}
	const queryUp = () => {
		//跨行的单元格
		let crossRowElement = null
		//单元格在行中的序列
		const index = cell.parent!.children!.findIndex(item => item.isEqual(cell))
		//获取前一行
		let el = editor.getPreviousElement(cell.parent!)
		let temIndex = 1
		//如果前一行存在
		while (el) {
			//获取前一行对应序列的单元格
			const column = el.children![index]
			const { rowspan } = getCellSpanNumber(column)
			//是否隐藏的单元格
			const isMergedCell = column.hasMarks() && column.marks!['data-editify-merged']
			//不是隐藏的单元格并且是跨行的单元格
			if (!isMergedCell && rowspan > temIndex) {
				crossRowElement = column
				break
			}
			//否则继续向上查询
			else {
				el = editor.getPreviousElement(el)
				temIndex++
			}
		}
		return crossRowElement
	}
	return {
		crossRowElement: queryUp(),
		crossColumnElement: queryLeft()
	}
}

/**
 * 获取某个单元格的rowspan和colspan值
 * @param cell
 * @returns
 */
export const getCellSpanNumber = (cell: AlexElement) => {
	let rowspan = 1
	let colspan = 1
	if (cell.hasMarks()) {
		if (cell.marks!['rowspan']) {
			const num = Number(cell.marks!['rowspan'])
			rowspan = isNaN(num) ? 1 : num
		}
		if (cell.marks!['colspan']) {
			const num = Number(cell.marks!['colspan'])
			colspan = isNaN(num) ? 1 : num
		}
	}
	return {
		rowspan,
		colspan
	}
}

/**
 * 获取表格规格：行数和列数
 * @param rowElements
 * @returns
 */
export const getTableSize = (rowElements: AlexElement[]) => {
	//将单元格按照同列进行整理
	const columns: AlexElement[][] = []
	//将单元格按照同行进行整理
	const rows: AlexElement[][] = []
	//遍历行
	rowElements.forEach((rowElement, rowIndex) => {
		//遍历行的每一个单元格
		rowElement.children!.forEach((colElement, colIndex) => {
			if (Array.isArray(rows[rowIndex])) {
				rows[rowIndex].push(colElement)
			} else {
				rows[rowIndex] = [colElement]
			}
			if (Array.isArray(columns[colIndex])) {
				columns[colIndex].push(colElement)
			} else {
				columns[colIndex] = [colElement]
			}
		})
	})
	//遍历每一列单元格获取每列占据的行数
	const rowNumbers = columns.map(item => {
		return item.reduce((total: number, current: AlexElement) => {
			if (current.hasMarks()) {
				if (!!current.marks!['data-editify-merged']) {
					return total + 0
				}
				if (!!current.marks!['rowspan']) {
					const num = Number(current.marks!['rowspan'])
					return total + (isNaN(num) ? 1 : num)
				}
			}
			return total + 1
		}, 0)
	})
	//遍历每一行单元格获取每行占据的列数
	const columnNumbers = rows.map(item => {
		return item.reduce((total: number, current: AlexElement) => {
			if (current.hasMarks()) {
				if (!!current.marks!['data-editify-merged']) {
					return total + 0
				}
				if (!!current.marks!['colspan']) {
					const num = Number(current.marks!['colspan'])
					return total + (isNaN(num) ? 1 : num)
				}
			}
			return total + 1
		}, 0)
	})
	return {
		rowNumber: Math.max(...rowNumbers),
		columnNumber: Math.max(...columnNumbers)
	}
}

/**
 * Open API：判断元素是否符合指定的条件
 * @param element
 * @param config
 * @returns
 */
export const elementIsMatch = (element: AlexElement, config: ElementMatchConfigType) => {
	//默认是符合的
	let isMatch = true
	//如果存在parsedom判断并且parsedom不一样
	if (config.parsedom && (element.isText() || config.parsedom != element.parsedom)) {
		isMatch = false
	}
	//如果存在marks判断
	if (config.marks) {
		const hasMarks = Object.keys(config.marks).every(key => {
			if (element.hasMarks()) {
				if (config.marks![key] === true) {
					return element.marks!.hasOwnProperty(key)
				}
				return element.marks![key] == config.marks![key]
			}
			return false
		})
		//如果不是所有的mark都有
		if (!hasMarks) {
			isMatch = false
		}
	}
	//如果存在styles判断
	if (config.styles) {
		const hasStyles = Object.keys(config.styles).every(key => {
			if (element.hasStyles()) {
				if (config.styles![key] === true) {
					return element.styles!.hasOwnProperty(key)
				}
				return element.styles![key] == config.styles![key]
			}
			return false
		})
		//如果不是所有的styles都有
		if (!hasStyles) {
			isMatch = false
		}
	}
	return isMatch
}

/**
 * Open API：判断元素是否在符合条件的元素下，如果是返回符合条件的元素，否则返回null
 * @param element
 * @param config
 * @returns
 */
export const getMatchElementByElement = (element: AlexElement, config: ElementMatchConfigType): AlexElement | null => {
	if (element.isBlock()) {
		return elementIsMatch(element, config) ? element : null
	}
	if (elementIsMatch(element, config)) {
		return element
	}
	return getMatchElementByElement(element.parent!, config)
}

/**
 * Open API：判断光标范围内的元素是否在同一个符合条件的元素下，如果是返回那个符合条件的元素，否则返回null
 * @param editor
 * @param dataRangeCaches
 * @param config
 * @returns
 */
export const getMatchElementByRange = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, config: ElementMatchConfigType) => {
	if (!editor.range) {
		return null
	}
	if (editor.range.anchor.element.isEqual(editor.range.focus.element)) {
		return getMatchElementByElement(editor.range.anchor.element, config)
	}
	const arr = dataRangeCaches.list.map(item => {
		return getMatchElementByElement(item.element, config)
	})
	let hasNull = arr.some(el => {
		return el == null
	})
	//如果存在null，则表示有的选区元素不在符合条件的元素下，返回null
	if (hasNull) {
		return null
	}
	//如果只有一个元素，则返回该元素
	if (arr.length == 1) {
		return arr[0]!
	}
	//默认数组中的元素都相等
	let flag = true
	for (let i = 1; i < arr.length; i++) {
		if (!arr[i]!.isEqual(arr[0]!)) {
			flag = false
			break
		}
	}
	//如果相等，则返回该元素
	if (flag) {
		return arr[0]
	}
	//不相等返回null
	return null
}

/**
 * Open API：判断元素是否有序或者无序列表
 * @param element
 * @param ordered
 * @returns
 */
export const isList = (element: AlexElement, ordered: boolean | undefined = false) => {
	if (element.isEmpty()) {
		return false
	}
	return element.parsedom == 'div' && element.hasMarks() && element.marks!['data-editify-list'] == (ordered ? 'ol' : 'ul')
}

/**
 * Open API：判断元素是否任务列表
 * @param element
 * @returns
 */
export const isTask = (element: AlexElement) => {
	if (element.isEmpty()) {
		return false
	}
	return element.parsedom == 'div' && element.hasMarks() && element.marks!.hasOwnProperty('data-editify-task')
}

/**
 * Open API：判断元素是否在有序列表或者无序列表下
 * @param element
 * @param ordered
 * @returns
 */
export const elementIsInList = (element: AlexElement, ordered: boolean): boolean => {
	if (isList(element, ordered)) {
		return true
	}
	if (element.parent) {
		return elementIsInList(element.parent, ordered)
	}
	return false
}

/**
 * Open API：判断元素是否在任务列表下
 * @param element
 * @returns
 */
export const elementIsInTask = (element: AlexElement): boolean => {
	if (isTask(element)) {
		return true
	}
	if (element.parent) {
		return elementIsInTask(element.parent)
	}
	return false
}

/**
 * Open API：选区是否含有代码块
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export const hasPreInRange = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => {
	if (!editor.range) {
		return false
	}
	if (editor.range.anchor.isEqual(editor.range.focus)) {
		return !!getMatchElementByElement(editor.range.anchor.element, { parsedom: 'pre' })
	}
	return dataRangeCaches.flatList.some(item => {
		return !!getMatchElementByElement(item.element, { parsedom: 'pre' })
	})
}

/**
 * Open API：选区是否含有引用
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export const hasQuoteInRange = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => {
	if (!editor.range) {
		return false
	}
	if (editor.range.anchor.isEqual(editor.range.focus)) {
		return !!getMatchElementByElement(editor.range.anchor.element, { parsedom: 'blockquote' })
	}
	return dataRangeCaches.flatList.some(item => {
		return !!getMatchElementByElement(item.element, { parsedom: 'blockquote' })
	})
}

/**
 * Open API：选区是否含有有序列表或者无序列表
 * @param editor
 * @param dataRangeCaches
 * @param ordered
 * @returns
 */
export const hasListInRange = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, ordered: boolean | undefined = false) => {
	if (!editor.range) {
		return false
	}
	if (editor.range.anchor.isEqual(editor.range.focus)) {
		return elementIsInList(editor.range.anchor.element, ordered)
	}
	return dataRangeCaches.flatList.some(item => {
		return elementIsInList(item.element, ordered)
	})
}

/**
 * Open API：选区是否含有任务列表
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export const hasTaskInRange = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => {
	if (!editor.range) {
		return false
	}
	if (editor.range.anchor.isEqual(editor.range.focus)) {
		return elementIsInTask(editor.range.anchor.element)
	}
	return dataRangeCaches.flatList.some(item => {
		return elementIsInTask(item.element)
	})
}

/**
 * Open API：选区是否含有链接
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export const hasLinkInRange = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => {
	if (!editor.range) {
		return false
	}
	if (editor.range.anchor.isEqual(editor.range.focus)) {
		return !!getMatchElementByElement(editor.range.anchor.element, { parsedom: 'a' })
	}
	return dataRangeCaches.flatList.some(item => {
		return !!getMatchElementByElement(item.element, { parsedom: 'a' })
	})
}

/**
 * Open API：选区是否含有表格
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export const hasTableInRange = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => {
	if (!editor.range) {
		return false
	}
	if (editor.range.anchor.isEqual(editor.range.focus)) {
		return !!getMatchElementByElement(editor.range.anchor.element, { parsedom: 'table' })
	}
	return dataRangeCaches.flatList.some(item => {
		return !!getMatchElementByElement(item.element, { parsedom: 'table' })
	})
}

/**
 * Open API：选区是否含有图片
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export const hasImageInRange = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => {
	if (!editor.range) {
		return false
	}
	if (editor.range.anchor.isEqual(editor.range.focus)) {
		return !!getMatchElementByElement(editor.range.anchor.element, { parsedom: 'img' })
	}
	return dataRangeCaches.flatList.some(item => {
		return !!getMatchElementByElement(item.element, { parsedom: 'img' })
	})
}

/**
 * Open API：选区是否含有视频
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export const hasVideoInRange = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => {
	if (!editor.range) {
		return false
	}
	if (editor.range.anchor.isEqual(editor.range.focus)) {
		return !!getMatchElementByElement(editor.range.anchor.element, { parsedom: 'video' })
	}
	return dataRangeCaches.flatList.some(item => {
		return !!getMatchElementByElement(item.element, { parsedom: 'video' })
	})
}

/**
 * Open API：选区是否全部在引用内
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export const isRangeInQuote = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => {
	if (!editor.range) {
		return false
	}
	if (editor.range.anchor.isEqual(editor.range.focus)) {
		return !!getMatchElementByElement(editor.range.anchor.element, { parsedom: 'blockquote' })
	}
	return dataRangeCaches.list.every(item => {
		return !!getMatchElementByElement(item.element, { parsedom: 'blockquote' })
	})
}

/**
 * Open API：选区是否全部在有序列表或者无序列表内
 * @param editor
 * @param dataRangeCaches
 * @param ordered
 * @returns
 */
export const isRangeInList = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, ordered: boolean | undefined = false) => {
	if (!editor.range) {
		return false
	}
	if (editor.range.anchor.isEqual(editor.range.focus)) {
		return elementIsInList(editor.range.anchor.element, ordered)
	}
	return dataRangeCaches.list.every(item => {
		return elementIsInList(item.element, ordered)
	})
}

/**
 * Open API：选区是否全部在任务列表里
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export const isRangeInTask = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => {
	if (!editor.range) {
		return false
	}
	if (editor.range.anchor.isEqual(editor.range.focus)) {
		return elementIsInTask(editor.range.anchor.element)
	}
	return dataRangeCaches.list.every(item => {
		return elementIsInTask(item.element)
	})
}

/**
 * Open API：查询光标所在的文本元素是否具有某个样式
 * @param editor
 * @param dataRangeCaches
 * @param name
 * @param value
 * @returns
 */
export const queryTextStyle = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, name: string, value?: string | number) => {
	if (!editor.range) {
		return false
	}
	//起点和终点在一起
	if (editor.range.anchor.isEqual(editor.range.focus)) {
		//如果是文本元素并且具有样式
		if (editor.range.anchor.element.isText() && editor.range.anchor.element.hasStyles()) {
			return queryHasValue(editor.range.anchor.element.styles!, name, value)
		}
		//不是文本元素或者没有样式直接返回
		return false
	}
	//起点和终点不在一起获取选区中的文本元素
	let result = dataRangeCaches.flatList.filter(item => {
		return item.element.isText()
	})
	//如果不包含文本元素直接返回false
	if (result.length == 0) {
		return false
	}
	//判断每个文本元素是否都具有该样式
	let flag = result.every(item => {
		//文本元素含有样式进一步判断
		if (item.element.hasStyles()) {
			return queryHasValue(item.element.styles!, name, value)
		}
		//文本元素没有样式直接返回false
		return false
	})
	return flag
}

/**
 * Open API：查询光标所在的文本元素是否具有某个标记
 * @param editor
 * @param dataRangeCaches
 * @param name
 * @param value
 * @returns
 */
export const queryTextMark = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, name: string, value?: string | number) => {
	if (!editor.range) {
		return false
	}
	//起点和终点在一起
	if (editor.range.anchor.isEqual(editor.range.focus)) {
		//如果是文本元素并且具有标记
		if (editor.range.anchor.element.isText() && editor.range.anchor.element.hasMarks()) {
			return queryHasValue(editor.range.anchor.element.marks!, name, value)
		}
		//不是文本元素或者没有标记直接返回
		return false
	}
	//起点和终点不在一起获取选区中的文本元素
	let result = dataRangeCaches.flatList.filter(item => {
		return item.element.isText()
	})
	//如果不包含文本元素直接返回false
	if (result.length == 0) {
		return false
	}
	//判断每个文本元素是否都具有该标记
	let flag = result.every(item => {
		//文本元素含有标记进一步判断
		if (item.element.hasMarks()) {
			return queryHasValue(item.element.marks!, name, value)
		}
		//文本元素没有标记直接返回false
		return false
	})
	return flag
}

/**
 * Open API：获取选区内的文字内容，用于预置链接文字
 * @param dataRangeCaches
 * @returns
 */
export const getRangeText = (dataRangeCaches: AlexElementsRangeType) => {
	//存在选区的情况下预置链接文本值
	let text = ''
	dataRangeCaches.flatList.forEach(item => {
		if (item.element.isText()) {
			if (item.offset) {
				text += item.element.textContent!.substring(item.offset[0], item.offset[1])
			} else {
				text += item.element.textContent || ''
			}
		}
	})
	return text
}

/**
 * 获取光标选取内的扁平化元素数组(可能会分割文本元素导致stack变更，同时也会更新选取元素和光标位置)
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export const getFlatElementsByRange = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => {
	if (!editor.range) {
		return []
	}
	//获取选区数据的长度
	let length = dataRangeCaches.flatList.length
	//返回的元素数组
	let elements = []
	//遍历选区数据
	for (let i = 0; i < length; i++) {
		const item = dataRangeCaches.flatList[i]
		//如果存在offset那么一定是文本元素
		if (item.offset) {
			let selectEl = null
			//文本元素前面一部分在光标范围内
			if (item.offset[0] == 0 && item.offset[1] < item.element.textContent!.length) {
				const el = item.element.clone()
				item.element.textContent = item.element.textContent!.substring(0, item.offset[1])
				el.textContent = el.textContent!.substring(item.offset[1])
				editor.addElementAfter(el, item.element)
				selectEl = item.element
			}
			//文本元素后面一部分在光标范围内
			else if (item.offset[1] == item.element.textContent!.length && item.offset[0] > 0) {
				const el = item.element.clone()
				item.element.textContent = item.element.textContent!.substring(0, item.offset[0])
				el.textContent = el.textContent!.substring(item.offset[0])
				editor.addElementAfter(el, item.element)
				selectEl = el
			}
			//文本元素的中间一部分在光标范围内
			else if (item.offset[0] > 0 && item.offset[1] < item.element.textContent!.length) {
				const el = item.element.clone()
				const el2 = item.element.clone()
				item.element.textContent = item.element.textContent!.substring(0, item.offset[0])
				el.textContent = el.textContent!.substring(item.offset[0], item.offset[1])
				el2.textContent = el2.textContent!.substring(item.offset[1])
				editor.addElementAfter(el, item.element)
				editor.addElementAfter(el2, el)
				selectEl = el
			}
			//如果selectEl存在证明文本元素被分割了
			if (selectEl) {
				//如果i为0的话肯定是起点
				if (i == 0) {
					editor.range.anchor.moveToStart(selectEl)
				}
				//如果i是最后一个序列的话肯定是终点
				if (i == length - 1) {
					editor.range.focus.moveToEnd(selectEl)
				}
				elements.push(selectEl)
			}
		} else {
			elements.push(item.element)
		}
	}
	return elements
}

/**
 * 将某个元素转为段落标签
 * @param element
 */
export const elementToParagraph = (element: AlexElement) => {
	element.marks = null
	element.styles = null
	element.parsedom = AlexElement.BLOCK_NODE
}

/**
 * 其他元素转为有序或者无序列表
 * @param element
 * @param ordered
 * @returns
 */
export const elementToList = (element: AlexElement, ordered: boolean | undefined = false) => {
	//如果是列表则返回
	if (isList(element, ordered)) {
		return
	}
	//先转为段落
	elementToParagraph(element)
	//然后转为列表
	element.parsedom = 'div'
	if (!element.hasMarks()) {
		element.marks = {}
	}
	element.marks!['data-editify-list'] = ordered ? 'ol' : 'ul'
}

/**
 * 其他元素转为任务列表
 * @param element
 * @returns
 */
export const elementToTask = (element: AlexElement) => {
	//如果是任务列表则返回
	if (isTask(element)) {
		return
	}
	//先转为段落
	elementToParagraph(element)
	//然后转为任务列表
	element.parsedom = 'div'
	if (!element.hasMarks()) {
		element.marks = {}
	}
	element.marks!['data-editify-task'] = 'uncheck'
}

/**
 * 设置标题
 * @param editor
 * @param dataRangeCaches
 * @param editTrans
 * @param parsedom
 * @returns
 */
export const setHeading = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, editTrans: (key: string) => any, parsedom: string) => {
	if (!editor.range) {
		return
	}
	const values = getButtonOptionsConfig(editTrans).heading!.map(item => {
		return (<ButtonOptionsItemType>item).value
	})
	if (!values.includes(parsedom)) {
		throw new Error('The parameter supports only h1-h6 and p')
	}
	if (editor.range.anchor.isEqual(editor.range.focus)) {
		const block = editor.range.anchor.element.getBlock()
		//先转为段落
		elementToParagraph(block)
		//设置标题
		block.parsedom = parsedom
	} else {
		dataRangeCaches.list.forEach(el => {
			if (el.element.isBlock()) {
				elementToParagraph(el.element)
				el.element.parsedom = parsedom
			} else {
				const block = el.element.getBlock()
				elementToParagraph(block)
				block.parsedom = parsedom
			}
		})
	}
}

/**
 * Open API：根级块元素或者内部块元素增加缩进
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export const setIndentIncrease = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => {
	if (!editor.range) {
		return
	}
	const fn = (element: AlexElement) => {
		if (element.hasStyles()) {
			if (element.styles!.hasOwnProperty('text-indent')) {
				let val = element.styles!['text-indent']
				if (val.endsWith('em')) {
					val = parseFloat(val)
				} else {
					val = 0
				}
				element.styles!['text-indent'] = `${val + 2}em`
			} else {
				element.styles!['text-indent'] = '2em'
			}
		} else {
			element.styles = {
				'text-indent': '2em'
			}
		}
	}
	if (editor.range.anchor.isEqual(editor.range.focus)) {
		const block = editor.range.anchor.element.getBlock()
		const inblock = editor.range.anchor.element.getInblock()
		if (inblock && inblock.behavior == 'block' && !inblock.isPreStyle()) {
			fn(inblock)
		} else if (!block.isPreStyle()) {
			fn(block)
		}
	} else {
		dataRangeCaches.list.forEach(item => {
			const block = item.element.getBlock()
			const inblock = item.element.getInblock()
			if (inblock && inblock.behavior == 'block' && !inblock.isPreStyle()) {
				fn(inblock)
			} else if (!block.isPreStyle()) {
				fn(block)
			}
		})
	}
}

/**
 * Open API：根级块元素或者内部块元素减少缩进
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export const setIndentDecrease = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => {
	if (!editor.range) {
		return
	}
	const fn = (element: AlexElement) => {
		if (element.hasStyles() && element.styles!.hasOwnProperty('text-indent')) {
			let val = element.styles!['text-indent']
			if (val.endsWith('em')) {
				val = parseFloat(val)
			} else {
				val = 0
			}
			element.styles!['text-indent'] = `${val - 2 >= 0 ? val - 2 : 0}em`
		}
	}
	if (editor.range.anchor.isEqual(editor.range.focus)) {
		const block = editor.range.anchor.element.getBlock()
		const inblock = editor.range.anchor.element.getInblock()
		if (inblock && inblock.behavior == 'block' && !inblock.isPreStyle()) {
			fn(inblock)
		} else if (!block.isPreStyle()) {
			fn(block)
		}
	} else {
		dataRangeCaches.list.forEach(item => {
			const block = item.element.getBlock()
			const inblock = item.element.getInblock()
			if (inblock && inblock.behavior == 'block' && !inblock.isPreStyle()) {
				fn(inblock)
			} else if (!block.isPreStyle()) {
				fn(block)
			}
		})
	}
}

/**
 * Open API：插入或者取消引用
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export const setQuote = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => {
	if (!editor.range) {
		return
	}
	//是否都在引用里
	const flag = isRangeInQuote(editor, dataRangeCaches)
	//起点和终点在一起
	if (editor.range.anchor.isEqual(editor.range.focus)) {
		const block = editor.range.anchor.element.getBlock()
		elementToParagraph(block)
		if (!flag) {
			block.parsedom = 'blockquote'
		}
	}
	//起点和终点不在一起
	else {
		let blocks: AlexElement[] = []
		dataRangeCaches.list.forEach(item => {
			const block = item.element.getBlock()
			const exist = blocks.some(el => block.isEqual(el))
			if (!exist) {
				blocks.push(block)
			}
		})
		blocks.forEach(block => {
			elementToParagraph(block)
			if (!flag) {
				block.parsedom = 'blockquote'
			}
		})
	}
}

/**
 * Open API：设置对齐方式
 * @param editor
 * @param dataRangeCaches
 * @param value 取值justify/left/right/center
 * @returns
 */
export const setAlign = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, value: 'justify' | 'left' | 'right' | 'center') => {
	if (!editor.range) {
		return
	}
	if (editor.range.anchor.isEqual(editor.range.focus)) {
		const block = editor.range.anchor.element.getBlock()
		const inblock = editor.range.anchor.element.getInblock()
		if (inblock) {
			if (inblock.hasStyles()) {
				inblock.styles!['text-align'] = value
			} else {
				inblock.styles = {
					'text-align': value
				}
			}
		} else {
			if (block.hasStyles()) {
				block.styles!['text-align'] = value
			} else {
				block.styles = {
					'text-align': value
				}
			}
		}
	} else {
		dataRangeCaches.list.forEach(el => {
			if (el.element.isBlock() || el.element.isInblock()) {
				if (el.element.hasStyles()) {
					el.element.styles!['text-align'] = value
				} else {
					el.element.styles = {
						'text-align': value
					}
				}
			} else {
				const block = el.element.getBlock()
				const inblock = el.element.getInblock()
				if (inblock) {
					if (inblock.hasStyles()) {
						inblock.styles!['text-align'] = value
					} else {
						inblock.styles = {
							'text-align': value
						}
					}
				} else {
					if (block.hasStyles()) {
						block.styles!['text-align'] = value
					} else {
						block.styles = {
							'text-align': value
						}
					}
				}
			}
		})
	}
}

/**
 * Open API：插入或者取消 有序或者无序列表
 * @param editor
 * @param dataRangeCaches
 * @param ordered 为true表示有序列表
 * @returns
 */
export const setList = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, ordered: boolean) => {
	if (!editor.range) {
		return
	}
	//是否都在列表内
	const flag = isRangeInList(editor, dataRangeCaches, ordered)
	//起点和终点在一起
	if (editor.range.anchor.isEqual(editor.range.focus)) {
		const block = editor.range.anchor.element.getBlock()
		if (flag) {
			elementToParagraph(block)
		} else {
			elementToList(block, ordered)
		}
	}
	//起点和终点不在一起
	else {
		let blocks: AlexElement[] = []
		dataRangeCaches.list.forEach(item => {
			const block = item.element.getBlock()
			const exist = blocks.some(el => block.isEqual(el))
			if (!exist) {
				blocks.push(block)
			}
		})
		blocks.forEach(block => {
			if (flag) {
				elementToParagraph(block)
			} else {
				elementToList(block, ordered)
			}
		})
	}
}

/**
 * Open API：插入或者取消任务列表
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export const setTask = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => {
	if (!editor.range) {
		return
	}
	//是否都在任务列表那
	const flag = isRangeInTask(editor, dataRangeCaches)
	//起点和终点在一起
	if (editor.range.anchor.isEqual(editor.range.focus)) {
		const block = editor.range.anchor.element.getBlock()
		if (flag) {
			elementToParagraph(block)
		} else {
			elementToTask(block)
		}
	}
	//起点和终点不在一起
	else {
		let blocks: AlexElement[] = []
		dataRangeCaches.list.forEach(item => {
			const block = item.element.getBlock()
			const exist = blocks.some(el => block.isEqual(el))
			if (!exist) {
				blocks.push(block)
			}
		})
		blocks.forEach(block => {
			if (flag) {
				elementToParagraph(block)
			} else {
				elementToTask(block)
			}
		})
	}
}

/**
 * Open API：设置文本元素的样式
 * @param editor
 * @param dataRangeCaches
 * @param styles 值为{ 'font-weight':'bold' }这类格式
 * @returns
 */
export const setTextStyle = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, styles: ObjectType) => {
	if (!editor.range) {
		return
	}
	//起点和终点在一起
	if (editor.range.anchor.isEqual(editor.range.focus)) {
		//如果是空白文本元素直接设置样式
		if (editor.range.anchor.element.isSpaceText()) {
			if (editor.range.anchor.element.hasStyles()) {
				Object.assign(editor.range.anchor.element.styles!, cloneData(styles))
			} else {
				editor.range.anchor.element.styles = cloneData(styles)
			}
		}
		//如果是文本元素
		else if (editor.range.anchor.element.isText()) {
			//新建一个空白文本元素
			const el = AlexElement.getSpaceElement()
			//继承文本元素的样式和标记
			el.styles = cloneData(editor.range.anchor.element.styles)
			el.marks = cloneData(editor.range.anchor.element.marks)
			//设置样式
			if (el.hasStyles()) {
				Object.assign(el.styles!, cloneData(styles))
			} else {
				el.styles = cloneData(styles)
			}
			//插入空白文本元素
			editor.insertElement(el)
		}
		//如果是自闭合元素
		else {
			const el = AlexElement.getSpaceElement()
			el.styles = cloneData(styles)
			editor.insertElement(el)
		}
	}
	//不在同一个点
	else {
		const elements = getFlatElementsByRange(editor, dataRangeCaches)
		elements.forEach(ele => {
			if (ele.isText()) {
				if (ele.hasStyles()) {
					Object.assign(ele.styles!, cloneData(styles))
				} else {
					ele.styles = cloneData(styles)
				}
			}
		})
	}
}

/**
 * Open API：设置文本元素的标记
 * @param editor
 * @param dataRangeCaches
 * @param marks 值为{ 'class':'a' }这类格式
 * @returns
 */
export const setTextMark = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, marks: ObjectType) => {
	if (!editor.range) {
		return
	}
	if (!DapCommon.isObject(marks)) {
		throw new Error('The argument must be an object')
	}
	//起点和终点在一起
	if (editor.range.anchor.isEqual(editor.range.focus)) {
		//如果是空白文本元素直接设置标记
		if (editor.range.anchor.element.isSpaceText()) {
			if (editor.range.anchor.element.hasMarks()) {
				Object.assign(editor.range.anchor.element.marks!, cloneData(marks))
			} else {
				editor.range.anchor.element.marks = cloneData(marks)
			}
		}
		//如果是文本元素
		else if (editor.range.anchor.element.isText()) {
			//新建一个空白文本元素
			const el = AlexElement.getSpaceElement()
			//继承文本元素的样式和标记
			el.styles = cloneData(editor.range.anchor.element.styles)
			el.marks = cloneData(editor.range.anchor.element.marks)
			//设置标记
			if (el.hasMarks()) {
				Object.assign(el.marks!, cloneData(marks))
			} else {
				el.marks = cloneData(marks)
			}
			//插入空白文本元素
			editor.insertElement(el)
		}
		//如果是自闭合元素
		else {
			const el = AlexElement.getSpaceElement()
			el.marks = cloneData(marks)
			editor.insertElement(el)
		}
	}
	//不在同一个点
	else {
		const elements = getFlatElementsByRange(editor, dataRangeCaches)
		elements.forEach(ele => {
			if (ele.isText()) {
				if (ele.hasMarks()) {
					Object.assign(ele.marks!, cloneData(marks))
				} else {
					ele.marks = cloneData(marks)
				}
			}
		})
	}
}

/**
 * Open API：移除文本元素的样式
 * @param editor
 * @param dataRangeCaches
 * @param styleNames 样式名称数组，如果不存在则移除全部样式
 * @returns
 */
export const removeTextStyle = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, styleNames?: string[]) => {
	if (!editor.range) {
		return
	}
	//移除样式的方法
	const removeFn = (el: AlexElement) => {
		//如果参数是数组，表示删除指定的样式
		if (Array.isArray(styleNames)) {
			if (el.hasStyles()) {
				let styles: ObjectType = {}
				Object.keys(el.styles!).forEach(key => {
					if (!styleNames.includes(key)) {
						styles[key] = el.styles![key]
					}
				})
				el.styles = styles
			}
		}
		//如果没有参数，则表示删除所有的样式
		else {
			el.styles = null
		}
	}
	//如果起点和终点在一起
	if (editor.range.anchor.isEqual(editor.range.focus)) {
		//如果是空白文本元素直接移除样式
		if (editor.range.anchor.element.isSpaceText()) {
			removeFn(editor.range.anchor.element)
		}
		//如果是文本元素则新建一个空白文本元素
		else if (editor.range.anchor.element.isText()) {
			const el = AlexElement.getSpaceElement()
			//继承文本元素的样式和标记
			el.styles = cloneData(editor.range.anchor.element.styles)
			el.marks = cloneData(editor.range.anchor.element.marks)
			//移除样式
			removeFn(el)
			//插入
			editor.insertElement(el)
		}
	}
	//起点和终点不在一起
	else {
		const elements = getFlatElementsByRange(editor, dataRangeCaches)
		elements.forEach(ele => {
			if (ele.isText()) {
				removeFn(ele)
			}
		})
	}
}

/**
 * Open API：移除文本元素的标记
 * @param editor
 * @param dataRangeCaches
 * @param markNames 标记名称数组，如果不存在则移除全部标记
 * @returns
 */
export const removeTextMark = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, markNames?: string[]) => {
	if (!editor.range) {
		return
	}
	//移除样式的方法
	const removeFn = (el: AlexElement) => {
		//如果参数是数组，表示删除指定的样式
		if (Array.isArray(markNames)) {
			if (el.hasMarks()) {
				let marks: ObjectType = {}
				Object.keys(el.marks!).forEach(key => {
					if (!markNames.includes(key)) {
						marks[key] = el.marks![key]
					}
				})
				el.marks = marks
			}
		}
		//如果没有参数，则表示删除所有的样式
		else {
			el.marks = null
		}
	}
	//如果起点和终点在一起
	if (editor.range.anchor.isEqual(editor.range.focus)) {
		//如果是空白文本元素直接移除标记
		if (editor.range.anchor.element.isSpaceText()) {
			removeFn(editor.range.anchor.element)
		}
		//如果是文本元素则新建一个空白文本元素
		else if (editor.range.anchor.element.isText()) {
			const el = AlexElement.getSpaceElement()
			//继承文本元素的样式和标记
			el.styles = cloneData(editor.range.anchor.element.styles)
			el.marks = cloneData(editor.range.anchor.element.marks)
			//移除标记
			removeFn(el)
			//插入
			editor.insertElement(el)
		}
	}
	//起点和终点不在一起
	else {
		const elements = getFlatElementsByRange(editor, dataRangeCaches)
		elements.forEach(ele => {
			if (ele.isText()) {
				removeFn(ele)
			}
		})
	}
}

/**
 * Open API：设置块元素或者根级块元素的行高
 * @param editor
 * @param dataRangeCaches
 * @param value
 * @returns
 */
export const setLineHeight = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType, value: string | number) => {
	if (!editor.range) {
		return
	}
	if (editor.range.anchor.isEqual(editor.range.focus)) {
		const block = editor.range.anchor.element.getBlock()
		const inblock = editor.range.anchor.element.getInblock()
		if (inblock) {
			if (inblock.hasStyles()) {
				inblock.styles!['line-height'] = value
			} else {
				inblock.styles = {
					'line-height': value
				}
			}
		} else {
			if (block.hasStyles()) {
				block.styles!['line-height'] = value
			} else {
				block.styles = {
					'line-height': value
				}
			}
		}
	} else {
		dataRangeCaches.list.forEach(el => {
			if (el.element.isBlock() || el.element.isInblock()) {
				if (el.element.hasStyles()) {
					el.element.styles!['line-height'] = value
				} else {
					el.element.styles = {
						'line-height': value
					}
				}
			} else {
				const block = el.element.getBlock()
				const inblock = el.element.getInblock()
				if (inblock) {
					if (inblock.hasStyles()) {
						inblock.styles!['line-height'] = value
					} else {
						inblock.styles = {
							'line-height': value
						}
					}
				} else {
					if (block.hasStyles()) {
						block.styles!['line-height'] = value
					} else {
						block.styles = {
							'line-height': value
						}
					}
				}
			}
		})
	}
}

/**
 * Open API：插入链接
 * @param editor
 * @param text 链接名称
 * @param url 链接地址
 * @param newOpen 是否新窗口打开
 * @returns
 */
export const insertLink = (editor: AlexEditor, text: string, url: string, newOpen: boolean) => {
	if (!editor.range) {
		return
	}
	if (!text) {
		text = url
	}
	const marks: ObjectType = {
		href: url
	}
	if (newOpen) {
		marks.target = '_blank'
	}
	const linkEle = AlexElement.create({
		type: 'inline',
		parsedom: 'a',
		marks,
		children: [
			{
				type: 'text',
				textcontent: text
			}
		]
	})
	editor.insertElement(linkEle)
}

/**
 * Open API：插入图片
 * @param editor
 * @param value 图片地址
 * @returns
 */
export const insertImage = (editor: AlexEditor, value: string) => {
	if (!editor.range) {
		return
	}
	const image = AlexElement.create({
		type: 'closed',
		parsedom: 'img',
		marks: {
			src: value
		}
	})
	editor.insertElement(image)
}

/**
 * Open API：插入视频
 * @param editor
 * @param value 视频地址
 * @returns
 */
export const insertVideo = (editor: AlexEditor, value: string) => {
	if (!editor.range) {
		return
	}
	const video = AlexElement.create({
		type: 'closed',
		parsedom: 'video',
		marks: {
			src: value
		}
	})
	editor.insertElement(video)
	editor.range.anchor.moveToEnd(video)
	editor.range.focus.moveToEnd(video)
}

/**
 * Open API：插入表格
 * @param editor
 * @param rowLength 表格行数
 * @param colLength 表格列数
 * @returns
 */
export const insertTable = (editor: AlexEditor, rowLength: number, colLength: number) => {
	if (!editor.range) {
		return
	}
	const rows: AlexElementCreateConfigType[] = []
	for (let i = 0; i < rowLength; i++) {
		const columns: AlexElementCreateConfigType[] = []
		for (let j = 0; j < colLength; j++) {
			columns.push({
				type: 'inblock',
				parsedom: 'td',
				children: [
					{
						type: 'closed',
						parsedom: 'br'
					}
				]
			})
		}
		rows.push({
			type: 'inblock',
			parsedom: 'tr',
			children: columns
		})
	}
	const table = AlexElement.create({
		type: 'block',
		parsedom: 'table',
		children: [
			{
				type: 'inblock',
				parsedom: 'tbody',
				children: rows
			}
		]
	})
	editor.insertElement(table)
	//在表格后创建一个段落
	const paragraph = AlexElement.create({
		type: 'block',
		parsedom: AlexElement.BLOCK_NODE,
		children: [
			{
				type: 'closed',
				parsedom: 'br'
			}
		]
	})
	editor.addElementAfter(paragraph, table)
	editor.range.anchor.moveToStart(table)
	editor.range.focus.moveToStart(table)
}

/**
 * Open API：插入或者取消代码块
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export const insertCodeBlock = (editor: AlexEditor, dataRangeCaches: AlexElementsRangeType) => {
	if (!editor.range) {
		return
	}
	const pre = getMatchElementByRange(editor, dataRangeCaches, { parsedom: 'pre' })
	if (pre) {
		let content = ''
		AlexElement.flatElements(pre.children!)
			.filter(item => {
				return item.isText()
			})
			.forEach(item => {
				content += item.textContent
			})
		const splits = content.split('\n')
		splits.forEach(item => {
			const paragraph = AlexElement.create({
				type: 'block',
				parsedom: AlexElement.BLOCK_NODE,
				children: [
					{
						type: 'text',
						textcontent: item
					}
				]
			})
			editor.addElementBefore(paragraph, pre)
		})
		pre.toEmpty()
	} else {
		//起点和终点在一起
		if (editor.range.anchor.isEqual(editor.range.focus)) {
			const block = editor.range.anchor.element.getBlock()
			elementToParagraph(block)
			block.parsedom = 'pre'
			const paragraph = AlexElement.create({
				type: 'block',
				parsedom: AlexElement.BLOCK_NODE,
				children: [
					{
						type: 'closed',
						parsedom: 'br'
					}
				]
			})
			editor.addElementAfter(paragraph, block)
		}
		//起点和终点不在一起
		else {
			editor.range.anchor.moveToStart(dataRangeCaches.list[0].element.getBlock())
			editor.range.focus.moveToEnd(dataRangeCaches.list[dataRangeCaches.list.length - 1].element.getBlock())
			const res = dataRangeCaches.flatList.filter(el => el.element.isText())
			const obj: ObjectType = {}
			res.forEach(el => {
				if (obj[el.element.getBlock().key]) {
					obj[el.element.getBlock().key].push(el.element.clone())
				} else {
					obj[el.element.getBlock().key] = [el.element.clone()]
				}
			})
			const pre = AlexElement.create({
				type: 'block',
				parsedom: 'pre'
			})
			Object.keys(obj).forEach((key, index) => {
				if (index > 0) {
					const text = AlexElement.create({
						type: 'text',
						textcontent: '\n'
					})
					if (pre.hasChildren()) {
						editor.addElementTo(text, pre, pre.children!.length)
					} else {
						editor.addElementTo(text, pre)
					}
				}
				obj[key].forEach((el: AlexElement) => {
					if (pre.hasChildren()) {
						editor.addElementTo(el, pre, pre.children!.length)
					} else {
						editor.addElementTo(el, pre)
					}
				})
			})
			editor.delete()
			editor.insertElement(pre)
			const paragraph = AlexElement.create({
				type: 'block',
				parsedom: AlexElement.BLOCK_NODE,
				children: [
					{
						type: 'closed',
						parsedom: 'br'
					}
				]
			})
			editor.addElementAfter(paragraph, pre)
		}
	}
}

/**
 * Open API：插入分隔线
 * @param editor
 * @param dataRangeCaches
 * @returns
 */
export const insertSeparator = (editor: AlexEditor) => {
	if (!editor.range) {
		return
	}
	const separator = AlexElement.create({
		type: 'closed',
		parsedom: 'hr'
	})
	editor.insertElement(separator)
	editor.range.anchor.moveToEnd(separator)
	editor.range.focus.moveToEnd(separator)
}

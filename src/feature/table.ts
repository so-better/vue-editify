import { computed, defineComponent, h, inject, PropType, ref, Ref } from 'vue'
import { AlexEditor, AlexElement, AlexElementsRangeType, AlexElementCreateConfigType } from 'alex-editor'
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'
import { getCellMergeElement, getCellSpanNumber, getMatchElementByElement, getMatchElementByRange, getTableSize, hasMathformulaInRange, hasPreInRange, hasTableInRange, insertTable, setTableCellMerged } from '@/core/function'
import { MenuTableButtonType } from '@/core/tool'
import { InsertTable } from '@/components/insertTable'

/**
 * feature名称
 */
const FEATURE_NAME = 'table'

/**
 * 工具栏 - 表格操作
 */
export const TableToolbar = defineComponent(
	(props, { emit }) => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const dataRangeCaches = inject<Ref<AlexElementsRangeType>>('dataRangeCaches')!
		const $editTrans = inject<(key: string) => any>('$editTrans')!

		//是否可以合并单元格
		const canMergeCells = computed<(type: 'left' | 'right' | 'up' | 'down') => boolean>(() => {
			return (type: 'left' | 'right' | 'up' | 'down') => {
				if (!editor.value.range) {
					return false
				}
				//光标所在单元格
				const cell = getMatchElementByElement(editor.value.range.focus.element, {
					parsedom: 'td'
				})
				//如果光标不在单元格内
				if (!cell) {
					return false
				}
				//判断是否可以向左合并
				if (type == 'left') {
					//是否可以向左合并
					let flag = false
					//当前单元格的rowspan
					const cellSpanNum = getCellSpanNumber(cell)
					//获取左侧单元格
					const previousColumn = editor.value.getPreviousElement(cell)
					//如果左侧单元格存在
					if (previousColumn) {
						//左侧单元格是隐藏的单元格
						if (previousColumn.hasMarks() && previousColumn.marks!['data-editify-merged']) {
							//获取合并该隐藏单元格的那个单元格
							const { crossColumnElement } = getCellMergeElement(editor.value, previousColumn)
							//如果是被跨列合并则判断跨列单元格占据的行数与当前单元格的行数是否一致
							if (crossColumnElement) {
								const { rowspan } = getCellSpanNumber(crossColumnElement)
								flag = rowspan == cellSpanNum.rowspan
							}
						}
						//左侧单元格不是隐藏的单元格
						else {
							//判断所占行数是否一致
							const { rowspan } = getCellSpanNumber(previousColumn)
							flag = rowspan == cellSpanNum.rowspan
						}
					}
					return flag
				}
				//判断是否可以向右合并
				if (type == 'right') {
					//是否可以向右合并
					let flag = false
					//当前单元格的rowspan
					const cellSpanNum = getCellSpanNumber(cell)
					//获取右侧的单元格
					let nextColumn = editor.value.getNextElement(cell)
					//如果右侧单元格存在
					while (nextColumn) {
						//右侧单元格是隐藏的单元格
						if (nextColumn.hasMarks() && nextColumn.marks!['data-editify-merged']) {
							//获取合并该隐藏单元格的那个单元格
							const { crossColumnElement } = getCellMergeElement(editor.value, nextColumn)
							//如果是被跨列合并的表示属于当前单元格内，继续向右查询
							if (crossColumnElement) {
								nextColumn = editor.value.getNextElement(nextColumn)
							}
							//被跨行合并的直接结束，不能向右合并
							else {
								break
							}
						}
						//右侧单元格不是隐藏的
						else {
							//判断行数是否与当前单元格一致
							const { rowspan } = getCellSpanNumber(nextColumn)
							//如果一致则可以合并
							flag = rowspan == cellSpanNum.rowspan
							//不管是否一致都直接结束
							break
						}
					}
					return flag
				}
				//判断是否可以向上合并
				if (type == 'up') {
					//是否可以向上合并
					let flag = false
					//当前单元格的colspan
					const cellSpanNum = getCellSpanNumber(cell)
					//获取单元格在行中的序列
					const index = cell.parent!.children!.findIndex(item => item.isEqual(cell))
					//获取上一行
					const previousRow = editor.value.getPreviousElement(cell.parent!)
					//如果上一行存在
					if (previousRow) {
						//获取上一行中对应序列的单元格
						const column = previousRow.children![index]
						//单元格是隐藏的单元格
						if (column.hasMarks() && column.marks!['data-editify-merged']) {
							//获取合并该隐藏单元格的那个单元格
							const { crossRowElement } = getCellMergeElement(editor.value, column)
							//如果是被跨行合并则判断跨列单元格占据的列数与当前单元格的列数是否一致
							if (crossRowElement) {
								const { colspan } = getCellSpanNumber(crossRowElement)
								flag = colspan == cellSpanNum.colspan
							}
						}
						//单元格不是隐藏的单元格
						else {
							//判断所占列数是否一致
							const { colspan } = getCellSpanNumber(column)
							flag = colspan == cellSpanNum.colspan
						}
					}
					return flag
				}
				//判断是否可以向下合并
				if (type == 'down') {
					//是否可以向下合并
					let flag = false
					//当前单元格的colspan
					const cellSpanNum = getCellSpanNumber(cell)
					//获取单元格在行中的序列
					const index = cell.parent!.children!.findIndex(item => item.isEqual(cell))
					//获取下一行
					let nextRow = editor.value.getNextElement(cell.parent!)
					//如果下一行存在
					while (nextRow) {
						//获取下一行中对应序列的单元格
						const column = nextRow.children![index]
						//单元格是隐藏的单元格
						if (column.hasMarks() && column.marks!['data-editify-merged']) {
							//获取合并该隐藏单元格的那个单元格
							const { crossRowElement } = getCellMergeElement(editor.value, column)
							//如果是被跨行合并的表示属于当前单元格内，继续向下查询
							if (crossRowElement) {
								nextRow = editor.value.getNextElement(nextRow)
							}
							//被跨列合并的直接结束，不能向右合并
							else {
								break
							}
						}
						//单元格不是隐藏的
						else {
							//判断列数是否与当前单元格一致
							const { colspan } = getCellSpanNumber(column)
							//如果一致则可以合并
							flag = colspan == cellSpanNum.colspan
							//不管是否一致都直接结束
							break
						}
					}
					return flag
				}
				return false
			}
		})

		//表格前后插入段落
		const insertParagraphWithTable = (type: 'up' | 'down' | undefined = 'up') => {
			const table = getMatchElementByRange(editor.value, dataRangeCaches.value, { parsedom: 'table' })
			if (table) {
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
				if (type == 'up') {
					editor.value.addElementBefore(paragraph, table)
				} else {
					editor.value.addElementAfter(paragraph, table)
				}
				editor.value.range!.anchor.moveToEnd(paragraph)
				editor.value.range!.focus.moveToEnd(paragraph)
				editor.value.domRender()
				editor.value.rangeRender()
			}
		}
		//表格前后插入行
		const insertTableRow = (type: 'up' | 'down' | undefined = 'up') => {
			if (!editor.value.range!.anchor.isEqual(editor.value.range!.focus)) {
				editor.value.range!.anchor.element = editor.value.range!.focus.element
				editor.value.range!.anchor.offset = editor.value.range!.focus.offset
			}
			const cell = getMatchElementByRange(editor.value, dataRangeCaches.value, { parsedom: 'td' })
			if (cell) {
				const { rowspan } = getCellSpanNumber(cell)
				let row = cell.parent!
				const tbody = row.parent!
				if (type == 'down') {
					let i = 1
					while (i < rowspan) {
						row = editor.value.getNextElement(row)!
						i++
					}
				}
				const { columnNumber } = getTableSize(tbody.children!)
				const children: AlexElementCreateConfigType[] = []
				for (let i = 0; i < columnNumber; i++) {
					children.push({
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
				const newRow = AlexElement.create({
					type: 'inblock',
					parsedom: 'tr',
					children
				})
				if (type == 'up') {
					editor.value.addElementBefore(newRow, row)
				} else {
					editor.value.addElementAfter(newRow, row)
				}
				//重置光标
				editor.value.range!.anchor.moveToStart(newRow)
				editor.value.range!.focus.moveToStart(newRow)
				//渲染
				editor.value.domRender()
				editor.value.rangeRender()
				//更新工具条位置
				setTimeout(() => {
					emit('reset-toolbar')
				}, 0)
			}
		}
		//表格前后插入列
		const insertTableColumn = (type: 'left' | 'right' | undefined = 'left') => {
			if (!editor.value.range!.anchor.isEqual(editor.value.range!.focus)) {
				editor.value.range!.anchor.element = editor.value.range!.focus.element
				editor.value.range!.anchor.offset = editor.value.range!.focus.offset
			}
			const column = getMatchElementByRange(editor.value, dataRangeCaches.value, { parsedom: 'td' })
			if (column) {
				const row = column.parent!
				const tbody = row.parent!
				const table = tbody.parent!
				const rows = tbody.children
				const index = row.children!.findIndex(item => {
					return item.isEqual(column)
				})
				//插入列
				rows!.forEach(item => {
					const newColumn = AlexElement.create({
						type: 'inblock',
						parsedom: 'td',
						children: [
							{
								type: 'closed',
								parsedom: 'br'
							}
						]
					})
					if (type == 'left') {
						editor.value.addElementTo(newColumn, item, index)
					} else {
						editor.value.addElementTo(newColumn, item, index + 1)
					}
				})
				//插入col
				const colgroup = table.children!.find(item => {
					return item.parsedom == 'colgroup'
				})!
				const col = AlexElement.create({
					type: 'closed',
					parsedom: 'col'
				})
				if (type == 'left') {
					editor.value.addElementTo(col, colgroup, index)
				} else {
					editor.value.addElementTo(col, colgroup, index + 1)
				}
				if (type == 'left') {
					const previousColumn = editor.value.getPreviousElement(column)!
					editor.value.range!.anchor.moveToStart(previousColumn)
					editor.value.range!.focus.moveToStart(previousColumn)
				} else {
					const nextColumn = editor.value.getNextElement(column)!
					editor.value.range!.anchor.moveToStart(nextColumn)
					editor.value.range!.focus.moveToStart(nextColumn)
				}
				//渲染
				editor.value.domRender()
				editor.value.rangeRender()
			}
		}
		//删除表格
		const deleteTable = () => {
			const element = getMatchElementByRange(editor.value, dataRangeCaches.value, { parsedom: 'table' })
			if (element) {
				element.toEmpty()
				editor.value.domRender()
				editor.value.rangeRender()
			}
		}
		//删除表格行
		const deleteTableRow = () => {
			if (!editor.value.range!.anchor.isEqual(editor.value.range!.focus)) {
				editor.value.range!.anchor.element = editor.value.range!.focus.element
				editor.value.range!.anchor.offset = editor.value.range!.focus.offset
			}
			const column = getMatchElementByRange(editor.value, dataRangeCaches.value, { parsedom: 'td' })
			if (column) {
				//光标所在行
				const row = column.parent!
				//如果只有一行则删除表格
				if (row.parent!.children!.length == 1) {
					deleteTable()
					return
				}
				//光标所在的单元格在行中的序列
				const index = row.children!.findIndex(item => {
					return item.isEqual(column)
				})
				//上一行
				const previousRow = editor.value.getPreviousElement(row)
				//下一行
				const nextRow = editor.value.getNextElement(row)
				//遍历行中的每一个单元格
				row.children!.forEach((item, i) => {
					//获取单元格占的行数
					const itemSpanNum = getCellSpanNumber(item)
					//是隐藏的单元格
					if (item.hasMarks() && item.marks!['data-editify-merged']) {
						const { crossRowElement } = getCellMergeElement(editor.value, item)
						//如果是被跨行单元格合并的
						if (crossRowElement) {
							const { rowspan } = getCellSpanNumber(crossRowElement)
							if (rowspan - 1 == 1) {
								delete crossRowElement.marks!['rowspan']
							} else {
								crossRowElement.marks!['rowspan'] = rowspan - 1
							}
						}
					}
					//是跨行的单元格
					else if (itemSpanNum.rowspan > 1) {
						//获取下一行
						let el = editor.value.getNextElement(row)
						if (el && itemSpanNum.rowspan - 1 > 1) {
							if (el.children![i].hasMarks()) {
								el.children![i].marks!['rowspan'] = itemSpanNum.rowspan - 1
							} else {
								el.children![i].marks = {
									rowspan: itemSpanNum.rowspan - 1
								}
							}
						}
					}
				})
				//删除行
				row.toEmpty()
				//重置光标
				if (previousRow) {
					editor.value.range!.anchor.moveToEnd(previousRow.children![index])
					editor.value.range!.focus.moveToEnd(previousRow.children![index])
				} else {
					editor.value.range!.anchor.moveToEnd(nextRow!.children![index])
					editor.value.range!.focus.moveToEnd(nextRow!.children![index])
				}
				//渲染
				editor.value.domRender()
				editor.value.rangeRender()
				//更新工具条位置
				setTimeout(() => {
					emit('reset-toolbar')
				}, 0)
			}
		}
		//删除表格列
		const deleteTableColumn = () => {
			if (!editor.value.range!.anchor.isEqual(editor.value.range!.focus)) {
				editor.value.range!.anchor.element = editor.value.range!.focus.element
				editor.value.range!.anchor.offset = editor.value.range!.focus.offset
			}
			const column = getMatchElementByRange(editor.value, dataRangeCaches.value, { parsedom: 'td' })
			if (column) {
				//光标所在行
				const row = column.parent!
				//所有的行元素
				const rows = row.parent!.children!
				//表格元素
				const table = row.parent!.parent!
				//如果光标所在行只有一个单元格则删除表格
				if (row.children!.length == 1) {
					deleteTable()
					return
				}
				//光标所在的单元格在行中的序列
				const index = row.children!.findIndex(item => {
					return item.isEqual(column)
				})
				//前一个单元格
				const previousColumn = editor.value.getPreviousElement(column)
				//后一个单元格
				const nextColumn = editor.value.getNextElement(column)
				//遍历所有的行元素
				rows.forEach(item => {
					//对应序列的单元格
					const cell = item.children![index]
					const cellSpanNum = getCellSpanNumber(cell)
					//是隐藏的单元格
					if (cell.hasMarks() && cell.marks!['data-editify-merged']) {
						const { crossColumnElement } = getCellMergeElement(editor.value, cell)
						//如果是被跨列单元格合并的
						if (crossColumnElement) {
							const { colspan } = getCellSpanNumber(crossColumnElement)
							if (colspan - 1 == 1) {
								delete crossColumnElement.marks!['colspan']
							} else {
								crossColumnElement.marks!['colspan'] = colspan - 1
							}
						}
					}
					//跨列的单元格
					else if (cellSpanNum.colspan > 1) {
						//获取下一个单元格
						let el = editor.value.getNextElement(cell)
						if (el && cellSpanNum.colspan - 1 > 1) {
							if (el.hasMarks()) {
								el.marks!['colspan'] = cellSpanNum.colspan - 1
							} else {
								el.marks = {
									colspan: cellSpanNum.colspan - 1
								}
							}
						}
					}
					cell.toEmpty()
				})
				//删除col
				const colgroup = table.children!.find(item => {
					return item.parsedom == 'colgroup'
				})!
				colgroup.children![index].toEmpty()
				if (previousColumn) {
					editor.value.range!.anchor.moveToEnd(previousColumn)
					editor.value.range!.focus.moveToEnd(previousColumn)
				} else {
					editor.value.range!.anchor.moveToEnd(nextColumn!)
					editor.value.range!.focus.moveToEnd(nextColumn!)
				}
				//渲染
				editor.value.domRender()
				editor.value.rangeRender()
			}
		}
		//合并单元格
		const mergeCells = (type: 'left' | 'right' | 'up' | 'down') => {
			if (!canMergeCells.value(type)) {
				return
			}
			if (!editor.value.range!.anchor.isEqual(editor.value.range!.focus)) {
				editor.value.range!.anchor.element = editor.value.range!.focus.element
				editor.value.range!.anchor.offset = editor.value.range!.focus.offset
			}
			const column = getMatchElementByRange(editor.value, dataRangeCaches.value, { parsedom: 'td' })
			if (column) {
				//向左合并单元格
				if (type == 'left') {
					//当前单元格所占行数和列数
					const cellSpanNum = getCellSpanNumber(column)
					//获取左侧单元格
					const previousColumn = editor.value.getPreviousElement(column)
					//如果左侧单元格存在
					if (previousColumn) {
						//左侧单元格是隐藏的单元格
						if (previousColumn.hasMarks() && previousColumn.marks!['data-editify-merged']) {
							//获取合并该隐藏单元格的那个单元格
							const { crossColumnElement } = getCellMergeElement(editor.value, previousColumn)
							//如果是被跨列合并则判断跨列单元格占据的行数与当前单元格的行数是否一致
							if (crossColumnElement) {
								const { rowspan, colspan } = getCellSpanNumber(crossColumnElement)
								//进行合并
								if (rowspan == cellSpanNum.rowspan) {
									crossColumnElement.marks!['colspan'] = colspan + cellSpanNum.colspan
									column.children!.forEach(item => {
										crossColumnElement.children!.push(item)
										item.parent = crossColumnElement
									})
									setTableCellMerged(column)
									editor.value.range!.anchor.moveToEnd(crossColumnElement)
									editor.value.range!.focus.moveToEnd(crossColumnElement)
									editor.value.domRender()
									editor.value.rangeRender()
								}
							}
						}
						//左侧单元格不是隐藏的单元格
						else {
							//判断所占行数是否一致
							const { rowspan, colspan } = getCellSpanNumber(previousColumn)
							//进行合并
							if (rowspan == cellSpanNum.rowspan) {
								if (previousColumn.hasMarks()) {
									previousColumn.marks!['colspan'] = colspan + cellSpanNum.colspan
								} else {
									previousColumn.marks = {
										colspan: colspan + cellSpanNum.colspan
									}
								}
								column.children!.forEach(item => {
									previousColumn.children!.push(item)
									item.parent = previousColumn
								})
								setTableCellMerged(column)
								editor.value.range!.anchor.moveToEnd(previousColumn)
								editor.value.range!.focus.moveToEnd(previousColumn)
								editor.value.domRender()
								editor.value.rangeRender()
							}
						}
					}
				}
				//向右合并单元格
				else if (type == 'right') {
					//当前单元格所占行数和列数
					const cellSpanNum = getCellSpanNumber(column)
					//获取右侧的单元格
					let nextColumn = editor.value.getNextElement(column)
					//如果右侧单元格存在
					while (nextColumn) {
						//右侧单元格是隐藏的单元格
						if (nextColumn.hasMarks() && nextColumn.marks!['data-editify-merged']) {
							//获取合并该隐藏单元格的那个单元格
							const { crossColumnElement } = getCellMergeElement(editor.value, nextColumn)
							//如果是被跨列合并的表示属于当前单元格内，继续向右查询
							if (crossColumnElement) {
								nextColumn = editor.value.getNextElement(nextColumn)
							}
							//被跨行合并的直接结束，不能向右合并
							else {
								break
							}
						}
						//右侧单元格不是隐藏的
						else {
							//判断行数是否与当前单元格一致
							const { rowspan, colspan } = getCellSpanNumber(nextColumn)
							//如果一致则可以合并
							if (rowspan == cellSpanNum.rowspan) {
								if (column.hasMarks()) {
									column.marks!['colspan'] = cellSpanNum.colspan + colspan
								} else {
									column.marks = {
										colspan: cellSpanNum.colspan + colspan
									}
								}
								nextColumn.children!.forEach(item => {
									column.children!.push(item)
									item.parent = column
								})
								setTableCellMerged(nextColumn)
								editor.value.range!.anchor.moveToEnd(column)
								editor.value.range!.focus.moveToEnd(column)
								editor.value.domRender()
								editor.value.rangeRender()
							}
							//不管是否一致都直接结束
							break
						}
					}
				}
				//向上合并单元格
				else if (type == 'up') {
					//当前单元格所占行数和列数
					const cellSpanNum = getCellSpanNumber(column)
					//获取单元格在行中的序列
					const index = column.parent!.children!.findIndex(item => item.isEqual(column))
					//获取上一行
					const previousRow = editor.value.getPreviousElement(column.parent!)
					//如果上一行存在
					if (previousRow) {
						//获取上一行中对应序列的单元格
						const previousColumn = previousRow.children![index]
						//单元格是隐藏的单元格
						if (previousColumn.hasMarks() && previousColumn.marks!['data-editify-merged']) {
							//获取合并该隐藏单元格的那个单元格
							const { crossRowElement } = getCellMergeElement(editor.value, previousColumn)
							//如果是被跨行合并则判断跨列单元格占据的列数与当前单元格的列数是否一致
							if (crossRowElement) {
								const { rowspan, colspan } = getCellSpanNumber(crossRowElement)
								//进行合并
								if (colspan == cellSpanNum.colspan) {
									crossRowElement.marks!['rowspan'] = rowspan + cellSpanNum.rowspan
									column.children!.forEach(item => {
										crossRowElement.children!.push(item)
										item.parent = crossRowElement
									})
									setTableCellMerged(column)
									editor.value.range!.anchor.moveToEnd(crossRowElement)
									editor.value.range!.focus.moveToEnd(crossRowElement)
									editor.value.domRender()
									editor.value.rangeRender()
								}
							}
						}
						//单元格不是隐藏的单元格
						else {
							//判断所占列数是否一致
							const { rowspan, colspan } = getCellSpanNumber(previousColumn)
							//进行合并
							if (colspan == cellSpanNum.colspan) {
								if (previousColumn.hasMarks()) {
									previousColumn.marks!['rowspan'] = rowspan + cellSpanNum.rowspan
								} else {
									previousColumn.marks = {
										rowspan: rowspan + cellSpanNum.rowspan
									}
								}
								column.children!.forEach(item => {
									previousColumn.children!.push(item)
									item.parent = previousColumn
								})
								setTableCellMerged(column)
								editor.value.range!.anchor.moveToEnd(previousColumn)
								editor.value.range!.focus.moveToEnd(previousColumn)
								editor.value.domRender()
								editor.value.rangeRender()
							}
						}
					}
				}
				//向下合并单元格
				else if (type == 'down') {
					//当前单元格所占行数和列数
					const cellSpanNum = getCellSpanNumber(column)
					//获取单元格在行中的序列
					const index = column.parent!.children!.findIndex(item => item.isEqual(column))
					//获取下一行
					let nextRow = editor.value.getNextElement(column.parent!)
					//如果下一行存在
					while (nextRow) {
						//获取下一行中对应序列的单元格
						const nextColumn = nextRow.children![index]
						//单元格是隐藏的单元格
						if (nextColumn.hasMarks() && nextColumn.marks!['data-editify-merged']) {
							//获取合并该隐藏单元格的那个单元格
							const { crossRowElement } = getCellMergeElement(editor.value, nextColumn)
							//如果是被跨行合并的表示属于当前单元格内，继续向下查询
							if (crossRowElement) {
								nextRow = editor.value.getNextElement(nextRow)
							}
							//被跨列合并的直接结束，不能向右合并
							else {
								break
							}
						}
						//单元格不是隐藏的
						else {
							//判断列数是否与当前单元格一致
							const { rowspan, colspan } = getCellSpanNumber(nextColumn)
							//如果一致则可以合并
							if (colspan == cellSpanNum.colspan) {
								if (column.hasMarks()) {
									column.marks!['rowspan'] = cellSpanNum.rowspan + rowspan
								} else {
									column.marks = {
										rowspan: cellSpanNum.rowspan + rowspan
									}
								}
								nextColumn.children!.forEach(item => {
									column.children!.push(item)
									item.parent = column
								})
								setTableCellMerged(nextColumn)
								editor.value.range!.anchor.moveToEnd(column)
								editor.value.range!.focus.moveToEnd(column)
								editor.value.domRender()
								editor.value.rangeRender()
							}
							//不管是否一致都直接结束
							break
						}
					}
				}
			}
		}

		return () => {
			return [
				//表格前插入段落
				h(
					Button,
					{
						name: 'textWrapUp',
						title: $editTrans('textWrapUp'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						onOperate: () => insertParagraphWithTable('up')
					},
					{
						default: () => h(Icon, { value: 'text-wrap', class: 'editify-icon-rotate' })
					}
				),
				//表格后插入段落
				h(
					Button,
					{
						name: 'textWrapDown',
						title: $editTrans('textWrapDown'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						rightBorder: true,
						onOperate: () => insertParagraphWithTable('down')
					},
					{
						default: () => h(Icon, { value: 'text-wrap' })
					}
				),
				//向前插入行
				h(
					Button,
					{
						name: 'insertRowTop',
						title: $editTrans('insertRowTop'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						onOperate: () => insertTableRow('up')
					},
					{
						default: () => h(Icon, { value: 'insert-row-top' })
					}
				),
				//向后插入行
				h(
					Button,
					{
						name: 'insertRowBottom',
						title: $editTrans('insertRowBottom'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						onOperate: () => insertTableRow('down')
					},
					{
						default: () => h(Icon, { value: 'insert-row-bottom' })
					}
				),
				//删除行
				h(
					Button,
					{
						name: 'deleteRow',
						title: $editTrans('deleteRow'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						rightBorder: true,
						onOperate: () => deleteTableRow()
					},
					{
						default: () => h(Icon, { value: 'delete-row' })
					}
				),
				//向前插入列
				h(
					Button,
					{
						name: 'insertColumnLeft',
						title: $editTrans('insertColumnLeft'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						onOperate: () => insertTableColumn('left')
					},
					{
						default: () => h(Icon, { value: 'insert-column-left' })
					}
				),
				//向后插入列
				h(
					Button,
					{
						name: 'insertColumnRight',
						title: $editTrans('insertColumnRight'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						onOperate: () => insertTableColumn('right')
					},
					{
						default: () => h(Icon, { value: 'insert-column-right' })
					}
				),
				//删除列
				h(
					Button,
					{
						name: 'deleteColumn',
						title: $editTrans('deleteColumn'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						rightBorder: true,
						onOperate: () => deleteTableColumn()
					},
					{
						default: () => h(Icon, { value: 'delete-column' })
					}
				),
				//向左合并单元格
				h(
					Button,
					{
						name: 'mergeCellsLeft',
						title: $editTrans('mergeCellsLeft'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						disabled: !canMergeCells.value('left'),
						onOperate: () => mergeCells('left')
					},
					{
						default: () => h(Icon, { value: 'merge-cells-left' })
					}
				),
				//向右合并单元格
				h(
					Button,
					{
						name: 'mergeCellsRight',
						title: $editTrans('mergeCellsRight'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						disabled: !canMergeCells.value('right'),
						onOperate: () => mergeCells('right')
					},
					{
						default: () => h(Icon, { value: 'merge-cells-right' })
					}
				),
				//向上合并单元格
				h(
					Button,
					{
						name: 'mergeCellsUp',
						title: $editTrans('mergeCellsUp'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						disabled: !canMergeCells.value('up'),
						onOperate: () => mergeCells('up')
					},
					{
						default: () => h(Icon, { value: 'merge-cells-up' })
					}
				),
				//向下合并单元格
				h(
					Button,
					{
						name: 'mergeCellsDown',
						title: $editTrans('mergeCellsDown'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						disabled: !canMergeCells.value('down'),
						onOperate: () => mergeCells('down')
					},
					{
						default: () => h(Icon, { value: 'merge-cells-down' })
					}
				),
				//删除表格
				h(
					Button,
					{
						name: 'deleteTable',
						title: $editTrans('deleteTable'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						leftBorder: true,
						onOperate: () => deleteTable()
					},
					{
						default: () => h(Icon, { value: 'delete-table' })
					}
				)
			]
		}
	},
	{
		name: `_${FEATURE_NAME}`,
		props: {
			color: String,
			zIndex: Number,
			tooltip: Boolean
		},
		emits: ['reset-toolbar']
	}
)

/**
 * 菜单栏 - 插入表格
 */
export const TableMenuButton = defineComponent(
	(props, { expose }) => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const dataRangeCaches = inject<Ref<AlexElementsRangeType>>('dataRangeCaches')!
		const $editTrans = inject<(key: string) => any>('$editTrans')!
		const isSourceView = inject<Ref<boolean>>('isSourceView')!

		const btnRef = ref<InstanceType<typeof Button> | null>(null)

		expose({
			btnRef
		})

		return () => {
			return props.config.show
				? h(
						Button,
						{
							ref: btnRef,
							name: FEATURE_NAME,
							tooltip: props.tooltip,
							color: props.color,
							zIndex: props.zIndex,
							type: 'select',
							hideScroll: true,
							title: `${$editTrans('insertTable')}${props.config.shortcut?.title ? `【${props.config.shortcut?.title}】` : ''}`,
							leftBorder: props.config.leftBorder,
							rightBorder: props.config.rightBorder,
							active: false,
							disabled: props.disabled || isSourceView.value || hasTableInRange(editor.value, dataRangeCaches.value) || hasPreInRange(editor.value, dataRangeCaches.value) || hasMathformulaInRange(editor.value, dataRangeCaches.value) || props.config.disabled
						},
						{
							default: () =>
								h(Icon, {
									value: 'table'
								}),
							layer: () =>
								h(InsertTable, {
									color: props.color,
									maxRows: props.config.maxRows,
									maxColumns: props.config.maxColumns,
									onInsert: (row, column) => {
										insertTable(editor.value, row, column)
										editor.value.domRender()
										editor.value.rangeRender()
										btnRef.value!.show = false
									}
								})
						}
				  )
				: null
		}
	},
	{
		name: `_${FEATURE_NAME}`,
		props: {
			color: String,
			zIndex: Number,
			config: Object as PropType<MenuTableButtonType>,
			tooltip: Boolean,
			disabled: Boolean
		}
	}
)

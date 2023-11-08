<template>
	<Layer v-model="show" ref="layer" :node="node" border borderColor="#dfdfdf" background="#fff" color="#666" placement="bottom-start">
		<div class="editify-toolbar" ref="toolbar">
			<!-- 表格工具条 -->
			<template v-if="type == 'table'">
				<!-- 表格前插入段落 -->
				<Button @operate="insertParagraphWithTable('up')" name="textWrapUp" :title="$editTrans('textWrapUp')" tooltip :color="$parent.color">
					<i class="editify-icon editify-icon-text-wrap editify-icon-rotate"></i>
				</Button>
				<!-- 表格后插入段落 -->
				<Button @operate="insertParagraphWithTable('down')" rightBorder name="textWrapDown" :title="$editTrans('textWrapDown')" tooltip :color="$parent.color">
					<i class="editify-icon editify-icon-text-wrap"></i>
				</Button>
				<!-- 向前插入行 -->
				<Button @operate="insertTableRow('up')" name="insertRowTop" type="default" :title="$editTrans('insertRowTop')" tooltip :color="$parent.color">
					<i class="editify-icon editify-icon-insert-row-top"></i>
				</Button>
				<!-- 向后插入行 -->
				<Button @operate="insertTableRow('down')" name="insertRowBottom" type="default" :title="$editTrans('insertRowBottom')" tooltip :color="$parent.color">
					<i class="editify-icon editify-icon-insert-row-bottom"></i>
				</Button>
				<!-- 删除行 -->
				<Button @operate="deleteTableRow" rightBorder name="deleteRow" type="default" :title="$editTrans('deleteRow')" tooltip :color="$parent.color">
					<i class="editify-icon editify-icon-delete-row"></i>
				</Button>
				<!-- 向前插入列 -->
				<Button @operate="insertTableColumn('left')" name="insertColumnLeft" type="default" :title="$editTrans('insertColumnLeft')" tooltip :color="$parent.color">
					<i class="editify-icon editify-icon-insert-column-left"></i>
				</Button>
				<!-- 向后插入列 -->
				<Button @operate="insertTableColumn('right')" name="insertColumnRight" type="default" :title="$editTrans('insertColumnRight')" tooltip :color="$parent.color">
					<i class="editify-icon editify-icon-insert-column-right"></i>
				</Button>
				<!-- 删除列 -->
				<Button @operate="deleteTableColumn" rightBorder name="deleteColumn" type="default" :title="$editTrans('deleteColumn')" tooltip :color="$parent.color">
					<i class="editify-icon editify-icon-delete-column"></i>
				</Button>
				<!-- 删除表格 -->
				<Button @operate="deleteTable" name="deleteTable" type="default" :title="$editTrans('deleteTable')" tooltip :color="$parent.color">
					<i class="editify-icon editify-icon-delete-table"></i>
				</Button>
			</template>
		</div>
	</Layer>
</template>
<script>
import Dap from 'dap-util'
import Layer from './Layer'
import Tooltip from './Tooltip'
import Button from './Button'
import { AlexElement } from 'alex-editor'
export default {
	name: 'Toolbar',
	emits: ['update:modelValue'],
	props: {
		//是否显示
		modelValue: {
			type: Boolean,
			default: false
		},
		//关联元素
		node: {
			type: [String, Node],
			default: null
		},
		//类型
		type: {
			type: String,
			default: 'default',
			validator(value) {
				return ['default', 'table', 'link', 'pre', 'image', 'video'].includes(value)
			}
		}
	},
	data() {
		return {}
	},
	computed: {
		show: {
			get() {
				return this.modelValue
			},
			set(val) {
				this.$emit('update:modelValue', val)
			}
		}
	},
	components: {
		Layer,
		Tooltip,
		Button
	},
	inject: ['$editTrans'],
	methods: {
		//表格前后插入列
		insertTableColumn(type = 'left') {
			if (this.$parent.disabled) {
				return
			}
			const editor = this.$parent.editor
			if (!editor.range.anchor.isEqual(editor.range.focus)) {
				editor.range.anchor.element = editor.range.focus.element
				editor.range.anchor.offset = editor.range.focus.offset
			}
			const table = this.$parent.getCurrentParsedomElement('table')
			const column = this.$parent.getCurrentParsedomElement('td')
			const tbody = this.$parent.getCurrentParsedomElement('tbody')
			if (column && table && tbody) {
				const rows = tbody.children
				const index = column.parent.children.findIndex(item => {
					return item.isEqual(column)
				})
				//插入列
				rows.forEach(row => {
					const newColumn = column.clone(false)
					const breakEl = new AlexElement('closed', 'br', null, null, null)
					editor.addElementTo(breakEl, newColumn)
					if (type == 'left') {
						editor.addElementTo(newColumn, row, index)
					} else {
						editor.addElementTo(newColumn, row, index + 1)
					}
				})
				//插入col
				const colgroup = table.children.find(item => {
					return item.parsedom == 'colgroup'
				})
				const col = new AlexElement('closed', 'col', null, null, null)
				if (type == 'left') {
					editor.addElementTo(col, colgroup, index)
				} else {
					editor.addElementTo(col, colgroup, index + 1)
				}
				//渲染
				editor.formatElementStack()
				if (type == 'left') {
					const previousColumn = editor.getPreviousElement(column)
					editor.range.anchor.moveToStart(previousColumn)
					editor.range.focus.moveToStart(previousColumn)
				} else {
					const nextColumn = editor.getNextElement(column)
					editor.range.anchor.moveToStart(nextColumn)
					editor.range.focus.moveToStart(nextColumn)
				}
				editor.domRender()
				editor.rangeRender()
			}
		},
		//表格插入前后插入行
		insertTableRow(type = 'up') {
			if (this.$parent.disabled) {
				return
			}
			const editor = this.$parent.editor
			if (!editor.range.anchor.isEqual(editor.range.focus)) {
				editor.range.anchor.element = editor.range.focus.element
				editor.range.anchor.offset = editor.range.focus.offset
			}
			const table = this.$parent.getCurrentParsedomElement('table')
			const row = this.$parent.getCurrentParsedomElement('tr')
			if (table && row) {
				const newRow = row.clone()
				newRow.children.forEach(column => {
					column.children = []
					const breakEl = new AlexElement('closed', 'br', null, null, null)
					editor.addElementTo(breakEl, column)
				})
				if (type == 'up') {
					editor.addElementBefore(newRow, row)
				} else {
					editor.addElementAfter(newRow, row)
				}
				editor.formatElementStack()
				editor.range.anchor.moveToStart(newRow)
				editor.range.focus.moveToStart(newRow)
				editor.domRender()
				editor.rangeRender()
				//更新工具条位置
				setTimeout(() => {
					this.$refs.layer.setPosition()
				}, 0)
			}
		},
		//表格前后插入段落
		insertParagraphWithTable(type = 'up') {
			if (this.$parent.disabled) {
				return
			}
			const editor = this.$parent.editor
			const table = this.$parent.getCurrentParsedomElement('table')
			if (table) {
				const paragraph = new AlexElement('block', AlexElement.BLOCK_NODE, null, null, null)
				const breakEl = new AlexElement('closed', 'br', null, null, null)
				editor.addElementTo(breakEl, paragraph)
				if (type == 'up') {
					editor.addElementBefore(paragraph, table)
				} else {
					editor.addElementAfter(paragraph, table)
				}
				editor.range.anchor.moveToEnd(paragraph)
				editor.range.focus.moveToEnd(paragraph)
				editor.formatElementStack()
				editor.domRender()
				editor.rangeRender()
			}
		},
		//删除表格行
		deleteTableRow() {
			if (this.$parent.disabled) {
				return
			}
			const editor = this.$parent.editor
			if (!editor.range.anchor.isEqual(editor.range.focus)) {
				editor.range.anchor.element = editor.range.focus.element
				editor.range.anchor.offset = editor.range.focus.offset
			}
			const table = this.$parent.getCurrentParsedomElement('table')
			const row = this.$parent.getCurrentParsedomElement('tr')
			if (table && row) {
				const parent = row.parent
				if (parent.children.length == 1) {
					this.deleteTable()
					return
				}
				const previousRow = editor.getPreviousElement(row)
				const nextRow = editor.getNextElement(row)
				row.toEmpty()
				editor.formatElementStack()
				if (previousRow) {
					editor.range.anchor.moveToEnd(previousRow.children[0])
					editor.range.focus.moveToEnd(previousRow.children[0])
				} else {
					editor.range.anchor.moveToEnd(nextRow.children[0])
					editor.range.focus.moveToEnd(nextRow.children[0])
				}
				editor.domRender()
				editor.rangeRender()
				//更新工具条位置
				setTimeout(() => {
					this.$refs.layer.setPosition()
				}, 0)
			}
		},
		//删除表格列
		deleteTableColumn() {
			if (this.$parent.disabled) {
				return
			}
			const editor = this.$parent.editor
			if (!editor.range.anchor.isEqual(editor.range.focus)) {
				editor.range.anchor.element = editor.range.focus.element
				editor.range.anchor.offset = editor.range.focus.offset
			}
			const column = this.$parent.getCurrentParsedomElement('td')
			const tbody = this.$parent.getCurrentParsedomElement('tbody')
			const table = this.$parent.getCurrentParsedomElement('table')
			if (column && table && tbody) {
				const rows = tbody.children
				const parent = column.parent
				if (parent.children.length == 1) {
					this.deleteTable()
					return
				}
				const previousColumn = editor.getPreviousElement(column)
				const nextColumn = editor.getNextElement(column)
				const index = column.parent.children.findIndex(item => {
					return item.isEqual(column)
				})
				//删除列
				rows.forEach(row => {
					row.children[index].toEmpty()
				})
				//删除col
				const colgroup = table.children.find(item => {
					return item.parsedom == 'colgroup'
				})
				colgroup.children[index].toEmpty()
				//渲染
				editor.formatElementStack()
				if (previousColumn) {
					editor.range.anchor.moveToEnd(previousColumn)
					editor.range.focus.moveToEnd(previousColumn)
				} else {
					editor.range.anchor.moveToEnd(nextColumn)
					editor.range.focus.moveToEnd(nextColumn)
				}
				editor.domRender()
				editor.rangeRender()
			}
		},
		//删除表格
		deleteTable() {
			if (this.$parent.disabled) {
				return
			}
			const editor = this.$parent.editor
			const table = this.$parent.getCurrentParsedomElement('table')
			if (table) {
				table.toEmpty()
				editor.formatElementStack()
				editor.domRender()
				editor.rangeRender()
			}
		}
	}
}
</script>
<style lang="less" scoped>
.editify-toolbar {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
	padding: 6px 10px;

	.editify-icon-rotate {
		transform: rotate(180deg);
	}
}
</style>

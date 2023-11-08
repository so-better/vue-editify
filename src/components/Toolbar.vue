<template>
	<Layer v-model="show" ref="layer" :node="node" border placement="bottom-start" @shown="layerShown">
		<div class="editify-toolbar" ref="toolbar">
			<!-- 表格工具条 -->
			<template v-if="type == 'table'">
				<!-- 表格前插入段落 -->
				<Button @operate="insertParagraphWithTable('up')" name="textWrapUp" :title="$editTrans('textWrapUp')" tooltip :color="$parent.color">
					<Icon value="text-wrap" class="editify-icon-rotate"></Icon>
				</Button>
				<!-- 表格后插入段落 -->
				<Button @operate="insertParagraphWithTable('down')" rightBorder name="textWrapDown" :title="$editTrans('textWrapDown')" tooltip :color="$parent.color">
					<Icon value="text-wrap"></Icon>
				</Button>
				<!-- 向前插入行 -->
				<Button @operate="insertTableRow('up')" name="insertRowTop" type="default" :title="$editTrans('insertRowTop')" tooltip :color="$parent.color">
					<Icon value="insert-row-top"></Icon>
				</Button>
				<!-- 向后插入行 -->
				<Button @operate="insertTableRow('down')" name="insertRowBottom" type="default" :title="$editTrans('insertRowBottom')" tooltip :color="$parent.color">
					<Icon value="insert-row-bottom"></Icon>
				</Button>
				<!-- 删除行 -->
				<Button @operate="deleteTableRow" rightBorder name="deleteRow" type="default" :title="$editTrans('deleteRow')" tooltip :color="$parent.color">
					<Icon value="delete-row"></Icon>
				</Button>
				<!-- 向前插入列 -->
				<Button @operate="insertTableColumn('left')" name="insertColumnLeft" type="default" :title="$editTrans('insertColumnLeft')" tooltip :color="$parent.color">
					<Icon value="insert-column-left"></Icon>
				</Button>
				<!-- 向后插入列 -->
				<Button @operate="insertTableColumn('right')" name="insertColumnRight" type="default" :title="$editTrans('insertColumnRight')" tooltip :color="$parent.color">
					<Icon value="insert-column-right"></Icon>
				</Button>
				<!-- 删除列 -->
				<Button @operate="deleteTableColumn" rightBorder name="deleteColumn" type="default" :title="$editTrans('deleteColumn')" tooltip :color="$parent.color">
					<Icon value="delete-column"></Icon>
				</Button>
				<!-- 删除表格 -->
				<Button @operate="deleteTable" name="deleteTable" type="default" :title="$editTrans('deleteTable')" tooltip :color="$parent.color">
					<Icon value="delete-table"></Icon>
				</Button>
			</template>
			<!-- 代码块工具条 -->
			<template v-if="type == 'pre'">
				<!-- 代码块前插入段落 -->
				<Button @operate="insertParagraphWithPre('up')" name="textWrapUp" :title="$editTrans('textWrapUp')" tooltip :color="$parent.color">
					<Icon value="text-wrap" class="editify-icon-rotate"></Icon>
				</Button>
				<!-- 代码块后插入段落 -->
				<Button @operate="insertParagraphWithPre('down')" rightBorder name="textWrapDown" :title="$editTrans('textWrapDown')" tooltip :color="$parent.color">
					<Icon value="text-wrap"></Icon>
				</Button>
				<!-- 代码块语言选择 -->
				<Button @operate="selectLanguage" name="languages" :title="$editTrans('selectLanguages')" tooltip :color="$parent.color" type="display" :display-config="preDisplayConfig"></Button>
			</template>
			<!-- 链接工具条 -->
			<template v-if="type == 'link'">
				<div class="editify-toolbar-link">
					<div class="editify-toolbar-link-label">{{ $editTrans('linkAddress') }}</div>
					<input @input="modifyLink" @focus="handleInputFocus" @blur="handleInputBlur" :placeholder="$editTrans('linkEnterPlaceholder')" v-model.trim="linkConfig.url" type="url" />
					<div class="editify-toolbar-link-footer">
						<Checkbox @change="modifyLink" v-model="linkConfig.newOpen" :label="$editTrans('newWindowOpen')" :color="$parent.color" :size="10"></Checkbox>
						<div class="editify-toolbar-link-operations">
							<span @click="removeLink">{{ $editTrans('removeLink') }}</span>
							<a :href="linkConfig.url" target="_blank" :style="{ color: $parent.color }">{{ $editTrans('viewLink') }}</a>
						</div>
					</div>
				</div>
			</template>
		</div>
	</Layer>
</template>
<script>
import Dap from 'dap-util'
import Layer from './Layer'
import Tooltip from './Tooltip'
import Button from './Button'
import Icon from './Icon'
import Checkbox from './Checkbox'
import { AlexElement } from 'alex-editor'
import { languages } from '../hljs'
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
		return {
			//代码块选择语言按钮配置
			preDisplayConfig: {
				options: [
					{
						label: this.$editTrans('autoRecognize'),
						value: ''
					},
					...languages
				],
				value: '',
				width: 130,
				maxHeight: 180
			},
			//链接参数配置
			linkConfig: {
				//链接地址
				url: '',
				//链接是否新窗口打开
				newOpen: false
			}
		}
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
		Button,
		Icon,
		Checkbox
	},
	inject: ['$editTrans'],
	methods: {
		//移除链接
		removeLink() {
			if (this.$parent.disabled) {
				return
			}
			const editor = this.$parent.editor
			const link = this.$parent.getCurrentParsedomElement('a')
			if (link) {
				link.parsedom = AlexElement.TEXT_NODE
				delete link.marks.target
				delete link.marks.href
				editor.formatElementStack()
				editor.domRender()
				editor.rangeRender()
			}
		},
		//修改链接
		modifyLink() {
			if (this.$parent.disabled) {
				return
			}
			if (!this.linkConfig.url) {
				return
			}
			const editor = this.$parent.editor
			const link = this.$parent.getCurrentParsedomElement('a')
			if (link) {
				link.marks.href = this.linkConfig.url
				if (this.linkConfig.newOpen) {
					link.marks.target = '_blank'
				} else {
					delete link.marks.target
				}
			}
			editor.formatElementStack()
			editor.domRender()
		},
		//输入框获取焦点
		handleInputFocus(e) {
			if (this.$parent.disabled) {
				return
			}
			if (this.$parent.color) {
				e.currentTarget.style.borderColor = this.$parent.color
			}
		},
		//输入框失去焦点
		handleInputBlur(e) {
			if (this.$parent.disabled) {
				return
			}
			e.currentTarget.style.borderColor = ''
		},
		//选择代码语言
		selectLanguage(name, value) {
			if (this.$parent.disabled) {
				return
			}
			const editor = this.$parent.editor
			const pre = this.$parent.getCurrentParsedomElement('pre')
			if (pre) {
				Object.assign(pre.marks, {
					'data-editify-hljs': value
				})
				this.preDisplayConfig.value = value
				editor.formatElementStack()
				editor.domRender()
				editor.rangeRender()
			}
		},
		//代码块前后插入段落
		insertParagraphWithPre(type = 'up') {
			if (this.$parent.disabled) {
				return
			}
			const editor = this.$parent.editor
			if (!editor.range.anchor.isEqual(editor.range.focus)) {
				editor.range.anchor.element = editor.range.focus.element
				editor.range.anchor.offset = editor.range.focus.offset
			}
			const pre = this.$parent.getCurrentParsedomElement('pre')
			if (pre) {
				const paragraph = new AlexElement('block', AlexElement.BLOCK_NODE, null, null, null)
				const breakEl = new AlexElement('closed', 'br', null, null, null)
				editor.addElementTo(breakEl, paragraph)
				if (type == 'up') {
					editor.addElementBefore(paragraph, pre)
				} else {
					editor.addElementAfter(paragraph, pre)
				}
				editor.range.anchor.moveToEnd(paragraph)
				editor.range.focus.moveToEnd(paragraph)
				editor.formatElementStack()
				editor.domRender()
				editor.rangeRender()
			}
		},
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
		},
		//浮层显示后
		layerShown() {
			//代码块初始化展示设置
			if (this.type == 'pre') {
				const pre = this.$parent.getCurrentParsedomElement('pre')
				if (pre) {
					this.preDisplayConfig.value = pre.marks['data-editify-hljs'] || ''
				}
			}
			//链接初始化展示
			else if (this.type == 'link') {
				const link = this.$parent.getCurrentParsedomElement('a')
				if (link) {
					this.linkConfig.url = link.marks['href']
					this.linkConfig.newOpen = link.marks['target'] == '_blank'
				}
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

.editify-toolbar-link {
	display: block;
	width: 280px;
	padding: 4px;

	.editify-toolbar-link-label {
		display: block;
		text-align: left;
		margin-bottom: 10px;
		font-size: 13px;
		color: #666;
	}

	input {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		display: block;
		width: 100%;
		margin: 0 0 10px 0;
		padding: 4px 2px;
		border: none;
		font-size: 13px;
		color: #666;
		border-bottom: 1px solid #dfdfdf;
		line-height: 1.5;
		transition: border-color 500ms;
		background-color: transparent;
		outline: none;

		&::-webkit-input-placeholder,
		&::placeholder {
			color: #ccc;
			font-family: inherit;
			font-size: inherit;
			vertical-align: middle;
		}

		&[disabled] {
			background-color: transparent;
			opacity: 0.6;
		}
	}

	.editify-toolbar-link-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		font-size: 13px;
		color: #666;

		.editify-toolbar-link-operations {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			& > span,
			& > a {
				cursor: pointer;
				opacity: 0.8;
				transition: all 200ms;

				&:hover {
					opacity: 1;
				}
			}

			& > span {
				margin-right: 15px;
			}

			& > a {
				text-decoration: none;
			}
		}
	}
}
</style>

<template>
	<div class="editify-menu" :class="{ border: config.border }">
		<MenuItem v-for="item in menuNames" :name="item"> </MenuItem>
	</div>
</template>
<script>
import Icon from './Icon'
import Button from './Button'
import { blockIsList } from '../core'
import { h, getCurrentInstance } from 'vue'
import Dap from 'dap-util'
export default {
	name: 'Menu',
	props: {
		//菜单栏配置
		config: {
			type: Object,
			default: null
		},
		//是否禁用整个菜单栏
		disabled: {
			type: Boolean,
			default: false
		}
	},
	setup() {
		const instance = getCurrentInstance()
		return {
			uid: instance.uid
		}
	},
	data() {
		return {
			//撤销按钮配置
			undoConfig: {
				show: this.config.undo.show,
				leftBorder: this.config.undo.leftBorder,
				rightBorder: this.config.undo.rightBorder,
				active: false,
				disabled: false
			},
			//重做按钮配置
			redoConfig: {
				show: this.config.redo.show,
				leftBorder: this.config.redo.leftBorder,
				rightBorder: this.config.redo.rightBorder,
				active: false,
				disabled: false
			},
			//标题按钮配置
			headingConfig: {
				show: this.config.heading.show,
				displayConfig: {
					options: this.config.heading.options,
					value: '',
					width: this.config.heading.width,
					maxHeight: this.config.heading.maxHeight
				},
				defaultValue: this.config.heading.defaultValue,
				leftBorder: this.config.heading.leftBorder,
				rightBorder: this.config.heading.rightBorder,
				active: false,
				disabled: false
			},
			//引用按钮配置
			quoteConfig: {
				show: this.config.quote.show,
				leftBorder: this.config.quote.leftBorder,
				rightBorder: this.config.quote.rightBorder,
				active: false,
				disabled: false
			},
			//对齐方式按钮配置
			alignConfig: {
				show: this.config.align.show,
				selectConfig: {
					options: this.config.align.options,
					width: this.config.align.width,
					maxHeight: this.config.align.maxHeight
				},
				leftBorder: this.config.align.leftBorder,
				rightBorder: this.config.align.rightBorder,
				active: false,
				disabled: false
			},
			//有序列表按钮配置
			orderListConfig: {
				show: this.config.orderList.show,
				leftBorder: this.config.orderList.leftBorder,
				rightBorder: this.config.orderList.rightBorder,
				active: false,
				disabled: false
			},
			//无序列表按钮配置
			unorderListConfig: {
				show: this.config.unorderList.show,
				leftBorder: this.config.unorderList.leftBorder,
				rightBorder: this.config.unorderList.rightBorder,
				active: false,
				disabled: false
			},
			//粗体按钮配置
			boldConfig: {
				show: this.config.bold.show,
				leftBorder: this.config.bold.leftBorder,
				rightBorder: this.config.bold.rightBorder,
				active: false,
				disabled: false
			},
			//下划线按钮配置
			underlineConfig: {
				show: this.config.underline.show,
				leftBorder: this.config.underline.leftBorder,
				rightBorder: this.config.underline.rightBorder,
				active: false,
				disabled: false
			},
			//斜体按钮配置
			italicConfig: {
				show: this.config.italic.show,
				leftBorder: this.config.italic.leftBorder,
				rightBorder: this.config.italic.rightBorder,
				active: false,
				disabled: false
			}
		}
	},
	computed: {
		//菜单名称数组
		menuNames() {
			return Object.keys(this.config.sequence).sort((a, b) => {
				if (this.config.sequence[a] > this.config.sequence[b]) {
					return 1
				}
				return -1
			})
		}
	},
	components: {
		Icon,
		Button,
		MenuItem: {
			props: {
				name: String
			},
			inject: ['$editTrans'],
			render: function () {
				//共同设置的属性
				const props = {
					tooltip: this.$parent.config.tooltip,
					name: this.name
				}
				//撤销按钮
				if (this.name == 'undo' && this.$parent.undoConfig.show) {
					return h(
						Button,
						{
							...props,
							title: this.$editTrans('undo'),
							leftBorder: this.$parent.undoConfig.leftBorder,
							rightBorder: this.$parent.undoConfig.rightBorder,
							disabled: this.$parent.undoConfig.disabled || this.$parent.disabled,
							active: this.$parent.undoConfig.active,
							onOperate: this.$parent.handleOperate
						},
						() => h(Icon, { value: 'undo' })
					)
				}
				//重做按钮
				if (this.name == 'redo' && this.$parent.redoConfig.show) {
					return h(
						Button,
						{
							...props,
							title: this.$editTrans('redo'),
							leftBorder: this.$parent.redoConfig.leftBorder,
							rightBorder: this.$parent.redoConfig.rightBorder,
							disabled: this.$parent.redoConfig.disabled || this.$parent.disabled,
							active: this.$parent.redoConfig.active,
							onOperate: this.$parent.handleOperate
						},
						() => h(Icon, { value: 'redo' })
					)
				}
				//标题按钮
				if (this.name == 'heading' && this.$parent.headingConfig.show) {
					return h(Button, {
						...props,
						type: 'display',
						displayConfig: this.$parent.headingConfig.displayConfig,
						title: this.$editTrans('heading'),
						leftBorder: this.$parent.headingConfig.leftBorder,
						rightBorder: this.$parent.headingConfig.rightBorder,
						disabled: this.$parent.headingConfig.disabled || this.$parent.disabled,
						active: this.$parent.headingConfig.active,
						onOperate: this.$parent.handleOperate
					})
				}
				//引用按钮
				if (this.name == 'quote' && this.$parent.quoteConfig.show) {
					return h(
						Button,
						{
							...props,
							title: this.$editTrans('quote'),
							leftBorder: this.$parent.quoteConfig.leftBorder,
							rightBorder: this.$parent.quoteConfig.rightBorder,
							disabled: this.$parent.quoteConfig.disabled || this.$parent.disabled,
							active: this.$parent.quoteConfig.active,
							onOperate: this.$parent.handleOperate
						},
						() => h(Icon, { value: 'quote' })
					)
				}
				//对齐方式按钮
				if (this.name == 'align' && this.$parent.alignConfig.show) {
					return h(
						Button,
						{
							...props,
							type: 'select',
							selectConfig: this.$parent.alignConfig.selectConfig,
							title: this.$editTrans('align'),
							leftBorder: this.$parent.alignConfig.leftBorder,
							rightBorder: this.$parent.alignConfig.rightBorder,
							disabled: this.$parent.alignConfig.disabled || this.$parent.disabled,
							active: this.$parent.alignConfig.active,
							onOperate: this.$parent.handleOperate
						},
						() => h(Icon, { value: 'align-left' })
					)
				}
				//有序列表按钮
				if (this.name == 'orderList' && this.$parent.orderListConfig.show) {
					return h(
						Button,
						{
							...props,
							title: this.$editTrans('orderList'),
							leftBorder: this.$parent.orderListConfig.leftBorder,
							rightBorder: this.$parent.orderListConfig.rightBorder,
							disabled: this.$parent.orderListConfig.disabled || this.$parent.disabled,
							active: this.$parent.orderListConfig.active,
							onOperate: this.$parent.handleOperate
						},
						() => h(Icon, { value: 'list-ordered' })
					)
				}
				//无序列表按钮
				if (this.name == 'unorderList' && this.$parent.unorderListConfig.show) {
					return h(
						Button,
						{
							...props,
							title: this.$editTrans('unorderList'),
							leftBorder: this.$parent.unorderListConfig.leftBorder,
							rightBorder: this.$parent.unorderListConfig.rightBorder,
							disabled: this.$parent.unorderListConfig.disabled || this.$parent.disabled,
							active: this.$parent.unorderListConfig.active,
							onOperate: this.$parent.handleOperate
						},
						() => h(Icon, { value: 'list-unordered' })
					)
				}
				//粗体按钮
				if (this.name == 'bold' && this.$parent.boldConfig.show) {
					return h(
						Button,
						{
							...props,
							title: this.$editTrans('bold'),
							leftBorder: this.$parent.boldConfig.leftBorder,
							rightBorder: this.$parent.boldConfig.rightBorder,
							disabled: this.$parent.boldConfig.disabled || this.$parent.disabled,
							active: this.$parent.boldConfig.active,
							onOperate: this.$parent.handleOperate
						},
						() => h(Icon, { value: 'bold' })
					)
				}
				//下划线按钮
				if (this.name == 'underline' && this.$parent.underlineConfig.show) {
					return h(
						Button,
						{
							...props,
							title: this.$editTrans('underline'),
							leftBorder: this.$parent.underlineConfig.leftBorder,
							rightBorder: this.$parent.underlineConfig.rightBorder,
							disabled: this.$parent.underlineConfig.disabled || this.$parent.disabled,
							active: this.$parent.underlineConfig.active,
							onOperate: this.$parent.handleOperate
						},
						() => h(Icon, { value: 'underline' })
					)
				}
				//斜体按钮
				if (this.name == 'italic' && this.$parent.italicConfig.show) {
					return h(
						Button,
						{
							...props,
							title: this.$editTrans('italic'),
							leftBorder: this.$parent.italicConfig.leftBorder,
							rightBorder: this.$parent.italicConfig.rightBorder,
							disabled: this.$parent.italicConfig.disabled || this.$parent.disabled,
							active: this.$parent.italicConfig.active,
							onOperate: this.$parent.handleOperate
						},
						() => h(Icon, { value: 'italic' })
					)
				}
				return null
			}
		}
	},
	methods: {
		//处理光标更新
		handleRangeUpdate() {
			//获取选区的元素
			const result = this.$parent.editor.getElementsByRange(true, false)

			//撤销按钮是否禁用
			this.undoConfig.disabled = !this.$parent.editor.history.get(-1)

			//重做按钮是否禁用
			this.redoConfig.disabled = !this.$parent.editor.history.get(1)

			//显示已设置标题
			const findHeadingItem = this.headingConfig.displayConfig.options.find(item => {
				let val = item
				if (Dap.common.isObject(item)) {
					val = item.value
				}
				if (this.$parent.editor.range.anchor.isEqual(this.$parent.editor.range.focus)) {
					return this.$parent.editor.range.anchor.element.getBlock().parsedom == val
				}
				return result.every(el => {
					if (el.element.isBlock()) {
						return el.element.parsedom == val
					}
					return el.element.getBlock().parsedom == val
				})
			})
			this.headingConfig.displayConfig.value = findHeadingItem ? (Dap.common.isObject(findHeadingItem) ? findHeadingItem.value : findHeadingItem) : this.headingConfig.defaultValue

			//引用按钮是否激活
			if (this.$parent.editor.range.anchor.isEqual(this.$parent.editor.range.focus)) {
				const block = this.$parent.editor.range.anchor.element.getBlock()
				this.quoteConfig.active = block.parsedom == 'blockquote'
			} else {
				this.quoteConfig.active = result.every(item => {
					if (item.element.isBlock()) {
						return item.element.parsedom == 'blockquote'
					} else {
						const block = item.element.getBlock()
						return block.parsedom == 'blockquote'
					}
				})
			}

			//有序列表按钮是否激活
			if (this.$parent.editor.range.anchor.isEqual(this.$parent.editor.range.focus)) {
				const block = this.$parent.editor.range.anchor.element.getBlock()
				this.orderListConfig.active = blockIsList(block, true)
			} else {
				this.orderListConfig.active = result.every(item => {
					if (item.element.isBlock()) {
						return blockIsList(item.element, true)
					} else {
						const block = item.element.getBlock()
						return blockIsList(block, true)
					}
				})
			}

			//无序列表按钮是否激活
			if (this.$parent.editor.range.anchor.isEqual(this.$parent.editor.range.focus)) {
				const block = this.$parent.editor.range.anchor.element.getBlock()
				this.unorderListConfig.active = blockIsList(block, false)
			} else {
				this.unorderListConfig.active = result.every(item => {
					if (item.element.isBlock()) {
						return blockIsList(item.element, false)
					} else {
						const block = item.element.getBlock()
						return blockIsList(block, false)
					}
				})
			}

			//粗体按钮是否激活
			this.boldConfig.active = this.$parent.queryTextStyle('font-weight', 'bold')

			//下划线按钮是否激活
			this.underlineConfig.active = this.$parent.queryTextStyle('text-decoration', 'underline')

			//斜体按钮是否激活
			this.italicConfig.active = this.$parent.queryTextStyle('font-style', 'italic')
		},
		//按钮操作触发函数
		handleOperate(name, val) {
			console.log(name, val)
			//撤销
			if (name == 'undo') {
				this.$parent.undo()
			}
			//重做
			else if (name == 'redo') {
				this.$parent.redo()
			}
			//设置标题
			else if (name == 'heading') {
				this.$parent.setHeading(val)
			}
			//设置引用
			else if (name == 'quote') {
				this.$parent.setQuote()
			}
			//设置对齐方式
			else if (name == 'align') {
				this.$parent.setAlign(val)
			}
			//设置有序列表
			else if (name == 'orderList') {
				this.$parent.setList(true)
			}
			//设置无序列表
			else if (name == 'unorderList') {
				this.$parent.setList(false)
			}
			//设置粗体
			else if (name == 'bold') {
				this.$parent.setTextStyle('font-weight', 'bold')
			}
			//设置下划线
			else if (name == 'underline') {
				this.$parent.setTextStyle('text-decoration', 'underline')
			}
			//设置斜体
			else if (name == 'italic') {
				this.$parent.setTextStyle('font-style', 'italic')
			}
		}
	}
}
</script>
<style lang="less" scoped>
.editify-menu {
	display: flex;
	justify-content: flex-start;
	width: 100%;
	padding: 6px 10px;
	background-color: #fff;
	border-radius: 4px;
	margin-bottom: 10px;

	&.border {
		border: 1px solid @border-color;
	}
}
</style>

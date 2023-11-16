<template>
	<div class="editify-menu" :class="{ border: config.border }">
		<MenuItem v-for="item in menuNames" :name="item"></MenuItem>
	</div>
</template>
<script>
import Icon from './Icon'
import Button from './Button'
import Colors from './Colors'
import InsertLink from './InsertLink'
import { blockIsList } from '../core'
import { h, getCurrentInstance } from 'vue'
import { AlexElement } from 'alex-editor'
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
			//缩进按钮配置
			indentConfig: {
				show: this.config.indent.show,
				selectConfig: {
					options: this.config.indent.options,
					value: '',
					width: this.config.indent.width,
					maxHeight: this.config.indent.maxHeight
				},
				leftBorder: this.config.indent.leftBorder,
				rightBorder: this.config.indent.rightBorder,
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
			},
			//删除线按钮配置
			strikethroughConfig: {
				show: this.config.strikethrough.show,
				leftBorder: this.config.strikethrough.leftBorder,
				rightBorder: this.config.strikethrough.rightBorder,
				active: false,
				disabled: false
			},
			//行内代码按钮配置
			codeConfig: {
				show: this.config.code.show,
				leftBorder: this.config.code.leftBorder,
				rightBorder: this.config.code.rightBorder,
				active: false,
				disabled: false
			},
			//上标按钮配置
			superConfig: {
				show: this.config.super.show,
				leftBorder: this.config.super.leftBorder,
				rightBorder: this.config.super.rightBorder,
				active: false,
				disabled: false
			},
			//下标按钮配置
			subConfig: {
				show: this.config.sub.show,
				leftBorder: this.config.sub.leftBorder,
				rightBorder: this.config.sub.rightBorder,
				active: false,
				disabled: false
			},
			//清除格式按钮配置
			formatClearConfig: {
				show: this.config.formatClear.show,
				leftBorder: this.config.formatClear.leftBorder,
				rightBorder: this.config.formatClear.rightBorder,
				active: false,
				disabled: false
			},
			//字号按钮配置
			fontSizeConfig: {
				show: this.config.fontSize.show,
				displayConfig: {
					options: this.config.fontSize.options,
					value: '',
					width: this.config.fontSize.width,
					maxHeight: this.config.fontSize.maxHeight
				},
				defaultValue: this.config.fontSize.defaultValue,
				leftBorder: this.config.fontSize.leftBorder,
				rightBorder: this.config.fontSize.rightBorder,
				active: false,
				disabled: false
			},
			//字体按钮配置
			fontFamilyConfig: {
				show: this.config.fontFamily.show,
				displayConfig: {
					options: this.config.fontFamily.options,
					value: '',
					width: this.config.fontFamily.width,
					maxHeight: this.config.fontFamily.maxHeight
				},
				defaultValue: this.config.fontFamily.defaultValue,
				leftBorder: this.config.fontFamily.leftBorder,
				rightBorder: this.config.fontFamily.rightBorder,
				active: false,
				disabled: false
			},
			//行高按钮配置
			lineHeightConfig: {
				show: this.config.lineHeight.show,
				displayConfig: {
					options: this.config.lineHeight.options,
					value: '',
					width: this.config.lineHeight.width,
					maxHeight: this.config.lineHeight.maxHeight
				},
				defaultValue: this.config.lineHeight.defaultValue,
				leftBorder: this.config.lineHeight.leftBorder,
				rightBorder: this.config.lineHeight.rightBorder,
				active: false,
				disabled: false
			},
			//前景颜色按钮配置
			foreColorConfig: {
				show: this.config.foreColor.show,
				selectConfig: {
					options: this.config.foreColor.options
				},
				leftBorder: this.config.foreColor.leftBorder,
				rightBorder: this.config.foreColor.rightBorder,
				value: '', //选择的颜色值
				active: false,
				disabled: false
			},
			//背景颜色按钮配置
			backColorConfig: {
				show: this.config.backColor.show,
				selectConfig: {
					options: this.config.backColor.options
				},
				leftBorder: this.config.backColor.leftBorder,
				rightBorder: this.config.backColor.rightBorder,
				value: '', //选择的颜色值
				active: false,
				disabled: false
			},
			//链接配置
			linkConfig: {
				show: this.config.link.show,
				leftBorder: this.config.link.leftBorder,
				rightBorder: this.config.link.rightBorder,
				active: false,
				disabled: false,
				text: '' //链接的文本
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
				//缩进按钮
				if (this.name == 'indent' && this.$parent.indentConfig.show) {
					return h(
						Button,
						{
							...props,
							type: 'select',
							selectConfig: this.$parent.indentConfig.selectConfig,
							title: this.$editTrans('indent'),
							leftBorder: this.$parent.indentConfig.leftBorder,
							rightBorder: this.$parent.indentConfig.rightBorder,
							disabled: this.$parent.indentConfig.disabled || this.$parent.disabled,
							active: this.$parent.indentConfig.active,
							onOperate: this.$parent.handleOperate
						},
						() => h(Icon, { value: 'indent-increase' })
					)
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
				//删除线按钮
				if (this.name == 'strikethrough' && this.$parent.strikethroughConfig.show) {
					return h(
						Button,
						{
							...props,
							title: this.$editTrans('strikethrough'),
							leftBorder: this.$parent.strikethroughConfig.leftBorder,
							rightBorder: this.$parent.strikethroughConfig.rightBorder,
							disabled: this.$parent.strikethroughConfig.disabled || this.$parent.disabled,
							active: this.$parent.strikethroughConfig.active,
							onOperate: this.$parent.handleOperate
						},
						() => h(Icon, { value: 'strikethrough' })
					)
				}
				//行内代码按钮
				if (this.name == 'code' && this.$parent.codeConfig.show) {
					return h(
						Button,
						{
							...props,
							title: this.$editTrans('code'),
							leftBorder: this.$parent.codeConfig.leftBorder,
							rightBorder: this.$parent.codeConfig.rightBorder,
							disabled: this.$parent.codeConfig.disabled || this.$parent.disabled,
							active: this.$parent.codeConfig.active,
							onOperate: this.$parent.handleOperate
						},
						() => h(Icon, { value: 'code' })
					)
				}
				//上标按钮
				if (this.name == 'super' && this.$parent.superConfig.show) {
					return h(
						Button,
						{
							...props,
							title: this.$editTrans('superscript'),
							leftBorder: this.$parent.superConfig.leftBorder,
							rightBorder: this.$parent.superConfig.rightBorder,
							disabled: this.$parent.superConfig.disabled || this.$parent.disabled,
							active: this.$parent.superConfig.active,
							onOperate: this.$parent.handleOperate
						},
						() => h(Icon, { value: 'superscript' })
					)
				}
				//下标按钮
				if (this.name == 'sub' && this.$parent.subConfig.show) {
					return h(
						Button,
						{
							...props,
							title: this.$editTrans('subscript'),
							leftBorder: this.$parent.subConfig.leftBorder,
							rightBorder: this.$parent.subConfig.rightBorder,
							disabled: this.$parent.subConfig.disabled || this.$parent.disabled,
							active: this.$parent.subConfig.active,
							onOperate: this.$parent.handleOperate
						},
						() => h(Icon, { value: 'subscript' })
					)
				}
				//清除格式按钮
				if (this.name == 'formatClear' && this.$parent.formatClearConfig.show) {
					return h(
						Button,
						{
							...props,
							title: this.$editTrans('formatClear'),
							leftBorder: this.$parent.formatClearConfig.leftBorder,
							rightBorder: this.$parent.formatClearConfig.rightBorder,
							disabled: this.$parent.formatClearConfig.disabled || this.$parent.disabled,
							active: this.$parent.formatClearConfig.active,
							onOperate: this.$parent.handleOperate
						},
						() => h(Icon, { value: 'format-clear' })
					)
				}
				//字号按钮
				if (this.name == 'fontSize' && this.$parent.fontSizeConfig.show) {
					return h(Button, {
						...props,
						type: 'display',
						displayConfig: this.$parent.fontSizeConfig.displayConfig,
						title: this.$editTrans('fontSize'),
						leftBorder: this.$parent.fontSizeConfig.leftBorder,
						rightBorder: this.$parent.fontSizeConfig.rightBorder,
						disabled: this.$parent.fontSizeConfig.disabled || this.$parent.disabled,
						active: this.$parent.fontSizeConfig.active,
						onOperate: this.$parent.handleOperate
					})
				}
				//字体按钮
				if (this.name == 'fontFamily' && this.$parent.fontFamilyConfig.show) {
					return h(Button, {
						...props,
						type: 'display',
						displayConfig: this.$parent.fontFamilyConfig.displayConfig,
						title: this.$editTrans('fontFamily'),
						leftBorder: this.$parent.fontFamilyConfig.leftBorder,
						rightBorder: this.$parent.fontFamilyConfig.rightBorder,
						disabled: this.$parent.fontFamilyConfig.disabled || this.$parent.disabled,
						active: this.$parent.fontFamilyConfig.active,
						onOperate: this.$parent.handleOperate
					})
				}
				//行高按钮
				if (this.name == 'lineHeight' && this.$parent.lineHeightConfig.show) {
					return h(Button, {
						...props,
						type: 'display',
						displayConfig: this.$parent.lineHeightConfig.displayConfig,
						title: this.$editTrans('lineHeight'),
						leftBorder: this.$parent.lineHeightConfig.leftBorder,
						rightBorder: this.$parent.lineHeightConfig.rightBorder,
						disabled: this.$parent.lineHeightConfig.disabled || this.$parent.disabled,
						active: this.$parent.lineHeightConfig.active,
						onOperate: this.$parent.handleOperate
					})
				}
				//前景色按钮
				if (this.name == 'foreColor' && this.$parent.foreColorConfig.show) {
					return h(
						Button,
						{
							...props,
							ref: 'foreColor',
							type: 'select',
							selectConfig: this.$parent.foreColorConfig.selectConfig,
							title: this.$editTrans('foreColor'),
							leftBorder: this.$parent.foreColorConfig.leftBorder,
							rightBorder: this.$parent.foreColorConfig.rightBorder,
							disabled: this.$parent.foreColorConfig.disabled || this.$parent.disabled,
							active: this.$parent.foreColorConfig.active,
							hideScroll: true
						},
						{
							default: () =>
								h(Icon, {
									value: 'font-color'
								}),
							layer: data =>
								h(Colors, {
									tooltip: this.$parent.config.tooltip,
									value: this.$parent.foreColorConfig.value,
									data: data.options,
									onChange: val => {
										this.$parent.handleOperate.apply(this.$parent, ['foreColor', val])
										this.$refs.foreColor.layerConfig.show = false
									}
								})
						}
					)
				}
				//背景色按钮
				if (this.name == 'backColor' && this.$parent.backColorConfig.show) {
					return h(
						Button,
						{
							...props,
							type: 'select',
							ref: 'backColor',
							selectConfig: this.$parent.backColorConfig.selectConfig,
							title: this.$editTrans('backColor'),
							leftBorder: this.$parent.backColorConfig.leftBorder,
							rightBorder: this.$parent.backColorConfig.rightBorder,
							disabled: this.$parent.backColorConfig.disabled || this.$parent.disabled,
							active: this.$parent.backColorConfig.active,
							onOperate: this.$parent.handleOperate,
							hideScroll: true
						},
						{
							default: () =>
								h(Icon, {
									value: 'brush'
								}),
							layer: data =>
								h(Colors, {
									tooltip: this.$parent.config.tooltip,
									value: this.$parent.backColorConfig.value,
									data: data.options,
									onChange: val => {
										this.$parent.handleOperate.apply(this.$parent, ['backColor', val])
										this.$refs.backColor.layerConfig.show = false
									}
								})
						}
					)
				}
				//链接按钮
				if (this.name == 'link' && this.$parent.linkConfig.show) {
					return h(
						Button,
						{
							...props,
							type: 'select',
							ref: 'link',
							title: this.$editTrans('insertLink'),
							leftBorder: this.$parent.linkConfig.leftBorder,
							rightBorder: this.$parent.linkConfig.rightBorder,
							disabled: this.$parent.linkConfig.disabled || this.$parent.disabled,
							active: this.$parent.linkConfig.active,
							hideScroll: true,
							onLayerShow: () => {
								//存在选区的情况下预置链接文本值
								if (!this.$parent.$parent.editor.range.anchor.isEqual(this.$parent.$parent.editor.range.focus)) {
									const result = this.$parent.$parent.editor.getElementsByRange(true, true)
									let text = ''
									result.forEach(item => {
										if (item.element.isText()) {
											if (item.offset) {
												text += item.element.textContent.substring(item.offset[0], item.offset[1])
											} else {
												text += item.element.textContent || ''
											}
										}
									})
									this.$parent.linkConfig.text = text
								}
							}
						},
						{
							default: () =>
								h(Icon, {
									value: 'link'
								}),
							layer: () =>
								h(InsertLink, {
									disabled: this.$parent.linkConfig.disabled || this.$parent.disabled,
									color: this.$parent.$parent.color,
									text: this.$parent.linkConfig.text,
									onLinkInsert: (text, url, newOpen) => {
										this.$parent.insertLink(text, url, newOpen)
										this.$refs.link.layerConfig.show = false
									}
								})
						}
					)
				}
				return null
			}
		}
	},
	methods: {
		//按钮操作触发函数
		handleOperate(name, val) {
			if (this.disabled) {
				return
			}
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
			//设置缩进
			else if (name == 'indent') {
				//增加缩进
				if (val == 'indent-increase') {
					this.$parent.setIndentIncrease()
				}
				//减少缩进
				else if (val == 'indent-decrease') {
					this.$parent.setIndentDecrease()
				}
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
			//设置删除线
			else if (name == 'strikethrough') {
				this.$parent.setTextStyle('text-decoration', 'line-through')
			}
			//设置行内代码
			else if (name == 'code') {
				this.$parent.setTextMark('data-editify-code', true)
			}
			//设置上标
			else if (name == 'super') {
				this.$parent.setTextStyle('vertical-align', 'super')
			}
			//设置下标
			else if (name == 'sub') {
				this.$parent.setTextStyle('vertical-align', 'sub')
			}
			//清除格式
			else if (name == 'formatClear') {
				this.$parent.formatText()
			}
			//设置字号
			else if (name == 'fontSize') {
				this.$parent.setTextStyle('font-size', val)
			}
			//设置字体
			else if (name == 'fontFamily') {
				this.$parent.setTextStyle('font-family', val)
			}
			//设置行高
			else if (name == 'lineHeight') {
				this.$parent.setLineHeight(val)
			}
			//设置前景色
			else if (name == 'foreColor') {
				this.$parent.setTextStyle('color', val)
			}
			//设置背景色
			else if (name == 'backColor') {
				this.$parent.setTextStyle('background-color', val)
			}
		},
		//处理光标更新
		handleRangeUpdate() {
			if (this.disabled) {
				return
			}
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

			//删除线按钮是否激活
			this.strikethroughConfig.active = this.$parent.queryTextStyle('text-decoration', 'line-through')

			//行内代码按钮是否激活
			this.codeConfig.active = this.$parent.queryTextMark('data-editify-code')

			//上标按钮是否激活
			this.superConfig.active = this.$parent.queryTextStyle('vertical-align', 'super')

			//下标按钮是否激活
			this.subConfig.active = this.$parent.queryTextStyle('vertical-align', 'sub')

			//显示已选择字号
			const findFontItem = this.fontSizeConfig.displayConfig.options.find(item => {
				if (Dap.common.isObject(item)) {
					return this.$parent.queryTextStyle('font-size', item.value)
				}
				return this.$parent.queryTextStyle('font-size', item)
			})
			this.fontSizeConfig.displayConfig.value = findFontItem ? (Dap.common.isObject(findFontItem) ? findFontItem.value : findFontItem) : this.fontSizeConfig.defaultValue
			//显示已选择字体
			const findFamilyItem = this.fontFamilyConfig.displayConfig.options.find(item => {
				if (Dap.common.isObject(item)) {
					return this.$parent.queryTextStyle('font-family', item.value)
				}
				return this.$parent.queryTextStyle('font-family', item)
			})
			this.fontFamilyConfig.displayConfig.value = findFamilyItem ? (Dap.common.isObject(findFamilyItem) ? findFamilyItem.value : findFamilyItem) : this.fontFamilyConfig.defaultValue

			//显示已设置行高
			const findHeightItem = this.lineHeightConfig.displayConfig.options.find(item => {
				let val = item
				if (Dap.common.isObject(item)) {
					val = item.value
				}
				if (this.$parent.editor.range.anchor.isEqual(this.$parent.editor.range.focus)) {
					const block = this.$parent.editor.range.anchor.element.getBlock()
					return block.hasStyles() && block.styles['line-height'] == val
				}
				return result.every(el => {
					if (el.element.isBlock() || el.element.isInblock()) {
						return el.element.hasStyles() && el.element.styles['line-height'] == val
					}
					const block = el.element.getBlock()
					const inblock = el.element.getInblock()
					if (inblock) {
						return inblock.hasStyles() && inblock.styles['line-height'] == val
					}
					return block.hasStyles() && block.styles['line-height'] == val
				})
			})
			this.lineHeightConfig.displayConfig.value = findHeightItem ? (Dap.common.isObject(findHeightItem) ? findHeightItem.value : findHeightItem) : this.lineHeightConfig.defaultValue

			//缩进禁用
			if (this.$parent.editor.range.anchor.isEqual(this.$parent.editor.range.focus)) {
				this.indentConfig.disabled = this.$parent.editor.range.anchor.element.isPreStyle()
			} else {
				this.indentConfig.disabled = result.every(item => {
					return item.element.isPreStyle()
				})
			}

			//链接禁用
			this.linkConfig.disabled = !!this.$parent.getCurrentParsedomElement('a')
		},
		//插入链接
		insertLink(text, url, newOpen) {
			if (this.disabled) {
				return
			}
			if (!url) {
				return
			}

			if (!text) {
				text = url
			}
			const marks = {
				href: url
			}
			if (newOpen) {
				marks.target = '_blank'
			}
			const linkEle = new AlexElement('inline', 'a', marks, null, null)
			const textEle = new AlexElement('text', null, null, null, text)
			this.$parent.editor.addElementTo(textEle, linkEle)
			this.$parent.editor.insertElement(linkEle)
			this.$parent.editor.formatElementStack()
			this.$parent.editor.domRender()
			this.$parent.editor.rangeRender()
		}
	}
}
</script>
<style lang="less" scoped>
.editify-menu {
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
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

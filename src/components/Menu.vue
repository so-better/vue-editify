<template>
	<div class="editify-menu" :class="{ border: menuShowBorder, source: $parent.isSourceView && menuMode == 'inner', fullscreen: $parent.isFullScreen }" :data-editify-mode="menuMode" :style="config.style || ''">
		<MenuItem v-for="item in menuNames" :name="item" :disabled="menuDisabled(item)"></MenuItem>
	</div>
</template>
<script>
import Icon from './base/Icon'
import Button from './base/Button'
import Colors from './common/Colors'
import InsertLink from './common/InsertLink'
import InsertImage from './common/InsertImage'
import InsertVideo from './common/InsertVideo'
import InsertTable from './common/InsertTable'
import { h, getCurrentInstance } from 'vue'
import { common as DapCommon } from 'dap-util'
import { getLinkText, setHeading, setIndentIncrease, setIndentDecrease, setQuote, setAlign, setList, setTask, setTextStyle, setTextMark, removeTextStyle, removeTextMark, setLineHeight, insertLink, insertImage, insertVideo, insertTable, insertCodeBlock, hasPreInRange, hasTableInRange, hasQuoteInRange, hasLinkInRange, isRangeInQuote, isRangeInList, isRangeInTask, queryTextStyle, queryTextMark, getCurrentParsedomElement } from '../core/function'
export default {
	name: 'Menu',
	props: {
		//菜单栏配置
		config: {
			type: Object,
			default: null
		},
		//主题色
		color: {
			type: String,
			default: ''
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
			//任务列表按钮配置
			taskConfig: {
				show: this.config.task.show,
				leftBorder: this.config.task.leftBorder,
				rightBorder: this.config.task.rightBorder,
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
			//链接按钮配置
			linkConfig: {
				show: this.config.link.show,
				leftBorder: this.config.link.leftBorder,
				rightBorder: this.config.link.rightBorder,
				active: false,
				disabled: false,
				text: '' //链接的文本
			},
			//插入图片按钮配置
			imageConfig: {
				show: this.config.image.show,
				leftBorder: this.config.image.leftBorder,
				rightBorder: this.config.image.rightBorder,
				active: false,
				disabled: false,
				accept: this.config.image.accept,
				multiple: this.config.image.multiple,
				maxSize: this.config.image.maxSize,
				minSize: this.config.image.minSize,
				handleError: this.config.image.handleError,
				customUpload: this.config.image.customUpload
			},
			//插入视频按钮配置
			videoConfig: {
				show: this.config.video.show,
				leftBorder: this.config.video.leftBorder,
				rightBorder: this.config.video.rightBorder,
				active: false,
				disabled: false,
				accept: this.config.video.accept,
				multiple: this.config.video.multiple,
				maxSize: this.config.video.maxSize,
				minSize: this.config.video.minSize,
				handleError: this.config.video.handleError,
				customUpload: this.config.video.customUpload
			},
			//表格按钮配置
			tableConfig: {
				show: this.config.table.show,
				leftBorder: this.config.table.leftBorder,
				rightBorder: this.config.table.rightBorder,
				active: false,
				disabled: false,
				maxRows: this.config.table.maxRows,
				maxColumns: this.config.table.maxColumns
			},
			//代码块按钮配置
			codeBlockConfig: {
				show: this.config.codeBlock.show,
				leftBorder: this.config.codeBlock.leftBorder,
				rightBorder: this.config.codeBlock.rightBorder,
				active: false,
				disabled: false
			},
			//代码视图按钮配置
			sourceViewConfig: {
				show: this.config.sourceView.show,
				leftBorder: this.config.sourceView.leftBorder,
				rightBorder: this.config.sourceView.rightBorder,
				active: false,
				disabled: false
			},
			//全屏按钮配置
			fullScreenConfig: {
				show: this.config.fullScreen.show,
				leftBorder: this.config.fullScreen.leftBorder,
				rightBorder: this.config.fullScreen.rightBorder,
				active: false,
				disabled: false
			}
		}
	},
	computed: {
		//整个菜单栏是否禁用
		disabled() {
			return this.$parent.disabled || !this.$parent.canUseMenu
		},
		//菜单名称数组
		menuNames() {
			return Object.keys(this.config.sequence).sort((a, b) => {
				if (this.config.sequence[a] > this.config.sequence[b]) {
					return 1
				}
				return -1
			})
		},
		//菜单是否禁用
		menuDisabled() {
			return name => {
				if (name == 'sourceView' || name == 'fullScreen') {
					return false
				}
				return this.$parent.isSourceView
			}
		},
		//菜单模式
		menuMode() {
			//如果是全屏状态下或者高度自适应情况下
			if (this.$parent.isFullScreen || this.$parent.height === true) {
				//fixed模式改为默认模式
				if (this.config.mode == 'fixed') {
					return 'default'
				}
			}
			return this.config.mode
		},
		//菜单栏是否显示边框
		menuShowBorder() {
			//fixed模式下不显示边框
			if (this.menuMode == 'fixed') {
				return false
			}
			//由编辑器的border属性来决定
			return this.$parent.showBorder
		}
	},
	components: {
		MenuItem: {
			props: {
				name: String,
				disabled: Boolean
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
							disabled: this.$parent.undoConfig.disabled || this.disabled || this.$parent.disabled,
							color: this.$parent.color,
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
							disabled: this.$parent.redoConfig.disabled || this.disabled || this.$parent.disabled,
							color: this.$parent.color,
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
						color: this.$parent.color,
						disabled: this.$parent.headingConfig.disabled || this.disabled || this.$parent.disabled,
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
							color: this.$parent.color,
							disabled: this.$parent.indentConfig.disabled || this.disabled || this.$parent.disabled,
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
							color: this.$parent.color,
							disabled: this.$parent.quoteConfig.disabled || this.disabled || this.$parent.disabled,
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
							color: this.$parent.color,
							disabled: this.$parent.alignConfig.disabled || this.disabled || this.$parent.disabled,
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
							color: this.$parent.color,
							disabled: this.$parent.orderListConfig.disabled || this.disabled || this.$parent.disabled,
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
							color: this.$parent.color,
							disabled: this.$parent.unorderListConfig.disabled || this.disabled || this.$parent.disabled,
							active: this.$parent.unorderListConfig.active,
							onOperate: this.$parent.handleOperate
						},
						() => h(Icon, { value: 'list-unordered' })
					)
				}
				//任务列表按钮
				if (this.name == 'task' && this.$parent.taskConfig.show) {
					return h(
						Button,
						{
							...props,
							title: this.$editTrans('task'),
							leftBorder: this.$parent.taskConfig.leftBorder,
							rightBorder: this.$parent.taskConfig.rightBorder,
							color: this.$parent.color,
							disabled: this.$parent.taskConfig.disabled || this.disabled || this.$parent.disabled,
							active: this.$parent.taskConfig.active,
							onOperate: this.$parent.handleOperate
						},
						() => h(Icon, { value: 'task' })
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
							color: this.$parent.color,
							disabled: this.$parent.boldConfig.disabled || this.disabled || this.$parent.disabled,
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
							color: this.$parent.color,
							disabled: this.$parent.underlineConfig.disabled || this.disabled || this.$parent.disabled,
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
							color: this.$parent.color,
							disabled: this.$parent.italicConfig.disabled || this.disabled || this.$parent.disabled,
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
							color: this.$parent.color,
							disabled: this.$parent.strikethroughConfig.disabled || this.disabled || this.$parent.disabled,
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
							color: this.$parent.color,
							disabled: this.$parent.codeConfig.disabled || this.disabled || this.$parent.disabled,
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
							color: this.$parent.color,
							disabled: this.$parent.superConfig.disabled || this.disabled || this.$parent.disabled,
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
							color: this.$parent.color,
							disabled: this.$parent.subConfig.disabled || this.disabled || this.$parent.disabled,
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
							color: this.$parent.color,
							disabled: this.$parent.formatClearConfig.disabled || this.disabled || this.$parent.disabled,
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
						color: this.$parent.color,
						disabled: this.$parent.fontSizeConfig.disabled || this.disabled || this.$parent.disabled,
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
						color: this.$parent.color,
						disabled: this.$parent.fontFamilyConfig.disabled || this.disabled || this.$parent.disabled,
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
						color: this.$parent.color,
						disabled: this.$parent.lineHeightConfig.disabled || this.disabled || this.$parent.disabled,
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
							ref: 'btn',
							type: 'select',
							selectConfig: this.$parent.foreColorConfig.selectConfig,
							title: this.$editTrans('foreColor'),
							leftBorder: this.$parent.foreColorConfig.leftBorder,
							rightBorder: this.$parent.foreColorConfig.rightBorder,
							color: this.$parent.color,
							disabled: this.$parent.foreColorConfig.disabled || this.disabled || this.$parent.disabled,
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
									color: this.$parent.color,
									onChange: val => {
										this.$parent.handleOperate.apply(this.$parent, ['foreColor', val])
										this.$refs.btn.hideLayer()
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
							ref: 'btn',
							selectConfig: this.$parent.backColorConfig.selectConfig,
							title: this.$editTrans('backColor'),
							leftBorder: this.$parent.backColorConfig.leftBorder,
							rightBorder: this.$parent.backColorConfig.rightBorder,
							color: this.$parent.color,
							disabled: this.$parent.backColorConfig.disabled || this.disabled || this.$parent.disabled,
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
									color: this.$parent.color,
									onChange: val => {
										this.$parent.handleOperate.apply(this.$parent, ['backColor', val])
										this.$refs.btn.hideLayer()
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
							ref: 'btn',
							title: this.$editTrans('insertLink'),
							leftBorder: this.$parent.linkConfig.leftBorder,
							rightBorder: this.$parent.linkConfig.rightBorder,
							color: this.$parent.color,
							disabled: this.$parent.linkConfig.disabled || this.disabled || this.$parent.disabled,
							active: this.$parent.linkConfig.active,
							hideScroll: true,
							onLayerShow: () => {
								//存在选区的情况下预置链接文本值
								this.$parent.linkConfig.text = getLinkText(this.$parent.$parent)
							}
						},
						{
							default: () =>
								h(Icon, {
									value: 'link'
								}),
							layer: () =>
								h(InsertLink, {
									color: this.$parent.color,
									text: this.$parent.linkConfig.text,
									onInsert: (text, url, newOpen) => {
										this.$parent.handleOperate.apply(this.$parent, ['link', { text, url, newOpen }])
										this.$refs.btn.hideLayer()
									}
								})
						}
					)
				}
				//图片按钮
				if (this.name == 'image' && this.$parent.imageConfig.show) {
					return h(
						Button,
						{
							...props,
							type: 'select',
							ref: 'btn',
							title: this.$editTrans('insertImage'),
							leftBorder: this.$parent.imageConfig.leftBorder,
							rightBorder: this.$parent.imageConfig.rightBorder,
							color: this.$parent.color,
							disabled: this.$parent.imageConfig.disabled || this.disabled || this.$parent.disabled,
							active: this.$parent.imageConfig.active,
							hideScroll: true
						},
						{
							default: () =>
								h(Icon, {
									value: 'image'
								}),
							layer: () =>
								h(InsertImage, {
									color: this.$parent.color,
									accept: this.$parent.imageConfig.accept,
									multiple: this.$parent.imageConfig.multiple,
									maxSize: this.$parent.imageConfig.maxSize,
									minSize: this.$parent.imageConfig.minSize,
									customUpload: this.$parent.imageConfig.customUpload,
									handleError: this.$parent.imageConfig.handleError,
									onChange: () => {
										this.$refs.btn.$refs.layer.setPosition()
									},
									onInsert: url => {
										this.$parent.handleOperate.apply(this.$parent, ['image', url])
										this.$refs.btn.hideLayer()
									}
								})
						}
					)
				}
				//视频按钮
				if (this.name == 'video' && this.$parent.videoConfig.show) {
					return h(
						Button,
						{
							...props,
							type: 'select',
							ref: 'btn',
							title: this.$editTrans('insertVideo'),
							leftBorder: this.$parent.videoConfig.leftBorder,
							rightBorder: this.$parent.videoConfig.rightBorder,
							color: this.$parent.color,
							disabled: this.$parent.videoConfig.disabled || this.disabled || this.$parent.disabled,
							active: this.$parent.videoConfig.active,
							hideScroll: true
						},
						{
							default: () =>
								h(Icon, {
									value: 'video'
								}),
							layer: () =>
								h(InsertVideo, {
									color: this.$parent.color,
									accept: this.$parent.videoConfig.accept,
									multiple: this.$parent.videoConfig.multiple,
									maxSize: this.$parent.videoConfig.maxSize,
									minSize: this.$parent.videoConfig.minSize,
									customUpload: this.$parent.videoConfig.customUpload,
									handleError: this.$parent.videoConfig.handleError,
									onChange: () => {
										this.$refs.btn.$refs.layer.setPosition()
									},
									onInsert: url => {
										this.$parent.handleOperate.apply(this.$parent, ['video', url])
										this.$refs.btn.hideLayer()
									}
								})
						}
					)
				}
				//表格按钮
				if (this.name == 'table' && this.$parent.tableConfig.show) {
					return h(
						Button,
						{
							...props,
							type: 'select',
							ref: 'btn',
							title: this.$editTrans('insertTable'),
							leftBorder: this.$parent.tableConfig.leftBorder,
							rightBorder: this.$parent.tableConfig.rightBorder,
							color: this.$parent.color,
							disabled: this.$parent.tableConfig.disabled || this.disabled || this.$parent.disabled,
							active: this.$parent.tableConfig.active,
							hideScroll: true
						},
						{
							default: () =>
								h(Icon, {
									value: 'table'
								}),
							layer: () =>
								h(InsertTable, {
									color: this.$parent.color,
									maxRows: this.$parent.tableConfig.maxRows,
									maxColumns: this.$parent.tableConfig.maxColumns,
									onInsert: (row, column) => {
										this.$parent.handleOperate.apply(this.$parent, ['table', { row, column }])
										this.$refs.btn.hideLayer()
									}
								})
						}
					)
				}
				//代码块按钮
				if (this.name == 'codeBlock' && this.$parent.codeBlockConfig.show) {
					return h(
						Button,
						{
							...props,
							title: this.$editTrans('inserCodeBlock'),
							leftBorder: this.$parent.codeBlockConfig.leftBorder,
							rightBorder: this.$parent.codeBlockConfig.rightBorder,
							color: this.$parent.color,
							disabled: this.$parent.codeBlockConfig.disabled || this.disabled || this.$parent.disabled,
							active: this.$parent.codeBlockConfig.active,
							onOperate: this.$parent.handleOperate
						},
						() => h(Icon, { value: 'code-block' })
					)
				}
				//代码视图按钮
				if (this.name == 'sourceView' && this.$parent.sourceViewConfig.show) {
					return h(
						Button,
						{
							...props,
							title: this.$editTrans('sourceView'),
							leftBorder: this.$parent.sourceViewConfig.leftBorder,
							rightBorder: this.$parent.sourceViewConfig.rightBorder,
							color: this.$parent.color,
							disabled: this.$parent.sourceViewConfig.disabled || this.disabled || this.$parent.disabled,
							active: this.$parent.sourceViewConfig.active,
							onOperate: this.$parent.handleOperate
						},
						() => h(Icon, { value: 'source-view' })
					)
				}
				//全屏按钮
				if (this.name == 'fullScreen' && this.$parent.fullScreenConfig.show) {
					return h(
						Button,
						{
							...props,
							title: this.$editTrans('fullScreen'),
							leftBorder: this.$parent.fullScreenConfig.leftBorder,
							rightBorder: this.$parent.fullScreenConfig.rightBorder,
							color: this.$parent.color,
							disabled: this.$parent.fullScreenConfig.disabled || this.disabled || this.$parent.disabled,
							active: this.$parent.fullScreenConfig.active,
							onOperate: this.$parent.handleOperate
						},
						() => h(Icon, { value: 'full-screen' })
					)
				}

				/** 下面是拓展菜单的配置 */
				if (DapCommon.isObject(this.$parent.config.extends)) {
					//获取菜单按钮的配置
					const configuration = this.$parent.config.extends[this.name]
					if (configuration) {
						//渲染函数
						return h(
							Button,
							{
								...props,
								ref: 'btn',
								type: configuration.type || 'default',
								title: configuration.title || '',
								leftBorder: configuration.leftBorder || false,
								rightBorder: configuration.rightBorder || false,
								disabled: configuration.disabled || this.disabled || this.$parent.disabled,
								hideScroll: configuration.hideScroll || false,
								active: configuration.active || false,
								selectConfig: {
									width: configuration.width,
									maxHeight: configuration.maxHeight,
									options: configuration.options
								},
								displayConfig: {
									width: configuration.width,
									maxHeight: configuration.maxHeight,
									value: configuration.value,
									options: configuration.options
								},
								color: this.$parent.color,
								onLayerShow: () => {
									if (typeof configuration.onLayerShow == 'function') {
										configuration.onLayerShow.apply(this.$parent.$parent, [this.name, this.$refs.btn])
									}
								},
								onLayerShown: () => {
									if (typeof configuration.onLayerShown == 'function') {
										configuration.onLayerShown.apply(this.$parent.$parent, [this.name, this.$refs.btn])
									}
								},
								onLayerHidden: () => {
									if (typeof configuration.onLayerHidden == 'function') {
										configuration.onLayerHidden.apply(this.$parent.$parent, [this.name, this.$refs.btn])
									}
								},
								onOperate: (name, val) => {
									if (typeof configuration.onOperate == 'function') {
										configuration.onOperate.apply(this.$parent.$parent, [name, val, this.$refs.btn])
									}
								}
							},
							{
								default: configuration.default || null,
								layer: configuration.layer || null,
								option: configuration.option || null
							}
						)
					}
				}

				return null
			}
		}
	},
	methods: {
		//按钮操作触发函数
		handleOperate(name, val) {
			//菜单栏禁用
			if (this.disabled) {
				return
			}
			//没有获取焦点
			if (!this.$parent.editor.range) {
				return
			}
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
				setHeading(this.$parent, val)
				this.$parent.editor.formatElementStack()
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
			}
			//设置缩进
			else if (name == 'indent') {
				//增加缩进
				if (val == 'indent-increase') {
					setIndentIncrease(this.$parent)
				}
				//减少缩进
				else if (val == 'indent-decrease') {
					setIndentDecrease(this.$parent)
				}
				this.$parent.editor.formatElementStack()
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
			}
			//设置引用
			else if (name == 'quote') {
				setQuote(this.$parent)
				this.$parent.editor.formatElementStack()
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
			}
			//设置对齐方式
			else if (name == 'align') {
				setAlign(this.$parent, val)
				this.$parent.editor.formatElementStack()
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
			}
			//设置有序列表
			else if (name == 'orderList') {
				setList(this.$parent, true)
				this.$parent.editor.formatElementStack()
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
			}
			//设置无序列表
			else if (name == 'unorderList') {
				setList(this.$parent, false)
				this.$parent.editor.formatElementStack()
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
			}
			//设置任务列表
			else if (name == 'task') {
				setTask(this.$parent)
				this.$parent.editor.formatElementStack()
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
			}
			//设置粗体
			else if (name == 'bold') {
				if (queryTextStyle(this.$parent, 'font-weight', 'bold') || queryTextStyle(this.$parent, 'font-weight', '700')) {
					removeTextStyle(this.$parent, ['font-weight'])
				} else {
					setTextStyle(this.$parent, {
						'font-weight': 'bold'
					})
				}
				this.$parent.editor.formatElementStack()
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
			}
			//设置下划线
			else if (name == 'underline') {
				if (queryTextStyle(this.$parent, 'text-decoration', 'underline') || queryTextStyle(this.$parent, 'text-decoration-line', 'underline')) {
					removeTextStyle(this.$parent, ['text-decoration', 'text-decoration-line'])
				} else {
					setTextStyle(this.$parent, {
						'text-decoration': 'underline'
					})
				}
				this.$parent.editor.formatElementStack()
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
			}
			//设置斜体
			else if (name == 'italic') {
				if (queryTextStyle(this.$parent, 'font-style', 'italic')) {
					removeTextStyle(this.$parent, ['font-style'])
				} else {
					setTextStyle(this.$parent, {
						'font-style': 'italic'
					})
				}
				this.$parent.editor.formatElementStack()
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
			}
			//设置删除线
			else if (name == 'strikethrough') {
				if (queryTextStyle(this.$parent, 'text-decoration', 'line-through') || queryTextStyle(this.$parent, 'text-decoration-line', 'line-through')) {
					removeTextStyle(this.$parent, ['text-decoration', 'text-decoration-line'])
				} else {
					setTextStyle(this.$parent, {
						'text-decoration': 'line-through'
					})
				}
				this.$parent.editor.formatElementStack()
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
			}
			//设置行内代码
			else if (name == 'code') {
				if (queryTextMark(this.$parent, 'data-editify-code')) {
					removeTextMark(this.$parent, ['data-editify-code'])
				} else {
					setTextMark(this.$parent, {
						'data-editify-code': true
					})
				}
				this.$parent.editor.formatElementStack()
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
			}
			//设置上标
			else if (name == 'super') {
				if (queryTextStyle(this.$parent, 'vertical-align', 'super')) {
					removeTextStyle(this.$parent, ['vertical-align'])
				} else {
					setTextStyle(this.$parent, {
						'vertical-align': 'super'
					})
				}
				this.$parent.editor.formatElementStack()
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
			}
			//设置下标
			else if (name == 'sub') {
				if (queryTextStyle(this.$parent, 'vertical-align', 'sub')) {
					removeTextStyle(this.$parent, ['vertical-align'])
				} else {
					setTextStyle(this.$parent, {
						'vertical-align': 'sub'
					})
				}
				this.$parent.editor.formatElementStack()
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
			}
			//清除格式
			else if (name == 'formatClear') {
				removeTextStyle(this.$parent)
				removeTextMark(this.$parent)
				this.$parent.editor.formatElementStack()
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
			}
			//设置字号
			else if (name == 'fontSize') {
				setTextStyle(this.$parent, {
					'font-size': val
				})
				this.$parent.editor.formatElementStack()
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
			}
			//设置字体
			else if (name == 'fontFamily') {
				setTextStyle(this.$parent, {
					'font-family': val
				})
				this.$parent.editor.formatElementStack()
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
			}
			//设置行高
			else if (name == 'lineHeight') {
				setLineHeight(this.$parent, val)
				this.$parent.editor.formatElementStack()
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
			}
			//设置前景色
			else if (name == 'foreColor') {
				setTextStyle(this.$parent, {
					color: val
				})
				this.$parent.editor.formatElementStack()
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
			}
			//设置背景色
			else if (name == 'backColor') {
				setTextStyle(this.$parent, {
					'background-color': val
				})
				this.$parent.editor.formatElementStack()
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
			}
			//插入链接
			else if (name == 'link') {
				if (!val.url) {
					return
				}
				insertLink(this.$parent, val.text, val.url, val.newOpen)
				this.$parent.editor.formatElementStack()
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
			}
			//插入图片
			else if (name == 'image') {
				if (!val) {
					return
				}
				insertImage(this.$parent, val)
				this.$parent.editor.formatElementStack()
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
			}
			//插入视频
			else if (name == 'video') {
				if (!val) {
					return
				}
				insertVideo(this.$parent, val)
				this.$parent.editor.formatElementStack()
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
			}
			//插入表格
			else if (name == 'table') {
				insertTable(this.$parent, val.row, val.column)
				this.$parent.editor.formatElementStack()
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
			}
			//插入代码块
			else if (name == 'codeBlock') {
				insertCodeBlock(this.$parent)
				this.$parent.editor.formatElementStack()
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
			}
			//代码视图
			else if (name == 'sourceView') {
				this.$parent.isSourceView = !this.$parent.isSourceView
				this.sourceViewConfig.active = this.$parent.isSourceView
				if (!this.$parent.isSourceView) {
					this.$parent.editor.rangeRender()
				}
			}
			//全屏
			else if (name == 'fullScreen') {
				this.$parent.isFullScreen = !this.$parent.isFullScreen
				this.fullScreenConfig.active = this.$parent.isFullScreen
				this.$parent.editor.rangeRender()
			}
		},
		//处理光标更新
		handleRangeUpdate() {
			//选区是否含有代码块
			const value_hasPreInRange = hasPreInRange(this.$parent)
			//选区是否含有表格元素
			const value_hasTableInRange = hasTableInRange(this.$parent)
			//选区是否含有引用元素
			const value_hasQuoteInRange = hasQuoteInRange(this.$parent)
			//选区是否都在引用元素内
			const value_isRangeInQuote = isRangeInQuote(this.$parent)
			//选区是否含有链接元素
			const value_hasLinkInRange = hasLinkInRange(this.$parent)
			//选区是否都在有序列表内
			const value_isRangeInOrderList = isRangeInList(this.$parent, true)
			//选区是否都在无序列表内
			const value_isRangeInUnorderList = isRangeInList(this.$parent, false)
			//选区是否都在任务列表内
			const value_isRangeInTask = isRangeInTask(this.$parent)
			//额外禁用判定
			const extraDisabled = name => {
				if (typeof this.config.extraDisabled == 'function') {
					return this.config.extraDisabled.apply(this.$parent, [name]) || false
				}
				return false
			}

			//撤销按钮禁用
			this.undoConfig.disabled = !this.$parent.editor.history.get(-1) || extraDisabled('undo')

			//重做按钮禁用
			this.redoConfig.disabled = !this.$parent.editor.history.get(1) || extraDisabled('redo')

			//显示已设置标题
			const findHeadingItem = this.headingConfig.displayConfig.options.find(item => {
				let val = item
				if (DapCommon.isObject(item)) {
					val = item.value
				}
				if (this.$parent.editor.range.anchor.isEqual(this.$parent.editor.range.focus)) {
					return this.$parent.editor.range.anchor.element.getBlock().parsedom == val
				}
				return this.$parent.dataRangeCaches.list.every(el => {
					if (el.element.isBlock()) {
						return el.element.parsedom == val
					}
					return el.element.getBlock().parsedom == val
				})
			})
			this.headingConfig.displayConfig.value = findHeadingItem ? (DapCommon.isObject(findHeadingItem) ? findHeadingItem.value : findHeadingItem) : this.headingConfig.defaultValue
			//标题禁用
			this.headingConfig.disabled = value_hasPreInRange || value_hasTableInRange || extraDisabled('heading')

			//缩进禁用
			this.indentConfig.disabled = value_hasPreInRange || value_hasTableInRange || extraDisabled('indent')

			//引用按钮激活
			this.quoteConfig.active = value_isRangeInQuote
			//引用按钮禁用
			this.quoteConfig.disabled = value_hasPreInRange || value_hasTableInRange || extraDisabled('quote')

			//对齐方式按钮禁用
			this.alignConfig.disabled = value_hasPreInRange || extraDisabled('align')

			//有序列表按钮激活
			this.orderListConfig.active = value_isRangeInOrderList
			//有序列表禁用
			this.orderListConfig.disabled = value_hasPreInRange || value_hasTableInRange || extraDisabled('orderList')

			//无序列表按钮激活
			this.unorderListConfig.active = value_isRangeInUnorderList
			//无序列表禁用
			this.unorderListConfig.disabled = value_hasPreInRange || value_hasTableInRange || extraDisabled('unorderList')

			//任务列表按钮激活
			this.taskConfig.active = value_isRangeInTask
			//任务列表禁用
			this.taskConfig.disabled = value_hasPreInRange || value_hasTableInRange || extraDisabled('task')

			//粗体按钮激活
			this.boldConfig.active = queryTextStyle(this.$parent, 'font-weight', 'bold') || queryTextStyle(this.$parent, 'font-weight', '700')
			//粗体按钮禁用
			this.boldConfig.disabled = value_hasPreInRange || extraDisabled('bold')

			//下划线按钮激活
			this.underlineConfig.active = queryTextStyle(this.$parent, 'text-decoration', 'underline') || queryTextStyle(this.$parent, 'text-decoration-line', 'underline')
			//下划线按钮禁用
			this.underlineConfig.disabled = value_hasPreInRange || extraDisabled('underline')

			//斜体按钮激活
			this.italicConfig.active = queryTextStyle(this.$parent, 'font-style', 'italic')
			//斜体按钮禁用
			this.italicConfig.disabled = value_hasPreInRange || extraDisabled('italic')

			//删除线按钮激活
			this.strikethroughConfig.active = queryTextStyle(this.$parent, 'text-decoration', 'line-through') || queryTextStyle(this.$parent, 'text-decoration-line', 'line-through')
			//删除线按钮禁用
			this.strikethroughConfig.disabled = value_hasPreInRange || extraDisabled('strikethrough')

			//行内代码按钮激活
			this.codeConfig.active = queryTextMark(this.$parent, 'data-editify-code')
			//行内代码按钮禁用
			this.codeConfig.disabled = value_hasPreInRange || extraDisabled('code')

			//上标按钮激活
			this.superConfig.active = queryTextStyle(this.$parent, 'vertical-align', 'super')
			//上标按钮禁用
			this.superConfig.disabled = value_hasPreInRange || extraDisabled('super')

			//下标按钮激活
			this.subConfig.active = queryTextStyle(this.$parent, 'vertical-align', 'sub')
			//下标按钮禁用
			this.subConfig.disabled = value_hasPreInRange || extraDisabled('sub')

			//清除格式按钮禁用
			this.formatClearConfig.disabled = value_hasPreInRange || extraDisabled('formatClear')

			//显示已选择字号
			const findFontItem = this.fontSizeConfig.displayConfig.options.find(item => {
				if (DapCommon.isObject(item)) {
					return queryTextStyle(this.$parent, 'font-size', item.value)
				}
				return queryTextStyle(this.$parent, 'font-size', item)
			})
			this.fontSizeConfig.displayConfig.value = findFontItem ? (DapCommon.isObject(findFontItem) ? findFontItem.value : findFontItem) : this.fontSizeConfig.defaultValue
			//字号按钮禁用
			this.fontSizeConfig.disabled = value_hasPreInRange || extraDisabled('fontSize')

			//显示已选择字体
			const findFamilyItem = this.fontFamilyConfig.displayConfig.options.find(item => {
				if (DapCommon.isObject(item)) {
					return queryTextStyle(this.$parent, 'font-family', item.value)
				}
				return queryTextStyle(this.$parent, 'font-family', item)
			})
			this.fontFamilyConfig.displayConfig.value = findFamilyItem ? (DapCommon.isObject(findFamilyItem) ? findFamilyItem.value : findFamilyItem) : this.fontFamilyConfig.defaultValue
			//字体按钮禁用
			this.fontFamilyConfig.disabled = value_hasPreInRange || extraDisabled('fontFamily')

			//显示已设置行高
			const findHeightItem = this.lineHeightConfig.displayConfig.options.find(item => {
				let val = item
				if (DapCommon.isObject(item)) {
					val = item.value
				}
				if (this.$parent.editor.range.anchor.isEqual(this.$parent.editor.range.focus)) {
					const block = this.$parent.editor.range.anchor.element.getBlock()
					return block.hasStyles() && block.styles['line-height'] == val
				}
				return this.$parent.dataRangeCaches.list.every(el => {
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
			this.lineHeightConfig.displayConfig.value = findHeightItem ? (DapCommon.isObject(findHeightItem) ? findHeightItem.value : findHeightItem) : this.lineHeightConfig.defaultValue
			//行高按钮禁用
			this.lineHeightConfig.disabled = value_hasPreInRange || extraDisabled('lineHeight')

			//显示已选择的前景色
			const findForeColorItem = this.foreColorConfig.selectConfig.options.find(item => {
				if (DapCommon.isObject(item)) {
					return queryTextStyle(this.$parent, 'color', item.value)
				}
				return queryTextStyle(this.$parent, 'color', item)
			})
			this.foreColorConfig.value = findForeColorItem ? (DapCommon.isObject(findForeColorItem) ? findForeColorItem.value : findForeColorItem) : ''
			//前景色按钮禁用
			this.foreColorConfig.disabled = value_hasPreInRange || extraDisabled('foreColor')

			//显示已选择的背景色
			const findBackColorItem = this.backColorConfig.selectConfig.options.find(item => {
				if (DapCommon.isObject(item)) {
					return queryTextStyle(this.$parent, 'background-color', item.value)
				}
				return queryTextStyle(this.$parent, 'background-color', item)
			})
			this.backColorConfig.value = findBackColorItem ? (DapCommon.isObject(findBackColorItem) ? findBackColorItem.value : findBackColorItem) : ''
			//背景色按钮禁用
			this.backColorConfig.disabled = value_hasPreInRange || extraDisabled('backColor')

			//链接按钮禁用
			this.linkConfig.disabled = value_hasLinkInRange || value_hasPreInRange || extraDisabled('link')

			//插入图片按钮禁用
			this.imageConfig.disabled = value_hasPreInRange || extraDisabled('image')

			//插入视频按钮禁用
			this.videoConfig.disabled = value_hasPreInRange || extraDisabled('video')

			//表格按钮禁用
			this.tableConfig.disabled = value_hasPreInRange || value_hasTableInRange || value_hasQuoteInRange || extraDisabled('table')

			//代码块按钮激活
			this.codeBlockConfig.active = !!getCurrentParsedomElement(this.$parent, 'pre')
			//代码块按钮禁用
			this.codeBlockConfig.disabled = value_hasTableInRange || value_hasQuoteInRange || extraDisabled('codeBlock')

			//代码视图按钮激活
			this.sourceViewConfig.active = this.$parent.isSourceView

			//全屏按钮激活
			this.fullScreenConfig.active = this.$parent.isFullScreen
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
	background-color: @background;
	position: relative;
	z-index: 2;

	//默认菜单模式
	&[data-editify-mode='default'] {
		margin-bottom: 10px;
		padding: 6px 10px;

		//默认菜单模式显示边框，同时显示圆角
		&.border {
			border: 1px solid @border-color;
			border-radius: 4px;
		}

		//全屏模式下，默认菜单的边框失效，此时加一个下边框
		&.fullscreen {
			border-bottom: 1px solid @border-color;
		}
	}

	//inner菜单模式
	&[data-editify-mode='inner'] {
		padding: 10px;
		margin-bottom: -20px;

		//inner菜单模式显示边框，同时显示圆角
		&.border {
			border: 1px solid @border-color;
			border-bottom: none;
			border-radius: 4px 4px 0 0;
			transition: all 500ms;
		}

		//inner菜单模式加一个下边框，此边框在代码视图下不显示
		&:not(.source)::before {
			position: absolute;
			content: '';
			width: calc(100% - 20px);
			height: 1px;
			background-color: @border-color;
			left: 50%;
			transform: translateX(-50%);
			bottom: 0;
		}
	}

	//fixed菜单模式
	&[data-editify-mode='fixed'] {
		padding: 6px 10px;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 100;
		width: 100%;
		border-bottom: 1px solid @border-color;
		box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
	}
}
</style>

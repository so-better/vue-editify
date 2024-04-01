<template>
	<div class="editify-menu" :class="{ border: menuShowBorder, source: isSourceView && menuMode == 'inner', fullscreen: isFullScreen }" :data-editify-mode="menuMode" :style="config.style || ''">
		<MenuItem v-for="item in menuNames" :name="item" :disabled="menuDisabled(item)"></MenuItem>
	</div>
</template>
<script setup lang="ts">
import Icon from '../icon/icon.vue'
import Layer from '../layer/layer.vue'
import Button from '../button/button.vue'
import Colors from '../colors/colors.vue'
import InsertLink from '../insertLink/insertLink.vue'
import InsertImage from '../insertImage/insertImage.vue'
import InsertVideo from '../insertVideo/insertVideo.vue'
import InsertTable from '../insertTable/insertTable.vue'
import { h, getCurrentInstance, ref, computed, inject, ComponentInternalInstance, Ref, ComputedRef, defineComponent } from 'vue'
import { common as DapCommon } from 'dap-util'
import { getLinkText, setHeading, setIndentIncrease, setIndentDecrease, setQuote, setAlign, setList, setTask, setTextStyle, setTextMark, removeTextStyle, removeTextMark, setLineHeight, insertLink, insertImage, insertVideo, insertTable, insertCodeBlock, hasPreInRange, hasTableInRange, hasQuoteInRange, hasLinkInRange, isRangeInQuote, isRangeInList, isRangeInTask, queryTextStyle, queryTextMark, getCurrentParsedomElement } from '../../core/function'
import { MenuProps } from './props'
import { ObjectType } from 'alex-editor/lib/core/tool'
import { MenuModeType } from '../../core/tool'
import AlexEditor, { AlexElementsRangeType } from 'alex-editor'
import { ButtonOptionsItemType } from '../button/props'

defineOptions({
	name: 'Menu'
})
const instance = getCurrentInstance()!
const props = defineProps(MenuProps)

const editify = inject<ComponentInternalInstance>('editify')!
const isSourceView = inject<Ref<boolean>>('isSourceView')!
const isFullScreen = inject<Ref<boolean>>('isFullScreen')!
const canUseMenu = inject<Ref<boolean>>('canUseMenu')!
const editor = inject<Ref<AlexEditor>>('editor')!
const dataRangeCaches = inject<Ref<AlexElementsRangeType>>('dataRangeCaches')!
const showBorder = inject<ComputedRef<boolean>>('showBorder')!
const $editTrans = inject<(key: string) => any>('$editTrans')!

//撤销按钮配置
const undoConfig = ref<ObjectType>({
	show: props.config.undo.show,
	leftBorder: props.config.undo.leftBorder,
	rightBorder: props.config.undo.rightBorder,
	active: false,
	disabled: false
})
//重做按钮配置
const redoConfig = ref<ObjectType>({
	show: props.config.redo.show,
	leftBorder: props.config.redo.leftBorder,
	rightBorder: props.config.redo.rightBorder,
	active: false,
	disabled: false
})
//标题按钮配置
const headingConfig = ref<ObjectType>({
	show: props.config.heading.show,
	displayConfig: {
		options: props.config.heading.options,
		value: '',
		width: props.config.heading.width,
		maxHeight: props.config.heading.maxHeight
	},
	defaultValue: props.config.heading.defaultValue,
	leftBorder: props.config.heading.leftBorder,
	rightBorder: props.config.heading.rightBorder,
	active: false,
	disabled: false
})
//缩进按钮配置
const indentConfig = ref<ObjectType>({
	show: props.config.indent.show,
	selectConfig: {
		options: props.config.indent.options,
		value: '',
		width: props.config.indent.width,
		maxHeight: props.config.indent.maxHeight
	},
	leftBorder: props.config.indent.leftBorder,
	rightBorder: props.config.indent.rightBorder,
	active: false,
	disabled: false
})
//引用按钮配置
const quoteConfig = ref<ObjectType>({
	show: props.config.quote.show,
	leftBorder: props.config.quote.leftBorder,
	rightBorder: props.config.quote.rightBorder,
	active: false,
	disabled: false
})
//对齐方式按钮配置
const alignConfig = ref<ObjectType>({
	show: props.config.align.show,
	selectConfig: {
		options: props.config.align.options,
		width: props.config.align.width,
		maxHeight: props.config.align.maxHeight
	},
	leftBorder: props.config.align.leftBorder,
	rightBorder: props.config.align.rightBorder,
	active: false,
	disabled: false
})
//有序列表按钮配置
const orderListConfig = ref<ObjectType>({
	show: props.config.orderList.show,
	leftBorder: props.config.orderList.leftBorder,
	rightBorder: props.config.orderList.rightBorder,
	active: false,
	disabled: false
})
//无序列表按钮配置
const unorderListConfig = ref<ObjectType>({
	show: props.config.unorderList.show,
	leftBorder: props.config.unorderList.leftBorder,
	rightBorder: props.config.unorderList.rightBorder,
	active: false,
	disabled: false
})
//任务列表按钮配置
const taskConfig = ref<ObjectType>({
	show: props.config.task.show,
	leftBorder: props.config.task.leftBorder,
	rightBorder: props.config.task.rightBorder,
	active: false,
	disabled: false
})
//粗体按钮配置
const boldConfig = ref<ObjectType>({
	show: props.config.bold.show,
	leftBorder: props.config.bold.leftBorder,
	rightBorder: props.config.bold.rightBorder,
	active: false,
	disabled: false
})
//下划线按钮配置
const underlineConfig = ref<ObjectType>({
	show: props.config.underline.show,
	leftBorder: props.config.underline.leftBorder,
	rightBorder: props.config.underline.rightBorder,
	active: false,
	disabled: false
})
//斜体按钮配置
const italicConfig = ref<ObjectType>({
	show: props.config.italic.show,
	leftBorder: props.config.italic.leftBorder,
	rightBorder: props.config.italic.rightBorder,
	active: false,
	disabled: false
})
//删除线按钮配置
const strikethroughConfig = ref<ObjectType>({
	show: props.config.strikethrough.show,
	leftBorder: props.config.strikethrough.leftBorder,
	rightBorder: props.config.strikethrough.rightBorder,
	active: false,
	disabled: false
})
//行内代码按钮配置
const codeConfig = ref<ObjectType>({
	show: props.config.code.show,
	leftBorder: props.config.code.leftBorder,
	rightBorder: props.config.code.rightBorder,
	active: false,
	disabled: false
})
//上标按钮配置
const superConfig = ref<ObjectType>({
	show: props.config.super.show,
	leftBorder: props.config.super.leftBorder,
	rightBorder: props.config.super.rightBorder,
	active: false,
	disabled: false
})
//下标按钮配置
const subConfig = ref<ObjectType>({
	show: props.config.sub.show,
	leftBorder: props.config.sub.leftBorder,
	rightBorder: props.config.sub.rightBorder,
	active: false,
	disabled: false
})
//清除格式按钮配置
const formatClearConfig = ref<ObjectType>({
	show: props.config.formatClear.show,
	leftBorder: props.config.formatClear.leftBorder,
	rightBorder: props.config.formatClear.rightBorder,
	active: false,
	disabled: false
})
//字号按钮配置
const fontSizeConfig = ref<ObjectType>({
	show: props.config.fontSize.show,
	displayConfig: {
		options: props.config.fontSize.options,
		value: '',
		width: props.config.fontSize.width,
		maxHeight: props.config.fontSize.maxHeight
	},
	defaultValue: props.config.fontSize.defaultValue,
	leftBorder: props.config.fontSize.leftBorder,
	rightBorder: props.config.fontSize.rightBorder,
	active: false,
	disabled: false
})
//字体按钮配置
const fontFamilyConfig = ref<ObjectType>({
	show: props.config.fontFamily.show,
	displayConfig: {
		options: props.config.fontFamily.options,
		value: '',
		width: props.config.fontFamily.width,
		maxHeight: props.config.fontFamily.maxHeight
	},
	defaultValue: props.config.fontFamily.defaultValue,
	leftBorder: props.config.fontFamily.leftBorder,
	rightBorder: props.config.fontFamily.rightBorder,
	active: false,
	disabled: false
})
//行高按钮配置
const lineHeightConfig = ref<ObjectType>({
	show: props.config.lineHeight.show,
	displayConfig: {
		options: props.config.lineHeight.options,
		value: '',
		width: props.config.lineHeight.width,
		maxHeight: props.config.lineHeight.maxHeight
	},
	defaultValue: props.config.lineHeight.defaultValue,
	leftBorder: props.config.lineHeight.leftBorder,
	rightBorder: props.config.lineHeight.rightBorder,
	active: false,
	disabled: false
})
//前景颜色按钮配置
const foreColorConfig = ref<ObjectType>({
	show: props.config.foreColor.show,
	selectConfig: {
		options: props.config.foreColor.options
	},
	leftBorder: props.config.foreColor.leftBorder,
	rightBorder: props.config.foreColor.rightBorder,
	value: '', //选择的颜色值
	active: false,
	disabled: false
})
//背景颜色按钮配置
const backColorConfig = ref<ObjectType>({
	show: props.config.backColor.show,
	selectConfig: {
		options: props.config.backColor.options
	},
	leftBorder: props.config.backColor.leftBorder,
	rightBorder: props.config.backColor.rightBorder,
	value: '', //选择的颜色值
	active: false,
	disabled: false
})
//链接按钮配置
const linkConfig = ref<ObjectType>({
	show: props.config.link.show,
	leftBorder: props.config.link.leftBorder,
	rightBorder: props.config.link.rightBorder,
	active: false,
	disabled: false,
	text: '' //链接的文本
})
//插入图片按钮配置
const imageConfig = ref<ObjectType>({
	show: props.config.image.show,
	leftBorder: props.config.image.leftBorder,
	rightBorder: props.config.image.rightBorder,
	active: false,
	disabled: false,
	accept: props.config.image.accept,
	multiple: props.config.image.multiple,
	maxSize: props.config.image.maxSize,
	minSize: props.config.image.minSize,
	handleError: props.config.image.handleError,
	customUpload: props.config.image.customUpload
})
//插入视频按钮配置
const videoConfig = ref<ObjectType>({
	show: props.config.video.show,
	leftBorder: props.config.video.leftBorder,
	rightBorder: props.config.video.rightBorder,
	active: false,
	disabled: false,
	accept: props.config.video.accept,
	multiple: props.config.video.multiple,
	maxSize: props.config.video.maxSize,
	minSize: props.config.video.minSize,
	handleError: props.config.video.handleError,
	customUpload: props.config.video.customUpload
})
//表格按钮配置
const tableConfig = ref<ObjectType>({
	show: props.config.table.show,
	leftBorder: props.config.table.leftBorder,
	rightBorder: props.config.table.rightBorder,
	active: false,
	disabled: false,
	maxRows: props.config.table.maxRows,
	maxColumns: props.config.table.maxColumns
})
//代码块按钮配置
const codeBlockConfig = ref<ObjectType>({
	show: props.config.codeBlock.show,
	leftBorder: props.config.codeBlock.leftBorder,
	rightBorder: props.config.codeBlock.rightBorder,
	active: false,
	disabled: false
})
//代码视图按钮配置
const sourceViewConfig = ref<ObjectType>({
	show: props.config.sourceView.show,
	leftBorder: props.config.sourceView.leftBorder,
	rightBorder: props.config.sourceView.rightBorder,
	active: false,
	disabled: false
})
//全屏按钮配置
const fullScreenConfig = ref<ObjectType>({
	show: props.config.fullScreen.show,
	leftBorder: props.config.fullScreen.leftBorder,
	rightBorder: props.config.fullScreen.rightBorder,
	active: false,
	disabled: false
})

//整个菜单栏是否禁用
const disabled = computed<boolean>(() => {
	return <boolean>editify.props.disabled || !canUseMenu.value
})
//菜单名称数组
const menuNames = computed<string[]>(() => {
	return Object.keys(props.config.sequence).sort((a, b) => {
		if (props.config.sequence[a] > props.config.sequence[b]) {
			return 1
		}
		return -1
	})
})
//菜单是否禁用
const menuDisabled = computed<(name: string) => boolean>(() => {
	return (name: string) => {
		if (name == 'sourceView' || name == 'fullScreen') {
			return false
		}
		return isSourceView.value
	}
})
//菜单模式
const menuMode = computed<MenuModeType>(() => {
	//如果是全屏状态下
	if (isFullScreen.value) {
		//fixed模式改为默认模式
		if (props.config.mode == 'fixed') {
			return 'default'
		}
	}
	return props.config.mode
})
//菜单栏是否显示边框
const menuShowBorder = computed(() => {
	//fixed模式下不显示边框
	if (menuMode.value == 'fixed') {
		return false
	}
	//由编辑器的border属性来决定
	return showBorder.value
})

//按钮操作触发函数
const handleOperate = (name: string, val: string | number | ObjectType) => {
	//菜单栏禁用
	if (disabled.value) {
		return
	}
	//没有获取焦点
	if (!editor.value.range) {
		return
	}
	//撤销
	if (name == 'undo') {
		editify.exposed!.undo()
	}
	//重做
	else if (name == 'redo') {
		editify.exposed!.redo()
	}
	//设置标题
	else if (name == 'heading') {
		setHeading(editor.value, dataRangeCaches.value, $editTrans, <string>val)
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
	//设置缩进
	else if (name == 'indent') {
		//增加缩进
		if (val == 'indent-increase') {
			setIndentIncrease(editor.value, dataRangeCaches.value)
		}
		//减少缩进
		else if (val == 'indent-decrease') {
			setIndentDecrease(editor.value, dataRangeCaches.value)
		}
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
	//设置引用
	else if (name == 'quote') {
		setQuote(editor.value, dataRangeCaches.value)
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
	//设置对齐方式
	else if (name == 'align') {
		setAlign(editor.value, dataRangeCaches.value, <string>val)
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
	//设置有序列表
	else if (name == 'orderList') {
		setList(editor.value, dataRangeCaches.value, true)
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
	//设置无序列表
	else if (name == 'unorderList') {
		setList(editor.value, dataRangeCaches.value, false)
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
	//设置任务列表
	else if (name == 'task') {
		setTask(editor.value, dataRangeCaches.value)
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
	//设置粗体
	else if (name == 'bold') {
		if (queryTextStyle(editor.value, dataRangeCaches.value, 'font-weight', 'bold') || queryTextStyle(editor.value, dataRangeCaches.value, 'font-weight', '700')) {
			removeTextStyle(editor.value, dataRangeCaches.value, ['font-weight'])
		} else {
			setTextStyle(editor.value, dataRangeCaches.value, {
				'font-weight': 'bold'
			})
		}
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
	//设置下划线
	else if (name == 'underline') {
		if (queryTextStyle(editor.value, dataRangeCaches.value, 'text-decoration', 'underline') || queryTextStyle(editor.value, dataRangeCaches.value, 'text-decoration-line', 'underline')) {
			removeTextStyle(editor.value, dataRangeCaches.value, ['text-decoration', 'text-decoration-line'])
		} else {
			setTextStyle(editor.value, dataRangeCaches.value, {
				'text-decoration': 'underline'
			})
		}
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
	//设置斜体
	else if (name == 'italic') {
		if (queryTextStyle(editor.value, dataRangeCaches.value, 'font-style', 'italic')) {
			removeTextStyle(editor.value, dataRangeCaches.value, ['font-style'])
		} else {
			setTextStyle(editor.value, dataRangeCaches.value, {
				'font-style': 'italic'
			})
		}
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
	//设置删除线
	else if (name == 'strikethrough') {
		if (queryTextStyle(editor.value, dataRangeCaches.value, 'text-decoration', 'line-through') || queryTextStyle(editor.value, dataRangeCaches.value, 'text-decoration-line', 'line-through')) {
			removeTextStyle(editor.value, dataRangeCaches.value, ['text-decoration', 'text-decoration-line'])
		} else {
			setTextStyle(editor.value, dataRangeCaches.value, {
				'text-decoration': 'line-through'
			})
		}
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
	//设置行内代码
	else if (name == 'code') {
		if (queryTextMark(editor.value, dataRangeCaches.value, 'data-editify-code')) {
			removeTextMark(editor.value, dataRangeCaches.value, ['data-editify-code'])
		} else {
			setTextMark(editor.value, dataRangeCaches.value, {
				'data-editify-code': true
			})
		}
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
	//设置上标
	else if (name == 'super') {
		if (queryTextStyle(editor.value, dataRangeCaches.value, 'vertical-align', 'super')) {
			removeTextStyle(editor.value, dataRangeCaches.value, ['vertical-align'])
		} else {
			setTextStyle(editor.value, dataRangeCaches.value, {
				'vertical-align': 'super'
			})
		}
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
	//设置下标
	else if (name == 'sub') {
		if (queryTextStyle(editor.value, dataRangeCaches.value, 'vertical-align', 'sub')) {
			removeTextStyle(editor.value, dataRangeCaches.value, ['vertical-align'])
		} else {
			setTextStyle(editor.value, dataRangeCaches.value, {
				'vertical-align': 'sub'
			})
		}
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
	//清除格式
	else if (name == 'formatClear') {
		removeTextStyle(editor.value, dataRangeCaches.value)
		removeTextMark(editor.value, dataRangeCaches.value)
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
	//设置字号
	else if (name == 'fontSize') {
		setTextStyle(editor.value, dataRangeCaches.value, {
			'font-size': val
		})
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
	//设置字体
	else if (name == 'fontFamily') {
		setTextStyle(editor.value, dataRangeCaches.value, {
			'font-family': val
		})
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
	//设置行高
	else if (name == 'lineHeight') {
		setLineHeight(editor.value, dataRangeCaches.value, <string | number>val)
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
	//设置前景色
	else if (name == 'foreColor') {
		setTextStyle(editor.value, dataRangeCaches.value, {
			color: val
		})
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
	//设置背景色
	else if (name == 'backColor') {
		setTextStyle(editor.value, dataRangeCaches.value, {
			'background-color': val
		})
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
	//插入链接
	else if (name == 'link') {
		if (!(<ObjectType>val).url) {
			return
		}
		insertLink(editor.value, (<ObjectType>val).text, (<ObjectType>val).url, (<ObjectType>val).newOpen)
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
	//插入图片
	else if (name == 'image') {
		if (!val) {
			return
		}
		insertImage(editor.value, <string>val)
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
	//插入视频
	else if (name == 'video') {
		if (!val) {
			return
		}
		insertVideo(editor.value, <string>val)
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
	//插入表格
	else if (name == 'table') {
		insertTable(editor.value, (<ObjectType>val).row, (<ObjectType>val).column)
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
	//插入代码块
	else if (name == 'codeBlock') {
		insertCodeBlock(editor.value, dataRangeCaches.value)
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
	//代码视图
	else if (name == 'sourceView') {
		isSourceView.value = !isSourceView.value
		sourceViewConfig.value.active = isSourceView.value
		if (!isSourceView.value) {
			editor.value.rangeRender()
		}
	}
	//全屏
	else if (name == 'fullScreen') {
		isFullScreen.value = !isFullScreen.value
		fullScreenConfig.value.active = isFullScreen.value
		editor.value.rangeRender()
	}
}
//处理光标更新
const handleRangeUpdate = () => {
	//选区是否含有代码块
	const value_hasPreInRange = hasPreInRange(editor.value, dataRangeCaches.value)
	//选区是否含有表格元素
	const value_hasTableInRange = hasTableInRange(editor.value, dataRangeCaches.value)
	//选区是否含有引用元素
	const value_hasQuoteInRange = hasQuoteInRange(editor.value, dataRangeCaches.value)
	//选区是否都在引用元素内
	const value_isRangeInQuote = isRangeInQuote(editor.value, dataRangeCaches.value)
	//选区是否含有链接元素
	const value_hasLinkInRange = hasLinkInRange(editor.value, dataRangeCaches.value)
	//选区是否都在有序列表内
	const value_isRangeInOrderList = isRangeInList(editor.value, dataRangeCaches.value, true)
	//选区是否都在无序列表内
	const value_isRangeInUnorderList = isRangeInList(editor.value, dataRangeCaches.value, false)
	//选区是否都在任务列表内
	const value_isRangeInTask = isRangeInTask(editor.value, dataRangeCaches.value)
	//额外禁用判定
	const extraDisabled = (name: string) => {
		if (typeof props.config.extraDisabled == 'function') {
			return props.config.extraDisabled.apply(editify.proxy!, [name]) || false
		}
		return false
	}

	//撤销按钮禁用
	undoConfig.value.disabled = !editor.value.history.get(-1) || extraDisabled('undo')

	//重做按钮禁用
	redoConfig.value.disabled = !editor.value.history.get(1) || extraDisabled('redo')

	//显示已设置标题
	const findHeadingItem = headingConfig.value.displayConfig.options.find((item: string | number | ButtonOptionsItemType) => {
		let val: string | number | ButtonOptionsItemType = item
		if (DapCommon.isObject(item)) {
			val = (<ButtonOptionsItemType>item).value!
		}
		if (editor.value.range!.anchor.isEqual(editor.value.range!.focus)) {
			return editor.value.range!.anchor.element.getBlock().parsedom == val
		}
		return dataRangeCaches.value.list.every(el => {
			if (el.element.isBlock()) {
				return el.element.parsedom == val
			}
			return el.element.getBlock().parsedom == val
		})
	})
	headingConfig.value.displayConfig.value = findHeadingItem ? (DapCommon.isObject(findHeadingItem) ? findHeadingItem.value : findHeadingItem) : headingConfig.value.defaultValue
	//标题禁用
	headingConfig.value.disabled = value_hasPreInRange || value_hasTableInRange || extraDisabled('heading')

	//缩进禁用
	indentConfig.value.disabled = value_hasPreInRange || value_hasTableInRange || extraDisabled('indent')

	//引用按钮激活
	quoteConfig.value.active = value_isRangeInQuote
	//引用按钮禁用
	quoteConfig.value.disabled = value_hasPreInRange || value_hasTableInRange || extraDisabled('quote')

	//对齐方式按钮禁用
	alignConfig.value.disabled = value_hasPreInRange || extraDisabled('align')

	//有序列表按钮激活
	orderListConfig.value.active = value_isRangeInOrderList
	//有序列表禁用
	orderListConfig.value.disabled = value_hasPreInRange || value_hasTableInRange || extraDisabled('orderList')

	//无序列表按钮激活
	unorderListConfig.value.active = value_isRangeInUnorderList
	//无序列表禁用
	unorderListConfig.value.disabled = value_hasPreInRange || value_hasTableInRange || extraDisabled('unorderList')

	//任务列表按钮激活
	taskConfig.value.active = value_isRangeInTask
	//任务列表禁用
	taskConfig.value.disabled = value_hasPreInRange || value_hasTableInRange || extraDisabled('task')

	//粗体按钮激活
	boldConfig.value.active = queryTextStyle(editor.value, dataRangeCaches.value, 'font-weight', 'bold') || queryTextStyle(editor.value, dataRangeCaches.value, 'font-weight', '700')
	//粗体按钮禁用
	boldConfig.value.disabled = value_hasPreInRange || extraDisabled('bold')

	//下划线按钮激活
	underlineConfig.value.active = queryTextStyle(editor.value, dataRangeCaches.value, 'text-decoration', 'underline') || queryTextStyle(editor.value, dataRangeCaches.value, 'text-decoration-line', 'underline')
	//下划线按钮禁用
	underlineConfig.value.disabled = value_hasPreInRange || extraDisabled('underline')

	//斜体按钮激活
	italicConfig.value.active = queryTextStyle(editor.value, dataRangeCaches.value, 'font-style', 'italic')
	//斜体按钮禁用
	italicConfig.value.disabled = value_hasPreInRange || extraDisabled('italic')

	//删除线按钮激活
	strikethroughConfig.value.active = queryTextStyle(editor.value, dataRangeCaches.value, 'text-decoration', 'line-through') || queryTextStyle(editor.value, dataRangeCaches.value, 'text-decoration-line', 'line-through')
	//删除线按钮禁用
	strikethroughConfig.value.disabled = value_hasPreInRange || extraDisabled('strikethrough')

	//行内代码按钮激活
	codeConfig.value.active = queryTextMark(editor.value, dataRangeCaches.value, 'data-editify-code')
	//行内代码按钮禁用
	codeConfig.value.disabled = value_hasPreInRange || extraDisabled('code')

	//上标按钮激活
	superConfig.value.active = queryTextStyle(editor.value, dataRangeCaches.value, 'vertical-align', 'super')
	//上标按钮禁用
	superConfig.value.disabled = value_hasPreInRange || extraDisabled('super')

	//下标按钮激活
	subConfig.value.active = queryTextStyle(editor.value, dataRangeCaches.value, 'vertical-align', 'sub')
	//下标按钮禁用
	subConfig.value.disabled = value_hasPreInRange || extraDisabled('sub')

	//清除格式按钮禁用
	formatClearConfig.value.disabled = value_hasPreInRange || extraDisabled('formatClear')

	//显示已选择字号
	const findFontItem = fontSizeConfig.value.displayConfig.options.find((item: string | ButtonOptionsItemType) => {
		if (DapCommon.isObject(item)) {
			return queryTextStyle(editor.value, dataRangeCaches.value, 'font-size', (<ButtonOptionsItemType>item).value)
		}
		return queryTextStyle(editor.value, dataRangeCaches.value, 'font-size', <string>item)
	})
	fontSizeConfig.value.displayConfig.value = findFontItem ? (DapCommon.isObject(findFontItem) ? findFontItem.value : findFontItem) : fontSizeConfig.value.defaultValue
	//字号按钮禁用
	fontSizeConfig.value.disabled = value_hasPreInRange || extraDisabled('fontSize')

	//显示已选择字体
	const findFamilyItem = fontFamilyConfig.value.displayConfig.options.find((item: string | ButtonOptionsItemType) => {
		if (DapCommon.isObject(item)) {
			return queryTextStyle(editor.value, dataRangeCaches.value, 'font-family', (<ButtonOptionsItemType>item).value)
		}
		return queryTextStyle(editor.value, dataRangeCaches.value, 'font-family', <string>item)
	})
	fontFamilyConfig.value.displayConfig.value = findFamilyItem ? (DapCommon.isObject(findFamilyItem) ? findFamilyItem.value : findFamilyItem) : fontFamilyConfig.value.defaultValue
	//字体按钮禁用
	fontFamilyConfig.value.disabled = value_hasPreInRange || extraDisabled('fontFamily')

	//显示已设置行高
	const findHeightItem = lineHeightConfig.value.displayConfig.options.find((item: string | number | ButtonOptionsItemType) => {
		let val: string | number | ButtonOptionsItemType = item
		if (DapCommon.isObject(item)) {
			val = (<ButtonOptionsItemType>item).value!
		}
		if (editor.value.range!.anchor.isEqual(editor.value.range!.focus)) {
			const block = editor.value.range!.anchor.element.getBlock()
			return block.hasStyles() && block.styles!['line-height'] == val
		}
		return dataRangeCaches.value.list.every(el => {
			if (el.element.isBlock() || el.element.isInblock()) {
				return el.element.hasStyles() && el.element.styles!['line-height'] == val
			}
			const block = el.element.getBlock()
			const inblock = el.element.getInblock()
			if (inblock) {
				return inblock.hasStyles() && inblock.styles!['line-height'] == val
			}
			return block.hasStyles() && block.styles!['line-height'] == val
		})
	})
	lineHeightConfig.value.displayConfig.value = findHeightItem ? (DapCommon.isObject(findHeightItem) ? findHeightItem.value : findHeightItem) : lineHeightConfig.value.defaultValue
	//行高按钮禁用
	lineHeightConfig.value.disabled = value_hasPreInRange || extraDisabled('lineHeight')

	//显示已选择的前景色
	const findForeColorItem = foreColorConfig.value.selectConfig.options.find((item: string | ButtonOptionsItemType) => {
		if (DapCommon.isObject(item)) {
			return queryTextStyle(editor.value, dataRangeCaches.value, 'color', (<ButtonOptionsItemType>item).value)
		}
		return queryTextStyle(editor.value, dataRangeCaches.value, 'color', <string>item)
	})
	foreColorConfig.value.value = findForeColorItem ? (DapCommon.isObject(findForeColorItem) ? findForeColorItem.value : findForeColorItem) : ''
	//前景色按钮禁用
	foreColorConfig.value.disabled = value_hasPreInRange || extraDisabled('foreColor')

	//显示已选择的背景色
	const findBackColorItem = backColorConfig.value.selectConfig.options.find((item: string | ButtonOptionsItemType) => {
		if (DapCommon.isObject(item)) {
			return queryTextStyle(editor.value, dataRangeCaches.value, 'background-color', (<ButtonOptionsItemType>item).value)
		}
		return queryTextStyle(editor.value, dataRangeCaches.value, 'background-color', <string>item)
	})
	backColorConfig.value.value = findBackColorItem ? (DapCommon.isObject(findBackColorItem) ? findBackColorItem.value : findBackColorItem) : ''
	//背景色按钮禁用
	backColorConfig.value.disabled = value_hasPreInRange || extraDisabled('backColor')

	//链接按钮禁用
	linkConfig.value.disabled = value_hasLinkInRange || value_hasPreInRange || extraDisabled('link')

	//插入图片按钮禁用
	imageConfig.value.disabled = value_hasPreInRange || extraDisabled('image')

	//插入视频按钮禁用
	videoConfig.value.disabled = value_hasPreInRange || extraDisabled('video')

	//表格按钮禁用
	tableConfig.value.disabled = value_hasPreInRange || value_hasTableInRange || value_hasQuoteInRange || extraDisabled('table')

	//代码块按钮激活
	codeBlockConfig.value.active = !!getCurrentParsedomElement(editor.value, dataRangeCaches.value, 'pre')
	//代码块按钮禁用
	codeBlockConfig.value.disabled = value_hasTableInRange || value_hasQuoteInRange || extraDisabled('codeBlock')

	//代码视图按钮激活
	sourceViewConfig.value.active = isSourceView.value

	//全屏按钮激活
	fullScreenConfig.value.active = isFullScreen.value
}

//菜单项子组件
const MenuItem = defineComponent(
	selfProps => {
		//获取实例
		const itemInstance = getCurrentInstance()!
		//共同设置的属性
		const itemProps = {
			tooltip: props.config.tooltip,
			name: selfProps.name
		}
		return () => {
			//撤销按钮
			if (itemProps.name == 'undo' && undoConfig.value.show) {
				return h(
					Button,
					{
						...itemProps,
						title: $editTrans('undo'),
						leftBorder: undoConfig.value.leftBorder,
						rightBorder: undoConfig.value.rightBorder,
						disabled: undoConfig.value.disabled || selfProps.disabled || disabled.value,
						color: props.color,
						active: undoConfig.value.active,
						onOperate: handleOperate
					},
					() => h(Icon, { value: 'undo' })
				)
			}
			//重做按钮
			if (itemProps.name == 'redo' && redoConfig.value.show) {
				return h(
					Button,
					{
						...itemProps,
						title: $editTrans('redo'),
						leftBorder: redoConfig.value.leftBorder,
						rightBorder: redoConfig.value.rightBorder,
						disabled: redoConfig.value.disabled || selfProps.disabled || disabled.value,
						color: props.color,
						active: redoConfig.value.active,
						onOperate: handleOperate
					},
					() => h(Icon, { value: 'redo' })
				)
			}
			//标题按钮
			if (itemProps.name == 'heading' && headingConfig.value.show) {
				return h(Button, {
					...itemProps,
					type: 'display',
					displayConfig: headingConfig.value.displayConfig,
					title: $editTrans('heading'),
					leftBorder: headingConfig.value.leftBorder,
					rightBorder: headingConfig.value.rightBorder,
					color: props.color,
					disabled: headingConfig.value.disabled || selfProps.disabled || disabled.value,
					active: headingConfig.value.active,
					onOperate: handleOperate
				})
			}
			//缩进按钮
			if (itemProps.name == 'indent' && indentConfig.value.show) {
				return h(
					Button,
					{
						...itemProps,
						type: 'select',
						selectConfig: indentConfig.value.selectConfig,
						title: $editTrans('indent'),
						leftBorder: indentConfig.value.leftBorder,
						rightBorder: indentConfig.value.rightBorder,
						color: props.color,
						disabled: indentConfig.value.disabled || selfProps.disabled || disabled.value,
						active: indentConfig.value.active,
						onOperate: handleOperate
					},
					() => h(Icon, { value: 'indent-increase' })
				)
			}
			//引用按钮
			if (itemProps.name == 'quote' && quoteConfig.value.show) {
				return h(
					Button,
					{
						...itemProps,
						title: $editTrans('quote'),
						leftBorder: quoteConfig.value.leftBorder,
						rightBorder: quoteConfig.value.rightBorder,
						color: props.color,
						disabled: quoteConfig.value.disabled || selfProps.disabled || disabled.value,
						active: quoteConfig.value.active,
						onOperate: handleOperate
					},
					() => h(Icon, { value: 'quote' })
				)
			}
			//对齐方式按钮
			if (itemProps.name == 'align' && alignConfig.value.show) {
				return h(
					Button,
					{
						...itemProps,
						type: 'select',
						selectConfig: alignConfig.value.selectConfig,
						title: $editTrans('align'),
						leftBorder: alignConfig.value.leftBorder,
						rightBorder: alignConfig.value.rightBorder,
						color: props.color,
						disabled: alignConfig.value.disabled || selfProps.disabled || disabled.value,
						active: alignConfig.value.active,
						onOperate: handleOperate
					},
					() => h(Icon, { value: 'align-left' })
				)
			}
			//有序列表按钮
			if (itemProps.name == 'orderList' && orderListConfig.value.show) {
				return h(
					Button,
					{
						...itemProps,
						title: $editTrans('orderList'),
						leftBorder: orderListConfig.value.leftBorder,
						rightBorder: orderListConfig.value.rightBorder,
						color: props.color,
						disabled: orderListConfig.value.disabled || selfProps.disabled || disabled.value,
						active: orderListConfig.value.active,
						onOperate: handleOperate
					},
					() => h(Icon, { value: 'list-ordered' })
				)
			}
			//无序列表按钮
			if (itemProps.name == 'unorderList' && unorderListConfig.value.show) {
				return h(
					Button,
					{
						...itemProps,
						title: $editTrans('unorderList'),
						leftBorder: unorderListConfig.value.leftBorder,
						rightBorder: unorderListConfig.value.rightBorder,
						color: props.color,
						disabled: unorderListConfig.value.disabled || selfProps.disabled || disabled.value,
						active: unorderListConfig.value.active,
						onOperate: handleOperate
					},
					() => h(Icon, { value: 'list-unordered' })
				)
			}
			//任务列表按钮
			if (itemProps.name == 'task' && taskConfig.value.show) {
				return h(
					Button,
					{
						...itemProps,
						title: $editTrans('task'),
						leftBorder: taskConfig.value.leftBorder,
						rightBorder: taskConfig.value.rightBorder,
						color: props.color,
						disabled: taskConfig.value.disabled || selfProps.disabled || disabled.value,
						active: taskConfig.value.active,
						onOperate: handleOperate
					},
					() => h(Icon, { value: 'task' })
				)
			}
			//粗体按钮
			if (itemProps.name == 'bold' && boldConfig.value.show) {
				return h(
					Button,
					{
						...itemProps,
						title: $editTrans('bold'),
						leftBorder: boldConfig.value.leftBorder,
						rightBorder: boldConfig.value.rightBorder,
						color: props.color,
						disabled: boldConfig.value.disabled || selfProps.disabled || disabled.value,
						active: boldConfig.value.active,
						onOperate: handleOperate
					},
					() => h(Icon, { value: 'bold' })
				)
			}
			//下划线按钮
			if (itemProps.name == 'underline' && underlineConfig.value.show) {
				return h(
					Button,
					{
						...itemProps,
						title: $editTrans('underline'),
						leftBorder: underlineConfig.value.leftBorder,
						rightBorder: underlineConfig.value.rightBorder,
						color: props.color,
						disabled: underlineConfig.value.disabled || selfProps.disabled || disabled.value,
						active: underlineConfig.value.active,
						onOperate: handleOperate
					},
					() => h(Icon, { value: 'underline' })
				)
			}
			//斜体按钮
			if (itemProps.name == 'italic' && italicConfig.value.show) {
				return h(
					Button,
					{
						...itemProps,
						title: $editTrans('italic'),
						leftBorder: italicConfig.value.leftBorder,
						rightBorder: italicConfig.value.rightBorder,
						color: props.color,
						disabled: italicConfig.value.disabled || selfProps.disabled || disabled.value,
						active: italicConfig.value.active,
						onOperate: handleOperate
					},
					() => h(Icon, { value: 'italic' })
				)
			}
			//删除线按钮
			if (itemProps.name == 'strikethrough' && strikethroughConfig.value.show) {
				return h(
					Button,
					{
						...itemProps,
						title: $editTrans('strikethrough'),
						leftBorder: strikethroughConfig.value.leftBorder,
						rightBorder: strikethroughConfig.value.rightBorder,
						color: props.color,
						disabled: strikethroughConfig.value.disabled || selfProps.disabled || disabled.value,
						active: strikethroughConfig.value.active,
						onOperate: handleOperate
					},
					() => h(Icon, { value: 'strikethrough' })
				)
			}
			//行内代码按钮
			if (itemProps.name == 'code' && codeConfig.value.show) {
				return h(
					Button,
					{
						...itemProps,
						title: $editTrans('code'),
						leftBorder: codeConfig.value.leftBorder,
						rightBorder: codeConfig.value.rightBorder,
						color: props.color,
						disabled: codeConfig.value.disabled || selfProps.disabled || disabled.value,
						active: codeConfig.value.active,
						onOperate: handleOperate
					},
					() => h(Icon, { value: 'code' })
				)
			}
			//上标按钮
			if (itemProps.name == 'super' && superConfig.value.show) {
				return h(
					Button,
					{
						...itemProps,
						title: $editTrans('superscript'),
						leftBorder: superConfig.value.leftBorder,
						rightBorder: superConfig.value.rightBorder,
						color: props.color,
						disabled: superConfig.value.disabled || selfProps.disabled || disabled.value,
						active: superConfig.value.active,
						onOperate: handleOperate
					},
					() => h(Icon, { value: 'superscript' })
				)
			}
			//下标按钮
			if (itemProps.name == 'sub' && subConfig.value.show) {
				return h(
					Button,
					{
						...itemProps,
						title: $editTrans('subscript'),
						leftBorder: subConfig.value.leftBorder,
						rightBorder: subConfig.value.rightBorder,
						color: props.color,
						disabled: subConfig.value.disabled || selfProps.disabled || disabled.value,
						active: subConfig.value.active,
						onOperate: handleOperate
					},
					() => h(Icon, { value: 'subscript' })
				)
			}
			//清除格式按钮
			if (itemProps.name == 'formatClear' && formatClearConfig.value.show) {
				return h(
					Button,
					{
						...itemProps,
						title: $editTrans('formatClear'),
						leftBorder: formatClearConfig.value.leftBorder,
						rightBorder: formatClearConfig.value.rightBorder,
						color: props.color,
						disabled: formatClearConfig.value.disabled || selfProps.disabled || disabled.value,
						active: formatClearConfig.value.active,
						onOperate: handleOperate
					},
					() => h(Icon, { value: 'format-clear' })
				)
			}
			//字号按钮
			if (itemProps.name == 'fontSize' && fontSizeConfig.value.show) {
				return h(Button, {
					...itemProps,
					type: 'display',
					displayConfig: fontSizeConfig.value.displayConfig,
					title: $editTrans('fontSize'),
					leftBorder: fontSizeConfig.value.leftBorder,
					rightBorder: fontSizeConfig.value.rightBorder,
					color: props.color,
					disabled: fontSizeConfig.value.disabled || selfProps.disabled || disabled.value,
					active: fontSizeConfig.value.active,
					onOperate: handleOperate
				})
			}
			//字体按钮
			if (itemProps.name == 'fontFamily' && fontFamilyConfig.value.show) {
				return h(Button, {
					...itemProps,
					type: 'display',
					displayConfig: fontFamilyConfig.value.displayConfig,
					title: $editTrans('fontFamily'),
					leftBorder: fontFamilyConfig.value.leftBorder,
					rightBorder: fontFamilyConfig.value.rightBorder,
					color: props.color,
					disabled: fontFamilyConfig.value.disabled || selfProps.disabled || disabled.value,
					active: fontFamilyConfig.value.active,
					onOperate: handleOperate
				})
			}
			//行高按钮
			if (itemProps.name == 'lineHeight' && lineHeightConfig.value.show) {
				return h(Button, {
					...itemProps,
					type: 'display',
					displayConfig: lineHeightConfig.value.displayConfig,
					title: $editTrans('lineHeight'),
					leftBorder: lineHeightConfig.value.leftBorder,
					rightBorder: lineHeightConfig.value.rightBorder,
					color: props.color,
					disabled: lineHeightConfig.value.disabled || selfProps.disabled || disabled.value,
					active: lineHeightConfig.value.active,
					onOperate: handleOperate
				})
			}
			//前景色按钮
			if (itemProps.name == 'foreColor' && foreColorConfig.value.show) {
				return h(
					Button,
					{
						...itemProps,
						ref: 'btnRef',
						type: 'select',
						selectConfig: foreColorConfig.value.selectConfig,
						title: $editTrans('foreColor'),
						leftBorder: foreColorConfig.value.leftBorder,
						rightBorder: foreColorConfig.value.rightBorder,
						color: props.color,
						disabled: foreColorConfig.value.disabled || selfProps.disabled || disabled.value,
						active: foreColorConfig.value.active,
						hideScroll: true
					},
					{
						default: () =>
							h(Icon, {
								value: 'font-color'
							}),
						layer: (data: ObjectType) => {
							return h(Colors, {
								tooltip: props.config.tooltip,
								value: foreColorConfig.value.value,
								data: data.options,
								color: props.color,
								onChange: (val: string) => {
									handleOperate('foreColor', val)
									const btn = <InstanceType<typeof Button>>itemInstance.proxy!.$refs.btnRef
									btn.show = false
								}
							})
						}
					}
				)
			}
			//背景色按钮
			if (itemProps.name == 'backColor' && backColorConfig.value.show) {
				return h(
					Button,
					{
						...itemProps,
						type: 'select',
						ref: 'btnRef',
						selectConfig: backColorConfig.value.selectConfig,
						title: $editTrans('backColor'),
						leftBorder: backColorConfig.value.leftBorder,
						rightBorder: backColorConfig.value.rightBorder,
						color: props.color,
						disabled: backColorConfig.value.disabled || selfProps.disabled || disabled.value,
						active: backColorConfig.value.active,
						onOperate: handleOperate,
						hideScroll: true
					},
					{
						default: () =>
							h(Icon, {
								value: 'brush'
							}),
						layer: (data: ObjectType) =>
							h(Colors, {
								tooltip: props.config.tooltip,
								value: backColorConfig.value.value,
								data: data.options,
								color: props.color,
								onChange: val => {
									handleOperate('backColor', val)
									const btn = <InstanceType<typeof Button>>itemInstance.proxy!.$refs.btnRef
									btn.show = false
								}
							})
					}
				)
			}
			//链接按钮
			if (itemProps.name == 'link' && linkConfig.value.show) {
				return h(
					Button,
					{
						...itemProps,
						type: 'select',
						ref: 'btnRef',
						title: $editTrans('insertLink'),
						leftBorder: linkConfig.value.leftBorder,
						rightBorder: linkConfig.value.rightBorder,
						color: props.color,
						disabled: linkConfig.value.disabled || selfProps.disabled || disabled.value,
						active: linkConfig.value.active,
						hideScroll: true,
						onLayerShow: () => {
							//存在选区的情况下预置链接文本值
							linkConfig.value.text = getLinkText(dataRangeCaches.value)
						}
					},
					{
						default: () =>
							h(Icon, {
								value: 'link'
							}),
						layer: () =>
							h(InsertLink, {
								color: props.color,
								text: linkConfig.value.text,
								onInsert: (text, url, newOpen) => {
									handleOperate('link', { text, url, newOpen })
									const btn = <InstanceType<typeof Button>>itemInstance.proxy!.$refs.btnRef
									btn.show = false
								}
							})
					}
				)
			}
			//图片按钮
			if (itemProps.name == 'image' && imageConfig.value.show) {
				return h(
					Button,
					{
						...itemProps,
						type: 'select',
						ref: 'btnRef',
						title: $editTrans('insertImage'),
						leftBorder: imageConfig.value.leftBorder,
						rightBorder: imageConfig.value.rightBorder,
						color: props.color,
						disabled: imageConfig.value.disabled || selfProps.disabled || disabled.value,
						active: imageConfig.value.active,
						hideScroll: true
					},
					{
						default: () =>
							h(Icon, {
								value: 'image'
							}),
						layer: () =>
							h(InsertImage, {
								color: props.color,
								accept: imageConfig.value.accept,
								multiple: imageConfig.value.multiple,
								maxSize: imageConfig.value.maxSize,
								minSize: imageConfig.value.minSize,
								customUpload: imageConfig.value.customUpload,
								handleError: imageConfig.value.handleError,
								onChange: () => {
									const btn = <InstanceType<typeof Button>>itemInstance.proxy!.$refs.btnRef
									const layer = <InstanceType<typeof Layer>>btn.$refs.layerRef
									layer.setPosition()
								},
								onInsert: url => {
									handleOperate('image', url)
									const btn = <InstanceType<typeof Button>>itemInstance.proxy!.$refs.btnRef
									btn.show = false
								}
							})
					}
				)
			}
			//视频按钮
			if (itemProps.name == 'video' && videoConfig.value.show) {
				return h(
					Button,
					{
						...itemProps,
						type: 'select',
						ref: 'btnRef',
						title: $editTrans('insertVideo'),
						leftBorder: videoConfig.value.leftBorder,
						rightBorder: videoConfig.value.rightBorder,
						color: props.color,
						disabled: videoConfig.value.disabled || selfProps.disabled || disabled.value,
						active: videoConfig.value.active,
						hideScroll: true
					},
					{
						default: () =>
							h(Icon, {
								value: 'video'
							}),
						layer: () =>
							h(InsertVideo, {
								color: props.color,
								accept: videoConfig.value.accept,
								multiple: videoConfig.value.multiple,
								maxSize: videoConfig.value.maxSize,
								minSize: videoConfig.value.minSize,
								customUpload: videoConfig.value.customUpload,
								handleError: videoConfig.value.handleError,
								onChange: () => {
									const btn = <InstanceType<typeof Button>>itemInstance.proxy!.$refs.btnRef
									const layer = <InstanceType<typeof Layer>>btn.$refs.layerRef
									layer.setPosition()
								},
								onInsert: url => {
									handleOperate('video', url)
									const btn = <InstanceType<typeof Button>>itemInstance.proxy!.$refs.btnRef
									btn.show = false
								}
							})
					}
				)
			}
			//表格按钮
			if (itemProps.name == 'table' && tableConfig.value.show) {
				return h(
					Button,
					{
						...itemProps,
						type: 'select',
						ref: 'btnRef',
						title: $editTrans('insertTable'),
						leftBorder: tableConfig.value.leftBorder,
						rightBorder: tableConfig.value.rightBorder,
						color: props.color,
						disabled: tableConfig.value.disabled || selfProps.disabled || disabled.value,
						active: tableConfig.value.active,
						hideScroll: true
					},
					{
						default: () =>
							h(Icon, {
								value: 'table'
							}),
						layer: () =>
							h(InsertTable, {
								color: props.color,
								maxRows: tableConfig.value.maxRows,
								maxColumns: tableConfig.value.maxColumns,
								onInsert: (row, column) => {
									handleOperate('table', { row, column })
									const btn = <InstanceType<typeof Button>>itemInstance.proxy!.$refs.btnRef
									btn.show = false
								}
							})
					}
				)
			}
			//代码块按钮
			if (itemProps.name == 'codeBlock' && codeBlockConfig.value.show) {
				return h(
					Button,
					{
						...itemProps,
						title: $editTrans('inserCodeBlock'),
						leftBorder: codeBlockConfig.value.leftBorder,
						rightBorder: codeBlockConfig.value.rightBorder,
						color: props.color,
						disabled: codeBlockConfig.value.disabled || selfProps.disabled || disabled.value,
						active: codeBlockConfig.value.active,
						onOperate: handleOperate
					},
					() => h(Icon, { value: 'code-block' })
				)
			}
			//代码视图按钮
			if (itemProps.name == 'sourceView' && sourceViewConfig.value.show) {
				return h(
					Button,
					{
						...itemProps,
						title: $editTrans('sourceView'),
						leftBorder: sourceViewConfig.value.leftBorder,
						rightBorder: sourceViewConfig.value.rightBorder,
						color: props.color,
						disabled: sourceViewConfig.value.disabled || selfProps.disabled || disabled.value,
						active: sourceViewConfig.value.active,
						onOperate: handleOperate
					},
					() => h(Icon, { value: 'source-view' })
				)
			}
			//全屏按钮
			if (itemProps.name == 'fullScreen' && fullScreenConfig.value.show) {
				return h(
					Button,
					{
						...itemProps,
						title: $editTrans('fullScreen'),
						leftBorder: fullScreenConfig.value.leftBorder,
						rightBorder: fullScreenConfig.value.rightBorder,
						color: props.color,
						disabled: fullScreenConfig.value.disabled || selfProps.disabled || disabled.value,
						active: fullScreenConfig.value.active,
						onOperate: handleOperate
					},
					() => h(Icon, { value: 'full-screen' })
				)
			}
			/** 下面是拓展菜单的配置 */
			if (DapCommon.isObject(props.config.extends)) {
				//获取菜单按钮的配置
				const configuration = props.config.extends[itemProps.name]
				if (configuration) {
					//渲染函数
					return h(
						Button,
						{
							...itemProps,
							ref: 'btnRef',
							type: configuration.type || 'default',
							title: configuration.title || '',
							leftBorder: configuration.leftBorder || false,
							rightBorder: configuration.rightBorder || false,
							disabled: configuration.disabled || selfProps.disabled || disabled.value,
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
							color: props.color,
							onLayerShow: () => {
								if (typeof configuration.onLayerShow == 'function') {
									configuration.onLayerShow.apply(instance.proxy!, [itemProps.name, <InstanceType<typeof Button>>itemInstance.proxy!.$refs.btnRef])
								}
							},
							onLayerShown: () => {
								if (typeof configuration.onLayerShown == 'function') {
									configuration.onLayerShown.apply(instance.proxy!, [itemProps.name, <InstanceType<typeof Button>>itemInstance.proxy!.$refs.btnRef])
								}
							},
							onLayerHidden: () => {
								if (typeof configuration.onLayerHidden == 'function') {
									configuration.onLayerHidden.apply(instance.proxy!, [itemProps.name, <InstanceType<typeof Button>>itemInstance.proxy!.$refs.btnRef])
								}
							},
							onOperate: (name, val) => {
								if (typeof configuration.onOperate == 'function') {
									configuration.onOperate.apply(instance.proxy!, [name, val, <InstanceType<typeof Button>>itemInstance.proxy!.$refs.btnRef])
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
	},
	{
		props: {
			name: String,
			disabled: Boolean
		}
	}
)

defineExpose({
	handleRangeUpdate
})
</script>
<style scoped src="./menu.less"></style>

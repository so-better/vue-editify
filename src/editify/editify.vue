<template>
	<div class="editify" :class="{ 'editify-fullscreen': isFullScreen, 'editify-autoheight': !isFullScreen && isAutoHeight }" :style="{ zIndex: zIndex, paddingTop: isFullScreen ? '' : (offset || '') + 'px' }" ref="elRef">
		<!-- 菜单区域 -->
		<Menu ref="menuRef" v-if="menuConfig.use && editor" :config="menuConfig" :color="color" :z-index="zIndex + 1"></Menu>
		<!-- 编辑层，与编辑区域宽高相同必须适配 -->
		<div ref="bodyRef" class="editify-body" :class="{ 'editify-border': showBorder, 'editify-menu_inner': menuConfig.use && menuConfig.mode == 'inner' }" :data-editify-uid="instance.uid">
			<!-- 编辑器 -->
			<div ref="contentRef" class="editify-content" :class="{ 'editify-placeholder': showPlaceholder, 'editify-disabled': isDisabled }" @click="handleEditorClick" @compositionstart="isInputChinese = true" @compositionend="isInputChinese = false" :data-editify-placeholder="placeholder" tabindex="-1"></div>
			<!-- 代码视图 -->
			<textarea v-if="isSourceView" :value="value" readonly class="editify-sourceview" />
			<!-- 工具条 -->
			<Toolbar ref="toolbarRef" v-model="toolbarOptions.show" :node="toolbarOptions.node!" :type="toolbarOptions.type" :scroll-node="contentRef!" :config="toolbarConfig" :color="color" :z-index="zIndex + 10"></Toolbar>
		</div>
		<!-- 编辑器尾部 -->
		<div v-if="showWordLength" class="editify-footer" :class="{ 'editify-fullscreen': isFullScreen && !isSourceView }" :style="{ zIndex: zIndex + 1 }">
			<!-- 字数统计 -->
			<div class="editify-footer-words">{{ $editTrans('totalWordCount') }}{{ textValue.length }}</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'
import { AlexEditor, AlexElement, AlexElementRangeType, AlexElementsRangeType } from 'alex-editor'
import { element as DapElement, event as DapEvent, data as DapData, number as DapNumber, color as DapColor, common as DapCommon } from 'dap-util'
import { mergeObject, getToolbarConfig, getMenuConfig, MenuConfigType, ObjectType, ToolbarConfigType, clickIsOut, ShortcutType, MenuExtendType } from '@/core/tool'
import { listHandle, imageHandle, videoHandle, separatorHandle, linkHandle, codeHandle, tableHandle, preHandle, attachmentHandle, mathformulaHandle, infoBlockHandle, specialInblockHandle } from '@/core/rule'
import { elementToParagraph, getMatchElementByRange, elementIsTask, elementIsAttachment, elementIsList, elementIsMathformula, getMathformulaByElement, elementIsInfoBlock, getMatchElementByElement, hasTableInRange, hasPreInRange } from '@/core/function'
import { trans } from '@/locale'
import { LanguagesItemType } from '@/hljs'
import { extraKeepTagsForMathformula } from '@/feature/mathformula'
import { Toolbar } from './toolbar'
import { Menu } from './menu'
import { EditifyProps, EditifyResizeParamsType, EditifyToolbarOptionsType } from './props'

//定义组件名称
defineOptions({
	name: 'editify'
})
//获取实例
const instance = getCurrentInstance()!
//属性
const props = defineProps(EditifyProps)
//事件
const emits = defineEmits(['update:modelValue', 'focus', 'blur', 'change', 'keydown', 'keyup', 'insertparagraph', 'rangeupdate', 'updateview'])

//设置国际化方法
const $editTrans = trans(props.locale || 'zh_CN')

//菜单栏组件实例
const menuRef = ref<InstanceType<typeof Menu> | null>(null)
//工具栏组件实例
const toolbarRef = ref<InstanceType<typeof Toolbar> | null>(null)

//自身dom
const elRef = ref<HTMLElement | null>(null)
//编辑器主体dom
const bodyRef = ref<HTMLElement | null>(null)
//编辑器内容区域dom
const contentRef = ref<HTMLElement | null>(null)

//编辑器对象
const editor = ref<AlexEditor | null>(null)
//是否代码视图
const isSourceView = ref<boolean>(false)
//是否全屏
const isFullScreen = ref<boolean>(false)
//代表真实光标变化，如果为null表示光标不在编辑器内，否则就是大于0的数字
const rangeKey = ref<number | null>(0)
//光标选区范围内的元素数组
const dataRangeCaches = ref<AlexElementsRangeType>({
	flatList: [],
	list: []
})

//是否编辑器内部修改值
const isModelChange = ref<boolean>(false)
//是否正在输入中文
const isInputChinese = ref<boolean>(false)
//工具条和菜单栏判定延时器
const rangeUpdateTimer = ref<any>(null)
//拖拽记录数据
const resizeParams = ref<EditifyResizeParamsType>({
	element: null, //被拖拽的td
	start: 0 //水平方向起点位置
})
//工具条参数配置
const toolbarOptions = ref<EditifyToolbarOptionsType>({
	//是否显示工具条
	show: false,
	//关联元素
	node: null,
	//类型
	type: 'text'
})

//编辑器的值
const value = computed<string>({
	set(val) {
		emits('update:modelValue', val)
	},
	get() {
		return props.modelValue || '<p><br></p>'
	}
})
//编辑器的纯文本值
const textValue = computed<string>(() => {
	return (DapElement.string2dom(`<div>${value.value}</div>`) as HTMLElement).innerText
})
//是否显示占位符
const showPlaceholder = computed<boolean>(() => {
	if (editor.value) {
		if (value.value && editor.value.stack.length == 1 && editor.value.stack[0].type == 'block' && editor.value.stack[0].parsedom == AlexElement.BLOCK_NODE && editor.value.stack[0].isOnlyHasBreak() && !editor.value.stack[0].hasStyles() && !editor.value.stack[0].hasMarks()) {
			return !isInputChinese.value
		}
	}
	return false
})
//是否显示边框
const showBorder = computed<boolean>(() => {
	//全屏模式下不显示边框
	if (isFullScreen.value) {
		return false
	}
	return props.border
})
//最终生效的工具栏配置
const toolbarConfig = computed<ToolbarConfigType>(() => {
	return mergeObject(getToolbarConfig($editTrans), props.toolbar || {}) as ToolbarConfigType
})
//最终生效的菜单栏配置
const menuConfig = computed<MenuConfigType>(() => {
	return mergeObject(getMenuConfig($editTrans, props.locale), props.menu || {}) as MenuConfigType
})
//编辑器菜单栏区域高度
const menuHeight = computed<number | null>(() => {
	return menuRef.value ? menuRef.value.height : null
})

//是否深色模式
const isDark = computed<boolean>(() => props.dark)
//是否禁用编辑器
const isDisabled = computed<boolean>(() => props.disabled)
//是否自适应高度
const isAutoHeight = computed<boolean>(() => props.autoheight)

//编辑器内部修改值的方法
const internalModify = (val: string) => {
	isModelChange.value = true
	value.value = val
	nextTick(() => {
		isModelChange.value = false
	})
}
//隐藏工具条
const hideToolbar = () => {
	toolbarOptions.value.show = false
	toolbarOptions.value.node = null
}
//工具条显示判断
const handleToolbar = () => {
	if (isDisabled.value || isSourceView.value) {
		return
	}
	hideToolbar()
	nextTick(() => {
		const codeBlock = getMatchElementByRange(editor.value!, dataRangeCaches.value, { parsedom: 'pre' })
		const image = getMatchElementByRange(editor.value!, dataRangeCaches.value, { parsedom: 'img' })
		const video = getMatchElementByRange(editor.value!, dataRangeCaches.value, { parsedom: 'video' })

		//显示图片工具条
		if (image) {
			toolbarOptions.value.type = 'image'
			toolbarOptions.value.node = `[data-editify-uid="${instance.uid}"] [data-editify-element="${image.key}"]`
			if (toolbarOptions.value.show) {
				toolbarRef.value!.layerRef!.setPosition()
			} else {
				toolbarOptions.value.show = true
			}
		}
		//显示视频工具条
		else if (video) {
			toolbarOptions.value.type = 'video'
			toolbarOptions.value.node = `[data-editify-uid="${instance.uid}"] [data-editify-element="${video.key}"]`
			if (toolbarOptions.value.show) {
				toolbarRef.value!.layerRef!.setPosition()
			} else {
				toolbarOptions.value.show = true
			}
		}
		//显示代码块工具条
		else if (codeBlock) {
			toolbarOptions.value.type = 'codeBlock'
			toolbarOptions.value.node = `[data-editify-uid="${instance.uid}"] [data-editify-element="${codeBlock.key}"]`
			if (toolbarOptions.value.show) {
				toolbarRef.value!.layerRef!.setPosition()
			} else {
				toolbarOptions.value.show = true
			}
		}
		//以下是选区时显示文本工具条，非选区时显示其他工具条的情况
		else {
			const result = dataRangeCaches.value.flatList.filter((item: AlexElementRangeType) => item.element.isText())
			//显示文本工具条
			if (result.length) {
				toolbarOptions.value.type = 'text'
				if (toolbarOptions.value.show) {
					toolbarRef.value!.layerRef!.setPosition()
				} else {
					toolbarOptions.value.show = true
				}
			}
			//显示其他工具条
			else {
				const table = getMatchElementByRange(editor.value!, dataRangeCaches.value, { parsedom: 'table' })
				const link = getMatchElementByRange(editor.value!, dataRangeCaches.value, { parsedom: 'a' })
				const orderList = getMatchElementByRange(editor.value!, dataRangeCaches.value, {
					parsedom: 'div',
					marks: {
						'data-editify-list': 'ol'
					}
				})
				const unorderList = getMatchElementByRange(editor.value!, dataRangeCaches.value, {
					parsedom: 'div',
					marks: {
						'data-editify-list': 'ul'
					}
				})
				//显示链接工具条
				if (link) {
					toolbarOptions.value.type = 'link'
					toolbarOptions.value.node = `[data-editify-uid="${instance.uid}"] [data-editify-element="${link.key}"]`
					if (toolbarOptions.value.show) {
						toolbarRef.value!.layerRef!.setPosition()
					} else {
						toolbarOptions.value.show = true
					}
				}
				//显示表格工具条
				else if (table) {
					toolbarOptions.value.type = 'table'
					toolbarOptions.value.node = `[data-editify-uid="${instance.uid}"] [data-editify-element="${table.key}"]`
					if (toolbarOptions.value.show) {
						toolbarRef.value!.layerRef!.setPosition()
					} else {
						toolbarOptions.value.show = true
					}
				}
				//显示有序列表工具条
				else if (orderList) {
					toolbarOptions.value.type = 'orderList'
					toolbarOptions.value.node = `[data-editify-uid="${instance.uid}"] [data-editify-element="${orderList.key}"]`
					if (toolbarOptions.value.show) {
						toolbarRef.value!.layerRef!.setPosition()
					} else {
						toolbarOptions.value.show = true
					}
				}
				//显示无序列表工具条
				else if (unorderList) {
					toolbarOptions.value.type = 'unorderList'
					toolbarOptions.value.node = `[data-editify-uid="${instance.uid}"] [data-editify-element="${unorderList.key}"]`
					if (toolbarOptions.value.show) {
						toolbarRef.value!.layerRef!.setPosition()
					} else {
						toolbarOptions.value.show = true
					}
				}
			}
		}
	})
}
//初始创建编辑器
const createEditor = () => {
	//创建编辑器
	editor.value = new AlexEditor(contentRef.value!, {
		value: value.value,
		disabled: isDisabled.value,
		renderRules: [
			el => {
				listHandle(editor.value!, el)
			},
			el => {
				imageHandle(editor.value!, el)
			},
			el => {
				videoHandle(editor.value!, el)
			},
			el => {
				separatorHandle(editor.value!, el)
			},
			el => {
				linkHandle(editor.value!, el)
			},
			el => {
				codeHandle(editor.value!, el)
			},
			el => {
				tableHandle(editor.value!, el)
			},
			el => {
				preHandle(editor.value!, el, !!(toolbarConfig.value?.use && toolbarConfig.value?.codeBlock?.languages?.show), toolbarConfig.value?.codeBlock?.languages?.options as (string | LanguagesItemType)[])
			},
			el => {
				attachmentHandle(editor.value!, el, $editTrans)
			},
			el => {
				mathformulaHandle(editor.value!, el)
			},
			el => {
				infoBlockHandle(editor.value!, el, props.color)
			},
			el => {
				specialInblockHandle(editor.value!, el)
			},
			...props.renderRules
		],
		extraKeepTags: [...extraKeepTagsForMathformula, ...props.extraKeepTags],
		allowCopy: props.allowCopy,
		allowPaste: props.allowPaste,
		allowCut: props.allowCut,
		allowPasteHtml: props.allowPasteHtml,
		customTextPaste: props.customTextPaste,
		customImagePaste: props.customImagePaste,
		customVideoPaste: props.customVideoPaste,
		customFilePaste: props.customFilePaste,
		customHtmlPaste: handleCustomHtmlPaste,
		customMerge: handleCustomMerge,
		customParseNode: handleCustomParseNode
	})
	//编辑器渲染后会有一个渲染过程，会改变内容，因此重新获取内容的值来设置value
	internalModify(editor.value.value)
	//设置监听事件
	editor.value.on('change', handleEditorChange)
	editor.value.on('focus', handleEditorFocus)
	editor.value.on('blur', handleEditorBlur)
	editor.value.on('keydown', handleEditorKeydown)
	editor.value.on('keyup', handleEditorKeyup)
	editor.value.on('insertParagraph', handleInsertParagraph)
	editor.value.on('rangeUpdate', handleRangeUpdate)
	editor.value.on('deleteInStart', handleDeleteInStart)
	editor.value.on('deleteComplete', handleDeleteComplete)
	editor.value.on('afterRender', handleAfterRender)
	//dom渲染
	editor.value.domRender()
	//自动获取焦点
	if (props.autofocus && !isSourceView.value && !isDisabled.value) {
		collapseToEnd()
	}
}
//设定编辑器内的视频高度
const setVideoHeight = () => {
	contentRef.value!.querySelectorAll('video').forEach(video => {
		video.style.height = video.offsetWidth / props.videoRatio + 'px'
	})
}
//鼠标在页面按下：处理表格拖拽改变列宽、拖拽改变图片视频宽度和菜单栏是否使用判断
const documentMouseDown = (e: Event) => {
	if (isDisabled.value) {
		return
	}
	const elm = e.target as HTMLElement
	const event = e as MouseEvent
	//鼠标在编辑器内按下
	if (DapElement.isContains(contentRef.value!, elm)) {
		const key = DapData.get(elm, 'data-alex-editor-key')
		if (key) {
			const element = editor.value!.getElementByKey(key)
			if (element) {
				//如果是td则表示拖拽改变列宽
				if (element.parsedom == 'td') {
					const length = element.parent!.children!.length
					//最后一个td不设置
					if (element.parent!.children![length - 1].isEqual(element)) {
						return
					}
					const rect = DapElement.getElementBounding(elm)
					//在可拖拽范围内
					if (event.pageX >= Math.abs(rect.left + elm.offsetWidth - 5) && event.pageX <= Math.abs(rect.left + elm.offsetWidth + 5)) {
						resizeParams.value.element = element
						resizeParams.value.start = event.pageX
					}
				}
				//如果是img或者video则表示拖拽改变图片视频宽度
				else if (['img', 'video'].includes(element.parsedom!)) {
					const rect = DapElement.getElementBounding(elm)
					//在可拖拽范围内
					if (event.pageX >= Math.abs(rect.left + elm.offsetWidth - 10) && event.pageX <= Math.abs(rect.left + elm.offsetWidth)) {
						resizeParams.value.element = element
						resizeParams.value.start = event.pageX
					}
				}
			}
		}
	}
	//如果点击了除编辑器外的地方，菜单栏不可使用，此时将range置为null
	if (clickIsOut(elRef.value!, elm) && !isSourceView.value) {
		rangeKey.value = null
	}
}
//鼠标在页面移动：处理表格拖拽改变列宽、拖拽改变图片视频宽度
const documentMouseMove = (e: Event) => {
	if (isDisabled.value) {
		return
	}
	const event = e as MouseEvent
	const elm = e.target as HTMLElement
	//如果鼠标在图片和视频上
	if (DapElement.isContains(contentRef.value!, elm) && ['img', 'video'].includes(elm.tagName.toLocaleLowerCase())) {
		const rect = DapElement.getElementBounding(elm)
		//在可拖拽范围内改变鼠标样式
		if (event.pageX >= Math.abs(rect.left + elm.offsetWidth - 10) && event.pageX <= Math.abs(rect.left + elm.offsetWidth)) {
			elm.style.cursor = 'col-resize'
		} else {
			elm.style.cursor = ''
		}
	}
	if (!resizeParams.value.element) {
		return
	}
	//表格列宽拖拽
	if (resizeParams.value.element.parsedom == 'td') {
		const table = getMatchElementByRange(editor.value!, dataRangeCaches.value, { parsedom: 'table' })
		if (!table) {
			return
		}
		const colgroup = table.children!.find(item => {
			return item.parsedom == 'colgroup'
		})!
		const index = resizeParams.value.element.parent!.children!.findIndex(el => {
			return el.isEqual(resizeParams.value.element!)
		})
		const width = `${resizeParams.value.element.elm!.offsetWidth + event.pageX - resizeParams.value.start}`
		colgroup.children![index].marks!['width'] = width
		colgroup.children![index].elm!.setAttribute('width', width)
		resizeParams.value.start = event.pageX
	}
	//图片视频拖拽改变宽度
	else if (['img', 'video'].includes(resizeParams.value.element.parsedom!)) {
		const width = `${resizeParams.value.element.elm!.offsetWidth + event.pageX - resizeParams.value.start}px`
		if (resizeParams.value.element.hasStyles()) {
			resizeParams.value.element.styles!['width'] = width
		} else {
			resizeParams.value.element.styles = {
				width: width
			}
		}
		resizeParams.value.element.elm!.style.width = width
		//视频宽度改变的同时需要设置高度
		if (resizeParams.value.element.parsedom == 'video') {
			setVideoHeight()
		}
		resizeParams.value.start = event.pageX
	}
}
//鼠标在页面松开：处理表格拖拽改变列宽、拖拽改变图片视频宽度
const documentMouseUp = () => {
	if (isDisabled.value) {
		return
	}
	if (!resizeParams.value.element) {
		return
	}
	//表格列宽拖拽
	if (resizeParams.value.element.parsedom == 'td') {
		const table = getMatchElementByRange(editor.value!, dataRangeCaches.value, { parsedom: 'table' })
		if (!table) {
			return
		}
		const colgroup = table.children!.find(item => {
			return item.parsedom == 'colgroup'
		})!
		const index = resizeParams.value.element.parent!.children!.findIndex(el => {
			return el.isEqual(resizeParams.value.element!)
		})
		const width = parseFloat(colgroup.children![index].marks!['width'])
		if (!isNaN(width)) {
			colgroup.children![index].marks!['width'] = `${Number(((width / resizeParams.value.element.parent!.elm!.offsetWidth) * 100).toFixed(2))}%`
			editor.value!.domRender()
			editor.value!.rangeRender()
		}
		resizeParams.value.element = null
		resizeParams.value.start = 0
	}
	//图片视频拖拽改变宽度
	else if (['img', 'video'].includes(resizeParams.value.element.parsedom!)) {
		const width = parseFloat(resizeParams.value.element.styles!['width'])
		if (!isNaN(width)) {
			if (resizeParams.value.element.hasStyles()) {
				resizeParams.value.element.styles!['width'] = `${Number(((width / DapElement.width(contentRef.value!)) * 100).toFixed(2))}%`
			} else {
				resizeParams.value.element.styles = {
					width: `${Number(((width / DapElement.width(contentRef.value!)) * 100).toFixed(2))}%`
				}
			}
			editor.value!.domRender()
			editor.value!.rangeRender()
		}
		resizeParams.value.element = null
		resizeParams.value.start = 0
	}
}
//鼠标点击页面：处理任务列表复选框勾选
const documentClick = (e: Event) => {
	if (isDisabled.value) {
		return
	}
	const elm = e.target as HTMLElement
	const event = e as MouseEvent
	//鼠标在编辑器内点击
	if (DapElement.isContains(contentRef.value!, elm)) {
		const key = DapData.get(elm, 'data-alex-editor-key')
		if (key) {
			const element = editor.value!.getElementByKey(key)!
			//如果是任务列表元素
			if (element && elementIsTask(element)) {
				const rect = DapElement.getElementBounding(elm)
				//在复选框范围内
				if (event.pageX >= Math.abs(rect.left) && event.pageX <= Math.abs(rect.left + 16) && event.pageY >= Math.abs(rect.top + elm.offsetHeight / 2 - 8) && event.pageY <= Math.abs(rect.top + elm.offsetHeight / 2 + 8)) {
					//取消勾选
					if (element.marks!['data-editify-task'] == 'checked') {
						element.marks!['data-editify-task'] = 'uncheck'
					}
					//勾选
					else {
						element.marks!['data-editify-task'] = 'checked'
					}
					if (!editor.value!.range) {
						editor.value!.initRange()
					}
					editor.value!.range!.anchor.moveToEnd(element)
					editor.value!.range!.focus.moveToEnd(element)
					editor.value!.domRender()
					editor.value!.rangeRender()
				}
			}
		}
	}
}
//重新定义编辑器粘贴html
const handleCustomHtmlPaste = async (elements: AlexElement[]) => {
	const flatElements = AlexElement.flatElements(elements)
	flatElements.forEach(el => {
		if (!el.isText()) {
			let marks: ObjectType = {}
			let styles: ObjectType = {}
			//处理需要保留的标记
			if (el.hasMarks()) {
				//contenteditable属性保留
				if (el.marks!['contenteditable']) {
					marks['contenteditable'] = el.marks!['contenteditable']
				}
				//name属性保留
				if (el.marks!['name']) {
					marks['name'] = el.marks!['name']
				}
				//disabled属性保留
				if (el.marks!['disabled']) {
					marks['disabled'] = el.marks!['disabled']
				}
				//图片的alt属性保留
				if (el.parsedom == 'img' && el.marks!['alt']) {
					marks['alt'] = el.marks!['alt']
				}
				//图片和视频的src属性保留
				if (['img', 'video'].includes(el.parsedom!) && el.marks!['src']) {
					marks['src'] = el.marks!['src']
				}
				//视频的autoplay属性保留
				if (el.parsedom == 'video' && el.marks!['autoplay']) {
					marks['autoplay'] = el.marks!['autoplay']
				}
				//视频的loop属性保留
				if (el.parsedom == 'video' && el.marks!['loop']) {
					marks['loop'] = el.marks!['loop']
				}
				//视频的muted属性保留
				if (el.parsedom == 'video' && el.marks!['muted']) {
					marks['muted'] = el.marks!['muted']
				}
				//视频的controls属性保留
				if (el.parsedom == 'video' && el.marks!['controls']) {
					marks['controls'] = el.marks!['controls']
				}
				//链接的href属性保留
				if (el.parsedom == 'a' && el.marks!['href']) {
					marks['href'] = el.marks!['href']
				}
				//链接的target属性保留
				if (el.parsedom == 'a' && el.marks!['target']) {
					marks['target'] = el.marks!['target']
				}
				//有序和无序列表属性保留
				if (elementIsList(el, true) || elementIsList(el, false)) {
					marks['data-editify-list'] = el.marks!['data-editify-list']
					marks['data-editify-list-style'] = el.marks!['data-editify-list-style']
				}
				//行内代码属性保留
				if (el.parsedom == AlexElement.TEXT_NODE && el.marks!['data-editify-code']) {
					marks['data-editify-code'] = el.marks!['data-editify-code']
				}
				//任务列表属性保留
				if (elementIsTask(el)) {
					marks['data-editify-task'] = el.marks!['data-editify-task']
				}
				//表格列宽属性保留
				if (el.parsedom == 'col' && el.marks!['width']) {
					marks['width'] = el.marks!['width']
				}
				//表格单元格colspan属性保留
				if (['td', 'th'].includes(el.parsedom!) && el.marks!['colspan']) {
					marks['colspan'] = el.marks!['colspan']
				}
				//表格单元格rowspan属性保留
				if (['td', 'th'].includes(el.parsedom!) && el.marks!['rowspan']) {
					marks['rowspan'] = el.marks!['rowspan']
				}
				//表格单元格被合并属性保留
				if (['td', 'th'].includes(el.parsedom!) && el.marks!['data-editify-merged']) {
					marks['data-editify-merged'] = el.marks!['data-editify-merged']
				}
				//附件属性保留
				if (elementIsAttachment(el)) {
					marks['data-editify-attachment'] = el.marks!['data-editify-attachment']
					if (el.marks!['data-editify-attachment-name']) {
						marks['data-editify-attachment-name'] = el.marks!['data-editify-attachment-name']
					}
				}
				//数学公式内的属性全部保留
				if (!!getMathformulaByElement(el)) {
					marks = mergeObject(marks, DapCommon.clone(el.marks!))!
				}
				//信息块属性保留
				if (elementIsInfoBlock(el)) {
					marks['data-editify-info'] = el.marks!['data-editify-info']
				}
			}
			//处理需要保留的样式
			if (el.hasStyles()) {
				//图片和视频保留width样式
				if (['img', 'video'].includes(el.parsedom!) && el.styles!['width']) {
					styles['width'] = el.styles!['width']
				}
				//块元素保留text-indent样式
				if ((el.isBlock() || el.isInblock()) && el.styles!['text-indent']) {
					styles['text-indent'] = el.styles!['text-indent']
				}
				//块元素保留text-align样式
				if ((el.isBlock() || el.isInblock()) && el.styles!['text-align']) {
					styles['text-align'] = el.styles!['text-align']
				}
				//块元素保留line-height样式
				if ((el.isBlock() || el.isInblock()) && el.styles!['line-height']) {
					styles['line-height'] = el.styles!['line-height']
				}
				//数学公式内的样式全部保留
				if (!!getMathformulaByElement(el)) {
					styles = mergeObject(styles, DapCommon.clone(el.styles!))!
				}
			}
			//对外的自定义属性和样式保留
			if (typeof props.pasteKeepMarks == 'function') {
				marks = mergeObject(marks, props.pasteKeepMarks(el))!
			}
			if (typeof props.pasteKeepStyles == 'function') {
				styles = mergeObject(styles, props.pasteKeepStyles(el))!
			}
			//将处理后的样式和标记给元素
			el.marks = marks
			el.styles = styles
		}
		//对于不在table下的这些表格元素直接置空
		if (el.parsedom && ['tbody', 'tr', 'th', 'td', 'thead', 'tfooter', 'colgroup', 'col'].includes(el.parsedom)) {
			const flag = !!getMatchElementByElement(el, {
				parsedom: 'table'
			})
			if (!flag) {
				el.toEmpty()
				if (el.parent) {
					const index = el.parent.children!.findIndex(item => item.isEqual(el))
					el.parent.children!.splice(index, 1)
				}
			}
		}
	})
	elements = elements.filter(el => !el.isEmpty())
	if (!elements.length) {
		return
	}
	//如果使用了自定义粘贴html的功能
	if (typeof props.customHtmlPaste == 'function') {
		await props.customHtmlPaste(elements)
	}
	//默认粘贴html
	else {
		//第一个元素会在当前光标所在根级块元素只有一个换行符时进行覆盖
		editor.value!.insertElement(elements[0])
		for (let i = elements.length - 1; i >= 1; i--) {
			editor.value!.addElementAfter(elements[i], elements[0])
		}
		editor.value!.range!.anchor.moveToEnd(elements[elements.length - 1])
		editor.value!.range!.focus.moveToEnd(elements[elements.length - 1])
	}
}
//重新定义编辑器合并元素的逻辑
const handleCustomMerge = (ele: AlexElement, preEle: AlexElement) => {
	const uneditable = preEle.getUneditableElement()
	if (uneditable) {
		uneditable.toEmpty()
	} else {
		preEle.children!.push(...ele.children!)
		preEle.children!.forEach(item => {
			item.parent = preEle
		})
		ele.children = null
	}
}
//针对node转为元素进行额外的处理
const handleCustomParseNode = (ele: AlexElement) => {
	//附件元素设为自闭合元素
	if (elementIsAttachment(ele)) {
		ele.type = 'closed'
	}
	//数学公式元素处理
	if (elementIsMathformula(ele)) {
		AlexElement.flatElements(ele.children!).forEach(item => {
			//锁定元素防止合并
			item.locked = true
			//没有子元素的非文本元素设为自闭合元素
			if (!item.isText() && !item.hasChildren()) {
				item.type = 'closed'
			}
		})
	}
	if (typeof props.customParseNode == 'function') {
		ele = props.customParseNode(ele)
	}
	return ele
}
//编辑区域键盘按下
const handleEditorKeydown = (val: string, e: KeyboardEvent) => {
	//如果禁用不执行后面的逻辑
	if (isDisabled.value) {
		//自定义键盘按下操作
		emits('keydown', val, e)
		return
	}
	//遍历菜单栏配置，设置快捷键
	for (let key in menuConfig.value) {
		//如果是拓展菜单
		if (key == 'extends') {
			//获取拓展菜单列表
			const extendMenus = (menuConfig.value as any)[key] as MenuExtendType
			//遍历拓展菜单列表
			Object.keys(extendMenus).forEach(extendKey => {
				//获取拓展菜单配置
				const item = extendMenus[extendKey]
				//获取该菜单按钮的快捷键配置
				const shortcut = item.shortcut as ShortcutType | undefined
				//如果快捷键配置存在并且定义了define方法
				if (shortcut && typeof shortcut.define == 'function') {
					//获取define方法执行结果
					const res = shortcut.define(e) as boolean | { [code: string]: boolean }
					//如果执行结果是true，则表示该快捷键按下
					if (res === true) {
						//阻止默认行为
						e.preventDefault()
						//没有被禁用则执行对应的操作
						if (!item.disabled) {
							if (typeof shortcut.operation == 'function') {
								shortcut.operation(editor.value!, dataRangeCaches.value, isSourceView, isFullScreen)
							} else {
								menuRef.value?.menuItemRefs[extendKey].btnRef.handleClick()
							}
						}
					}
					//如果是对象，则表示有多个快捷键操作
					else if (res && DapCommon.isObject(res)) {
						//遍历
						Object.keys(res).forEach(code => {
							//如果是true，则执行对应的操作
							if (!!res[code]) {
								//阻止默认行为
								e.preventDefault()
								//没有被禁用则执行对应的操作
								if (!item.disabled) {
									if (typeof shortcut.operation == 'function') {
										shortcut.operation(editor.value!, dataRangeCaches.value, isSourceView, isFullScreen, code)
									} else {
										menuRef.value?.menuItemRefs[extendKey].btnRef.handleClick()
									}
								}
							}
						})
					}
				}
			})
		}
		//如果是内置菜单
		else if (!['use', 'tooltip', 'mode', 'style', 'sequence'].includes(key)) {
			const item = (menuConfig.value as any)[key]
			//这里多做一步判断：判断是否菜单并且是否有快捷键配置
			if (DapCommon.isObject(item) && item.show === true && DapCommon.isObject(item.shortcut)) {
				//获取该菜单按钮的快捷键配置
				const shortcut = item.shortcut as ShortcutType
				//如果定义了define方法
				if (typeof shortcut.define == 'function') {
					//获取define方法执行结果
					const res = shortcut.define(e) as boolean | { [code: string]: boolean }
					//如果执行结果是true，则表示该快捷键按下
					if (res === true) {
						//阻止默认行为
						e.preventDefault()
						//没有被禁用则执行对应的操作
						if (!item.disabled) {
							if (typeof shortcut.operation == 'function') {
								shortcut.operation(editor.value!, dataRangeCaches.value, isSourceView, isFullScreen)
							} else {
								menuRef.value?.menuItemRefs[key].btnRef.handleClick()
							}
						}
					}
					//如果是对象，则表示有多个快捷键操作
					else if (res && DapCommon.isObject(res)) {
						//遍历
						Object.keys(res).forEach(code => {
							//如果是true，则执行对应的操作
							if (!!res[code]) {
								//阻止默认行为
								e.preventDefault()
								//没有被禁用则执行对应的操作
								if (!item.disabled) {
									if (typeof shortcut.operation == 'function') {
										shortcut.operation(editor.value!, dataRangeCaches.value, isSourceView, isFullScreen, code)
									} else {
										menuRef.value?.menuItemRefs[key].btnRef.handleClick()
									}
								}
							}
						})
					}
				}
			}
		}
	}
	//代码块和表格中单独按下tab键，插入4个空格
	if (e.key.toLocaleLowerCase() == 'tab' && !e.metaKey && !e.shiftKey && !e.ctrlKey && !e.altKey && (hasTableInRange(editor.value!, dataRangeCaches.value) || hasPreInRange(editor.value!, dataRangeCaches.value))) {
		e.preventDefault()
		editor.value!.insertText('    ')
		editor.value!.domRender()
		editor.value!.rangeRender()
	}
	//自定义键盘按下操作
	emits('keydown', val, e)
}
//编辑区域键盘松开
const handleEditorKeyup = (val: string, e: Event) => {
	//自定义键盘松开操作
	emits('keyup', val, e)
}
//点击编辑器：处理图片和视频的光标聚集
const handleEditorClick = (e: Event) => {
	if (isDisabled.value || isSourceView.value) {
		return
	}
	const elm = e.target as HTMLElement
	//点击的是图片或者视频
	if (elm.nodeName.toLocaleLowerCase() == 'img' || elm.nodeName.toLocaleLowerCase() == 'video') {
		const key = Number(elm.getAttribute('data-editify-element'))
		if (DapNumber.isNumber(key)) {
			const element = editor.value!.getElementByKey(key)!
			if (!editor.value!.range) {
				editor.value!.initRange()
			}
			editor.value!.range!.anchor.moveToStart(element)
			editor.value!.range!.focus.moveToEnd(element)
			editor.value!.rangeRender()
		}
	}
}
//编辑器的值更新
const handleEditorChange = (newVal: string, oldVal: string) => {
	//内部修改
	internalModify(newVal)
	//触发change事件
	emits('change', newVal, oldVal)
}
//编辑器失去焦点
const handleEditorBlur = (val: string) => {
	if (isDisabled.value) {
		return
	}
	if (props.border && props.color && !isFullScreen.value) {
		//恢复编辑区域边框颜色
		bodyRef.value!.style.borderColor = ''
		//恢复编辑区域阴影颜色
		bodyRef.value!.style.boxShadow = ''
		//使用菜单栏的情况下恢复菜单栏的样式
		if (menuConfig.value.use) {
			menuRef.value!.$el.style.borderColor = ''
			menuRef.value!.$el.style.boxShadow = ''
		}
	}
	emits('blur', val)
}
//编辑器获取焦点
const handleEditorFocus = (val: string) => {
	if (isDisabled.value) {
		return
	}
	if (props.border && props.color && !isFullScreen.value) {
		//编辑区域边框颜色
		bodyRef.value!.style.borderColor = props.color
		//转换颜色值
		const rgb = DapColor.hex2rgb(props.color)
		//菜单栏模式为inner
		if (menuConfig.value.use && menuConfig.value.mode == 'inner') {
			//编辑区域除顶部边框的阴影
			bodyRef.value!.style.boxShadow = `0 8px 8px -8px rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5),8px 0 8px -8px rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5), -8px 0 8px -8px rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`
			//菜单栏的边框颜色
			menuRef.value!.$el.style.borderColor = props.color
			//菜单栏除底部边框的阴影
			menuRef.value!.$el.style.boxShadow = `0 -8px 8px -8px rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5),8px 0 8px -8px rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5), -8px 0 8px -8px rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`
		}
		//其他菜单栏模式
		else if (menuConfig.value.use) {
			//编辑区域四边阴影
			bodyRef.value!.style.boxShadow = `0 0 8px rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`
		}
		//不使用菜单栏
		else {
			//编辑区域四边阴影
			bodyRef.value!.style.boxShadow = `0 0 8px rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`
		}
	}
	emits('focus', val)
}
//编辑器换行
const handleInsertParagraph = (element: AlexElement, previousElement: AlexElement) => {
	//两个元素不一致，则表示不在代码块样式内
	if (!element.isEqual(previousElement)) {
		//前一个根级块元素如果是只包含换行符的元素，并且当前根级块元素也是包含换行符的元素，则当前根级块元素转为段落
		if (previousElement.isBlock() && element.isBlock() && previousElement.isOnlyHasBreak() && element.isOnlyHasBreak()) {
			if (previousElement.parsedom != AlexElement.BLOCK_NODE) {
				elementToParagraph(previousElement)
				editor.value!.range!.anchor.moveToStart(previousElement)
				editor.value!.range!.focus.moveToStart(previousElement)
				element.toEmpty()
			}
		}
		//如果当前换行元素是任务列表则改为不勾选状态
		if (elementIsTask(element)) {
			element.marks!['data-editify-task'] = 'uncheck'
		}
	}
	emits('insertparagraph', value.value)
}
//编辑器焦点更新
const handleRangeUpdate = () => {
	//更新rangeKey
	if (rangeKey.value) {
		rangeKey.value++
	} else {
		rangeKey.value = 1
	}
	//没有range直接返回
	if (!editor.value!.range) {
		return
	}
	//获取光标选取范围内的元素数据，并且进行缓存
	dataRangeCaches.value = editor.value!.getElementsByRange()
	//节流写法
	if (rangeUpdateTimer.value) {
		clearTimeout(rangeUpdateTimer.value)
		rangeUpdateTimer.value = null
	}
	//延时200ms进行判断
	rangeUpdateTimer.value = setTimeout(() => {
		//如果使用工具条
		if (toolbarConfig.value.use) {
			handleToolbar()
		}
	}, 200)
	//触发rangeupdate事件
	emits('rangeupdate')
}
//编辑器部分删除情景(在编辑器起始处)
const handleDeleteInStart = (element: AlexElement) => {
	//根级块转为段落
	if (element.isBlock()) {
		elementToParagraph(element)
	}
}
//编辑器删除完成后事件
const handleDeleteComplete = () => {
	const uneditable = editor.value!.range!.anchor.element.getUneditableElement()
	if (uneditable) {
		uneditable.toEmpty()
	}
}
//编辑器dom渲染
const handleAfterRender = () => {
	//设定视频高度
	setVideoHeight()
	//附件元素下载事件设置
	contentRef.value!.querySelectorAll('span[data-editify-attachment]').forEach(dom => {
		DapEvent.off(dom as HTMLElement, 'click')
		//单击下载
		DapEvent.on(dom as HTMLElement, 'click', async () => {
			//获取文件地址
			const url = dom.getAttribute('data-editify-attachment')!
			//使用fetch读取文件地址
			const res = await fetch(url, {
				method: 'GET'
			})
			//获取blob数据
			const blob = await res.blob()
			//创建a标签进行下载
			const a = document.createElement('a')
			a.setAttribute('target', '_blank')
			a.setAttribute('href', URL.createObjectURL(blob))
			a.setAttribute('download', dom.getAttribute('data-editify-attachment-name')!)
			a.click()
		})
	})
	emits('updateview')
}
//api：光标设置到文档底部
const collapseToEnd = () => {
	editor.value!.collapseToEnd()
	editor.value!.rangeRender()
	DapElement.setScrollTop({
		el: contentRef.value!,
		number: DapElement.getScrollHeight(contentRef.value!),
		time: 300
	})
}
//api：光标设置到文档头部
const collapseToStart = () => {
	editor.value!.collapseToStart()
	editor.value!.rangeRender()
	nextTick(() => {
		DapElement.setScrollTop({
			el: contentRef.value!,
			number: 0,
			time: 300
		})
	})
}

//监听编辑的值变更
watch(
	() => value.value,
	newVal => {
		//内部修改不处理
		if (isModelChange.value) {
			return
		}
		//如果是外部修改，需要重新渲染编辑器
		editor.value!.stack = editor.value!.parseHtml(newVal)
		editor.value!.range = null
		editor.value!.domRender()
		editor.value!.rangeRender()
		contentRef.value!.blur()
	}
)
//代码视图切换
watch(
	() => isSourceView.value,
	newVal => {
		if (toolbarConfig.value.use) {
			if (newVal) {
				hideToolbar()
			} else {
				handleToolbar()
			}
		}
	}
)
//监听isDisabled
watch(
	() => isDisabled.value,
	newVal => {
		if (newVal) {
			editor.value!.setDisabled()
		} else {
			editor.value!.setEnabled()
		}
	}
)
//监听深色模式切换
watch(
	() => isDark.value,
	newVal => {
		if (newVal) {
			document.documentElement.setAttribute('data-editify-dark', 'true')
		} else {
			document.documentElement.removeAttribute('data-editify-dark')
		}
	},
	{
		immediate: true
	}
)

onMounted(() => {
	//创建编辑器
	createEditor()
	//鼠标按下监听
	DapEvent.on(document.documentElement, `mousedown.editify_${instance.uid}`, documentMouseDown)
	//鼠标移动监听
	DapEvent.on(document.documentElement, `mousemove.editify_${instance.uid}`, documentMouseMove)
	//鼠标松开监听
	DapEvent.on(document.documentElement, `mouseup.editify_${instance.uid}`, documentMouseUp)
	//鼠标点击箭头
	DapEvent.on(document.documentElement, `click.editify_${instance.uid}`, documentClick)
	//监听窗口改变
	DapEvent.on(window, `resize.editify_${instance.uid}`, setVideoHeight)
})

onBeforeUnmount(() => {
	//卸载绑定在document.documentElement上的事件
	DapEvent.off(document.documentElement, `mousedown.editify_${instance.uid} mousemove.editify_${instance.uid} mouseup.editify_${instance.uid} click.editify_${instance.uid}`)
	//卸载绑定在window上的事件
	DapEvent.off(window, `resize.editify_${instance.uid}`)
	//销毁编辑器
	editor.value!.destroy()
})

provide('editor', editor)
provide('isSourceView', isSourceView)
provide('isFullScreen', isFullScreen)
provide('rangeKey', rangeKey)
provide('dataRangeCaches', dataRangeCaches)
provide('$editTrans', $editTrans)
provide('showBorder', showBorder)
provide('isDark', isDark)
provide('isDisabled', isDisabled)
provide('isAutoHeight', isAutoHeight)

defineExpose({
	editor,
	isSourceView,
	isFullScreen,
	rangeKey,
	dataRangeCaches,
	textValue,
	menuHeight,
	collapseToEnd,
	collapseToStart
})
</script>
<style scoped src="./editify.less"></style>

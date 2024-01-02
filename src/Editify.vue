<template>
	<div class="editify" :class="{ fullscreen: isFullScreen, autoheight: autoheight }">
		<!-- 菜单区域 -->
		<Menu v-if="menuConfig.use" :config="menuConfig" :color="color" ref="menu"></Menu>
		<!-- 编辑层，与编辑区域宽高相同必须适配 -->
		<div ref="body" class="editify-body" :class="{ border: showBorder, menu_inner: menuConfig.use && menuConfig.mode == 'inner' }" :data-editify-uid="uid">
			<!-- 编辑器 -->
			<div ref="content" class="editify-content" :class="{ placeholder: showPlaceholder, disabled: disabled }" @keydown="handleEditorKeydown" @click="handleEditorClick" @compositionstart="isInputChinese = true" @compositionend="isInputChinese = false" :data-editify-placeholder="placeholder"></div>
			<!-- 代码视图 -->
			<textarea v-if="isSourceView" :value="value" readonly class="editify-source" />
			<!-- 工具条 -->
			<Toolbar ref="toolbar" v-model="toolbarOptions.show" :node="toolbarOptions.node" :type="toolbarOptions.type" :config="toolbarConfig"></Toolbar>
		</div>
		<!-- 编辑器尾部 -->
		<div v-if="showWordLength" class="editify-footer" :class="{ fullscreen: isFullScreen && !isSourceView }" ref="footer">
			<!-- 字数统计 -->
			<div class="editify-footer-words">{{ $editTrans('totalWordCount') }}{{ textValue.length }}</div>
		</div>
	</div>
</template>
<script>
import { getCurrentInstance } from 'vue'
import { AlexEditor, AlexElement } from 'alex-editor'
import { element as DapElement, event as DapEvent, data as DapData, number as DapNumber, color as DapColor } from 'dap-util'
import { pasteKeepData, editorProps, mergeObject, getToolbarConfig, getMenuConfig } from './core/tool'
import { parseList, orderdListHandle, mediaHandle, tableHandle, preHandle, specialInblockHandle } from './core/rule'
import { isTask, elementToParagraph, getCurrentParsedomElement, hasTableInRange, hasLinkInRange, hasPreInRange, hasImageInRange, hasVideoInRange, setIndentIncrease, setIndentDecrease, insertImage, insertVideo } from './core/function'
import Tooltip from './components/base/Tooltip'
import Toolbar from './components/Toolbar'
import Menu from './components/Menu'

export default {
	name: 'editify',
	props: { ...editorProps },
	emits: ['update:modelValue', 'focus', 'blur', 'change', 'keydown', 'insertparagraph', 'rangeupdate', 'updateview'],
	setup() {
		const instance = getCurrentInstance()
		return {
			uid: instance.uid
		}
	},
	data() {
		return {
			//是否编辑器内部修改值
			isModelChange: false,
			//是否正在输入中文
			isInputChinese: false,
			//工具条和菜单栏判定延时器
			rangeUpdateTimer: null,
			//表格列宽拖拽记录数据
			tableColumnResizeParams: {
				element: null, //被拖拽的td
				start: 0 //水平方向起点位置
			},
			//工具条参数配置
			toolbarOptions: {
				//是否显示工具条
				show: false,
				//关联元素
				node: null,
				//类型
				type: 'text'
			},

			/** 以下是可对外使用的属性 */

			//编辑器对象
			editor: null,
			//是否代码视图
			isSourceView: false,
			//是否全屏
			isFullScreen: false,
			//菜单栏是否可以使用标识
			canUseMenu: false,
			//光标选取范围内的元素数组
			dataRangeCaches: {
				flatList: [],
				list: []
			}
		}
	},
	computed: {
		//编辑器的值
		value: {
			set(val) {
				this.$emit('update:modelValue', val)
			},
			get() {
				return this.modelValue || '<p><br></p>'
			}
		},
		//编辑器的纯文本值
		textValue() {
			return DapElement.string2dom(`<div>${this.value}</div>`).innerText
		},
		//是否显示占位符
		showPlaceholder() {
			if (this.editor) {
				if (this.value && this.editor.stack.length == 1 && this.editor.stack[0].type == 'block' && this.editor.stack[0].parsedom == AlexElement.BLOCK_NODE && this.editor.stack[0].isOnlyHasBreak() && !this.editor.stack[0].hasStyles() && !this.editor.stack[0].hasMarks()) {
					return !this.isInputChinese
				}
			}
			return false
		},
		//是否显示边框
		showBorder() {
			//全屏模式下不显示边框
			if (this.isFullScreen) {
				return false
			}
			return this.border
		},
		//最终生效的工具栏配置
		toolbarConfig() {
			return mergeObject(getToolbarConfig(this.$editTrans, this.$editLocale), this.toolbar || {})
		},
		//最终生效的菜单栏配置
		menuConfig() {
			return mergeObject(getMenuConfig(this.$editTrans, this.$editLocale), this.menu || {})
		}
	},
	components: {
		Toolbar,
		Tooltip,
		Menu
	},
	inject: ['$editTrans', '$editLocale'],
	watch: {
		//监听编辑的值变更
		value(newVal) {
			//内部修改不处理
			if (this.isModelChange) {
				return
			}
			//如果是外部修改，需要重新渲染编辑器
			this.editor.stack = this.editor.parseHtml(newVal)
			this.editor.range = null
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
			this.$refs.content.blur()
		},
		//代码视图切换
		isSourceView(newValue) {
			if (this.toolbarConfig.use) {
				if (newValue) {
					this.hideToolbar()
				} else {
					this.handleToolbar()
				}
			}
		},
		//监听disabled
		disabled(newValue) {
			if (newValue) {
				this.editor.setDisabled()
			} else {
				this.editor.setEnabled()
			}
		}
	},
	mounted() {
		//创建编辑器
		this.createEditor()
		//监听滚动隐藏工具条
		this.handleScroll()
		//鼠标按下监听
		DapEvent.on(document.documentElement, `mousedown.editify_${this.uid}`, this.documentMouseDown)
		//鼠标移动监听
		DapEvent.on(document.documentElement, `mousemove.editify_${this.uid}`, this.documentMouseMove)
		//鼠标松开监听
		DapEvent.on(document.documentElement, `mouseup.editify_${this.uid}`, this.documentMouseUp)
		//鼠标点击箭头
		DapEvent.on(document.documentElement, `click.editify_${this.uid}`, this.documentClick)
		//监听窗口改变
		DapEvent.on(window, `resize.editify_${this.uid}`, this.setVideoHeight)
	},
	methods: {
		//编辑器内部修改值的方法
		internalModify(val) {
			this.isModelChange = true
			this.value = val
			this.$nextTick(() => {
				this.isModelChange = false
			})
		},
		//隐藏工具条
		hideToolbar() {
			this.toolbarOptions.show = false
			this.toolbarOptions.node = null
		},
		//监听滚动隐藏工具条
		handleScroll() {
			const setScroll = el => {
				DapEvent.on(el, `scroll.editify_${this.uid}`, () => {
					if (this.toolbarConfig.use && this.toolbarOptions.show) {
						this.hideToolbar()
					}
				})
				if (el.parentNode) {
					setScroll(el.parentNode)
				}
			}
			setScroll(this.$refs.content)
		},
		//移除上述滚动事件的监听
		removeScrollHandle() {
			const removeScroll = el => {
				DapEvent.off(el, `scroll.editify_${this.uid}`)
				if (el.parentNode) {
					removeScroll(el.parentNode)
				}
			}
			removeScroll(this.$refs.content)
		},
		//工具条显示判断
		handleToolbar() {
			if (this.disabled || this.isSourceView) {
				return
			}
			this.hideToolbar()
			this.$nextTick(() => {
				const table = getCurrentParsedomElement(this, 'table')
				const pre = getCurrentParsedomElement(this, 'pre')
				const link = getCurrentParsedomElement(this, 'a')
				const image = getCurrentParsedomElement(this, 'img')
				const video = getCurrentParsedomElement(this, 'video')
				if (link) {
					this.toolbarOptions.type = 'link'
					this.toolbarOptions.node = `[data-editify-uid="${this.uid}"] [data-editify-element="${link.key}"]`
					if (this.toolbarOptions.show) {
						this.$refs.toolbar.$refs.layer.setPosition()
					} else {
						this.toolbarOptions.show = true
					}
				} else if (image) {
					this.toolbarOptions.type = 'image'
					this.toolbarOptions.node = `[data-editify-uid="${this.uid}"] [data-editify-element="${image.key}"]`
					if (this.toolbarOptions.show) {
						this.$refs.toolbar.$refs.layer.setPosition()
					} else {
						this.toolbarOptions.show = true
					}
				} else if (video) {
					this.toolbarOptions.type = 'video'
					this.toolbarOptions.node = `[data-editify-uid="${this.uid}"] [data-editify-element="${video.key}"]`
					if (this.toolbarOptions.show) {
						this.$refs.toolbar.$refs.layer.setPosition()
					} else {
						this.toolbarOptions.show = true
					}
				} else if (table) {
					this.toolbarOptions.type = 'table'
					this.toolbarOptions.node = `[data-editify-uid="${this.uid}"] [data-editify-element="${table.key}"]`
					if (this.toolbarOptions.show) {
						this.$refs.toolbar.$refs.layer.setPosition()
					} else {
						this.toolbarOptions.show = true
					}
				} else if (pre) {
					this.toolbarOptions.type = 'codeBlock'
					this.toolbarOptions.node = `[data-editify-uid="${this.uid}"] [data-editify-element="${pre.key}"]`
					if (this.toolbarOptions.show) {
						this.$refs.toolbar.$refs.layer.setPosition()
					} else {
						this.toolbarOptions.show = true
					}
				} else {
					const result = this.dataRangeCaches.flatList.filter(item => {
						return item.element.isText()
					})
					if (result.length && !hasTableInRange(this) && !hasPreInRange(this) && !hasLinkInRange(this) && !hasImageInRange(this) && !hasVideoInRange(this)) {
						this.toolbarOptions.type = 'text'
						if (this.toolbarOptions.show) {
							this.$refs.toolbar.$refs.layer.setPosition()
						} else {
							this.toolbarOptions.show = true
						}
					}
				}
			})
		},
		//设定编辑器内的视频高度
		setVideoHeight() {
			this.$refs.content.querySelectorAll('video').forEach(video => {
				video.style.height = video.offsetWidth / this.videoRatio + 'px'
			})
		},
		//初始创建编辑器
		createEditor() {
			//创建编辑器
			this.editor = new AlexEditor(this.$refs.content, {
				value: this.value,
				disabled: this.disabled,
				renderRules: [
					el => {
						parseList(this.editor, el)
					},
					el => {
						orderdListHandle(this.editor, el)
					},
					el => {
						mediaHandle(this.editor, el)
					},
					el => {
						tableHandle(this.editor, el)
					},
					el => {
						preHandle(this.editor, el, this.toolbarConfig?.use && this.toolbarConfig?.codeBlock?.languages?.show, this.toolbarConfig?.codeBlock?.languages.options)
					},
					el => {
						specialInblockHandle(this.editor, el)
					},
					...this.renderRules
				],
				allowCopy: this.allowCopy,
				allowPaste: this.allowPaste,
				allowCut: this.allowCut,
				allowPasteHtml: this.allowPasteHtml,
				allowPasteHtml: this.allowPasteHtml,
				customImagePaste: this.handleCustomImagePaste,
				customVideoPaste: this.handleCustomVideoPaste,
				customMerge: this.handleCustomMerge,
				customParseNode: this.handleCustomParseNode
			})
			//编辑器渲染后会有一个渲染过程，会改变内容，因此重新获取内容的值来设置value
			this.internalModify(this.editor.value)
			//设置监听事件
			this.editor.on('change', this.handleEditorChange)
			this.editor.on('focus', this.handleEditorFocus)
			this.editor.on('blur', this.handleEditorBlur)
			this.editor.on('insertParagraph', this.handleInsertParagraph)
			this.editor.on('rangeUpdate', this.handleRangeUpdate)
			this.editor.on('pasteHtml', this.handlePasteHtml)
			this.editor.on('deleteInStart', this.handleDeleteInStart)
			this.editor.on('deleteComplete', this.handleDeleteComplete)
			this.editor.on('afterRender', this.handleAfterRender)
			//格式化和dom渲染
			this.editor.formatElementStack()
			this.editor.domRender()
			//自动获取焦点
			if (this.autofocus && !this.isSourceView && !this.disabled) {
				this.collapseToEnd()
			}
		},
		//鼠标在页面按下：处理表格拖拽改变列宽和菜单栏是否使用判断
		documentMouseDown(e) {
			if (this.disabled) {
				return
			}
			//鼠标在编辑器内按下
			if (DapElement.isContains(this.$refs.content, e.target)) {
				const elm = e.target
				const key = DapData.get(elm, 'data-alex-editor-key')
				if (key) {
					const element = this.editor.getElementByKey(key)
					if (element && element.parsedom == 'td') {
						const length = element.parent.children.length
						//最后一个td不设置
						if (element.parent.children[length - 1].isEqual(element)) {
							return
						}
						const rect = DapElement.getElementBounding(elm)
						//在可拖拽范围内
						if (e.pageX >= Math.abs(rect.left + elm.offsetWidth - 5) && e.pageX <= Math.abs(rect.left + elm.offsetWidth + 5)) {
							this.tableColumnResizeParams.element = element
							this.tableColumnResizeParams.start = e.pageX
						}
					}
				}
			}
			//如果点击了除编辑器外的地方，菜单栏不可使用
			if (!DapElement.isContains(this.$el, e.target) && !this.isSourceView) {
				this.canUseMenu = false
			}
		},
		//鼠标在页面移动：处理表格拖拽改变列宽
		documentMouseMove(e) {
			if (this.disabled) {
				return
			}
			if (!this.tableColumnResizeParams.element) {
				return
			}
			const table = getCurrentParsedomElement(this, 'table')
			if (!table) {
				return
			}
			const colgroup = table.children.find(item => {
				return item.parsedom == 'colgroup'
			})
			const index = this.tableColumnResizeParams.element.parent.children.findIndex(el => {
				return el.isEqual(this.tableColumnResizeParams.element)
			})
			const width = `${this.tableColumnResizeParams.element.elm.offsetWidth + e.pageX - this.tableColumnResizeParams.start}`
			colgroup.children[index].marks['width'] = width
			colgroup.children[index].elm.setAttribute('width', width)
			this.tableColumnResizeParams.start = e.pageX
		},
		//鼠标在页面松开：处理表格拖拽改变列宽
		documentMouseUp() {
			if (this.disabled) {
				return
			}
			if (!this.tableColumnResizeParams.element) {
				return
			}
			const table = getCurrentParsedomElement(this, 'table')
			if (!table) {
				return
			}
			const colgroup = table.children.find(item => {
				return item.parsedom == 'colgroup'
			})
			const index = this.tableColumnResizeParams.element.parent.children.findIndex(el => {
				return el.isEqual(this.tableColumnResizeParams.element)
			})
			const width = Number(colgroup.children[index].marks['width'])
			if (!isNaN(width)) {
				colgroup.children[index].marks['width'] = `${Number(((width / this.tableColumnResizeParams.element.parent.elm.offsetWidth) * 100).toFixed(2))}%`
				this.editor.formatElementStack()
				this.editor.domRender()
				this.editor.rangeRender()
			}
			this.tableColumnResizeParams.element = null
			this.tableColumnResizeParams.start = 0
		},
		//鼠标点击页面：处理任务列表复选框勾选
		documentClick(e) {
			if (this.disabled) {
				return
			}
			//鼠标在编辑器内点击
			if (DapElement.isContains(this.$refs.content, e.target)) {
				const elm = e.target
				const key = DapData.get(elm, 'data-alex-editor-key')
				if (key) {
					const element = this.editor.getElementByKey(key)
					//如果是任务列表元素
					if (isTask(element)) {
						const rect = DapElement.getElementBounding(elm)
						//在复选框范围内
						if (e.pageX >= Math.abs(rect.left) && e.pageX <= Math.abs(rect.left + 16) && e.pageY >= Math.abs(rect.top + 2) && e.pageY <= Math.abs(rect.top + 18)) {
							//取消勾选
							if (element.marks['data-editify-task'] == 'checked') {
								element.marks['data-editify-task'] = 'uncheck'
							}
							//勾选
							else {
								element.marks['data-editify-task'] = 'checked'
							}
							if (!this.editor.range) {
								this.editor.initRange()
							}
							this.editor.range.anchor.moveToEnd(element)
							this.editor.range.focus.moveToEnd(element)
							this.editor.formatElementStack()
							this.editor.domRender()
							this.editor.rangeRender()
						}
					}
				}
			}
		},
		//自定义图片粘贴
		async handleCustomImagePaste(url) {
			const newUrl = await this.customImagePaste.apply(this, [url])
			if (newUrl) {
				insertImage(this, newUrl)
			}
		},
		//自定义视频粘贴
		async handleCustomVideoPaste(url) {
			const newUrl = await this.customVideoPaste.apply(this, [url])
			if (newUrl) {
				insertVideo(this, newUrl)
			}
		},
		//重新定义编辑器合并元素的逻辑
		handleCustomMerge(ele, preEle) {
			const uneditable = preEle.getUneditableElement()
			if (uneditable) {
				uneditable.toEmpty()
			} else {
				preEle.children.push(...ele.children)
				preEle.children.forEach(item => {
					item.parent = preEle
				})
				ele.children = null
			}
		},
		//针对node转为元素进行额外的处理
		handleCustomParseNode(ele) {
			if (ele.parsedom == 'code') {
				ele.parsedom = 'span'
				const marks = {
					'data-editify-code': true
				}
				if (ele.hasMarks()) {
					Object.assign(ele.marks, marks)
				} else {
					ele.marks = marks
				}
			}
			if (typeof this.customParseNode == 'function') {
				ele = this.customParseNode.apply(this, [ele])
			}
			return ele
		},
		//编辑区域键盘按下：设置缩进快捷键
		handleEditorKeydown(e) {
			if (this.disabled) {
				return
			}
			//增加缩进
			if (e.keyCode == 9 && !e.metaKey && !e.shiftKey && !e.ctrlKey && !e.altKey) {
				e.preventDefault()
				if (!hasTableInRange(this)) {
					setIndentIncrease(this)
					this.editor.formatElementStack()
					this.editor.domRender()
					this.editor.rangeRender()
				}
			}
			//减少缩进
			else if (e.keyCode == 9 && !e.metaKey && e.shiftKey && !e.ctrlKey && !e.altKey) {
				e.preventDefault()
				if (!hasTableInRange(this)) {
					setIndentDecrease(this)
					this.editor.formatElementStack()
					this.editor.domRender()
					this.editor.rangeRender()
				}
			}
			//自定义键盘按下操作
			this.$emit('keydown', e)
		},
		//点击编辑器：处理图片和视频的光标聚集
		handleEditorClick(e) {
			if (this.disabled || this.isSourceView) {
				return
			}
			const node = e.target
			//点击的是图片或者视频
			if (node.nodeName.toLocaleLowerCase() == 'img' || node.nodeName.toLocaleLowerCase() == 'video') {
				const key = Number(node.getAttribute('data-editify-element'))
				if (DapNumber.isNumber(key)) {
					const element = this.editor.getElementByKey(key)
					if (!this.editor.range) {
						this.editor.initRange()
					}
					this.editor.range.anchor.moveToStart(element)
					this.editor.range.focus.moveToEnd(element)
					this.editor.rangeRender()
				}
			}
		},
		//编辑器的值更新
		handleEditorChange(newVal, oldVal) {
			if (this.disabled) {
				return
			}
			//内部修改
			this.internalModify(newVal)
			//触发change事件
			this.$emit('change', newVal, oldVal)
		},
		//编辑器失去焦点
		handleEditorBlur(val) {
			if (this.disabled) {
				return
			}
			if (this.border && this.color && !this.isFullScreen) {
				//恢复编辑区域边框颜色
				this.$refs.body.style.borderColor = ''
				//恢复编辑区域阴影颜色
				this.$refs.body.style.boxShadow = ''
				//使用菜单栏的情况下恢复菜单栏的样式
				if (this.menuConfig.use) {
					this.$refs.menu.$el.style.borderColor = ''
					this.$refs.menu.$el.style.boxShadow = ''
				}
			}
			this.$emit('blur', val)
		},
		//编辑器获取焦点
		handleEditorFocus(val) {
			if (this.disabled) {
				return
			}
			if (this.border && this.color && !this.isFullScreen) {
				//编辑区域边框颜色
				this.$refs.body.style.borderColor = this.color
				//转换颜色值
				const rgb = DapColor.hex2rgb(this.color)
				//菜单栏模式为inner
				if (this.menuConfig.use && this.menuConfig.mode == 'inner') {
					//编辑区域除顶部边框的阴影
					this.$refs.body.style.boxShadow = `0 8px 8px -8px rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5),8px 0 8px -8px rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5), -8px 0 8px -8px rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`
					//菜单栏的边框颜色
					this.$refs.menu.$el.style.borderColor = this.color
					//菜单栏除底部边框的阴影
					this.$refs.menu.$el.style.boxShadow = `0 -8px 8px -8px rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5),8px 0 8px -8px rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5), -8px 0 8px -8px rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`
				}
				//其他菜单栏模式
				else if (this.menuConfig.use) {
					//编辑区域四边阴影
					this.$refs.body.style.boxShadow = `0 0 8px rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`
				}
				//不使用菜单栏
				else {
					//编辑区域四边阴影
					this.$refs.body.style.boxShadow = `0 0 8px rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`
				}
			}
			//获取焦点时可以使用菜单栏
			setTimeout(() => {
				this.canUseMenu = true
				this.$emit('focus', val)
			}, 0)
		},
		//编辑器换行
		handleInsertParagraph(element, previousElement) {
			//前一个块元素如果是只包含换行符的元素，并且当前块元素也是包含换行符的元素，则当前块元素转为段落
			if (previousElement.isOnlyHasBreak() && element.isOnlyHasBreak()) {
				if (previousElement.parsedom != AlexElement.BLOCK_NODE) {
					elementToParagraph(previousElement)
					this.editor.range.anchor.moveToStart(previousElement)
					this.editor.range.focus.moveToStart(previousElement)
					element.toEmpty()
				}
			}
			this.$emit('insertparagraph', this.value)
		},
		//编辑器焦点更新
		handleRangeUpdate() {
			if (this.disabled) {
				return
			}

			//如果没有range禁用菜单栏
			this.canUseMenu = !!this.editor.range

			//没有range直接返回
			if (!this.editor.range) {
				return
			}

			//获取光标选取范围内的元素数据，并且进行缓存
			this.dataRangeCaches = this.editor.getElementsByRange()

			//节流写法
			if (this.rangeUpdateTimer) {
				clearTimeout(this.rangeUpdateTimer)
				this.rangeUpdateTimer = null
			}
			//延时200ms进行判断
			this.rangeUpdateTimer = setTimeout(() => {
				//如果使用工具条或者菜单栏
				if (this.toolbarConfig.use || this.menuConfig.use) {
					//如果使用工具条
					if (this.toolbarConfig.use) {
						this.handleToolbar()
					}
					//如果使用菜单栏
					if (this.menuConfig.use) {
						this.$refs.menu.handleRangeUpdate()
					}
				}
			}, 200)
			this.$emit('rangeupdate')
		},
		//编辑器粘贴html
		handlePasteHtml(elements) {
			const keepStyles = Object.assign(pasteKeepData.styles, this.pasteKeepStyles || {})
			const keepMarks = Object.assign(pasteKeepData.marks, this.pasteKeepMarks || {})
			//粘贴html时过滤元素的样式和属性
			AlexElement.flatElements(elements).forEach(el => {
				let marks = {}
				let styles = {}
				if (el.hasMarks()) {
					for (let key in keepMarks) {
						if (el.marks.hasOwnProperty(key) && ((Array.isArray(keepMarks[key]) && keepMarks[key].includes(el.parsedom)) || keepMarks[key] == '*')) {
							marks[key] = el.marks[key]
						}
					}
					el.marks = marks
				}
				if (el.hasStyles() && !el.isText()) {
					for (let key in keepStyles) {
						if (el.styles.hasOwnProperty(key) && ((Array.isArray(keepStyles[key]) && keepStyles[key].includes(el.parsedom)) || keepStyles[key] == '*')) {
							styles[key] = el.styles[key]
						}
					}
					el.styles = styles
				}
			})
		},
		//编辑器部分删除情景(在编辑器起始处)
		handleDeleteInStart(element) {
			if (element.isBlock()) {
				elementToParagraph(element)
			}
		},
		//编辑器删除完成后事件
		handleDeleteComplete() {
			const uneditable = this.editor.range.anchor.element.getUneditableElement()
			if (uneditable) {
				uneditable.toEmpty()
			}
		},
		//编辑器dom渲染
		handleAfterRender() {
			//设定视频高度
			this.setVideoHeight()

			this.$emit('updateview')
		},

		//api：光标设置到文档底部
		collapseToEnd() {
			if (this.disabled) {
				return
			}
			this.editor.collapseToEnd()
			this.editor.rangeRender()
			DapElement.setScrollTop({
				el: this.$refs.content,
				number: 1000000,
				time: 0
			})
		},
		//api：光标设置到文档头部
		collapseToStart() {
			if (this.disabled) {
				return
			}
			this.editor.collapseToStart()
			this.editor.rangeRender()
			this.$nextTick(() => {
				DapElement.setScrollTop({
					el: this.$refs.content,
					number: 0,
					time: 0
				})
			})
		},
		//api：撤销
		undo() {
			if (this.disabled) {
				return
			}
			const historyRecord = this.editor.history.get(-1)
			if (historyRecord) {
				this.editor.history.current = historyRecord.current
				this.editor.stack = historyRecord.stack
				this.editor.range = historyRecord.range
				this.editor.formatElementStack()
				this.editor.domRender(true)
				this.editor.rangeRender()
			}
		},
		//api：重做
		redo() {
			if (this.disabled) {
				return
			}
			const historyRecord = this.editor.history.get(1)
			if (historyRecord) {
				this.editor.history.current = historyRecord.current
				this.editor.stack = historyRecord.stack
				this.editor.range = historyRecord.range
				this.editor.formatElementStack()
				this.editor.domRender(true)
				this.editor.rangeRender()
			}
		}
	},
	beforeUnmount() {
		//卸载绑定在滚动元素上的事件
		this.removeScrollHandle()
		//卸载绑定在document.documentElement上的事件
		DapEvent.off(document.documentElement, `mousedown.editify_${this.uid} mousemove.editify_${this.uid} mouseup.editify_${this.uid} click.editify_${this.uid}`)
		//卸载绑定在window上的事件
		DapEvent.off(window, `resize.editify_${this.uid}`)
		//销毁编辑器
		this.editor.destroy()
	}
}
</script>
<style lang="less" scoped>
.editify {
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
	width: 100%;
	height: 100%;
	position: relative;
	box-sizing: border-box;
	-webkit-tap-highlight-color: transparent;
	outline: none;
	font-family: 'PingFang SC', 'Helvetica Neue', Helvetica, Roboto, 'Segoe UI', 'Microsoft YaHei', Arial, sans-serif;
	line-height: 1.5;

	*,
	*::before,
	*::after {
		box-sizing: border-box;
		-webkit-tap-highlight-color: transparent;
		outline: none;
	}

	&.fullscreen {
		position: fixed;
		z-index: 1000;
		left: 0;
		top: 0;
		width: 100vw !important;
		height: 100vh !important;
		background: @background;

		.editify-body {
			border-radius: 0;
		}
	}

	&.autoheight {
		height: auto;

		.editify-body {
			height: auto;
			flex: none;
		}
	}
}

.editify-body {
	display: block;
	width: 100%;
	height: 0;
	flex: 1;
	position: relative;
	background-color: @background;
	padding: 1px;
	border-radius: 4px;

	&.border {
		border: 1px solid @border-color;
		transition: all 500ms;

		&.menu_inner {
			border-top: none;
			border-radius: 0 0 4px 4px;
		}
	}

	&.menu_inner {
		padding-top: 21px;

		.editify-source {
			top: 21px;
			height: calc(100% - 21px);
		}
	}

	//编辑器样式
	.editify-content {
		display: block;
		position: relative;
		overflow-x: hidden;
		overflow-y: auto;
		width: 100%;
		height: 100%;
		border-radius: inherit;
		padding: 6px 10px;
		line-height: 1.5;
		color: @font-color-dark;
		font-size: @font-size;
		position: relative;
		line-height: 1.5;

		//显示占位符
		&.placeholder::before {
			position: absolute;
			top: 0;
			left: 0;
			display: block;
			width: 100%;
			content: attr(data-editify-placeholder);
			font-size: inherit;
			font-family: inherit;
			color: @font-color-disabled;
			line-height: inherit;
			padding: 6px 10px;
			cursor: text;
			touch-action: none;
			user-select: none;
		}

		//段落样式和标题
		:deep(p),
		:deep(h1),
		:deep(h2),
		:deep(h3),
		:deep(h4),
		:deep(h5),
		:deep(h6) {
			display: block;
			width: 100%;
			margin: 0 0 15px 0;
			padding: 0;
		}
		:deep(h1) {
			font-size: 32px;
		}
		:deep(h2) {
			font-size: 28px;
		}
		:deep(h3) {
			font-size: 24px;
		}
		:deep(h4) {
			font-size: 20px;
		}
		:deep(h5) {
			font-size: 18px;
		}
		:deep(h6) {
			font-size: 16px;
		}
		//有序列表样式
		:deep(div[data-editify-list='ol']) {
			margin-bottom: 15px;

			&::before {
				content: attr(data-editify-value) '.';
				margin-right: 10px;
			}
		}
		//无序列表样式
		:deep(div[data-editify-list='ul']) {
			margin-bottom: 15px;

			&::before {
				content: '\2022';
				margin-right: 10px;
			}
		}
		//代码样式
		:deep(span[data-editify-code]) {
			display: inline-block;
			padding: 3px 6px;
			margin: 0 4px;
			border-radius: 4px;
			line-height: 1;
			font-family: Consolas, monospace, Monaco, Andale Mono, Ubuntu Mono;
			background-color: @pre-background;
			color: @font-color;
			border: 1px solid @border-color;
			text-indent: initial;
			font-size: @font-size;
			font-weight: normal;
		}
		//链接样式
		:deep(a) {
			color: @font-color-link;
			transition: all 200ms;
			text-decoration: none;
			cursor: text;

			&:hover {
				color: @font-color-link-dark;
				text-decoration: underline;
			}
		}
		//表格样式
		:deep(table) {
			width: 100%;
			border: 1px solid @border-color;
			margin: 0;
			padding: 0;
			border-collapse: collapse;
			margin-bottom: 15px;
			background-color: @background;
			color: @font-color-dark;
			font-size: @font-size;

			* {
				margin: 0 !important;
			}

			tbody {
				margin: 0;
				padding: 0;

				tr {
					margin: 0;
					padding: 0;

					&:first-child {
						background-color: @background-darker;

						td {
							font-weight: bold;
							position: relative;
						}
					}

					td {
						margin: 0;
						border: 1px solid @border-color;
						padding: 6px 10px;
						position: relative;
						word-break: break-word;

						&:not(:last-child)::after {
							position: absolute;
							right: -5px;
							top: 0;
							width: 10px;
							height: 100%;
							content: '';
							z-index: 1;
							cursor: col-resize;
							user-select: none;
						}
					}
				}
			}
		}
		//代码块样式
		:deep(pre) {
			display: block;
			padding: 6px 10px;
			margin: 0 0 15px;
			font-family: Consolas, monospace, Monaco, Andale Mono, Ubuntu Mono;
			line-height: 1.5;
			font-size: @font-size;
			color: @font-color-dark;
			background-color: @pre-background;
			border: 1px solid @border-color;
			border-radius: 4px;
			overflow: auto;
			position: relative;
		}
		//图片样式
		:deep(img) {
			position: relative;
			display: inline-block;
			width: 30%;
			height: auto;
			border-radius: 2px;
			vertical-align: text-bottom;
			margin: 0 2px;
			max-width: 100%;
		}
		//视频样式
		:deep(video) {
			position: relative;
			display: inline-block;
			width: 30%;
			border-radius: 2px;
			vertical-align: text-bottom;
			background-color: #000;
			object-fit: contain;
			margin: 0 2px;
			max-width: 100%;
		}
		//引用样式
		:deep(blockquote) {
			display: block;
			border-left: 8px solid @background-darker;
			padding: 6px 10px 6px 20px;
			margin: 0 0 15px;
			line-height: 1.5;
			font-size: @font-size;
			color: @font-color-light;
			border-radius: 0;
		}
		//任务列表样式
		:deep(div[data-editify-task]) {
			margin-bottom: 15px;
			position: relative;
			padding-left: 26px;
			font-size: @font-size;
			color: @font-color-dark;
			transition: all 200ms;

			&::before {
				display: block;
				width: 16px;
				height: 16px;
				border-radius: 2px;
				border: 2px solid @font-color-light;
				transition: all 200ms;
				box-sizing: border-box;
				user-select: none;
				content: '';
				position: absolute;
				left: 0;
				top: 2px;
				z-index: 1;
				cursor: pointer;
			}

			&::after {
				position: absolute;
				content: '';
				left: 3px;
				top: 6px;
				display: inline-block;
				width: 10px;
				height: 6px;
				border: 2px solid @font-color-light;
				border-top: none;
				border-right: none;
				transform: rotate(-45deg);
				transform-origin: center;
				margin-bottom: 2px;
				box-sizing: border-box;
				z-index: 2;
				cursor: pointer;
				opacity: 0;
				transition: all 200ms;
			}

			&[data-editify-task='checked'] {
				text-decoration: line-through;
				color: @font-color-light;
				&::after {
					opacity: 1;
				}
			}
		}

		//禁用样式
		&.disabled {
			cursor: auto !important;
			&.placeholder::before {
				cursor: auto;
			}
			:deep(a) {
				cursor: pointer;
			}

			:deep(table) {
				td:not(:last-child)::after {
					cursor: auto;
				}
			}
		}
	}

	//代码视图
	.editify-source {
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		background-color: @reverse-background;
		margin: 0;
		padding: 6px 10px;
		overflow-x: hidden;
		overflow-y: auto;
		font-size: @font-size;
		color: @reverse-color;
		font-family: Consolas, Monaco, Andale Mono, Ubuntu Mono, monospace;
		resize: none;
		border: none;
		border-radius: inherit;
		z-index: 1;
	}
}

.editify-footer {
	display: flex;
	justify-content: end;
	align-items: center;
	width: 100%;
	padding: 10px;
	position: relative;

	.editify-footer-words {
		font-size: @font-size;
		color: @font-color-light;
		line-height: 1;
	}

	//全屏模式下并且不是代码视图下，显示一个上边框
	&.fullscreen {
		border-top: 1px solid @border-color;
	}
}
</style>

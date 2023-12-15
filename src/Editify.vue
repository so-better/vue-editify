<template>
	<div class="editify">
		<!-- 菜单区域 -->
		<Menu v-if="menuConfig.use" :config="menuConfig" :disabled="disabled || !canUseMenu" :color="color" ref="menu"></Menu>
		<!-- 编辑层，与编辑区域宽高相同必须适配 -->
		<div ref="body" class="editify-body" :class="{ border: border, menu_inner: menuConfig.use && menuConfig.mode == 'inner' }" :data-editify-uid="uid">
			<!-- 编辑器 -->
			<div ref="content" class="editify-content" :class="{ placeholder: showPlaceholder, disabled: disabled }" :style="contentStyle" @keydown="handleEditorKeydown" @click="handleEditorClick" @compositionstart="isInputChinese = true" @compositionend="isInputChinese = false" :data-editify-placeholder="placeholder"></div>
			<!-- 代码视图 -->
			<textarea v-if="isSourceView" :value="value" readonly class="editify-source" />
			<!-- 工具条 -->
			<Toolbar ref="toolbar" v-model="toolbarOptions.show" :node="toolbarOptions.node" :type="toolbarOptions.type" :config="toolbarConfig"></Toolbar>
		</div>
		<!-- 编辑器尾部 -->
		<div v-if="showWordLength" class="editify-footer">
			<!-- 字数统计 -->
			<div class="editify-footer-words">{{ $editTrans('totalWordCount') }}{{ textValue.length }}</div>
		</div>
	</div>
</template>
<script>
import { getCurrentInstance } from 'vue'
import { AlexEditor, AlexElement } from 'alex-editor'
import Dap from 'dap-util'
import { pasteKeepData, editorProps, parseList, mediaHandle, tableHandle, preHandle, blockToParagraph, blockToList, blockIsList, getButtonOptionsConfig, getToolbarConfig, getMenuConfig, mergeObject, blockIsTask, blockToTask } from './core'
import Toolbar from './components/bussiness/Toolbar'
import Tooltip from './components/base/Tooltip'
import Menu from './components/bussiness/Menu'

export default {
	name: 'editify',
	props: { ...editorProps },
	emits: ['update:modelValue', 'focus', 'blur', 'change', 'keydown', 'insertparagraph', 'rangeupdate', 'copy', 'cut', 'paste-text', 'paste-html', 'paste-image', 'paste-video', 'before-render', 'after-render'],
	setup() {
		const instance = getCurrentInstance()
		return {
			uid: instance.uid
		}
	},
	data() {
		return {
			//编辑器对象
			editor: null,
			//是否编辑器内部修改值
			isModelChange: false,
			//是否代码视图
			isSourceView: false,
			//是否正在输入中文
			isInputChinese: false,
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
			//toolbar显示延时器
			toolbarTime: null,
			//菜单栏是否可以使用标识
			canUseMenu: false
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
			return Dap.element.string2dom(`<div>${this.value}</div>`).innerText
		},
		//是否显示占位符
		showPlaceholder() {
			if (this.editor) {
				const elements = this.editor.parseHtml(this.value)
				if (elements.length == 1 && elements[0].type == 'block' && elements[0].parsedom == AlexElement.BLOCK_NODE && elements[0].isOnlyHasBreak()) {
					return !this.isInputChinese
				}
			}
			return false
		},
		//编辑器样式设置
		contentStyle() {
			return this.autoheight ? { minHeight: this.height } : { height: this.height }
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
		}
	},
	mounted() {
		//创建编辑器
		this.createEditor()
		//监听滚动隐藏工具条
		this.handleScroll()
		//鼠标按下监听
		Dap.event.on(document.documentElement, `mousedown.editify_${this.uid}`, this.documentMouseDown)
		//鼠标移动监听
		Dap.event.on(document.documentElement, `mousemove.editify_${this.uid}`, this.documentMouseMove)
		//鼠标松开监听
		Dap.event.on(document.documentElement, `mouseup.editify_${this.uid}`, this.documentMouseUp)
		//鼠标点击箭头
		Dap.event.on(document.documentElement, `click.editify_${this.uid}`, this.documentClick)
		//监听窗口改变
		Dap.event.on(window, `resize.editify_${this.uid}`, this.setVideoHeight)
	},
	methods: {
		//初始创建编辑器
		createEditor() {
			//创建编辑器
			this.editor = new AlexEditor(this.$refs.content, {
				value: this.value,
				disabled: this.disabled,
				renderRules: [
					parseList,
					mediaHandle,
					tableHandle,
					el => {
						preHandle.apply(this.editor, [el, this.toolbarConfig?.use && this.toolbarConfig?.codeBlock?.languages?.show, this.toolbarConfig?.codeBlock?.languages.options])
					},
					...this.renderRules
				],
				allowCopy: this.allowCopy,
				allowPaste: this.allowPaste,
				allowCut: this.allowCut,
				allowPasteHtml: this.allowPasteHtml,
				allowPasteHtml: this.allowPasteHtml,
				customImagePaste: this.customImagePaste,
				customVideoPaste: this.customVideoPaste,
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
			this.editor.on('copy', this.handleCopy)
			this.editor.on('cut', this.handleCut)
			this.editor.on('pasteText', this.handlePasteText)
			this.editor.on('pasteHtml', this.handlePasteHtml)
			this.editor.on('pasteImage', this.handlePasteImage)
			this.editor.on('pasteVideo', this.handlePasteVideo)
			this.editor.on('deleteInStart', this.handleDeleteInStart)
			this.editor.on('deleteComplete', this.handleDeleteComplete)
			this.editor.on('beforeRender', this.handleBeforeRender)
			this.editor.on('afterRender', this.handleAfterRender)
			//格式化和dom渲染
			this.editor.formatElementStack()
			this.editor.domRender()
			//自动获取焦点
			if (this.autofocus && !this.isSourceView && !this.disabled) {
				this.collapseToEnd()
			}
		},
		//编辑器内部修改值的方法
		internalModify(val) {
			this.isModelChange = true
			this.value = val
			this.$nextTick(() => {
				this.isModelChange = false
			})
		},
		//监听滚动隐藏工具条
		handleScroll() {
			const setScroll = el => {
				Dap.event.on(el, `scroll.editify_${this.uid}`, () => {
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
				Dap.event.off(el, `scroll.editify_${this.uid}`)
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
			if (this.toolbarTime) {
				clearTimeout(this.toolbarTime)
			}
			this.toolbarTime = setTimeout(() => {
				this.hideToolbar()
				this.$nextTick(() => {
					const table = this.getCurrentParsedomElement('table')
					const pre = this.getCurrentParsedomElement('pre')
					const link = this.getCurrentParsedomElement('a')
					const image = this.getCurrentParsedomElement('img')
					const video = this.getCurrentParsedomElement('video')
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
						const result = this.editor.getElementsByRange(true, true).filter(item => {
							return item.element.isText()
						})
						if (result.length && !this.hasTable() && !this.hasPreStyle() && !this.hasLink() && !this.hasImage() && !this.hasVideo()) {
							this.toolbarOptions.type = 'text'
							if (this.toolbarOptions.show) {
								this.$refs.toolbar.$refs.layer.setPosition()
							} else {
								this.toolbarOptions.show = true
							}
						}
					}
				})
			}, 200)
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
		//隐藏工具条
		hideToolbar() {
			this.toolbarOptions.show = false
			this.toolbarOptions.node = null
		},
		//鼠标在页面按下：处理表格拖拽改变列宽和菜单栏是否使用判断
		documentMouseDown(e) {
			if (this.disabled) {
				return
			}
			//鼠标在编辑器内按下
			if (Dap.element.isContains(this.$refs.content, e.target)) {
				const elm = e.target
				const key = Dap.data.get(elm, 'data-alex-editor-key')
				if (key) {
					const element = this.editor.getElementByKey(key)
					if (element && element.parsedom == 'td') {
						const length = element.parent.children.length
						//最后一个td不设置
						if (element.parent.children[length - 1].isEqual(element)) {
							return
						}
						const rect = Dap.element.getElementBounding(elm)
						//在可拖拽范围内
						if (e.pageX >= Math.abs(rect.left + elm.offsetWidth - 5) && e.pageX <= Math.abs(rect.left + elm.offsetWidth + 5)) {
							this.tableColumnResizeParams.element = element
							this.tableColumnResizeParams.start = e.pageX
						}
					}
				}
			}
			//如果点击了除编辑器外的地方，菜单栏不可使用
			if (!Dap.element.isContains(this.$el, e.target)) {
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
			const table = this.getCurrentParsedomElement('table')
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
		documentMouseUp(e) {
			if (this.disabled) {
				return
			}
			if (!this.tableColumnResizeParams.element) {
				return
			}
			const table = this.getCurrentParsedomElement('table')
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
			//鼠标在编辑器内按下
			if (Dap.element.isContains(this.$refs.content, e.target)) {
				const elm = e.target
				const key = Dap.data.get(elm, 'data-alex-editor-key')
				if (key) {
					const element = this.editor.getElementByKey(key)
					//如果是任务列表元素
					if (blockIsTask(element)) {
						const rect = Dap.element.getElementBounding(elm)
						//在复选框范围内
						if (e.pageX >= Math.abs(rect.left) && e.pageX <= Math.abs(rect.left + 16) && e.pageY >= Math.abs(rect.top + elm.offsetHeight / 2 - 8) && e.pageY <= Math.abs(rect.top + elm.offsetHeight / 2 + 8)) {
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
			if (this.border && this.color) {
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
			if (this.border && this.color) {
				//编辑区域边框颜色
				this.$refs.body.style.borderColor = this.color
				//转换颜色值
				const rgb = Dap.color.hex2rgb(this.color)
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
			}, 0)
			this.$emit('focus', val)
		},
		//编辑区域键盘按下
		handleEditorKeydown(e) {
			if (this.disabled) {
				return
			}
			//增加缩进
			if (e.keyCode == 9 && !e.metaKey && !e.shiftKey && !e.ctrlKey && !e.altKey) {
				e.preventDefault()
				this.setIndentIncrease()
			}
			//减少缩进
			else if (e.keyCode == 9 && !e.metaKey && e.shiftKey && !e.ctrlKey && !e.altKey) {
				e.preventDefault()
				this.setIndentDecrease()
			}
			//自定义键盘按下操作
			this.$emit('keydown', e)
		},
		//点击编辑器
		handleEditorClick(e) {
			if (this.disabled || this.isSourceView) {
				return
			}
			const node = e.target
			//点击的是图片或者视频
			if (node.nodeName.toLocaleLowerCase() == 'img' || node.nodeName.toLocaleLowerCase() == 'video') {
				const key = node.getAttribute('data-editify-element')
				if (key) {
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
		//编辑器换行
		handleInsertParagraph(element, previousElement) {
			//前一个块元素如果是只包含换行符的元素，并且当前块元素也是包含换行符的元素，则当前块元素转为段落
			if (previousElement.isOnlyHasBreak() && element.isOnlyHasBreak()) {
				if (!previousElement.isBlock()) {
					previousElement.convertToBlock()
				}
				if (previousElement.parsedom != AlexElement.BLOCK_NODE) {
					blockToParagraph(previousElement)
					this.editor.range.anchor.moveToStart(previousElement)
					this.editor.range.focus.moveToStart(previousElement)
					element.toEmpty()
				}
			}
			this.$emit('insertparagraph', this.value)
		},
		//编辑器焦点更新
		handleRangeUpdate(range) {
			if (this.disabled) {
				return
			}
			if (this.toolbarConfig.use) {
				this.handleToolbar()
			}
			if (this.menuConfig.use) {
				this.$refs.menu.handleRangeUpdate()
			}
			this.$emit('rangeupdate', this.value, range)
		},
		//编辑器复制
		handleCopy(text, html) {
			this.$emit('copy', text, html)
		},
		//编辑器剪切
		handleCut(text, html) {
			this.$emit('cut', text, html)
		},
		//编辑器粘贴纯文本
		handlePasteText(data) {
			this.$emit('paste-text', data)
		},
		//编辑器粘贴html
		handlePasteHtml(elements, data) {
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
			this.$emit('paste-html', elements)
		},
		//编辑器粘贴图片
		handlePasteImage(url) {
			this.$emit('paste-image', url)
		},
		//编辑器粘贴视频
		handlePasteVideo(url) {
			this.$emit('paste-video', url)
		},
		//编辑器部分删除情景
		handleDeleteInStart(element) {
			if (element.isBlock()) {
				blockToParagraph(element)
			}
		},
		//编辑器删除完成后事件
		handleDeleteComplete() {
			const uneditable = this.editor.range.anchor.element.getUneditableElement()
			if (uneditable) {
				uneditable.toEmpty()
			}
		},
		//编辑器dom渲染之前
		handleBeforeRender() {
			this.$emit('before-render')
		},
		//编辑器dom渲染
		handleAfterRender() {
			//设定视频高度
			this.setVideoHeight()
			//触发事件
			this.$emit('after-render')
		},
		//设定视频高度
		setVideoHeight() {
			this.$refs.content.querySelectorAll('video').forEach(video => {
				video.style.height = video.offsetWidth / this.videoRatio + 'px'
			})
		},

		//api：光标设置到文档底部
		collapseToEnd() {
			if (this.disabled) {
				return
			}
			this.editor.collapseToEnd()
			this.editor.rangeRender()
			Dap.element.setScrollTop({
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
				Dap.element.setScrollTop({
					el: this.$refs.content,
					number: 0,
					time: 0
				})
			})
		},
		//api：获取某个元素是否在某个标签元素下，如果是返回该标签元素，否则返回null
		getParsedomElementByElement(element, parsedom) {
			if (element.isBlock()) {
				return element.parsedom == parsedom ? element : null
			}
			if (!element.isText() && element.parsedom == parsedom) {
				return element
			}
			return this.getParsedomElementByElement(element.parent, parsedom)
		},
		//api：获取光标是否在指定标签元素下，如果是返回该标签元素，否则返回null
		getCurrentParsedomElement(parsedom) {
			if (this.disabled) {
				return null
			}
			if (!this.editor.range) {
				return null
			}
			if (this.editor.range.anchor.element.isEqual(this.editor.range.focus.element)) {
				return this.getParsedomElementByElement(this.editor.range.anchor.element, parsedom)
			}
			const arr = this.editor.getElementsByRange(true, false).map(item => {
				return this.getParsedomElementByElement(item.element, parsedom)
			})
			let hasNull = arr.some(el => {
				return el == null
			})
			//如果存在null，则表示有的选区元素不在指定标签下，返回null
			if (hasNull) {
				return null
			}
			//如果只有一个元素，则返回该元素
			if (arr.length == 1) {
				return arr[0]
			}
			//默认数组中的元素都相等
			let flag = true
			for (let i = 1; i < arr.length; i++) {
				if (!arr[i].isEqual(arr[0])) {
					flag = false
					break
				}
			}
			//如果相等，则返回该元素
			if (flag) {
				return arr[0]
			}
			return null
		},
		//api：删除光标所在的指定标签元素
		deleteByParsedom(parsedom) {
			if (this.disabled) {
				return
			}
			if (!this.editor.range) {
				return
			}
			const element = this.getCurrentParsedomElement(parsedom)
			if (element) {
				element.toEmpty()
				this.editor.formatElementStack()
				this.editor.domRender()
				this.editor.rangeRender()
			}
		},
		//api：当光标在链接上时可以移除链接
		removeLink() {
			if (this.disabled) {
				return
			}
			if (!this.editor.range) {
				return
			}
			const link = this.getCurrentParsedomElement('a')
			if (link) {
				link.parsedom = AlexElement.TEXT_NODE
				delete link.marks.target
				delete link.marks.href
				this.editor.formatElementStack()
				this.editor.domRender()
				this.editor.rangeRender()
			}
		},
		//api：设置标题
		setHeading(parsedom) {
			if (this.disabled) {
				return
			}
			if (!this.editor.range) {
				return
			}
			const values = getButtonOptionsConfig(this.$editTrans, this.$editLocale).heading.map(item => {
				return item.value
			})
			if (!values.includes(parsedom)) {
				throw new Error('The parameter supports only h1-h6 and p')
			}
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				const block = this.editor.range.anchor.element.getBlock()
				//先转为段落
				blockToParagraph(block)
				//设置标题
				block.parsedom = parsedom
			} else {
				const result = this.editor.getElementsByRange(true, false)
				result.forEach(el => {
					if (el.element.isBlock()) {
						blockToParagraph(el.element)
						el.element.parsedom = parsedom
					} else {
						const block = el.element.getBlock()
						blockToParagraph(block)
						block.parsedom = parsedom
					}
				})
			}
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：插入有序列表 ordered为true表示有序列表
		setList(ordered) {
			if (this.disabled) {
				return
			}
			if (!this.editor.range) {
				return
			}
			//起点和终点在一起
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				const block = this.editor.range.anchor.element.getBlock()
				const isList = blockIsList(block, ordered)
				if (isList) {
					blockToParagraph(block)
				} else {
					blockToList(block, ordered)
				}
			}
			//起点和终点不在一起
			else {
				let blocks = []
				const result = this.editor.getElementsByRange(true, false)
				result.forEach(item => {
					const block = item.element.getBlock()
					const exist = blocks.some(el => block.isEqual(el))
					if (!exist) {
						blocks.push(block)
					}
				})
				blocks.forEach(block => {
					const isList = blockIsList(block, ordered)
					if (isList) {
						blockToParagraph(block)
					} else {
						blockToList(block, ordered)
					}
				})
			}
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：插入任务列表
		setTask() {
			if (this.disabled) {
				return
			}
			if (!this.editor.range) {
				return
			}
			//起点和终点在一起
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				const block = this.editor.range.anchor.element.getBlock()
				const isTask = blockIsTask(block)
				if (isTask) {
					blockToParagraph(block)
				} else {
					blockToTask(block)
				}
			}
			//起点和终点不在一起
			else {
				let blocks = []
				const result = this.editor.getElementsByRange(true, false)
				result.forEach(item => {
					const block = item.element.getBlock()
					const exist = blocks.some(el => block.isEqual(el))
					if (!exist) {
						blocks.push(block)
					}
				})
				blocks.forEach(block => {
					const isTask = blockIsTask(block)
					if (isTask) {
						blockToParagraph(block)
					} else {
						blockToTask(block)
					}
				})
			}
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：设置样式
		setTextStyle(name, value) {
			if (this.disabled) {
				return
			}
			if (!this.editor.range) {
				return
			}
			const active = this.queryTextStyle(name, value)
			if (active) {
				this.editor.removeTextStyle([name])
			} else {
				let styles = {}
				styles[name] = value
				this.editor.setTextStyle(styles)
			}
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：查询是否具有某个样式
		queryTextStyle(name, value, useCache) {
			return this.editor.queryTextStyle(name, value, useCache)
		},
		//api：设置标记
		setTextMark(name, value) {
			if (this.disabled) {
				return
			}
			if (!this.editor.range) {
				return
			}
			const active = this.queryTextMark(name, value)
			if (active) {
				this.editor.removeTextMark([name])
			} else {
				let marks = {}
				marks[name] = value
				this.editor.setTextMark(marks)
			}
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：查询是否具有某个标记
		queryTextMark(name, value, useCache) {
			return this.editor.queryTextMark(name, value, useCache)
		},
		//api：清除文本样式和标记
		formatText() {
			if (this.disabled) {
				return
			}
			if (!this.editor.range) {
				return
			}
			this.editor.removeTextStyle()
			this.editor.removeTextMark()
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：设置对齐方式,参数取值justify/left/right/center
		setAlign(value) {
			if (this.disabled) {
				return
			}
			if (!this.editor.range) {
				return
			}
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				const block = this.editor.range.anchor.element.getBlock()
				const inblock = this.editor.range.anchor.element.getInblock()
				if (inblock) {
					if (inblock.hasStyles()) {
						inblock.styles['text-align'] = value
					} else {
						inblock.styles = {
							'text-align': value
						}
					}
				} else {
					if (block.hasStyles()) {
						block.styles['text-align'] = value
					} else {
						block.styles = {
							'text-align': value
						}
					}
				}
			} else {
				const result = this.editor.getElementsByRange(true, false)
				result.forEach(el => {
					if (el.element.isBlock() || el.element.isInblock()) {
						if (el.element.hasStyles()) {
							el.element.styles['text-align'] = value
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
								inblock.styles['text-align'] = value
							} else {
								inblock.styles = {
									'text-align': value
								}
							}
						} else {
							if (block.hasStyles()) {
								block.styles['text-align'] = value
							} else {
								block.styles = {
									'text-align': value
								}
							}
						}
					}
				})
			}
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
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
		},
		//api：插入引用
		setQuote() {
			if (this.disabled) {
				return
			}
			if (!this.editor.range) {
				return
			}
			//起点和终点在一起
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				const block = this.editor.range.anchor.element.getBlock()
				const oldParsedom = block.parsedom
				blockToParagraph(block)
				if (oldParsedom != 'blockquote') {
					block.parsedom = 'blockquote'
				}
			}
			//起点和终点不在一起
			else {
				let blocks = []
				const result = this.editor.getElementsByRange(true, false)
				result.forEach(item => {
					const block = item.element.getBlock()
					const exist = blocks.some(el => block.isEqual(el))
					if (!exist) {
						blocks.push(block)
					}
				})
				blocks.forEach(block => {
					const oldParsedom = block.parsedom
					blockToParagraph(block)
					if (oldParsedom != 'blockquote') {
						block.parsedom = 'blockquote'
					}
				})
			}
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：设置行高
		setLineHeight(value) {
			if (this.disabled) {
				return
			}
			if (!this.editor.range) {
				return
			}
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				const block = this.editor.range.anchor.element.getBlock()
				const inblock = this.editor.range.anchor.element.getInblock()
				if (inblock) {
					if (inblock.hasStyles()) {
						inblock.styles['line-height'] = value
					} else {
						inblock.styles = {
							'line-height': value
						}
					}
				} else {
					if (block.hasStyles()) {
						block.styles['line-height'] = value
					} else {
						block.styles = {
							'line-height': value
						}
					}
				}
			} else {
				const result = this.editor.getElementsByRange(true, false)
				result.forEach(el => {
					if (el.element.isBlock() || el.element.isInblock()) {
						if (el.element.hasStyles()) {
							el.element.styles['line-height'] = value
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
								inblock.styles['line-height'] = value
							} else {
								inblock.styles = {
									'line-height': value
								}
							}
						} else {
							if (block.hasStyles()) {
								block.styles['line-height'] = value
							} else {
								block.styles = {
									'line-height': value
								}
							}
						}
					}
				})
			}
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：增加缩进
		setIndentIncrease() {
			if (this.disabled) {
				return
			}
			if (!this.editor.range) {
				return
			}
			const fn = element => {
				if (element.hasStyles()) {
					if (element.styles.hasOwnProperty('text-indent')) {
						let val = element.styles['text-indent']
						if (val.endsWith('em')) {
							val = parseFloat(val)
						} else {
							val = 0
						}
						element.styles['text-indent'] = `${val + 2}em`
					} else {
						element.styles['text-indent'] = '2em'
					}
				} else {
					element.styles = {
						'text-indent': '2em'
					}
				}
			}
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				const block = this.editor.range.anchor.element.getBlock()
				const inblock = this.editor.range.anchor.element.getInblock()
				if (inblock && inblock.behavior == 'block' && !inblock.isPreStyle()) {
					fn(inblock)
				} else if (!block.isPreStyle()) {
					fn(block)
				}
			} else {
				const result = this.editor.getElementsByRange(true, false)
				result.forEach(item => {
					const block = item.element.getBlock()
					const inblock = item.element.getInblock()
					if (inblock && inblock.behavior == 'block' && !inblock.isPreStyle()) {
						fn(inblock)
					} else if (!block.isPreStyle()) {
						fn(block)
					}
				})
			}
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：减少缩进
		setIndentDecrease() {
			if (this.disabled) {
				return
			}
			if (!this.editor.range) {
				return
			}
			const fn = element => {
				if (element.hasStyles() && element.styles.hasOwnProperty('text-indent')) {
					let val = element.styles['text-indent']
					if (val.endsWith('em')) {
						val = parseFloat(val)
					} else {
						val = 0
					}
					element.styles['text-indent'] = `${val - 2 >= 0 ? val - 2 : 0}em`
				}
			}
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				const block = this.editor.range.anchor.element.getBlock()
				const inblock = this.editor.range.anchor.element.getInblock()
				if (inblock && inblock.behavior == 'block' && !inblock.isPreStyle()) {
					fn(inblock)
				} else if (!block.isPreStyle()) {
					fn(block)
				}
			} else {
				const result = this.editor.getElementsByRange(true, false)
				result.forEach(item => {
					const block = item.element.getBlock()
					const inblock = item.element.getInblock()
					if (inblock && inblock.behavior == 'block' && !inblock.isPreStyle()) {
						fn(inblock)
					} else if (!block.isPreStyle()) {
						fn(block)
					}
				})
			}
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：插入图片
		insertImage(url, isRender = true) {
			if (this.disabled) {
				return
			}
			if (!this.editor.range) {
				return
			}
			if (!url || typeof url != 'string') {
				throw new Error('An image address must be given')
			}
			const image = new AlexElement(
				'closed',
				'img',
				{
					src: url
				},
				null,
				null
			)
			this.editor.insertElement(image)
			if (isRender) {
				this.editor.formatElementStack()
				this.editor.domRender()
				this.editor.rangeRender()
			}
		},
		//api：插入视频
		insertVideo(url, isRender = true) {
			if (this.disabled) {
				return
			}
			if (!this.editor.range) {
				return
			}
			if (!url || typeof url != 'string') {
				throw new Error('A video address must be given')
			}
			const video = new AlexElement(
				'closed',
				'video',
				{
					src: url
				},
				null,
				null
			)
			this.editor.insertElement(video)
			const leftSpace = AlexElement.getSpaceElement()
			const rightSpace = AlexElement.getSpaceElement()
			this.editor.addElementAfter(rightSpace, video)
			this.editor.addElementBefore(leftSpace, video)
			this.editor.range.anchor.moveToEnd(rightSpace)
			this.editor.range.focus.moveToEnd(rightSpace)
			if (isRender) {
				this.editor.formatElementStack()
				this.editor.domRender()
				this.editor.rangeRender()
			}
		},
		//api：选区是否含有代码块样式
		hasPreStyle() {
			if (!this.editor.range) {
				return false
			}
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				return this.editor.range.anchor.element.isPreStyle()
			}
			const result = this.editor.getElementsByRange(true, false)
			return result.some(item => {
				return item.element.isPreStyle()
			})
		},
		//api：选区是否含有引用
		hasQuote() {
			if (!this.editor.range) {
				return false
			}
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				const block = this.editor.range.anchor.element.getBlock()
				return block.parsedom == 'blockquote'
			}
			const result = this.editor.getElementsByRange(true, false)
			return result.some(item => {
				if (item.element.isBlock()) {
					return item.element.parsedom == 'blockquote'
				} else {
					const block = item.element.getBlock()
					return block.parsedom == 'blockquote'
				}
			})
		},
		//api：选区是否含有列表
		hasList(ordered = false) {
			if (!this.editor.range) {
				return false
			}
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				const block = this.editor.range.anchor.element.getBlock()
				return blockIsList(block, ordered)
			}
			const result = this.editor.getElementsByRange(true, false)
			return result.some(item => {
				if (item.element.isBlock()) {
					return blockIsList(item.element, ordered)
				} else {
					const block = item.element.getBlock()
					return blockIsList(block, ordered)
				}
			})
		},
		//api：选区是否含有链接
		hasLink() {
			if (!this.editor.range) {
				return false
			}
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				return !!this.getParsedomElementByElement(this.editor.range.anchor.element, 'a')
			}
			const result = this.editor.getElementsByRange(true, true).filter(item => {
				return item.element.isText()
			})
			return result.some(item => {
				return !!this.getParsedomElementByElement(item.element, 'a')
			})
		},
		//api：选区是否含有表格
		hasTable() {
			if (!this.editor.range) {
				return false
			}
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				const block = this.editor.range.anchor.element.getBlock()
				return block.parsedom == 'table'
			}
			const result = this.editor.getElementsByRange(true, false)
			return result.some(item => {
				if (item.element.isBlock()) {
					return item.element.parsedom == 'table'
				} else {
					const block = item.element.getBlock()
					return block.parsedom == 'table'
				}
			})
		},
		//api：选区是否含有任务列表
		hasTask() {
			if (!this.editor.range) {
				return false
			}
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				const block = this.editor.range.anchor.element.getBlock()
				return blockIsTask(block)
			}
			const result = this.editor.getElementsByRange(true, false)
			return result.some(item => {
				if (item.element.isBlock()) {
					return blockIsTask(item.element)
				} else {
					const block = item.element.getBlock()
					return blockIsTask(block)
				}
			})
		},
		//选区是否含有图片
		hasImage() {
			if (!this.editor.range) {
				return false
			}
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				return this.editor.range.anchor.element.isClosed() && this.editor.range.anchor.element.parsedom == 'img'
			}
			const result = this.editor.getElementsByRange(true, true)
			return result.some(item => {
				return item.element.isClosed() && item.element.parsedom == 'img'
			})
		},
		//选区是否含有视频
		hasVideo() {
			if (!this.editor.range) {
				return false
			}
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				return this.editor.range.anchor.element.isClosed() && this.editor.range.anchor.element.parsedom == 'video'
			}
			const result = this.editor.getElementsByRange(true, true)
			return result.some(item => {
				return item.element.isClosed() && item.element.parsedom == 'video'
			})
		},
		//api：选区是否全部在引用内
		inQuote() {
			if (!this.editor.range) {
				return false
			}
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				const block = this.editor.range.anchor.element.getBlock()
				return block.parsedom == 'blockquote'
			}
			const result = this.editor.getElementsByRange(true, false)
			return result.every(item => {
				if (item.element.isBlock()) {
					return item.element.parsedom == 'blockquote'
				} else {
					const block = item.element.getBlock()
					return block.parsedom == 'blockquote'
				}
			})
		},
		//api：选区是否全部在列表内
		inList(ordered = false) {
			if (!this.editor.range) {
				return false
			}
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				const block = this.editor.range.anchor.element.getBlock()
				return blockIsList(block, ordered)
			}
			const result = this.editor.getElementsByRange(true, false)
			return result.every(item => {
				if (item.element.isBlock()) {
					return blockIsList(item.element, ordered)
				} else {
					const block = item.element.getBlock()
					return blockIsList(block, ordered)
				}
			})
		},
		//api：选区是否全部在任务列表里
		inTask() {
			if (!this.editor.range) {
				return false
			}
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				const block = this.editor.range.anchor.element.getBlock()
				return blockIsTask(block)
			}
			const result = this.editor.getElementsByRange(true, false)
			return result.every(item => {
				if (item.element.isBlock()) {
					return blockIsTask(item.element)
				} else {
					const block = item.element.getBlock()
					return blockIsTask(block)
				}
			})
		},
		//api：创建一个空的表格
		insertTable(rowLength, colLength) {
			if (this.disabled) {
				return
			}
			if (!this.editor.range) {
				return
			}
			const table = new AlexElement('block', 'table', null, null, null)
			const tbody = new AlexElement('inblock', 'tbody', null, null, null)
			this.editor.addElementTo(tbody, table)
			for (let i = 0; i < rowLength; i++) {
				const row = new AlexElement('inblock', 'tr', null, null, null)
				for (let j = 0; j < colLength; j++) {
					const column = new AlexElement('inblock', 'td', null, null, null)
					const breakEl = new AlexElement('closed', 'br', null, null, null)
					this.editor.addElementTo(breakEl, column)
					this.editor.addElementTo(column, row)
				}
				this.editor.addElementTo(row, tbody)
			}
			this.editor.insertElement(table)
			//在表格后创建一个段落
			const paragraph = new AlexElement('block', AlexElement.BLOCK_NODE, null, null, null)
			const breakEl = new AlexElement('closed', 'br', null, null, null)
			this.editor.addElementTo(breakEl, paragraph)
			this.editor.addElementAfter(paragraph, table)
			this.editor.formatElementStack()
			this.editor.range.anchor.moveToStart(tbody)
			this.editor.range.focus.moveToStart(tbody)
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：插入代码块
		insertCodeBlock() {
			if (this.disabled) {
				return
			}
			if (!this.editor.range) {
				return
			}
			const pre = this.getCurrentParsedomElement('pre')
			if (pre) {
				let content = ''
				AlexElement.flatElements(pre.children)
					.filter(item => {
						return item.isText()
					})
					.forEach(item => {
						content += item.textContent
					})
				const splits = content.split('\n')
				splits.forEach(item => {
					const paragraph = new AlexElement('block', AlexElement.BLOCK_NODE, null, null, null)
					const text = new AlexElement('text', null, null, null, item)
					this.editor.addElementTo(text, paragraph)
					this.editor.addElementBefore(paragraph, pre)
				})
				pre.toEmpty()
			} else {
				//起点和终点在一起
				if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
					const block = this.editor.range.anchor.element.getBlock()
					blockToParagraph(block)
					block.parsedom = 'pre'
					const paragraph = new AlexElement('block', AlexElement.BLOCK_NODE, null, null, null)
					const breakEl = new AlexElement('closed', 'br', null, null, null)
					this.editor.addElementTo(breakEl, paragraph)
					this.editor.addElementAfter(paragraph, block)
				}
				//起点和终点不在一起
				else {
					let result = this.editor.getElementsByRange(true, false)
					this.editor.range.anchor.moveToStart(result[0].element.getBlock())
					this.editor.range.focus.moveToEnd(result[result.length - 1].element.getBlock())
					const res = this.editor.getElementsByRange(true, true).filter(el => el.element.isText())
					const obj = {}
					res.forEach(el => {
						if (obj[el.element.getBlock().key]) {
							obj[el.element.getBlock().key].push(el.element.clone())
						} else {
							obj[el.element.getBlock().key] = [el.element.clone()]
						}
					})
					const pre = new AlexElement('block', 'pre', null, null, null)
					Object.keys(obj).forEach((key, index) => {
						if (index > 0) {
							const text = new AlexElement('text', null, null, null, '\n')
							if (pre.hasChildren()) {
								this.editor.addElementTo(text, pre, pre.children.length)
							} else {
								this.editor.addElementTo(text, pre)
							}
						}
						obj[key].forEach(el => {
							if (pre.hasChildren()) {
								this.editor.addElementTo(el, pre, pre.children.length)
							} else {
								this.editor.addElementTo(el, pre)
							}
						})
					})
					this.editor.delete()
					this.editor.insertElement(pre)
					const paragraph = new AlexElement('block', AlexElement.BLOCK_NODE, null, null, null)
					const breakEl = new AlexElement('closed', 'br', null, null, null)
					this.editor.addElementTo(breakEl, paragraph)
					this.editor.addElementAfter(paragraph, pre)
				}
			}
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：插入文本
		insertText(text) {
			if (this.disabled) {
				return
			}
			if (!this.editor.range) {
				return
			}
			this.editor.insertText(text)
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：插入html
		insertHtml(html) {
			if (this.disabled) {
				return
			}
			if (!this.editor.range) {
				return
			}
			const elements = this.editor.parseHtml(html)
			for (let i = 0; i < elements.length; i++) {
				this.editor.insertElement(elements[i], false)
			}
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		}
	},
	beforeUnmount() {
		//卸载绑定在滚动元素上的事件
		this.removeScrollHandle()
		//卸载绑定在document.documentElement上的事件
		Dap.event.off(document.documentElement, `mousedown.editify_${this.uid} mousemove.editify_${this.uid} mouseup.editify_${this.uid} click.editify_${this.uid}`)
		//卸载绑定在window上的事件
		Dap.event.off(window, `resize.editify_${this.uid}`)
		//销毁编辑器
		this.editor.destroy()
	}
}
</script>
<style lang="less" scoped>
.editify {
	display: block;
	width: 100%;
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
}

.editify-body {
	display: block;
	width: 100%;
	position: relative;
	background-color: @background;
	padding: 1px;
	z-index: 3;

	&.border {
		border: 1px solid @border-color;
		border-radius: 4px;
		transition: all 500ms;

		&.menu_inner {
			border-radius: 0 0 4px 4px;
			border-top: none;
			padding-top: 21px;

			.editify-source {
				top: 21px;
				border-radius: 0 0 4px 4px;
				height: calc(100% - 21px);
			}
		}
	}

	//编辑器样式
	.editify-content {
		display: block;
		position: relative;
		overflow-x: hidden;
		overflow-y: auto;
		width: 100%;
		border-radius: inherit;
		padding: 6px 10px;
		line-height: 1.5;
		color: @font-color-dark;
		font-size: @font-size;
		position: relative;
		z-index: 3;
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
				top: 50%;
				transform: translateY(-50%);
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
		z-index: 5;
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
	}
}

.editify-footer {
	display: flex;
	justify-content: end;
	align-items: center;
	width: 100%;
	padding: 10px;
	position: relative;
	z-index: 3;

	.editify-footer-words {
		font-size: @font-size;
		color: @font-color-light;
		line-height: 1;
	}
}
</style>

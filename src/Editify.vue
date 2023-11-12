<template>
	<div class="editify">
		<!-- 编辑层，与编辑区域宽高相同必须适配 -->
		<div class="editify-wrap" :data-editify-uid="uid">
			<!-- 编辑器 -->
			<div ref="editArea" class="editify-el" :class="{ border: border, placeholder: showPlaceholder, disabled: disabled }" :style="editAreaStyle" @keydown="handleEditorKeydown" @click="handleEditorClick" @compositionstart="isInputChinese = true" @compositionend="isInputChinese = false" :data-editify-placeholder="placeholder"></div>
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
import { pasteKeepData, editorProps, parseList, parseCode, mediaHandle, tableHandle, preHandle, blockToParagraph, blockToList, blockIsList, getMenuConfig, getToolbarConfig, mergeObject } from './core'
import Toolbar from './components/Toolbar'
import Tooltip from './components/Tooltip'

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
			//工具条属性
			toolbarOptions: {
				//是否显示工具条
				show: false,
				//关联元素
				node: null,
				//类型
				type: 'text'
			},
			//toolbar显示延时器
			toolbarTime: null
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
		editAreaStyle() {
			return this.autoheight ? { minHeight: this.height } : { height: this.height }
		},
		//工具条外部配置详情
		toolbarConfig() {
			return mergeObject(getToolbarConfig(this.$editTrans), this.toolbar || {})
		}
	},
	components: {
		Toolbar,
		Tooltip
	},
	inject: ['$editTrans'],
	watch: {
		//监听编辑的值变更
		value(newVal) {
			//内部修改不处理
			if (this.isModelChange) {
				return
			}
			//如果是外部修改，需要重新渲染编辑器
			this.editor.stack = this.editor.parseHtml(newVal)
			this.editor.formatElementStack()
			this.editor.range.anchor.moveToStart(this.editor.stack[0])
			this.editor.range.focus.moveToStart(this.editor.stack[0])
			this.editor.domRender()
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
		//监听窗口改变
		Dap.event.on(window, `resize.editify_${this.uid}`, this.setVideoHeight)
	},
	methods: {
		//初始创建编辑器
		createEditor() {
			//创建编辑器
			this.editor = new AlexEditor(this.$refs.editArea, {
				value: this.value,
				disabled: this.disabled,
				renderRules: [
					parseList,
					parseCode,
					mediaHandle,
					tableHandle,
					el => {
						preHandle.apply(this.editor, [el, this.toolbarConfig?.use && this.toolbarConfig?.codeBlock?.languages?.show, this.toolbarConfig?.codeBlock?.languages.options])
					}
				],
				allowCopy: this.allowCopy,
				allowPaste: this.allowPaste,
				allowCut: this.allowCut,
				allowPasteHtml: this.allowPasteHtml,
				allowPasteHtml: this.allowPasteHtml,
				customImagePaste: this.customImagePaste,
				customVideoPaste: this.customVideoPaste
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
			this.editor.on('deleteInStart', this.handleDelete)
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
			setScroll(this.$refs.editArea)
		},
		//移除上述滚动事件的监听
		removeScrollHandle() {
			const removeScroll = el => {
				Dap.event.off(el, `scroll.editify_${this.uid}`)
				if (el.parentNode) {
					removeScroll(el.parentNode)
				}
			}
			removeScroll(this.$refs.editArea)
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
					if (table) {
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
					} else if (link) {
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
					} else {
						const result = this.editor.getElementsByRange(true, true).filter(item => {
							return item.element.isText()
						})
						const flag = result.every(item => {
							return !this.getParsedomElementByElement(item.element, 'table') && !this.getParsedomElementByElement(item.element, 'pre') && !this.getParsedomElementByElement(item.element, 'a') && !this.getParsedomElementByElement(item.element, 'img') && !this.getParsedomElementByElement(item.element, 'video')
						})
						if (result.length && flag) {
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
		//隐藏工具条
		hideToolbar() {
			this.toolbarOptions.show = false
			this.toolbarOptions.node = null
		},
		//鼠标在页面按下：处理表格拖拽改变列宽
		documentMouseDown(e) {
			if (this.disabled) {
				return
			}
			//鼠标在编辑器内按下
			if (Dap.element.isContains(this.$refs.editArea, e.target)) {
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
			const width = `${this.tableColumnResizeParams.element._elm.offsetWidth + e.pageX - this.tableColumnResizeParams.start}`
			colgroup.children[index].marks['width'] = width
			colgroup.children[index]._elm.setAttribute('width', width)
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
				colgroup.children[index].marks['width'] = `${Number(((width / this.tableColumnResizeParams.element.parent._elm.offsetWidth) * 100).toFixed(2))}%`
				this.editor.formatElementStack()
				this.editor.domRender()
				this.editor.rangeRender()
			}
			this.tableColumnResizeParams.element = null
			this.tableColumnResizeParams.start = 0
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
			if (this.border && this.color && this.$refs.editArea) {
				this.$refs.editArea.style.borderColor = ''
				this.$refs.editArea.style.boxShadow = ''
			}
			this.$emit('blur', val)
		},
		//编辑器获取焦点
		handleEditorFocus(val) {
			if (this.disabled) {
				return
			}
			if (this.border && this.color && this.$refs.editArea) {
				this.$refs.editArea.style.borderColor = this.color
				const rgb = Dap.color.hex2rgb(this.color)
				this.$refs.editArea.style.boxShadow = `0 0 8px rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`
			}
			this.$emit('focus', val)
		},
		//编辑区域键盘按下
		handleEditorKeydown(e) {
			if (this.disabled || this.isSourceView) {
				return
			}
			//增加缩进
			if (e.keyCode == 9 && !e.metaKey && !e.shiftKey && !e.ctrlKey && !e.altKey) {
				e.preventDefault()
			}
			//减少缩进
			else if (e.keyCode == 9 && !e.metaKey && e.shiftKey && !e.ctrlKey && !e.altKey) {
				e.preventDefault()
			}
			//触发键盘按下事件
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
					this.editor.range.anchor.moveToStart(element)
					this.editor.range.focus.moveToEnd(element)
					this.editor.rangeRender()
				}
			}
			if (this.toolbarConfig.use) {
				this.handleToolbar()
			}
		},
		//编辑器换行
		handleInsertParagraph(element, previousElement) {
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
		handleRangeUpdate() {
			if (this.disabled) {
				return
			}
			if (this.toolbarConfig.use) {
				this.handleToolbar()
			}
			this.$emit('rangeupdate', this.value)
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
		handlePasteHtml(data, elements) {
			//粘贴html时过滤元素的样式和属性
			AlexElement.flatElements(elements).forEach(el => {
				//所有元素保留内部属性，过滤其他属性
				if (el.hasMarks()) {
					let marks = {}
					for (let key in el.marks) {
						if (pasteKeepData.marks.includes(key)) {
							marks[key] = el.marks[key]
						}
					}
					el.marks = marks
				}
				//根级块元素和内部块元素保留内部样式，过滤其他样式
				if (el.isBlock() || el.isInblock()) {
					if (el.hasStyles()) {
						let styles = {}
						for (let key in el.styles) {
							if (pasteKeepData.styles.includes(key)) {
								styles[key] = el.styles[key]
							}
						}
						el.styles = styles
					}
				}
				//行内元素和自闭合元素移除全部样式
				else if (el.isInline() || el.isClosed()) {
					el.styles = null
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
		handleDelete(element) {
			if (element.isBlock()) {
				blockToParagraph(element)
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
			this.$emit('after-render')
		},
		//设定视频高度
		setVideoHeight() {
			this.$refs.editArea.querySelectorAll('video').forEach(video => {
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
				el: this.$refs.editArea,
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
					el: this.$refs.editArea,
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
			const values = getMenuConfig(this.$editTrans).heading.map(item => {
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
			//起点和终点在一起
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				const block = this.editor.range.anchor.element.getBlock()
				const isList = blockIsList(block, ordered)
				blockToParagraph(block)
				if (!isList) {
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
					blockToParagraph(block)
					if (!isList) {
						blockToList(block, ordered)
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
		queryTextStyle(name, value) {
			return this.editor.queryTextStyle(name, value)
		},
		//api：设置标记
		setTextMark(name, value) {
			if (this.disabled) {
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
		queryTextMark(name, value) {
			return this.editor.queryTextMark(name, value)
		},
		//api：清除文本样式和标记
		formatText() {
			if (this.disabled) {
				return
			}
			this.editor.removeTextStyle()
			this.editor.removeTextMark()
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：设置引用
		setQuote() {
			if (this.disabled) {
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
		}
	},
	beforeUnmount() {
		//卸载绑定在滚动元素上的事件
		this.removeScrollHandle()
		//卸载绑定在document.documentElement上的事件
		Dap.event.off(document.documentElement, `mousedown.editify_${this.uid} mousemove.editify_${this.uid} mouseup.editify_${this.uid}`)
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
	font-size: @font-size;
	font-family: 'PingFang SC', 'Helvetica Neue', Helvetica, Roboto, 'Segoe UI', 'Microsoft YaHei', Arial, sans-serif;
	color: @font-color;
	line-height: 1.5;

	*,
	*::before,
	*::after {
		box-sizing: border-box;
		-webkit-tap-highlight-color: transparent;
		outline: none;
	}
}

.editify-wrap {
	display: block;
	width: 100%;
	position: relative;
	//编辑器样式
	.editify-el {
		display: block;
		position: relative;
		overflow-x: hidden;
		overflow-y: auto;
		width: 100%;
		border-radius: 4px;
		padding: 6px 10px;
		line-height: 1.5;
		background-color: @background;
		position: relative;

		//显示边框
		&.border {
			border: 1px solid @border-color;
			transition: all 500ms;
		}

		//显示占位符
		&.placeholder::before {
			position: absolute;
			top: 0;
			left: 0;
			display: block;
			width: 100%;
			content: attr(data-editify-placeholder);
			font-size: inherit;
			color: inherit;
			opacity: 0.5;
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
		:deep([data-editify-code]) {
			display: inline-block;
			padding: 3px 6px;
			margin: 0 4px;
			border-radius: 4px;
			line-height: 1;
			font-family: Consolas, monospace, Monaco, Andale Mono, Ubuntu Mono;
			background-color: @pre-background;
			color: @font-color-small;
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
				color: @font-color-dark-link;
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
			color: @font-color;
			font-size: @font-size;

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
						border-bottom: 1px solid @border-color;
						border-right: 1px solid @border-color;
						padding: 6px 10px;
						position: relative;
						word-break: break-word;

						&:last-child {
							border-right: none;
						}

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
			color: @font-color;
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
		}
		//引用样式
		:deep(blockquote) {
			display: block;
			border-left: 8px solid @background-darker;
			padding: 6px 10px 6px 20px;
			margin: 0 0 15px;
			line-height: 1.5;
			font-size: @font-size;
			color: @font-color-small;
			border-radius: 0;
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
		z-index: 10;
		background-color: @reverse-background;
		border-radius: inherit;
		margin: 0;
		padding: 6px 10px;
		overflow-x: hidden;
		overflow-y: auto;
		font-size: inherit;
		color: @reverse-color;
		font-family: Consolas, Monaco, Andale Mono, Ubuntu Mono, monospace;
		resize: none;
		border: none;
	}
}

.editify-footer {
	display: flex;
	justify-content: end;
	align-items: center;
	width: 100%;
	padding: 10px;

	.editify-footer-words {
		font-size: @font-size-small;
		color: @font-color-disabled;
		line-height: 1;
	}
}
</style>

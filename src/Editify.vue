<template>
	<div class="editify" :class="{ fullheight: height === true && !isFullScreen, fullscreen: isFullScreen }">
		<!-- 菜单区域 -->
		<Menu v-if="menuConfig.use" :config="menuConfig" :disabled="disabled || !canUseMenu" :color="color" ref="menu"></Menu>
		<!-- 编辑层，与编辑区域宽高相同必须适配 -->
		<div ref="body" class="editify-body" :class="{ border: showBorder, menu_inner: menuConfig.use && menuConfig.mode == 'inner' }" :data-editify-uid="uid">
			<!-- 编辑器 -->
			<div ref="content" class="editify-content" :class="{ placeholder: showPlaceholder, disabled: disabled }" :style="contentStyle" @keydown="handleEditorKeydown" @click="handleEditorClick" @compositionstart="isInputChinese = true" @compositionend="isInputChinese = false" :data-editify-placeholder="placeholder"></div>
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
import Dap from 'dap-util'
import { pasteKeepData, editorProps, mergeObject, queryHasValue, cloneData, blockIsList, blockIsTask, blockToTask, blockToParagraph, blockToList, getButtonOptionsConfig, getToolbarConfig, getMenuConfig } from './core/tool'
import { parseList, mediaHandle, tableHandle, preHandle } from './core/rule'
import Tooltip from './components/base/Tooltip'
import Toolbar from './components/Toolbar'
import Menu from './components/Menu'

export default {
	name: 'editify',
	props: { ...editorProps },
	emits: ['update:modelValue', 'focus', 'blur', 'change', 'keydown', 'insertparagraph'],
	setup() {
		const instance = getCurrentInstance()
		return {
			uid: instance.uid
		}
	},
	data() {
		return {
			autoheight: false,
			height: '400px',
			//编辑器对象
			editor: null,
			//是否编辑器内部修改值
			isModelChange: false,
			//是否代码视图
			isSourceView: false,
			//是否全屏
			isFullScreen: false,
			//是否正在输入中文
			isInputChinese: false,
			//菜单栏是否可以使用标识
			canUseMenu: false,
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
			//手动设定的编辑器编辑区域高度
			contentHeight: 0,
			//光标选取范围内的元素数组
			dataInRange: {
				flatList: [],
				list: []
			}
		}
	},
	computed: {
		//编辑 器的值
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
		//是否显示边框
		showBorder() {
			//全屏模式下不显示边框
			if (this.isFullScreen) {
				return false
			}
			return this.border
		},
		//编辑器样式设置
		contentStyle() {
			if (this.height === true || this.isFullScreen) {
				return {
					height: this.contentHeight + 'px'
				}
			}
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
		//全屏切换
		isFullScreen() {
			this.$nextTick(() => {
				this.setContentHeight()
			})
		},
		//监听height为true
		height: {
			immediate: true,
			handler: function () {
				this.$nextTick(() => {
					this.setContentHeight()
				})
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
		Dap.event.on(document.documentElement, `mousedown.editify_${this.uid}`, this.documentMouseDown)
		//鼠标移动监听
		Dap.event.on(document.documentElement, `mousemove.editify_${this.uid}`, this.documentMouseMove)
		//鼠标松开监听
		Dap.event.on(document.documentElement, `mouseup.editify_${this.uid}`, this.documentMouseUp)
		//鼠标点击箭头
		Dap.event.on(document.documentElement, `click.editify_${this.uid}`, this.documentClick)
		//监听窗口改变
		Dap.event.on(window, `resize.editify_${this.uid}`, () => {
			this.setVideoHeight()
			this.setContentHeight()
		})
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
					const result = this.dataInRange.flatList.filter(item => {
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
		},
		//设定编辑器内的视频高度
		setVideoHeight() {
			this.$refs.content.querySelectorAll('video').forEach(video => {
				video.style.height = video.offsetWidth / this.videoRatio + 'px'
			})
		},
		//设置编辑器主体高度
		setContentHeight() {
			if (this.height === true || this.isFullScreen) {
				let height = this.$el.offsetHeight
				if (this.menuConfig.use) {
					height -= this.$refs.menu.$el.offsetHeight
				}
				if (this.showWordLength) {
					height -= this.$refs.footer.offsetHeight
				}
				if (this.$refs.menu.menuMode == 'default') {
					height -= 10
				}
				//这里减去2px是因为body设了padding:1px
				this.contentHeight = height - 2
			}
		},
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
					}
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
			if (!Dap.element.isContains(this.$el, e.target) && !this.isSourceView) {
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
		//点击编辑器：处理图片和视频的光标聚集
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
				this.$emit('focus', val)
			}, 0)
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
			this.dataInRange = this.editor.getElementsByRange()

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
		//编辑器dom渲染
		handleAfterRender() {
			//设定视频高度
			this.setVideoHeight()
		},

		/** 以下是对编辑器内的元素进行操作的方法 */

		//获取光标选取内的扁平化元素数组(可能会分割文本元素导致stack变更，同时也会更新选取元素和光标位置)
		getFlatElementsByRange() {
			//获取选区数据的长度
			let length = this.dataInRange.flatList.length
			//返回的元素数组
			let elements = []
			//遍历选区数据
			for (let i = 0; i < length; i++) {
				const item = this.dataInRange.flatList[i]
				//如果存在offset那么一定是文本元素
				if (item.offset) {
					let selectEl = null
					//文本元素前面一部分在光标范围内
					if (item.offset[0] == 0 && item.offset[1] < item.element.textContent.length) {
						const el = item.element.clone()
						item.element.textContent = item.element.textContent.substring(0, item.offset[1])
						el.textContent = el.textContent.substring(item.offset[1])
						this.editor.addElementAfter(el, item.element)
						selectEl = item.element
					}
					//文本元素后面一部分在光标范围内
					else if (item.offset[1] == item.element.textContent.length && item.offset[0] > 0) {
						const el = item.element.clone()
						item.element.textContent = item.element.textContent.substring(0, item.offset[0])
						el.textContent = el.textContent.substring(item.offset[0])
						this.editor.addElementAfter(el, item.element)
						selectEl = el
					}
					//文本元素的中间一部分在光标范围内
					else if (item.offset[0] > 0 && item.offset[1] < item.element.textContent.length) {
						const el = item.element.clone()
						const el2 = item.element.clone()
						item.element.textContent = item.element.textContent.substring(0, item.offset[0])
						el.textContent = el.textContent.substring(item.offset[0], item.offset[1])
						el2.textContent = el2.textContent.substring(item.offset[1])
						this.editor.addElementAfter(el, item.element)
						this.editor.addElementAfter(el2, el)
						selectEl = el
					}
					//如果selectEl存在证明文本元素被分割了
					if (selectEl) {
						//如果i为0的话肯定是起点
						if (i == 0) {
							this.editor.range.anchor.moveToStart(selectEl)
						}
						//如果i是最后一个序列的话肯定是终点
						if (i == length - 1) {
							this.editor.range.focus.moveToEnd(selectEl)
						}
						elements.push(selectEl)
						//记录文本元素被分割
						hasSplit = true
					}
				} else {
					elements.push(item.element)
				}
			}
			return elements
		},
		//判断元素是否在某个标签下，如果是返回该标签对应的元素，否则返回null
		getParsedomElementByElement(element, parsedom) {
			if (element.isBlock()) {
				return element.parsedom == parsedom ? element : null
			}
			if (!element.isText() && element.parsedom == parsedom) {
				return element
			}
			return this.getParsedomElementByElement(element.parent, parsedom)
		},
		//获取光标是否在指定标签下，如果是返回该标签对应的元素，否则返回null
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
			const arr = this.dataInRange.list.map(item => {
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
		//删除光标所在的指定标签的元素
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
			}
		},
		//当光标在链接上时可以移除链接
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
			}
		},
		//设置标题
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
				this.dataInRange.list.forEach(el => {
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
		},
		//插入有序或者无序列表 ordered为true表示有序列表
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
				this.dataInRange.list.forEach(item => {
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
		},
		//插入任务列表
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
				this.dataInRange.list.forEach(item => {
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
		},
		//设置文本元素的样式
		setTextStyle(styles) {
			if (this.disabled) {
				return
			}
			if (!this.editor.range) {
				return
			}
			if (!Dap.common.isObject(styles)) {
				throw new Error('The argument must be an object')
			}
			//起点和终点在一起
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				//如果是空白文本元素直接设置样式
				if (this.editor.range.anchor.element.isSpaceText()) {
					if (this.editor.range.anchor.element.hasStyles()) {
						Object.assign(this.editor.range.anchor.element.styles, cloneData(styles))
					} else {
						this.editor.range.anchor.element.styles = cloneData(styles)
					}
				}
				//如果是文本元素
				else if (this.editor.range.anchor.element.isText()) {
					//新建一个空白文本元素
					const el = AlexElement.getSpaceElement()
					//继承文本元素的样式和标记
					el.styles = cloneData(this.editor.range.anchor.element.styles)
					el.marks = cloneData(this.editor.range.anchor.element.marks)
					//设置样式
					if (el.hasStyles()) {
						Object.assign(el.styles, cloneData(styles))
					} else {
						el.styles = cloneData(styles)
					}
					//插入空白文本元素
					this.editor.insertElement(el)
				}
				//如果是自闭合元素
				else {
					const el = AlexElement.getSpaceElement()
					el.styles = cloneData(styles)
					this.editor.insertElement(el)
				}
			}
			//不在同一个点
			else {
				const elements = this.getFlatElementsByRange()
				elements.forEach(ele => {
					if (ele.isText()) {
						if (ele.hasStyles()) {
							Object.assign(ele.styles, cloneData(styles))
						} else {
							ele.styles = cloneData(styles)
						}
					}
				})
			}
		},
		//查询文本元素是否具有某个样式
		queryTextStyle(name, value) {
			if (!name) {
				throw new Error('The first argument cannot be null')
			}
			if (!this.editor.range) {
				return false
			}
			//起点和终点在一起
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				//如果是文本元素并且具有样式
				if (this.editor.range.anchor.element.isText() && this.editor.range.anchor.element.hasStyles()) {
					return queryHasValue(this.editor.range.anchor.element.styles, name, value)
				}
				//不是文本元素或者没有样式直接返回
				return false
			}
			//起点和终点不在一起获取选区中的文本元素
			let result = this.dataInRange.flatList.filter(item => {
				return item.element.isText()
			})
			//如果不包含文本元素直接返回false
			if (result.length == 0) {
				return false
			}
			//判断每个文本元素是否都具有该样式
			let flag = result.every(item => {
				//文本元素含有样式进一步判断
				if (item.element.hasStyles()) {
					return queryHasValue(item.element.styles, name, value)
				}
				//文本元素没有样式直接返回false
				return false
			})
			return flag
		},
		//移除文本元素的样式
		removeTextStyle(styleNames) {
			if (this.disabled) {
				return
			}
			if (!this.editor.range) {
				return
			}
			//移除样式的方法
			const removeFn = el => {
				//如果参数是数组，表示删除指定的样式
				if (Array.isArray(styleNames)) {
					if (el.hasStyles()) {
						let styles = {}
						Object.keys(el.styles).forEach(key => {
							if (!styleNames.includes(key)) {
								styles[key] = el.styles[key]
							}
						})
						el.styles = styles
					}
				}
				//如果没有参数，则表示删除所有的样式
				else {
					el.styles = null
				}
			}
			//如果起点和终点在一起
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				//如果是空白文本元素直接移除样式
				if (this.editor.range.anchor.element.isSpaceText()) {
					removeFn(this.editor.range.anchor.element)
				}
				//如果是文本元素则新建一个空白文本元素
				else if (this.editor.range.anchor.element.isText()) {
					const el = AlexElement.getSpaceElement()
					//继承文本元素的样式和标记
					el.styles = cloneData(this.editor.range.anchor.element.styles)
					el.marks = cloneData(this.editor.range.anchor.element.marks)
					//移除样式
					removeFn(el)
					//插入
					this.editor.insertElement(el)
				}
			}
			//起点和终点不在一起
			else {
				const elements = this.getFlatElementsByRange()
				elements.forEach(ele => {
					if (ele.isText()) {
						removeFn(ele)
					}
				})
			}
		},
		//设置文本元素的标记
		setTextMark(marks) {
			if (this.disabled) {
				return
			}
			if (!this.editor.range) {
				return
			}
			if (!Dap.common.isObject(marks)) {
				throw new Error('The argument must be an object')
			}
			//起点和终点在一起
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				//如果是空白文本元素直接设置标记
				if (this.editor.range.anchor.element.isSpaceText()) {
					if (this.editor.range.anchor.element.hasMarks()) {
						Object.assign(this.editor.range.anchor.element.marks, cloneData(marks))
					} else {
						this.editor.range.anchor.element.marks = cloneData(marks)
					}
				}
				//如果是文本元素
				else if (this.editor.range.anchor.element.isText()) {
					//新建一个空白文本元素
					const el = AlexElement.getSpaceElement()
					//继承文本元素的样式和标记
					el.styles = cloneData(this.editor.range.anchor.element.styles)
					el.marks = cloneData(this.editor.range.anchor.element.marks)
					//设置标记
					if (el.hasMarks()) {
						Object.assign(el.marks, cloneData(marks))
					} else {
						el.marks = cloneData(marks)
					}
					//插入空白文本元素
					this.editor.insertElement(el)
				}
				//如果是自闭合元素
				else {
					const el = AlexElement.getSpaceElement()
					el.marks = cloneData(marks)
					this.editor.insertElement(el)
				}
			}
			//不在同一个点
			else {
				const elements = this.getFlatElementsByRange()
				elements.forEach(ele => {
					if (ele.isText()) {
						if (ele.hasMarks()) {
							Object.assign(ele.marks, cloneData(marks))
						} else {
							ele.marks = cloneData(marks)
						}
					}
				})
			}
		},
		//查询文本元素是否具有某个标记
		queryTextMark(name, value) {
			if (!name) {
				throw new Error('The first argument cannot be null')
			}
			if (!this.editor.range) {
				return false
			}
			//起点和终点在一起
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				//如果是文本元素并且具有样式
				if (this.editor.range.anchor.element.isText() && this.editor.range.anchor.element.hasMarks()) {
					return queryHasValue(this.editor.range.anchor.element.marks, name, value)
				}
				//不是文本元素或者没有样式直接返回
				return false
			}
			//起点和终点不在一起获取选区中的文本元素
			let result = this.dataInRange.flatList.filter(item => {
				return item.element.isText()
			})
			//如果不包含文本元素直接返回false
			if (result.length == 0) {
				return false
			}
			//判断每个文本元素是否都具有该标记
			let flag = result.every(item => {
				//文本元素含有标记进一步判断
				if (item.element.hasMarks()) {
					return queryHasValue(item.element.marks, name, value)
				}
				//文本元素没有标记直接返回false
				return false
			})
			return flag
		},
		//移除文本元素的标记
		removeTextMark(markNames) {
			if (this.disabled) {
				return
			}
			if (!this.editor.range) {
				return
			}
			//移除样式的方法
			const removeFn = el => {
				//如果参数是数组，表示删除指定的样式
				if (Array.isArray(markNames)) {
					if (el.hasMarks()) {
						let marks = {}
						Object.keys(el.marks).forEach(key => {
							if (!markNames.includes(key)) {
								marks[key] = el.marks[key]
							}
						})
						el.marks = marks
					}
				}
				//如果没有参数，则表示删除所有的样式
				else {
					el.marks = null
				}
			}
			//如果起点和终点在一起
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				//如果是空白文本元素直接移除标记
				if (this.editor.range.anchor.element.isSpaceText()) {
					removeFn(this.editor.range.anchor.element)
				}
				//如果是文本元素则新建一个空白文本元素
				else if (this.editor.range.anchor.element.isText()) {
					const el = AlexElement.getSpaceElement()
					//继承文本元素的样式和标记
					el.styles = cloneData(this.editor.range.anchor.element.styles)
					el.marks = cloneData(this.editor.range.anchor.element.marks)
					//移除标记
					removeFn(el)
					//插入
					this.editor.insertElement(el)
				}
			}
			//起点和终点不在一起
			else {
				const elements = this.getFlatElementsByRange()
				elements.forEach(ele => {
					if (ele.isText()) {
						removeFn(ele)
					}
				})
			}
		},
		//清除文本样式和标记
		formatText() {
			if (this.disabled) {
				return
			}
			if (!this.editor.range) {
				return
			}
			this.editor.removeTextStyle()
			this.editor.removeTextMark()
		},
		//设置对齐方式,参数取值justify/left/right/center
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
				this.dataInRange.list.forEach(el => {
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
		},
		//插入引用
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
				this.dataInRange.list.forEach(item => {
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
		},
		//设置行高
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
				this.dataInRange.list.forEach(el => {
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
		},
		//增加缩进
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
				this.dataInRange.list.forEach(item => {
					const block = item.element.getBlock()
					const inblock = item.element.getInblock()
					if (inblock && inblock.behavior == 'block' && !inblock.isPreStyle()) {
						fn(inblock)
					} else if (!block.isPreStyle()) {
						fn(block)
					}
				})
			}
		},
		//减少缩进
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
				this.dataInRange.list.forEach(item => {
					const block = item.element.getBlock()
					const inblock = item.element.getInblock()
					if (inblock && inblock.behavior == 'block' && !inblock.isPreStyle()) {
						fn(inblock)
					} else if (!block.isPreStyle()) {
						fn(block)
					}
				})
			}
		},
		//插入图片
		insertImage(url) {
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
		},
		//插入视频
		insertVideo(url) {
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
		},
		//选区是否含有代码块样式
		hasPreStyle() {
			if (!this.editor.range) {
				return false
			}
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				return this.editor.range.anchor.element.isPreStyle()
			}
			return this.dataInRange.list.some(item => {
				return item.element.isPreStyle()
			})
		},
		//选区是否含有引用
		hasQuote() {
			if (!this.editor.range) {
				return false
			}
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				const block = this.editor.range.anchor.element.getBlock()
				return block.parsedom == 'blockquote'
			}
			return this.dataInRange.list.some(item => {
				if (item.element.isBlock()) {
					return item.element.parsedom == 'blockquote'
				} else {
					const block = item.element.getBlock()
					return block.parsedom == 'blockquote'
				}
			})
		},
		//选区是否含有列表
		hasList(ordered = false) {
			if (!this.editor.range) {
				return false
			}
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				const block = this.editor.range.anchor.element.getBlock()
				return blockIsList(block, ordered)
			}
			return this.dataInRange.list.some(item => {
				if (item.element.isBlock()) {
					return blockIsList(item.element, ordered)
				} else {
					const block = item.element.getBlock()
					return blockIsList(block, ordered)
				}
			})
		},
		//选区是否含有链接
		hasLink() {
			if (!this.editor.range) {
				return false
			}
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				return !!this.getParsedomElementByElement(this.editor.range.anchor.element, 'a')
			}
			const result = this.dataInRange.flatList.filter(item => {
				return item.element.isText()
			})
			return result.some(item => {
				return !!this.getParsedomElementByElement(item.element, 'a')
			})
		},
		//选区是否含有表格
		hasTable() {
			if (!this.editor.range) {
				return false
			}
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				const block = this.editor.range.anchor.element.getBlock()
				return block.parsedom == 'table'
			}
			return this.dataInRange.list.some(item => {
				if (item.element.isBlock()) {
					return item.element.parsedom == 'table'
				} else {
					const block = item.element.getBlock()
					return block.parsedom == 'table'
				}
			})
		},
		//选区是否含有任务列表
		hasTask() {
			if (!this.editor.range) {
				return false
			}
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				const block = this.editor.range.anchor.element.getBlock()
				return blockIsTask(block)
			}
			return this.dataInRange.list.some(item => {
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
			return this.dataInRange.flatList.some(item => {
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
			return this.dataInRange.flatList.some(item => {
				return item.element.isClosed() && item.element.parsedom == 'video'
			})
		},
		//选区是否全部在引用内
		inQuote() {
			if (!this.editor.range) {
				return false
			}
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				const block = this.editor.range.anchor.element.getBlock()
				return block.parsedom == 'blockquote'
			}
			return this.dataInRange.list.every(item => {
				if (item.element.isBlock()) {
					return item.element.parsedom == 'blockquote'
				} else {
					const block = item.element.getBlock()
					return block.parsedom == 'blockquote'
				}
			})
		},
		//选区是否全部在列表内
		inList(ordered = false) {
			if (!this.editor.range) {
				return false
			}
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				const block = this.editor.range.anchor.element.getBlock()
				return blockIsList(block, ordered)
			}
			return this.dataInRange.list.every(item => {
				if (item.element.isBlock()) {
					return blockIsList(item.element, ordered)
				} else {
					const block = item.element.getBlock()
					return blockIsList(block, ordered)
				}
			})
		},
		//选区是否全部在任务列表里
		inTask() {
			if (!this.editor.range) {
				return false
			}
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				const block = this.editor.range.anchor.element.getBlock()
				return blockIsTask(block)
			}
			return this.dataInRange.list.every(item => {
				if (item.element.isBlock()) {
					return blockIsTask(item.element)
				} else {
					const block = item.element.getBlock()
					return blockIsTask(block)
				}
			})
		},
		//创建一个空的表格
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
			this.editor.range.anchor.moveToStart(tbody)
			this.editor.range.focus.moveToStart(tbody)
		},
		//插入代码块
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
					this.editor.range.anchor.moveToStart(this.dataInRange.list[0].element.getBlock())
					this.editor.range.focus.moveToEnd(this.dataInRange.list[this.dataInRange.list.length - 1].element.getBlock())
					const res = this.dataInRange.flatList.filter(el => el.element.isText())
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

	&.fullheight {
		height: 100%;
	}

	&.fullscreen {
		position: fixed;
		z-index: 1000;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;

		.editify-body {
			border-radius: 0;
		}
	}
}

.editify-body {
	display: block;
	width: 100%;
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

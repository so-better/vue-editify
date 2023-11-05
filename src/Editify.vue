<template>
	<div class="editify">
		<!-- 编辑器 -->
		<div ref="wrap" class="editify-wrap" :class="{ border: border, placeholder: showPlaceholder }" :style="wrapStyle" @keydown="handleEditorKeydown" @click="handleEditorClick" @compositionstart="isInputChinese = true" @compositionend="isInputChinese = false" :data-placeholder="placeholder"></div>
		<!-- 代码视图 -->
		<textarea v-if="isSourceView" :value="value" readonly class="editify-source" />
	</div>
</template>
<script>
import { AlexEditor, AlexElement } from 'alex-editor'
import Dap from 'dap-util'
import { props } from './core'
export default {
	name: 'editify',
	props: { ...props },
	emits: ['update:modelValue', 'focus', 'blur', 'change', 'keydown'],
	data() {
		return {
			//编辑器对象
			editor: null,
			//是否编辑器内部修改值
			isModelChange: false,
			//是否代码视图
			isSourceView: false,
			//是否正在输入中文
			isInputChinese: false
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
		//是否显示占位符
		showPlaceholder() {
			return this.value == '<p><br></p>' && !this.isInputChinese
		},
		//编辑器样式设置
		wrapStyle() {
			return this.autoheight ? { minHeight: this.height } : { height: this.height }
		}
	},
	inject: ['$editTrans'],
	watch: {
		//监听编辑的值变更
		value(newVal) {
			//代码视图不处理
			if (this.isSourceView) {
				return
			}
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
			this.editor.rangeRender()
		}
	},
	mounted() {
		this.createEditor()
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
		//初始创建编辑器
		createEditor() {
			//创建编辑器
			this.editor = new AlexEditor(this.$refs.wrap, {
				value: this.value,
				disabled: this.disabled,
				renderRules: [],
				allowCopy: this.allowCopy,
				allowPaste: this.allowPaste,
				allowCut: this.allowCut,
				allowPasteHtml: this.allowPasteHtml,
				allowPasteHtml: this.allowPasteHtml
			})
			//编辑器渲染后会有一个渲染过程，会改变内容，因此重新获取内容的值来设置value
			this.internalModify(this.editor.value)
			//设置监听事件
			this.editor.on('change', this.handleEditorChange)
			this.editor.on('focus', this.handleEditorFocus)
			this.editor.on('blur', this.handleEditorBlur)
			//格式化和dom渲染
			this.editor.formatElementStack()
			this.editor.domRender()
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
			if (this.border && this.color && this.$refs.wrap) {
				this.$refs.wrap.style.borderColor = ''
				this.$refs.wrap.style.boxShadow = ''
			}
			this.$emit('blur', val)
		},
		//编辑器获取焦点
		handleEditorFocus(val) {
			if (this.disabled) {
				return
			}
			if (this.border && this.color && this.$refs.wrap) {
				this.$refs.wrap.style.borderColor = this.color
				const rgb = Dap.color.hex2rgb(this.color)
				this.$refs.wrap.style.boxShadow = `0 0 8px rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`
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
			e.preventDefault()
			//点击的是图片或者视频
			if (node.nodeName.toLocaleLowerCase() == 'img' || node.nodeName.toLocaleLowerCase() == 'video') {
				const key = node.getAttribute('mvi-editor-element-key')
				if (key) {
					const element = this.editor.getElementByKey(key)
					this.editor.range.anchor.moveToStart(element)
					this.editor.range.focus.moveToEnd(element)
					this.editor.rangeRender()
				}
			}
		}
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
	border-radius: 4px;
	font-size: 14px;
	font-family: 'PingFang SC', 'Helvetica Neue', Helvetica, Roboto, 'Segoe UI', 'Microsoft YaHei', Arial, sans-serif;
	color: #333;

	*,
	*::before,
	*::after {
		box-sizing: border-box;
		-webkit-tap-highlight-color: transparent;
		outline: none;
	}
}

//编辑器样式
.editify-wrap {
	display: block;
	position: relative;
	overflow-x: hidden;
	overflow-y: auto;
	width: 100%;
	border-radius: inherit;
	padding: 6px 10px;
	line-height: 1.5;
	background-color: #fff;

	//显示边框
	&.border {
		border: 1px solid #ebedf0;
		transition: border-color 300ms, box-shadow 300ms;
	}

	//显示占位符
	&.placeholder::before {
		position: absolute;
		top: 6px;
		left: 10px;
		content: attr(data-placeholder);
		font-size: inherit;
		color: inherit;
		opacity: 0.5;
		line-height: inherit;
		vertical-align: middle;
		cursor: text;
	}

	//段落样式
	:deep(p) {
		display: block;
		width: 100%;
		margin: 0 0 10px 0;
		padding: 0;
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
	background-color: #000;
	border-radius: inherit;
	margin: 0;
	padding: 6px 10px;
	overflow-x: hidden;
	overflow-y: auto;
	font-size: inherit;
	color: #fff;
	font-family: Consolas, Monaco, Andale Mono, Ubuntu Mono, monospace;
	resize: none;
	border: none;
}
</style>

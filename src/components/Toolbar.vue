<template>
	<Layer v-model="show" ref="layer" :node="node" border placement="bottom-start" @show="layerShow" :useRange="type == 'text'" @mousedown.prevent>
		<div class="editify-toolbar" ref="toolbar">
			<!-- 表格工具条 -->
			<template v-if="type == 'table'">
				<!-- 表格前插入段落 -->
				<Button @operate="insertParagraphWithTable('up')" name="textWrapUp" :title="$editTrans('textWrapUp')" tooltip :color="$parent.color">
					<Icon value="text-wrap" class="editify-icon-rotate"></Icon>
				</Button>
				<!-- 表格后插入段落 -->
				<Button @operate="insertParagraphWithTable('down')" rightBorder name="textWrapDown" :title="$editTrans('textWrapDown')" tooltip :color="$parent.color">
					<Icon value="text-wrap"></Icon>
				</Button>
				<!-- 向前插入行 -->
				<Button @operate="insertTableRow('up')" name="insertRowTop" :title="$editTrans('insertRowTop')" tooltip :color="$parent.color">
					<Icon value="insert-row-top"></Icon>
				</Button>
				<!-- 向后插入行 -->
				<Button @operate="insertTableRow('down')" name="insertRowBottom" :title="$editTrans('insertRowBottom')" tooltip :color="$parent.color">
					<Icon value="insert-row-bottom"></Icon>
				</Button>
				<!-- 删除行 -->
				<Button @operate="deleteTableRow" rightBorder name="deleteRow" :title="$editTrans('deleteRow')" tooltip :color="$parent.color">
					<Icon value="delete-row"></Icon>
				</Button>
				<!-- 向前插入列 -->
				<Button @operate="insertTableColumn('left')" name="insertColumnLeft" :title="$editTrans('insertColumnLeft')" tooltip :color="$parent.color">
					<Icon value="insert-column-left"></Icon>
				</Button>
				<!-- 向后插入列 -->
				<Button @operate="insertTableColumn('right')" name="insertColumnRight" :title="$editTrans('insertColumnRight')" tooltip :color="$parent.color">
					<Icon value="insert-column-right"></Icon>
				</Button>
				<!-- 删除列 -->
				<Button @operate="deleteTableColumn" rightBorder name="deleteColumn" :title="$editTrans('deleteColumn')" tooltip :color="$parent.color">
					<Icon value="delete-column"></Icon>
				</Button>
				<!-- 删除表格 -->
				<Button @operate="$parent.deleteByParsedom('table')" name="deleteTable" :title="$editTrans('deleteTable')" tooltip :color="$parent.color">
					<Icon value="delete-table"></Icon>
				</Button>
			</template>
			<!-- 代码块工具条 -->
			<template v-if="type == 'codeBlock'">
				<!-- 代码块前插入段落 -->
				<Button @operate="insertParagraphWithPre('up')" name="textWrapUp" :title="$editTrans('textWrapUp')" tooltip :color="$parent.color">
					<Icon value="text-wrap" class="editify-icon-rotate"></Icon>
				</Button>
				<!-- 代码块后插入段落 -->
				<Button @operate="insertParagraphWithPre('down')" rightBorder name="textWrapDown" :title="$editTrans('textWrapDown')" tooltip :color="$parent.color">
					<Icon value="text-wrap"></Icon>
				</Button>
				<!-- 代码块语言选择 -->
				<Button @operate="selectLanguage" name="languages" :title="$editTrans('selectLanguages')" tooltip :color="$parent.color" type="display" :display-config="codeBlockConfig.displayConfig" :disabled="codeBlockConfig.disabled"></Button>
			</template>
			<!-- 链接工具条 -->
			<template v-else-if="type == 'link'">
				<div class="editify-toolbar-link">
					<div class="editify-toolbar-link-label">{{ $editTrans('linkAddress') }}</div>
					<input @input="modifyLink" @focus="handleInputFocus" @blur="handleInputBlur" :placeholder="$editTrans('linkEnterPlaceholder')" v-model.trim="linkConfig.url" type="url" />
					<div class="editify-toolbar-link-footer">
						<Checkbox @change="modifyLink" v-model="linkConfig.newOpen" :label="$editTrans('newWindowOpen')" :color="$parent.color" :size="10"></Checkbox>
						<div class="editify-toolbar-link-operations">
							<span @click="$parent.removeLink">{{ $editTrans('removeLink') }}</span>
							<a :href="linkConfig.url" target="_blank" :style="{ color: $parent.color }">{{ $editTrans('viewLink') }}</a>
						</div>
					</div>
				</div>
			</template>
			<!-- 图片工具条 -->
			<template v-else-if="type == 'image'">
				<!-- 设置宽度30% -->
				<Button @operate="setWidth('30%')" name="set30Width" :title="$editTrans('width30')" tooltip :color="$parent.color"> 30% </Button>
				<!-- 设置宽度50% -->
				<Button @operate="setWidth('50%')" name="set50Width" :title="$editTrans('width50')" tooltip :color="$parent.color"> 50% </Button>
				<!-- 设置宽度100% -->
				<Button rightBorder @operate="setWidth('100%')" name="set100Width" :title="$editTrans('width100')" tooltip :color="$parent.color"> 100% </Button>
				<!-- 删除图片 -->
				<Button @operate="$parent.deleteByParsedom('img')" name="deleteImage" :title="$editTrans('deleteImage')" tooltip :color="$parent.color">
					<Icon value="delete"></Icon>
				</Button>
			</template>
			<!-- 视频工具条 -->
			<template v-else-if="type == 'video'">
				<!-- 设置宽度30% -->
				<Button @operate="setWidth('30%')" name="set30Width" :title="$editTrans('width30')" tooltip :color="$parent.color"> 30% </Button>
				<!-- 设置宽度50% -->
				<Button @operate="setWidth('50%')" name="set50Width" :title="$editTrans('width50')" tooltip :color="$parent.color"> 50% </Button>
				<!-- 设置宽度100% -->
				<Button rightBorder @operate="setWidth('100%')" name="set100Width" :title="$editTrans('width100')" tooltip :color="$parent.color"> 100% </Button>
				<!-- 自动播放 -->
				<Button @operate="setVideo" name="autoplay" :title="videoConfig.autoplay ? $editTrans('disabledAutoplay') : $editTrans('autoplay')" tooltip :color="$parent.color">
					<Icon :value="videoConfig.autoplay ? 'autoplay' : 'stop'"></Icon>
				</Button>
				<!-- 循环播放 -->
				<Button @operate="setVideo" name="loop" :title="videoConfig.loop ? $editTrans('disabledLoop') : $editTrans('loop')" tooltip :color="$parent.color">
					<Icon :value="videoConfig.loop ? 'loop' : 'single'"></Icon>
				</Button>
				<!-- 是否静音 -->
				<Button @operate="setVideo" name="muted" :title="videoConfig.muted ? $editTrans('unmuted') : $editTrans('muted')" tooltip :color="$parent.color">
					<Icon :value="videoConfig.muted ? 'muted' : 'unmuted'"></Icon>
				</Button>
				<!-- 是否显示控制器 -->
				<Button leftBorder @operate="setVideo" name="controls" :title="$editTrans('controls')" tooltip :color="$parent.color">
					<Icon value="controls"></Icon>
				</Button>
				<!-- 删除视频 -->
				<Button @operate="$parent.deleteByParsedom('video')" name="deleteVideo" :title="$editTrans('deleteVideo')" tooltip :color="$parent.color">
					<Icon value="delete"></Icon>
				</Button>
			</template>
			<!-- 文本工具条 -->
			<template v-else-if="type == 'text'">
				<!-- 设置段落和标题 -->
				<Button rightBorder name="heading" :title="$editTrans('heading')" tooltip type="display" :display-config="headingConfig.displayConfig" @operate="setHeading" :disabled="headingConfig.disabled"></Button>
				<!-- 有序列表 -->
				<Button @operate="setList" name="orderList" :title="$editTrans('orderList')" tooltip :active="orderListConfig.active" :disabled="orderListConfig.disabled">
					<Icon value="list-ordered"></Icon>
				</Button>
				<!-- 无序列表 -->
				<Button @operate="setList" name="unorderList" :title="$editTrans('unorderList')" tooltip rightBorder :active="unorderListConfig.active" :disabled="unorderListConfig.disabled">
					<Icon value="list-unordered"></Icon>
				</Button>
				<!-- 加粗  -->
				<Button @operate="setBold" name="bold" :title="$editTrans('bold')" tooltip :active="boldConfig.active" :disabled="boldConfig.disabled">
					<Icon value="bold"></Icon>
				</Button>
				<!-- 斜体 -->
				<Button @operate="setItalic" name="italic" :title="$editTrans('italic')" tooltip :active="italicConfig.active" :disabled="italicConfig.disabled">
					<Icon value="italic"></Icon>
				</Button>
				<!-- 删除线 -->
				<Button @operate="setStrikethrough" name="strikethrough" :title="$editTrans('strikethrough')" tooltip :active="strikethroughConfig.active" :disabled="strikethroughConfig.disabled">
					<Icon value="strikethrough"></Icon>
				</Button>
				<!-- 下划线 -->
				<Button @operate="setUnderline" name="underline" :title="$editTrans('underline')" tooltip :active="underlineConfig.active" :disabled="underlineConfig.disabled">
					<Icon value="underline"></Icon>
				</Button>
				<!-- 行内代码块 -->
				<Button @operate="setCodeStyle" name="code" :title="$editTrans('code')" tooltip :active="codeConfig.active" :disabled="codeConfig.disabled">
					<Icon value="code"></Icon>
				</Button>
				<!-- 上标 -->
				<Button @operate="setSuperscript" name="superscript" :title="$editTrans('superscript')" tooltip :active="superConfig.active" :disabled="superConfig.disabled">
					<Icon value="superscript"></Icon>
				</Button>
				<!-- 下标 -->
				<Button rightBorder @operate="setSubscript" name="subscript" :title="$editTrans('subscript')" tooltip :active="subConfig.active" :disabled="subConfig.disabled">
					<Icon value="subscript"></Icon>
				</Button>
				<!-- 字号大小 -->
				<Button name="fontSize" :title="$editTrans('fontSize')" tooltip type="display" :display-config="fontSizeConfig.displayConfig" @operate="setFontSize" :disabled="fontSizeConfig.disabled"></Button>
				<!-- 字体 -->
				<Button name="fontFamily" :title="$editTrans('fontFamily')" tooltip type="display" :display-config="fontFamilyConfig.displayConfig" @operate="setFontFamily" :disabled="fontFamilyConfig.disabled"></Button>
				<!-- 前景色 -->
				<Button name="foreColor" :title="$editTrans('foreColor')" tooltip type="select" :select-config="foreColorConfig.selectConfig" :disabled="foreColorConfig.disabled" hideScroll ref="foreColor">
					<Icon value="font-color"></Icon>
					<template #layer="{ options }">
						<Colors :value="foreColorConfig.value" @change="setForeColor" :data="options"></Colors>
					</template>
				</Button>
				<!-- 背景色 -->
				<Button name="backColor" :title="$editTrans('backColor')" tooltip type="select" :select-config="backColorConfig.selectConfig" :disabled="backColorConfig.disabled" hideScroll ref="backColor">
					<Icon value="brush"></Icon>
					<template #layer="{ options }">
						<Colors :color="$parent.color" :value="backColorConfig.value" @change="setBackColor" :data="options"></Colors>
					</template>
				</Button>
				<!-- 清除样式 -->
				<Button leftBorder @operate="clearFormat" name="formatClear" :title="$editTrans('formatClear')" tooltip :disabled="formatClearConfig.disabled">
					<Icon value="format-clear"></Icon>
				</Button>
			</template>
		</div>
	</Layer>
</template>
<script>
import Layer from './Layer'
import Tooltip from './Tooltip'
import Button from './Button'
import Icon from './Icon'
import Checkbox from './Checkbox'
import Colors from './Colors'
import { AlexElement } from 'alex-editor'
import { languages } from '../hljs'
import { getMenuConfig, blockIsList } from '../core'
export default {
	name: 'Toolbar',
	emits: ['update:modelValue'],
	props: {
		//是否显示
		modelValue: {
			type: Boolean,
			default: false
		},
		//关联元素
		node: {
			type: [String, Node],
			default: null
		},
		//类型
		type: {
			type: String,
			default: 'text',
			validator(value) {
				return ['text', 'table', 'link', 'codeBlock', 'image', 'video'].includes(value)
			}
		}
	},
	data() {
		return {
			//代码块选择语言按钮配置
			codeBlockConfig: {
				displayConfig: {
					options: [
						{
							label: this.$editTrans('autoRecognize'),
							value: ''
						},
						...languages
					],
					value: '',
					width: 100,
					maxHeight: 180
				},
				disabled: false
			},
			//链接参数配置
			linkConfig: {
				//链接地址
				url: '',
				//链接是否新窗口打开
				newOpen: false
			},
			//视频参数配置
			videoConfig: {
				//是否显示控制器
				controls: false,
				//是否循环
				loop: false,
				//是否自动播放
				autoplay: false,
				//是否静音
				muted: false
			},
			//标题按钮配置
			headingConfig: {
				displayConfig: {
					options: getMenuConfig(this.$editTrans).heading,
					value: '',
					width: 160,
					maxHeight: 320
				},
				defaultValue: 'p',
				disabled: false
			},
			//有序列表按钮配置
			orderListConfig: {
				active: false,
				disabled: false
			},
			//无序列表按钮配置
			unorderListConfig: {
				active: false,
				disabled: false
			},
			//粗体按钮配置
			boldConfig: {
				active: false,
				disabled: false
			},
			//斜体按钮配置
			italicConfig: {
				active: false,
				disabled: false
			},
			//删除线按钮配置
			strikethroughConfig: {
				active: false,
				disabled: false
			},
			//下划线按钮配置
			underlineConfig: {
				active: false,
				disabled: false
			},
			//行内代码块按钮配置
			codeConfig: {
				active: false,
				disabled: false
			},
			//上标按钮配置
			superConfig: {
				active: false,
				disabled: false
			},
			//下标按钮配置
			subConfig: {
				active: false,
				disabled: false
			},
			//字号按钮配置
			fontSizeConfig: {
				displayConfig: {
					options: getMenuConfig(this.$editTrans).fontSize,
					value: '',
					width: 70,
					maxHeight: 200
				},
				defaultValue: '',
				disabled: false
			},
			//字体按钮配置
			fontFamilyConfig: {
				displayConfig: {
					options: getMenuConfig(this.$editTrans).fontFamily,
					value: '',
					width: 100,
					maxHeight: 200
				},
				defaultValue: '',
				disabled: false
			},
			//前景颜色按钮配置
			foreColorConfig: {
				selectConfig: {
					options: getMenuConfig(this.$editTrans).foreColor
				},
				value: '', //选择的颜色值
				disabled: false
			},
			//背景颜色按钮配置
			backColorConfig: {
				selectConfig: {
					options: getMenuConfig(this.$editTrans).backColor
				},
				value: '', //选择的颜色值
				disabled: false
			},
			//清除格式按钮配置
			formatClearConfig: {
				disabled: false
			}
		}
	},
	computed: {
		//是否显示
		show: {
			get() {
				return this.modelValue
			},
			set(val) {
				this.$emit('update:modelValue', val)
			}
		}
	},
	components: {
		Layer,
		Tooltip,
		Button,
		Icon,
		Checkbox,
		Colors
	},
	inject: ['$editTrans'],
	methods: {
		//清除格式
		clearFormat() {
			this.$parent.formatText()
		},
		//设置背景色
		setBackColor(value) {
			this.$parent.setTextStyle('background-color', value)
			this.backColorConfig.value = value
			this.$refs.backColor.layerConfig.show = false
		},
		//设置前景色
		setForeColor(value) {
			this.$parent.setTextStyle('color', value)
			this.foreColorConfig.value = value
			this.$refs.foreColor.layerConfig.show = false
		},
		//设置字体
		setFontFamily(name, value) {
			this.$parent.setTextStyle('font-family', value)
			this.fontFamilyConfig.displayConfig.value = value
		},
		//设置字号
		setFontSize(name, value) {
			this.$parent.setTextStyle('font-size', value)
			this.fontSizeConfig.displayConfig.value = value
		},
		//设置上标
		setSuperscript() {
			this.$parent.setTextStyle('vertical-align', 'super')
			this.superConfig.active = this.$parent.queryTextStyle('vertical-align', 'super')
		},
		//设置下标
		setSubscript() {
			this.$parent.setTextStyle('vertical-align', 'sub')
			this.subConfig.active = this.$parent.queryTextStyle('vertical-align', 'sub')
		},
		//设置行内代码样式
		setCodeStyle() {
			this.$parent.setTextMark('data-editify-code', true)
			this.codeConfig.active = this.$parent.queryTextMark('data-editify-code')
		},
		//设置下划线
		setUnderline() {
			this.$parent.setTextStyle('text-decoration', 'underline')
			this.underlineConfig.active = this.$parent.queryTextStyle('text-decoration', 'underline')
		},
		//设置删除线
		setStrikethrough() {
			this.$parent.setTextStyle('text-decoration', 'line-through')
			this.strikethroughConfig.active = this.$parent.queryTextStyle('text-decoration', 'line-through')
		},
		//设置列表
		setList(name) {
			this.$parent.setList(name == 'orderList')
		},
		//斜体
		setItalic() {
			this.$parent.setTextStyle('font-style', 'italic')
			this.italicConfig.active = this.$parent.queryTextStyle('font-style', 'italic')
		},
		//加粗
		setBold() {
			this.$parent.setTextStyle('font-weight', 'bold')
			this.boldConfig.active = this.$parent.queryTextStyle('font-weight', 'bold')
		},
		//设置标题
		setHeading(name, value) {
			this.$parent.setHeading(value)
			this.headingConfig.displayConfig.value = value
		},
		//设置视频
		setVideo(prop) {
			if (this.$parent.disabled) {
				return
			}
			const video = this.$parent.getCurrentParsedomElement('video')
			if (video) {
				//当前是拥有该属性
				if (this.videoConfig[prop]) {
					delete video.marks[prop]
				}
				//当前无该属性
				else {
					video.marks[prop] = true
				}
				this.videoConfig[prop] = !this.videoConfig[prop]
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
			}
		},
		//设置宽度
		setWidth(value) {
			if (this.$parent.disabled) {
				return
			}
			const element = this.$parent.getCurrentParsedomElement('img') || this.$parent.getCurrentParsedomElement('video')
			if (element) {
				const styles = {
					width: value
				}
				if (element.hasStyles()) {
					element.styles = Object.assign(element.styles, styles)
				} else {
					element.styles = styles
				}
				this.$parent.editor.formatElementStack()
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
				//更新工具条位置
				setTimeout(() => {
					this.$refs.layer.setPosition()
				}, 0)
			}
		},
		//修改链接
		modifyLink() {
			if (this.$parent.disabled) {
				return
			}
			if (!this.linkConfig.url) {
				return
			}
			const link = this.$parent.getCurrentParsedomElement('a')
			if (link) {
				link.marks.href = this.linkConfig.url
				if (this.linkConfig.newOpen) {
					link.marks.target = '_blank'
				} else {
					delete link.marks.target
				}
			}
			this.$parent.editor.formatElementStack()
			this.$parent.editor.domRender()
		},
		//输入框获取焦点
		handleInputFocus(e) {
			if (this.$parent.disabled) {
				return
			}
			if (this.$parent.color) {
				e.currentTarget.style.borderColor = this.$parent.color
			}
		},
		//输入框失去焦点
		handleInputBlur(e) {
			if (this.$parent.disabled) {
				return
			}
			e.currentTarget.style.borderColor = ''
		},
		//选择代码语言
		selectLanguage(name, value) {
			if (this.$parent.disabled) {
				return
			}
			const pre = this.$parent.getCurrentParsedomElement('pre')
			if (pre) {
				Object.assign(pre.marks, {
					'data-editify-hljs': value
				})
				this.codeBlockConfig.displayConfig.value = value
				this.$parent.editor.formatElementStack()
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
			}
		},
		//代码块前后插入段落
		insertParagraphWithPre(type = 'up') {
			if (this.$parent.disabled) {
				return
			}
			if (!this.$parent.editor.range.anchor.isEqual(this.$parent.editor.range.focus)) {
				this.$parent.editor.range.anchor.element = this.$parent.editor.range.focus.element
				this.$parent.editor.range.anchor.offset = this.$parent.editor.range.focus.offset
			}
			const pre = this.$parent.getCurrentParsedomElement('pre')
			if (pre) {
				const paragraph = new AlexElement('block', AlexElement.BLOCK_NODE, null, null, null)
				const breakEl = new AlexElement('closed', 'br', null, null, null)
				this.$parent.editor.addElementTo(breakEl, paragraph)
				if (type == 'up') {
					this.$parent.editor.addElementBefore(paragraph, pre)
				} else {
					this.$parent.editor.addElementAfter(paragraph, pre)
				}
				this.$parent.editor.range.anchor.moveToEnd(paragraph)
				this.$parent.editor.range.focus.moveToEnd(paragraph)
				this.$parent.editor.formatElementStack()
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
			}
		},
		//表格前后插入列
		insertTableColumn(type = 'left') {
			if (this.$parent.disabled) {
				return
			}
			if (!this.$parent.editor.range.anchor.isEqual(this.$parent.editor.range.focus)) {
				this.$parent.editor.range.anchor.element = this.$parent.editor.range.focus.element
				this.$parent.editor.range.anchor.offset = this.$parent.editor.range.focus.offset
			}
			const table = this.$parent.getCurrentParsedomElement('table')
			const column = this.$parent.getCurrentParsedomElement('td')
			const tbody = this.$parent.getCurrentParsedomElement('tbody')
			if (column && table && tbody) {
				const rows = tbody.children
				const index = column.parent.children.findIndex(item => {
					return item.isEqual(column)
				})
				//插入列
				rows.forEach(row => {
					const newColumn = column.clone(false)
					const breakEl = new AlexElement('closed', 'br', null, null, null)
					this.$parent.editor.addElementTo(breakEl, newColumn)
					if (type == 'left') {
						this.$parent.editor.addElementTo(newColumn, row, index)
					} else {
						this.$parent.editor.addElementTo(newColumn, row, index + 1)
					}
				})
				//插入col
				const colgroup = table.children.find(item => {
					return item.parsedom == 'colgroup'
				})
				const col = new AlexElement('closed', 'col', null, null, null)
				if (type == 'left') {
					this.$parent.editor.addElementTo(col, colgroup, index)
				} else {
					this.$parent.editor.addElementTo(col, colgroup, index + 1)
				}
				//渲染
				this.$parent.editor.formatElementStack()
				if (type == 'left') {
					const previousColumn = this.$parent.editor.getPreviousElement(column)
					this.$parent.editor.range.anchor.moveToStart(previousColumn)
					this.$parent.editor.range.focus.moveToStart(previousColumn)
				} else {
					const nextColumn = this.$parent.editor.getNextElement(column)
					this.$parent.editor.range.anchor.moveToStart(nextColumn)
					this.$parent.editor.range.focus.moveToStart(nextColumn)
				}
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
			}
		},
		//表格插入前后插入行
		insertTableRow(type = 'up') {
			if (this.$parent.disabled) {
				return
			}
			if (!this.$parent.editor.range.anchor.isEqual(this.$parent.editor.range.focus)) {
				this.$parent.editor.range.anchor.element = this.$parent.editor.range.focus.element
				this.$parent.editor.range.anchor.offset = this.$parent.editor.range.focus.offset
			}
			const table = this.$parent.getCurrentParsedomElement('table')
			const row = this.$parent.getCurrentParsedomElement('tr')
			if (table && row) {
				const newRow = row.clone()
				newRow.children.forEach(column => {
					column.children = []
					const breakEl = new AlexElement('closed', 'br', null, null, null)
					this.$parent.editor.addElementTo(breakEl, column)
				})
				if (type == 'up') {
					this.$parent.editor.addElementBefore(newRow, row)
				} else {
					this.$parent.editor.addElementAfter(newRow, row)
				}
				this.$parent.editor.formatElementStack()
				this.$parent.editor.range.anchor.moveToStart(newRow)
				this.$parent.editor.range.focus.moveToStart(newRow)
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
				//更新工具条位置
				setTimeout(() => {
					this.$refs.layer.setPosition()
				}, 0)
			}
		},
		//表格前后插入段落
		insertParagraphWithTable(type = 'up') {
			if (this.$parent.disabled) {
				return
			}
			const table = this.$parent.getCurrentParsedomElement('table')
			if (table) {
				const paragraph = new AlexElement('block', AlexElement.BLOCK_NODE, null, null, null)
				const breakEl = new AlexElement('closed', 'br', null, null, null)
				this.$parent.editor.addElementTo(breakEl, paragraph)
				if (type == 'up') {
					this.$parent.editor.addElementBefore(paragraph, table)
				} else {
					this.$parent.editor.addElementAfter(paragraph, table)
				}
				this.$parent.editor.range.anchor.moveToEnd(paragraph)
				this.$parent.editor.range.focus.moveToEnd(paragraph)
				this.$parent.editor.formatElementStack()
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
			}
		},
		//删除表格行
		deleteTableRow() {
			if (this.$parent.disabled) {
				return
			}
			if (!this.$parent.editor.range.anchor.isEqual(this.$parent.editor.range.focus)) {
				this.$parent.editor.range.anchor.element = this.$parent.editor.range.focus.element
				this.$parent.editor.range.anchor.offset = this.$parent.editor.range.focus.offset
			}
			const table = this.$parent.getCurrentParsedomElement('table')
			const row = this.$parent.getCurrentParsedomElement('tr')
			if (table && row) {
				const parent = row.parent
				if (parent.children.length == 1) {
					this.$parent.deleteByParsedom('table')
					return
				}
				const previousRow = this.$parent.editor.getPreviousElement(row)
				const nextRow = this.$parent.editor.getNextElement(row)
				row.toEmpty()
				this.$parent.editor.formatElementStack()
				if (previousRow) {
					this.$parent.editor.range.anchor.moveToEnd(previousRow.children[0])
					this.$parent.editor.range.focus.moveToEnd(previousRow.children[0])
				} else {
					this.$parent.editor.range.anchor.moveToEnd(nextRow.children[0])
					this.$parent.editor.range.focus.moveToEnd(nextRow.children[0])
				}
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
				//更新工具条位置
				setTimeout(() => {
					this.$refs.layer.setPosition()
				}, 0)
			}
		},
		//删除表格列
		deleteTableColumn() {
			if (this.$parent.disabled) {
				return
			}
			if (!this.$parent.editor.range.anchor.isEqual(this.$parent.editor.range.focus)) {
				this.$parent.editor.range.anchor.element = this.$parent.editor.range.focus.element
				this.$parent.editor.range.anchor.offset = this.$parent.editor.range.focus.offset
			}
			const column = this.$parent.getCurrentParsedomElement('td')
			const tbody = this.$parent.getCurrentParsedomElement('tbody')
			const table = this.$parent.getCurrentParsedomElement('table')
			if (column && table && tbody) {
				const rows = tbody.children
				const parent = column.parent
				if (parent.children.length == 1) {
					this.$parent.deleteByParsedom('table')
					return
				}
				const previousColumn = this.$parent.editor.getPreviousElement(column)
				const nextColumn = this.$parent.editor.getNextElement(column)
				const index = column.parent.children.findIndex(item => {
					return item.isEqual(column)
				})
				//删除列
				rows.forEach(row => {
					row.children[index].toEmpty()
				})
				//删除col
				const colgroup = table.children.find(item => {
					return item.parsedom == 'colgroup'
				})
				colgroup.children[index].toEmpty()
				//渲染
				this.$parent.editor.formatElementStack()
				if (previousColumn) {
					this.$parent.editor.range.anchor.moveToEnd(previousColumn)
					this.$parent.editor.range.focus.moveToEnd(previousColumn)
				} else {
					this.$parent.editor.range.anchor.moveToEnd(nextColumn)
					this.$parent.editor.range.focus.moveToEnd(nextColumn)
				}
				this.$parent.editor.domRender()
				this.$parent.editor.rangeRender()
			}
		},
		//浮层显示时
		layerShow() {
			//代码块初始化展示设置
			if (this.type == 'codeBlock') {
				const pre = this.$parent.getCurrentParsedomElement('pre')
				if (pre) {
					this.codeBlockConfig.displayConfig.value = pre.marks['data-editify-hljs'] || ''
				}
			}
			//链接初始化展示
			else if (this.type == 'link') {
				const link = this.$parent.getCurrentParsedomElement('a')
				if (link) {
					this.linkConfig.url = link.marks['href']
					this.linkConfig.newOpen = true
				}
			}
			//视频初始化显示
			else if (this.type == 'video') {
				const video = this.$parent.getCurrentParsedomElement('video')
				if (video) {
					this.videoConfig.autoplay = !!video.marks['autoplay']
					this.videoConfig.loop = !!video.marks['loop']
					this.videoConfig.controls = !!video.marks['controls']
					this.videoConfig.muted = !!video.marks['muted']
				}
			}
			//文本工具条初始化显示
			else if (this.type == 'text') {
				//获取选区的元素
				const result = this.$parent.editor.getElementsByRange(true, false)
				//显示已设置标题
				const findHeadingItem = this.headingConfig.displayConfig.options.find(item => {
					return result.every(el => {
						if (el.element.isBlock()) {
							return el.element.parsedom == item.value
						}
						return el.element.getBlock().parsedom == item.value
					})
				})
				this.headingConfig.displayConfig.value = findHeadingItem ? findHeadingItem.value : this.headingConfig.defaultValue
				//有序列表按钮是否激活
				this.orderListConfig.active = result.every(item => {
					if (item.element.isBlock()) {
						return blockIsList(item.element, true)
					} else {
						const block = item.element.getBlock()
						return blockIsList(block, true)
					}
				})
				//无序列表按钮是否激活
				this.unorderListConfig.active = result.every(item => {
					if (item.element.isBlock()) {
						return blockIsList(item.element, false)
					} else {
						const block = item.element.getBlock()
						return blockIsList(block, false)
					}
				})
				//粗体按钮是否激活
				this.boldConfig.active = this.$parent.queryTextStyle('font-weight', 'bold')
				//斜体按钮是否激活
				this.italicConfig.active = this.$parent.queryTextStyle('font-style', 'italic')
				//删除线按钮是否激活
				this.strikethroughConfig.active = this.$parent.queryTextStyle('text-decoration', 'line-through')
				//下划线按钮是否激活
				this.underlineConfig.active = this.$parent.queryTextStyle('text-decoration', 'underline')
				//下划线按钮是否激活
				this.codeConfig.active = this.$parent.queryTextMark('data-editify-code', true)
				//上标按钮是否激活
				this.superConfig.active = this.$parent.queryTextStyle('vertical-align', 'super')
				//下标按钮是否激活
				this.subConfig.active = this.$parent.queryTextStyle('vertical-align', 'sub')
				//显示已选择字号
				const findFontItem = this.fontSizeConfig.displayConfig.options.find(item => {
					return this.$parent.queryTextStyle('font-size', item.value)
				})
				this.fontSizeConfig.displayConfig.value = findFontItem ? findFontItem.value : this.fontSizeConfig.defaultValue
				//显示已选择字体
				const findFamilyItem = this.fontFamilyConfig.displayConfig.options.find(item => {
					return this.$parent.queryTextStyle('font-family', item.value)
				})
				this.fontFamilyConfig.displayConfig.value = findFamilyItem ? findFamilyItem.value : this.fontFamilyConfig.defaultValue
				//显示已选择的前景色
				const findForeColorItem = this.foreColorConfig.selectConfig.options.find(item => {
					return this.$parent.queryTextStyle('color', item.value)
				})
				this.foreColorConfig.value = findForeColorItem ? findForeColorItem.value : ''
			}
		}
	}
}
</script>
<style lang="less" scoped>
.editify-toolbar {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
	padding: 6px 10px;

	.editify-icon-rotate {
		transform: rotate(180deg);
	}

	:deep(.editify-button-slot .editify-icon) {
		font-size: @font-size-large;
	}
}

.editify-toolbar-link {
	display: block;
	width: 280px;
	padding: 4px;

	.editify-toolbar-link-label {
		display: block;
		text-align: left;
		margin-bottom: 10px;
		font-size: @font-size-small;
		color: @font-color-small;
	}

	input {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		display: block;
		width: 100%;
		margin: 0 0 10px 0;
		padding: 4px 2px;
		border: none;
		font-size: @font-size-small;
		color: @font-color-small;
		border-bottom: 1px solid @border-color;
		line-height: 1.5;
		transition: border-color 500ms;
		background-color: transparent;
		outline: none;

		&::-webkit-input-placeholder,
		&::placeholder {
			color: @font-color-disabled;
			font-family: inherit;
			font-size: inherit;
			vertical-align: middle;
		}

		&[disabled] {
			background-color: transparent;
			opacity: 0.6;
		}
	}

	.editify-toolbar-link-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		font-size: @font-size-small;
		color: @font-color-small;

		.editify-toolbar-link-operations {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			& > span,
			& > a {
				cursor: pointer;
				opacity: 0.8;
				transition: all 200ms;

				&:hover {
					opacity: 1;
				}
			}

			& > span {
				margin-right: 15px;
			}

			& > a {
				text-decoration: none;
			}
		}
	}
}
</style>

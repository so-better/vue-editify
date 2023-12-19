<template>
	<Layer v-model="show" ref="layer" :node="node" border placement="bottom-start" @show="layerShow" :useRange="type == 'text'">
		<div class="editify-toolbar" ref="toolbar" :style="config.style">
			<!-- 链接工具条 -->
			<template v-if="type == 'link'">
				<div class="editify-toolbar-link">
					<div class="editify-toolbar-link-label">{{ $editTrans('linkAddress') }}</div>
					<input @input="modifyLink" @focus="handleInputFocus" @blur="handleInputBlur" :placeholder="$editTrans('linkUrlEnterPlaceholder')" v-model.trim="linkConfig.url" type="url" />
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
				<Button @operate="setWidth('30%')" name="set30Width" :title="$editTrans('width30')" :tooltip="config.tooltip" :color="$parent.color"> 30% </Button>
				<!-- 设置宽度50% -->
				<Button @operate="setWidth('50%')" name="set50Width" :title="$editTrans('width50')" :tooltip="config.tooltip" :color="$parent.color"> 50% </Button>
				<!-- 设置宽度100% -->
				<Button rightBorder @operate="setWidth('100%')" name="set100Width" :title="$editTrans('width100')" :tooltip="config.tooltip" :color="$parent.color"> 100% </Button>
				<!-- 设置宽度auto -->
				<Button @operate="setWidth('auto')" name="setAutoWidth" :title="$editTrans('auto')" :tooltip="config.tooltip" :color="$parent.color">
					<Icon value="auto-width"></Icon>
				</Button>
				<!-- 删除图片 -->
				<Button @operate="$parent.deleteByParsedom('img')" name="deleteImage" :title="$editTrans('deleteImage')" :tooltip="config.tooltip" :color="$parent.color">
					<Icon value="delete"></Icon>
				</Button>
			</template>
			<!-- 视频工具条 -->
			<template v-else-if="type == 'video'">
				<!-- 设置宽度30% -->
				<Button @operate="setWidth('30%')" name="set30Width" :title="$editTrans('width30')" :tooltip="config.tooltip" :color="$parent.color"> 30% </Button>
				<!-- 设置宽度50% -->
				<Button @operate="setWidth('50%')" name="set50Width" :title="$editTrans('width50')" :tooltip="config.tooltip" :color="$parent.color"> 50% </Button>
				<!-- 设置宽度100% -->
				<Button @operate="setWidth('100%')" name="set100Width" :title="$editTrans('width100')" :tooltip="config.tooltip" :color="$parent.color"> 100% </Button>
				<!-- 设置宽度auto -->
				<Button rightBorder @operate="setWidth('auto')" name="setAutoWidth" :title="$editTrans('auto')" :tooltip="config.tooltip" :color="$parent.color">
					<Icon value="auto-width"></Icon>
				</Button>
				<!-- 自动播放 -->
				<Button @operate="setVideo" name="autoplay" :title="videoConfig.autoplay ? $editTrans('disabledAutoplay') : $editTrans('autoplay')" :tooltip="config.tooltip" :color="$parent.color">
					<Icon :value="videoConfig.autoplay ? 'autoplay' : 'stop'"></Icon>
				</Button>
				<!-- 循环播放 -->
				<Button @operate="setVideo" name="loop" :title="videoConfig.loop ? $editTrans('disabledLoop') : $editTrans('loop')" :tooltip="config.tooltip" :color="$parent.color">
					<Icon :value="videoConfig.loop ? 'loop' : 'single'"></Icon>
				</Button>
				<!-- 是否静音 -->
				<Button @operate="setVideo" name="muted" :title="videoConfig.muted ? $editTrans('unmuted') : $editTrans('muted')" :tooltip="config.tooltip" :color="$parent.color">
					<Icon :value="videoConfig.muted ? 'muted' : 'unmuted'"></Icon>
				</Button>
				<!-- 是否显示控制器 -->
				<Button leftBorder @operate="setVideo" name="controls" :title="$editTrans('controls')" :tooltip="config.tooltip" :color="$parent.color">
					<Icon value="controls"></Icon>
				</Button>
				<!-- 删除视频 -->
				<Button @operate="$parent.deleteByParsedom('video')" name="deleteVideo" :title="$editTrans('deleteVideo')" :tooltip="config.tooltip" :color="$parent.color">
					<Icon value="delete"></Icon>
				</Button>
			</template>
			<!-- 表格工具条 -->
			<template v-else-if="type == 'table'">
				<!-- 表格前插入段落 -->
				<Button @operate="insertParagraphWithTable('up')" name="textWrapUp" :title="$editTrans('textWrapUp')" :tooltip="config.tooltip" :color="$parent.color">
					<Icon value="text-wrap" class="editify-icon-rotate"></Icon>
				</Button>
				<!-- 表格后插入段落 -->
				<Button @operate="insertParagraphWithTable('down')" rightBorder name="textWrapDown" :title="$editTrans('textWrapDown')" :tooltip="config.tooltip" :color="$parent.color">
					<Icon value="text-wrap"></Icon>
				</Button>
				<!-- 向前插入行 -->
				<Button @operate="insertTableRow('up')" name="insertRowTop" :title="$editTrans('insertRowTop')" :tooltip="config.tooltip" :color="$parent.color">
					<Icon value="insert-row-top"></Icon>
				</Button>
				<!-- 向后插入行 -->
				<Button @operate="insertTableRow('down')" name="insertRowBottom" :title="$editTrans('insertRowBottom')" :tooltip="config.tooltip" :color="$parent.color">
					<Icon value="insert-row-bottom"></Icon>
				</Button>
				<!-- 删除行 -->
				<Button @operate="deleteTableRow" rightBorder name="deleteRow" :title="$editTrans('deleteRow')" :tooltip="config.tooltip" :color="$parent.color">
					<Icon value="delete-row"></Icon>
				</Button>
				<!-- 向前插入列 -->
				<Button @operate="insertTableColumn('left')" name="insertColumnLeft" :title="$editTrans('insertColumnLeft')" :tooltip="config.tooltip" :color="$parent.color">
					<Icon value="insert-column-left"></Icon>
				</Button>
				<!-- 向后插入列 -->
				<Button @operate="insertTableColumn('right')" name="insertColumnRight" :title="$editTrans('insertColumnRight')" :tooltip="config.tooltip" :color="$parent.color">
					<Icon value="insert-column-right"></Icon>
				</Button>
				<!-- 删除列 -->
				<Button @operate="deleteTableColumn" rightBorder name="deleteColumn" :title="$editTrans('deleteColumn')" :tooltip="config.tooltip" :color="$parent.color">
					<Icon value="delete-column"></Icon>
				</Button>
				<!-- 删除表格 -->
				<Button @operate="$parent.deleteByParsedom('table')" name="deleteTable" :title="$editTrans('deleteTable')" :tooltip="config.tooltip" :color="$parent.color">
					<Icon value="delete-table"></Icon>
				</Button>
			</template>
			<!-- 代码块工具条 -->
			<template v-if="type == 'codeBlock'">
				<!-- 代码块前插入段落 -->
				<Button @operate="insertParagraphWithPre('up')" name="textWrapUp" :title="$editTrans('textWrapUp')" :tooltip="config.tooltip" :color="$parent.color">
					<Icon value="text-wrap" class="editify-icon-rotate"></Icon>
				</Button>
				<!-- 代码块后插入段落 -->
				<Button @operate="insertParagraphWithPre('down')" name="textWrapDown" :title="$editTrans('textWrapDown')" :tooltip="config.tooltip" :color="$parent.color">
					<Icon value="text-wrap"></Icon>
				</Button>
				<!-- 代码块语言选择 -->
				<Button v-if="languageConfig.show" name="languages" type="display" :title="$editTrans('selectLanguages')" :tooltip="config.tooltip" :leftBorder="languageConfig.leftBorder" :rightBorder="languageConfig.rightBorder" :display-config="languageConfig.displayConfig" :color="$parent.color" :active="languageConfig.active" :disabled="languageConfig.disabled" @operate="selectLanguage"></Button>
			</template>
			<!-- 文本工具条 -->
			<template v-else-if="type == 'text'">
				<!-- 设置段落和标题 -->
				<Button v-if="headingConfig.show" name="heading" type="display" :title="$editTrans('heading')" :tooltip="config.tooltip" :display-config="headingConfig.displayConfig" :leftBorder="headingConfig.leftBorder" :rightBorder="headingConfig.rightBorder" :color="$parent.color" :active="headingConfig.active" :disabled="headingConfig.disabled" @operate="setHeading"></Button>
				<!-- 对齐方式 -->
				<Button v-if="alignConfig.show" name="align" type="select" :title="$editTrans('align')" :tooltip="config.tooltip" :select-config="alignConfig.selectConfig" :leftBorder="alignConfig.leftBorder" :rightBorder="alignConfig.rightBorder" :color="$parent.color" :active="alignConfig.active" :disabled="alignConfig.disabled" @operate="setAlign">
					<Icon value="align-left"></Icon>
				</Button>
				<!-- 有序列表 -->
				<Button v-if="orderListConfig.show" name="orderList" :title="$editTrans('orderList')" :tooltip="config.tooltip" :leftBorder="orderListConfig.leftBorder" :rightBorder="orderListConfig.rightBorder" :color="$parent.color" :active="orderListConfig.active" :disabled="orderListConfig.disabled" @operate="setList">
					<Icon value="list-ordered"></Icon>
				</Button>
				<!-- 无序列表 -->
				<Button v-if="unorderListConfig.show" name="unorderList" :title="$editTrans('unorderList')" :tooltip="config.tooltip" :leftBorder="unorderListConfig.leftBorder" :rightBorder="unorderListConfig.rightBorder" :color="$parent.color" :active="unorderListConfig.active" :disabled="unorderListConfig.disabled" @operate="setList">
					<Icon value="list-unordered"></Icon>
				</Button>
				<!-- 任务列表 -->
				<Button v-if="taskConfig.show" name="task" :title="$editTrans('task')" :tooltip="config.tooltip" :leftBorder="taskConfig.leftBorder" :rightBorder="taskConfig.rightBorder" :color="$parent.color" :active="taskConfig.active" :disabled="taskConfig.disabled" @operate="setTask">
					<Icon value="task"></Icon>
				</Button>
				<!-- 加粗  -->
				<Button v-if="boldConfig.show" name="bold" :title="$editTrans('bold')" :tooltip="config.tooltip" :leftBorder="boldConfig.leftBorder" :rightBorder="boldConfig.rightBorder" :color="$parent.color" :active="boldConfig.active" :disabled="boldConfig.disabled" @operate="setBold">
					<Icon value="bold"></Icon>
				</Button>
				<!-- 斜体 -->
				<Button v-if="italicConfig.show" name="italic" :title="$editTrans('italic')" :tooltip="config.tooltip" :leftBorder="italicConfig.leftBorder" :rightBorder="italicConfig.rightBorder" :color="$parent.color" :active="italicConfig.active" :disabled="italicConfig.disabled" @operate="setItalic">
					<Icon value="italic"></Icon>
				</Button>
				<!-- 删除线 -->
				<Button v-if="strikethroughConfig.show" name="strikethrough" :title="$editTrans('strikethrough')" :tooltip="config.tooltip" :leftBorder="strikethroughConfig.leftBorder" :rightBorder="strikethroughConfig.rightBorder" :color="$parent.color" :active="strikethroughConfig.active" :disabled="strikethroughConfig.disabled" @operate="setStrikethrough">
					<Icon value="strikethrough"></Icon>
				</Button>
				<!-- 下划线 -->
				<Button v-if="underlineConfig.show" name="underline" :title="$editTrans('underline')" :tooltip="config.tooltip" :leftBorder="underlineConfig.leftBorder" :rightBorder="underlineConfig.rightBorder" :color="$parent.color" :active="underlineConfig.active" :disabled="underlineConfig.disabled" @operate="setUnderline">
					<Icon value="underline"></Icon>
				</Button>
				<!-- 行内代码块 -->
				<Button v-if="codeConfig.show" name="code" :title="$editTrans('code')" :tooltip="config.tooltip" :leftBorder="codeConfig.leftBorder" :rightBorder="codeConfig.rightBorder" :color="$parent.color" :active="codeConfig.active" :disabled="codeConfig.disabled" @operate="setCodeStyle">
					<Icon value="code"></Icon>
				</Button>
				<!-- 上标 -->
				<Button v-if="superConfig.show" name="superscript" :title="$editTrans('superscript')" :tooltip="config.tooltip" :leftBorder="superConfig.leftBorder" :rightBorder="superConfig.rightBorder" :color="$parent.color" :active="superConfig.active" :disabled="superConfig.disabled" @operate="setSuperscript">
					<Icon value="superscript"></Icon>
				</Button>
				<!-- 下标 -->
				<Button v-if="subConfig.show" name="subscript" :title="$editTrans('subscript')" :tooltip="config.tooltip" :leftBorder="subConfig.leftBorder" :rightBorder="subConfig.rightBorder" :color="$parent.color" :active="subConfig.active" :disabled="subConfig.disabled" @operate="setSubscript">
					<Icon value="subscript"></Icon>
				</Button>
				<!-- 字号大小 -->
				<Button v-if="fontSizeConfig.show" name="fontSize" type="display" :title="$editTrans('fontSize')" :tooltip="config.tooltip" :display-config="fontSizeConfig.displayConfig" :leftBorder="fontSizeConfig.leftBorder" :rightBorder="fontSizeConfig.rightBorder" :color="$parent.color" :active="fontSizeConfig.active" :disabled="fontSizeConfig.disabled" @operate="setFontSize"></Button>
				<!-- 字体 -->
				<Button v-if="fontFamilyConfig.show" name="fontFamily" type="display" :title="$editTrans('fontFamily')" :tooltip="config.tooltip" :display-config="fontFamilyConfig.displayConfig" :leftBorder="fontFamilyConfig.leftBorder" :rightBorder="fontFamilyConfig.rightBorder" :color="$parent.color" :active="fontFamilyConfig.active" :disabled="fontFamilyConfig.disabled" @operate="setFontFamily"></Button>
				<!-- 行高 -->
				<Button v-if="lineHeightConfig.show" name="lineHeight" type="display" :title="$editTrans('lineHeight')" :tooltip="config.tooltip" :display-config="lineHeightConfig.displayConfig" :leftBorder="lineHeightConfig.leftBorder" :rightBorder="lineHeightConfig.rightBorder" :color="$parent.color" :active="lineHeightConfig.active" :disabled="lineHeightConfig.disabled" @operate="setLineHeight"></Button>
				<!-- 前景色 -->
				<Button v-if="foreColorConfig.show" name="foreColor" type="select" :title="$editTrans('foreColor')" :tooltip="config.tooltip" :select-config="foreColorConfig.selectConfig" :leftBorder="foreColorConfig.leftBorder" :rightBorder="foreColorConfig.rightBorder" :color="$parent.color" :active="foreColorConfig.active" :disabled="foreColorConfig.disabled" hideScroll ref="foreColor">
					<Icon value="font-color"></Icon>
					<template #layer="{ options }">
						<Colors :tooltip="config.tooltip" :color="$parent.color" :value="foreColorConfig.value" @change="setForeColor" :data="options"></Colors>
					</template>
				</Button>
				<!-- 背景色 -->
				<Button v-if="backColorConfig.show" name="backColor" type="select" :title="$editTrans('backColor')" :tooltip="config.tooltip" :select-config="backColorConfig.selectConfig" :leftBorder="backColorConfig.leftBorder" :rightBorder="backColorConfig.rightBorder" :color="$parent.color" :active="backColorConfig.active" :disabled="backColorConfig.disabled" hideScroll ref="backColor">
					<Icon value="brush"></Icon>
					<template #layer="{ options }">
						<Colors :tooltip="config.tooltip" :color="$parent.color" :value="backColorConfig.value" @change="setBackColor" :data="options"></Colors>
					</template>
				</Button>
				<!-- 清除样式 -->
				<Button v-if="formatClearConfig.show" name="formatClear" :title="$editTrans('formatClear')" :tooltip="config.tooltip" :leftBorder="formatClearConfig.leftBorder" :rightBorder="formatClearConfig.rightBorder" :color="$parent.color" :active="formatClearConfig.active" :disabled="formatClearConfig.disabled" @operate="clearFormat">
					<Icon value="format-clear"></Icon>
				</Button>
			</template>
		</div>
	</Layer>
</template>
<script>
import Layer from '../base/Layer'
import Tooltip from '../base/Tooltip'
import Button from '../base/Button'
import Icon from '../base/Icon'
import Checkbox from '../base/Checkbox'
import Colors from './Colors'
import { AlexElement } from 'alex-editor'
import Dap from 'dap-util'
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
		},
		//工具条配置
		config: {
			type: Object,
			default: null
		}
	},
	data() {
		return {
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
			//代码块选择语言按钮配置
			languageConfig: {
				show: this.config.codeBlock.languages.show,
				displayConfig: {
					options: this.config.codeBlock.languages.options,
					value: '',
					width: this.config.codeBlock.languages.width,
					maxHeight: this.config.codeBlock.languages.maxHeight
				},
				leftBorder: this.config.codeBlock.languages.leftBorder,
				rightBorder: this.config.codeBlock.languages.rightBorder,
				active: false,
				disabled: false
			},
			//标题按钮配置
			headingConfig: {
				show: this.config.text.heading.show,
				displayConfig: {
					options: this.config.text.heading.options,
					value: '',
					width: this.config.text.heading.width,
					maxHeight: this.config.text.heading.maxHeight
				},
				defaultValue: this.config.text.heading.defaultValue,
				leftBorder: this.config.text.heading.leftBorder,
				rightBorder: this.config.text.heading.rightBorder,
				active: false,
				disabled: false
			},
			//对齐方式按钮配置
			alignConfig: {
				show: this.config.text.align.show,
				selectConfig: {
					options: this.config.text.align.options,
					width: this.config.text.align.width,
					maxHeight: this.config.text.align.maxHeight
				},
				leftBorder: this.config.text.align.leftBorder,
				rightBorder: this.config.text.align.rightBorder,
				active: false,
				disabled: false
			},
			//有序列表按钮配置
			orderListConfig: {
				show: this.config.text.orderList.show,
				leftBorder: this.config.text.orderList.leftBorder,
				rightBorder: this.config.text.orderList.rightBorder,
				active: false,
				disabled: false
			},
			//无序列表按钮配置
			unorderListConfig: {
				show: this.config.text.unorderList.show,
				leftBorder: this.config.text.unorderList.leftBorder,
				rightBorder: this.config.text.unorderList.rightBorder,
				active: false,
				disabled: false
			},
			//任务列表按钮配置
			taskConfig: {
				show: this.config.text.task.show,
				leftBorder: this.config.text.task.leftBorder,
				rightBorder: this.config.text.task.rightBorder,
				active: false,
				disabled: false
			},
			//粗体按钮配置
			boldConfig: {
				show: this.config.text.bold.show,
				leftBorder: this.config.text.bold.leftBorder,
				rightBorder: this.config.text.bold.rightBorder,
				active: false,
				disabled: false
			},
			//斜体按钮配置
			italicConfig: {
				show: this.config.text.italic.show,
				leftBorder: this.config.text.italic.leftBorder,
				rightBorder: this.config.text.italic.rightBorder,
				active: false,
				disabled: false
			},
			//删除线按钮配置
			strikethroughConfig: {
				show: this.config.text.strikethrough.show,
				leftBorder: this.config.text.strikethrough.leftBorder,
				rightBorder: this.config.text.strikethrough.rightBorder,
				active: false,
				disabled: false
			},
			//下划线按钮配置
			underlineConfig: {
				show: this.config.text.underline.show,
				leftBorder: this.config.text.underline.leftBorder,
				rightBorder: this.config.text.underline.rightBorder,
				active: false,
				disabled: false
			},
			//行内代码块按钮配置
			codeConfig: {
				show: this.config.text.code.show,
				leftBorder: this.config.text.code.leftBorder,
				rightBorder: this.config.text.code.rightBorder,
				active: false,
				disabled: false
			},
			//上标按钮配置
			superConfig: {
				show: this.config.text.super.show,
				leftBorder: this.config.text.super.leftBorder,
				rightBorder: this.config.text.super.rightBorder,
				active: false,
				disabled: false
			},
			//下标按钮配置
			subConfig: {
				show: this.config.text.sub.show,
				leftBorder: this.config.text.sub.leftBorder,
				rightBorder: this.config.text.sub.rightBorder,
				active: false,
				disabled: false
			},
			//字号按钮配置
			fontSizeConfig: {
				show: this.config.text.fontSize.show,
				displayConfig: {
					options: this.config.text.fontSize.options,
					value: '',
					width: this.config.text.fontSize.width,
					maxHeight: this.config.text.fontSize.maxHeight
				},
				defaultValue: this.config.text.fontSize.defaultValue,
				leftBorder: this.config.text.fontSize.leftBorder,
				rightBorder: this.config.text.fontSize.rightBorder,
				active: false,
				disabled: false
			},
			//字体按钮配置
			fontFamilyConfig: {
				show: this.config.text.fontFamily.show,
				displayConfig: {
					options: this.config.text.fontFamily.options,
					value: '',
					width: this.config.text.fontFamily.width,
					maxHeight: this.config.text.fontFamily.maxHeight
				},
				defaultValue: this.config.text.fontFamily.defaultValue,
				leftBorder: this.config.text.fontFamily.leftBorder,
				rightBorder: this.config.text.fontFamily.rightBorder,
				active: false,
				disabled: false
			},
			//行高按钮配置
			lineHeightConfig: {
				show: this.config.text.lineHeight.show,
				displayConfig: {
					options: this.config.text.lineHeight.options,
					value: '',
					width: this.config.text.lineHeight.width,
					maxHeight: this.config.text.lineHeight.maxHeight
				},
				defaultValue: this.config.text.lineHeight.defaultValue,
				leftBorder: this.config.text.lineHeight.leftBorder,
				rightBorder: this.config.text.lineHeight.rightBorder,
				active: false,
				disabled: false
			},
			//前景颜色按钮配置
			foreColorConfig: {
				show: this.config.text.foreColor.show,
				selectConfig: {
					options: this.config.text.foreColor.options
				},
				leftBorder: this.config.text.foreColor.leftBorder,
				rightBorder: this.config.text.foreColor.rightBorder,
				value: '', //选择的颜色值
				active: false,
				disabled: false
			},
			//背景颜色按钮配置
			backColorConfig: {
				show: this.config.text.backColor.show,
				selectConfig: {
					options: this.config.text.backColor.options
				},
				leftBorder: this.config.text.backColor.leftBorder,
				rightBorder: this.config.text.backColor.rightBorder,
				value: '', //选择的颜色值
				active: false,
				disabled: false
			},
			//清除格式按钮配置
			formatClearConfig: {
				show: this.config.text.formatClear.show,
				leftBorder: this.config.text.formatClear.leftBorder,
				rightBorder: this.config.text.formatClear.rightBorder,
				active: false,
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
			this.$refs.backColor.hideLayer()
		},
		//设置前景色
		setForeColor(value) {
			this.$parent.setTextStyle('color', value)
			this.$refs.foreColor.hideLayer()
		},
		//设置行高
		setLineHeight(name, value) {
			this.$parent.setLineHeight(value)
		},
		//设置字体
		setFontFamily(name, value) {
			this.$parent.setTextStyle('font-family', value)
		},
		//设置字号
		setFontSize(name, value) {
			this.$parent.setTextStyle('font-size', value)
		},
		//设置上标
		setSuperscript() {
			this.$parent.setTextStyle('vertical-align', 'super')
		},
		//设置下标
		setSubscript() {
			this.$parent.setTextStyle('vertical-align', 'sub')
		},
		//设置行内代码样式
		setCodeStyle() {
			this.$parent.setTextMark('data-editify-code', true)
		},
		//设置下划线
		setUnderline() {
			this.$parent.setTextStyle('text-decoration', 'underline')
		},
		//设置删除线
		setStrikethrough() {
			this.$parent.setTextStyle('text-decoration', 'line-through')
		},
		//设置列表
		setList(name) {
			this.$parent.setList(name == 'orderList')
		},
		//设置任务列表
		setTask() {
			this.$parent.setTask()
		},
		//斜体
		setItalic() {
			this.$parent.setTextStyle('font-style', 'italic')
		},
		//加粗
		setBold() {
			this.$parent.setTextStyle('font-weight', 'bold')
		},
		//设置标题
		setHeading(name, value) {
			this.$parent.setHeading(value)
		},
		//设置对齐方式
		setAlign(name, value) {
			this.$parent.setAlign(value)
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
			const element = this.$parent.getCurrentParsedomElement('img') || this.$parent.getCurrentParsedomElement('video', true)
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
			const column = this.$parent.getCurrentParsedomElement('td', true)
			const tbody = this.$parent.getCurrentParsedomElement('tbody', true)
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
			const row = this.$parent.getCurrentParsedomElement('tr', true)
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
			const row = this.$parent.getCurrentParsedomElement('tr', true)
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
			const tbody = this.$parent.getCurrentParsedomElement('tbody', true)
			const table = this.$parent.getCurrentParsedomElement('table', true)
			if (column && table && tbody) {
				const rows = tbody.children
				const parent = column.parent
				if (parent.children.length == 1) {
					this.$parent.deleteByParsedom('table', true)
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
			//获取选区的元素
			const result = this.$parent.editor.getElementsByRange(true, false, true)
			//代码块初始化展示设置
			if (this.type == 'codeBlock') {
				const pre = this.$parent.getCurrentParsedomElement('pre', true)
				if (pre) {
					this.languageConfig.displayConfig.value = pre.marks['data-editify-hljs'] || ''
				}
			}
			//链接初始化展示
			else if (this.type == 'link') {
				const link = this.$parent.getCurrentParsedomElement('a', true)
				if (link) {
					this.linkConfig.url = link.marks['href']
					this.linkConfig.newOpen = link.marks['target'] == '_blank'
				}
			}
			//视频初始化显示
			else if (this.type == 'video') {
				const video = this.$parent.getCurrentParsedomElement('video', true)
				if (video) {
					this.videoConfig.autoplay = !!video.marks['autoplay']
					this.videoConfig.loop = !!video.marks['loop']
					this.videoConfig.controls = !!video.marks['controls']
					this.videoConfig.muted = !!video.marks['muted']
				}
			}
			//文本工具条初始化显示
			else if (this.type == 'text') {
				//额外禁用判定
				const extraDisabled = name => {
					if (typeof this.config.extraDisabled == 'function') {
						return this.config.extraDisabled.apply(this.$parent, [name]) || false
					}
					return false
				}
				//显示已设置标题
				const findHeadingItem = this.headingConfig.displayConfig.options.find(item => {
					let val = item
					if (Dap.common.isObject(item)) {
						val = item.value
					}
					return result.every(el => {
						if (el.element.isBlock()) {
							return el.element.parsedom == val
						}
						return el.element.getBlock().parsedom == val
					})
				})
				this.headingConfig.displayConfig.value = findHeadingItem ? (Dap.common.isObject(findHeadingItem) ? findHeadingItem.value : findHeadingItem) : this.headingConfig.defaultValue
				//标题禁用
				this.headingConfig.disabled = extraDisabled('heading')

				//对齐方式禁用
				this.alignConfig.disabled = extraDisabled('align')

				//有序列表按钮激活
				this.orderListConfig.active = this.$parent.inList(true, true)
				//有序列表按钮禁用
				this.orderListConfig.disabled = extraDisabled('orderList')

				//无序列表按钮激活
				this.unorderListConfig.active = this.$parent.inList(false, true)
				//无序列表按钮禁用
				this.unorderListConfig.disabled = extraDisabled('unorderList')

				//任务列表按钮激活
				this.taskConfig.active = this.$parent.inTask(true, true)
				//任务列表按钮禁用
				this.taskConfig.disabled = extraDisabled('task')

				//粗体按钮激活
				this.boldConfig.active = this.$parent.queryTextStyle('font-weight', 'bold', true)
				//粗体按钮禁用
				this.boldConfig.disabled = extraDisabled('bold')

				//斜体按钮激活
				this.italicConfig.active = this.$parent.queryTextStyle('font-style', 'italic', true)
				//斜体按钮禁用
				this.italicConfig.disabled = extraDisabled('italic')

				//删除线按钮激活
				this.strikethroughConfig.active = this.$parent.queryTextStyle('text-decoration', 'line-through', true)
				//删除线按钮禁用
				this.strikethroughConfig.disabled = extraDisabled('strikethrough')

				//下划线按钮激活
				this.underlineConfig.active = this.$parent.queryTextStyle('text-decoration', 'underline', true)
				//下划线按钮禁用
				this.underlineConfig.disabled = extraDisabled('underline')

				//行内代码按钮激活
				this.codeConfig.active = this.$parent.queryTextMark('data-editify-code', null, true)
				//行内代码按钮禁用
				this.codeConfig.disabled = extraDisabled('code')

				//上标按钮激活
				this.superConfig.active = this.$parent.queryTextStyle('vertical-align', 'super', true)
				//上标按钮禁用
				this.superConfig.disabled = extraDisabled('super')

				//下标按钮激活
				this.subConfig.active = this.$parent.queryTextStyle('vertical-align', 'sub', true)
				//下标按钮禁用
				this.subConfig.disabled = extraDisabled('sub')

				//显示已选择字号
				const findFontItem = this.fontSizeConfig.displayConfig.options.find(item => {
					if (Dap.common.isObject(item)) {
						return this.$parent.queryTextStyle('font-size', item.value, true)
					}
					return this.$parent.queryTextStyle('font-size', item, true)
				})
				this.fontSizeConfig.displayConfig.value = findFontItem ? (Dap.common.isObject(findFontItem) ? findFontItem.value : findFontItem) : this.fontSizeConfig.defaultValue
				//字号按钮禁用
				this.fontSizeConfig.disabled = extraDisabled('fontSize')

				//显示已选择字体
				const findFamilyItem = this.fontFamilyConfig.displayConfig.options.find(item => {
					if (Dap.common.isObject(item)) {
						return this.$parent.queryTextStyle('font-family', item.value, true)
					}
					return this.$parent.queryTextStyle('font-family', item, true)
				})
				this.fontFamilyConfig.displayConfig.value = findFamilyItem ? (Dap.common.isObject(findFamilyItem) ? findFamilyItem.value : findFamilyItem) : this.fontFamilyConfig.defaultValue
				//字体按钮禁用
				this.fontFamilyConfig.disabled = extraDisabled('fontFamily')

				//显示已设置行高
				const findHeightItem = this.lineHeightConfig.displayConfig.options.find(item => {
					let val = item
					if (Dap.common.isObject(item)) {
						val = item.value
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
				//行高按钮禁用
				this.lineHeightConfig.disabled = extraDisabled('lineHeight')

				//显示已选择的前景色
				const findForeColorItem = this.foreColorConfig.selectConfig.options.find(item => {
					if (Dap.common.isObject(item)) {
						return this.$parent.queryTextStyle('color', item.value, true)
					}
					return this.$parent.queryTextStyle('color', item, true)
				})
				this.foreColorConfig.value = findForeColorItem ? (Dap.common.isObject(findForeColorItem) ? findForeColorItem.value : findForeColorItem) : ''
				//前景色按钮禁用
				this.foreColorConfig.disabled = extraDisabled('foreColor')

				//显示已选择的背景色
				const findBackColorItem = this.backColorConfig.selectConfig.options.find(item => {
					if (Dap.common.isObject(item)) {
						return this.$parent.queryTextStyle('background-color', item.value, true)
					}
					return this.$parent.queryTextStyle('background-color', item, true)
				})
				this.backColorConfig.value = findBackColorItem ? (Dap.common.isObject(findBackColorItem) ? findBackColorItem.value : findBackColorItem) : ''
				//背景色按钮禁用
				this.backColorConfig.disabled = extraDisabled('backColor')

				//清除格式按钮禁用
				this.formatClearConfig.disabled = extraDisabled('formatClear')
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
	padding: 6px 10px;

	.editify-icon-rotate {
		transform: rotate(180deg);
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
		font-size: @font-size;
		color: @font-color;
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
		font-size: @font-size;
		color: @font-color;
		border-bottom: 1px solid @border-color;
		line-height: 1.5;
		transition: all 500ms;
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
		font-size: @font-size;
		color: @font-color-light;

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

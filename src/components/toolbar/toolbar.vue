<template>
	<Layer v-model="show" ref="layerRef" :node="node" :scroll-node="scrollNode" border placement="bottom-start" @show="layerShow" :useRange="type == 'text'" :z-index="zIndex" :inside-elements="insideElements">
		<div class="editify-toolbar" ref="toolbarRef" :style="config.style">
			<!-- 链接工具条 -->
			<template v-if="type == 'link'">
				<div class="editify-toolbar-link">
					<div class="editify-toolbar-link-label">{{ $editTrans('linkAddress') }}</div>
					<input @change="modifyLink" @focus="handleInputFocus" @blur="handleInputBlur" :placeholder="$editTrans('linkUrlEnterPlaceholder')" v-model.trim="linkConfig.url" type="url" />
					<div class="editify-toolbar-link-footer">
						<Checkbox @change="modifyLink" v-model="linkConfig.newOpen" :label="$editTrans('newWindowOpen')" :color="color" :size="10"></Checkbox>
						<div class="editify-toolbar-link-operations">
							<span @click="removeLink">{{ $editTrans('removeLink') }}</span>
							<a :href="linkConfig.url" target="_blank" :style="{ color: color || '' }">{{ $editTrans('viewLink') }}</a>
						</div>
					</div>
				</div>
			</template>
			<!-- 图片工具条 -->
			<template v-else-if="type == 'image'">
				<!-- 设置宽度30% -->
				<Button @operate="setWidth('30%')" name="set30Width" :title="$editTrans('width30')" :tooltip="config.tooltip" :color="color" :z-index="zIndex + 1"> 30% </Button>
				<!-- 设置宽度50% -->
				<Button @operate="setWidth('50%')" name="set50Width" :title="$editTrans('width50')" :tooltip="config.tooltip" :color="color" :z-index="zIndex + 1"> 50% </Button>
				<!-- 设置宽度100% -->
				<Button rightBorder @operate="setWidth('100%')" name="set100Width" :title="$editTrans('width100')" :tooltip="config.tooltip" :color="color" :z-index="zIndex + 1"> 100% </Button>
				<!-- 设置宽度auto -->
				<Button @operate="setWidth('auto')" name="setAutoWidth" :title="$editTrans('auto')" :tooltip="config.tooltip" :color="color" :z-index="zIndex + 1">
					<Icon value="auto-width"></Icon>
				</Button>
				<!-- 删除图片 -->
				<Button @operate="deleteElement('img')" name="deleteImage" :title="$editTrans('deleteImage')" :tooltip="config.tooltip" :color="color" :z-index="zIndex + 1">
					<Icon value="delete"></Icon>
				</Button>
			</template>
			<!-- 视频工具条 -->
			<template v-else-if="type == 'video'">
				<!-- 设置宽度30% -->
				<Button @operate="setWidth('30%')" name="set30Width" :title="$editTrans('width30')" :tooltip="config.tooltip" :color="color" :z-index="zIndex + 1"> 30% </Button>
				<!-- 设置宽度50% -->
				<Button @operate="setWidth('50%')" name="set50Width" :title="$editTrans('width50')" :tooltip="config.tooltip" :color="color" :z-index="zIndex + 1"> 50% </Button>
				<!-- 设置宽度100% -->
				<Button @operate="setWidth('100%')" name="set100Width" :title="$editTrans('width100')" :tooltip="config.tooltip" :color="color" :z-index="zIndex + 1"> 100% </Button>
				<!-- 设置宽度auto -->
				<Button rightBorder @operate="setWidth('auto')" name="setAutoWidth" :title="$editTrans('auto')" :tooltip="config.tooltip" :color="color" :z-index="zIndex + 1">
					<Icon value="auto-width"></Icon>
				</Button>
				<!-- 自动播放 -->
				<Button @operate="setVideo" name="autoplay" :title="videoConfig.autoplay ? $editTrans('disabledAutoplay') : $editTrans('autoplay')" :tooltip="config.tooltip" :color="color" :z-index="zIndex + 1">
					<Icon :value="videoConfig.autoplay ? 'autoplay' : 'stop'"></Icon>
				</Button>
				<!-- 循环播放 -->
				<Button @operate="setVideo" name="loop" :title="videoConfig.loop ? $editTrans('disabledLoop') : $editTrans('loop')" :tooltip="config.tooltip" :color="color" :z-index="zIndex + 1">
					<Icon :value="videoConfig.loop ? 'loop' : 'single'"></Icon>
				</Button>
				<!-- 是否静音 -->
				<Button @operate="setVideo" name="muted" :title="videoConfig.muted ? $editTrans('unmuted') : $editTrans('muted')" :tooltip="config.tooltip" :color="color" :z-index="zIndex + 1">
					<Icon :value="videoConfig.muted ? 'muted' : 'unmuted'"></Icon>
				</Button>
				<!-- 是否显示控制器 -->
				<Button leftBorder @operate="setVideo" name="controls" :title="$editTrans('controls')" :tooltip="config.tooltip" :color="color" :z-index="zIndex + 1">
					<Icon value="controls"></Icon>
				</Button>
				<!-- 删除视频 -->
				<Button @operate="deleteElement('video')" name="deleteVideo" :title="$editTrans('deleteVideo')" :tooltip="config.tooltip" :color="color" :z-index="zIndex + 1">
					<Icon value="delete"></Icon>
				</Button>
			</template>
			<!-- 表格工具条 -->
			<template v-else-if="type == 'table'">
				<!-- 表格前插入段落 -->
				<Button @operate="insertParagraphWithTable('up')" name="textWrapUp" :title="$editTrans('textWrapUp')" :tooltip="config.tooltip" :color="color" :z-index="zIndex + 1">
					<Icon value="text-wrap" class="editify-icon-rotate"></Icon>
				</Button>
				<!-- 表格后插入段落 -->
				<Button @operate="insertParagraphWithTable('down')" rightBorder name="textWrapDown" :title="$editTrans('textWrapDown')" :tooltip="config.tooltip" :color="color" :z-index="zIndex + 1">
					<Icon value="text-wrap"></Icon>
				</Button>
				<!-- 向前插入行 -->
				<Button @operate="insertTableRow('up')" name="insertRowTop" :title="$editTrans('insertRowTop')" :tooltip="config.tooltip" :color="color" :z-index="zIndex + 1">
					<Icon value="insert-row-top"></Icon>
				</Button>
				<!-- 向后插入行 -->
				<Button @operate="insertTableRow('down')" name="insertRowBottom" :title="$editTrans('insertRowBottom')" :tooltip="config.tooltip" :color="color" :z-index="zIndex + 1">
					<Icon value="insert-row-bottom"></Icon>
				</Button>
				<!-- 删除行 -->
				<Button @operate="deleteTableRow" rightBorder name="deleteRow" :title="$editTrans('deleteRow')" :tooltip="config.tooltip" :color="color" :z-index="zIndex + 1">
					<Icon value="delete-row"></Icon>
				</Button>
				<!-- 向前插入列 -->
				<Button @operate="insertTableColumn('left')" name="insertColumnLeft" :title="$editTrans('insertColumnLeft')" :tooltip="config.tooltip" :color="color" :z-index="zIndex + 1">
					<Icon value="insert-column-left"></Icon>
				</Button>
				<!-- 向后插入列 -->
				<Button @operate="insertTableColumn('right')" name="insertColumnRight" :title="$editTrans('insertColumnRight')" :tooltip="config.tooltip" :color="color" :z-index="zIndex + 1">
					<Icon value="insert-column-right"></Icon>
				</Button>
				<!-- 删除列 -->
				<Button @operate="deleteTableColumn" rightBorder name="deleteColumn" :title="$editTrans('deleteColumn')" :tooltip="config.tooltip" :color="color" :z-index="zIndex + 1">
					<Icon value="delete-column"></Icon>
				</Button>
				<!-- 向左合并单元格 -->
				<Button :disabled="!canMergeCells('left')" @operate="mergeCells('left')" rightBorder name="mergeCellsLeft" :title="$editTrans('mergeCellsLeft')" :tooltip="config.tooltip" :color="color" :z-index="zIndex + 1">
					<Icon value="merge-cells-left"></Icon>
				</Button>
				<!-- 向右合并单元格 -->
				<Button :disabled="!canMergeCells('right')" @operate="mergeCells('right')" rightBorder name="mergeCellsRight" :title="$editTrans('mergeCellsRight')" :tooltip="config.tooltip" :color="color" :z-index="zIndex + 1">
					<Icon value="merge-cells-right"></Icon>
				</Button>
				<!-- 向上合并单元格 -->
				<Button :disabled="!canMergeCells('up')" @operate="mergeCells('up')" rightBorder name="mergeCellsUp" :title="$editTrans('mergeCellsUp')" :tooltip="config.tooltip" :color="color" :z-index="zIndex + 1">
					<Icon value="merge-cells-up"></Icon>
				</Button>
				<!-- 向下合并单元格 -->
				<Button :disabled="!canMergeCells('down')" @operate="mergeCells('down')" rightBorder name="mergeCellsDown" :title="$editTrans('mergeCellsDown')" :tooltip="config.tooltip" :color="color" :z-index="zIndex + 1">
					<Icon value="merge-cells-down"></Icon>
				</Button>
				<!-- 删除表格 -->
				<Button @operate="deleteElement('table')" leftBorder name="deleteTable" :title="$editTrans('deleteTable')" :tooltip="config.tooltip" :color="color" :z-index="zIndex + 1">
					<Icon value="delete-table"></Icon>
				</Button>
			</template>
			<!-- 代码块工具条 -->
			<template v-if="type == 'codeBlock'">
				<!-- 代码块前插入段落 -->
				<Button @operate="insertParagraphWithPre('up')" name="textWrapUp" :title="$editTrans('textWrapUp')" :tooltip="config.tooltip" :color="color" :z-index="zIndex + 1">
					<Icon value="text-wrap" class="editify-icon-rotate"></Icon>
				</Button>
				<!-- 代码块后插入段落 -->
				<Button @operate="insertParagraphWithPre('down')" name="textWrapDown" :title="$editTrans('textWrapDown')" :tooltip="config.tooltip" :color="color" :z-index="zIndex + 1">
					<Icon value="text-wrap"></Icon>
				</Button>
				<!-- 代码块语言选择 -->
				<Button v-if="languageConfig.show" ref="languagesBtnRef" name="languages" type="display" :title="$editTrans('selectLanguages')" :tooltip="config.tooltip" :leftBorder="languageConfig.leftBorder" :rightBorder="languageConfig.rightBorder" :display-config="languageConfig.displayConfig" :color="color" :active="languageConfig.active" :disabled="languageConfig.disabled" @operate="selectLanguage" :z-index="zIndex + 1"></Button>
			</template>
			<!-- 文本工具条 -->
			<template v-else-if="type == 'text'">
				<!-- 设置段落和标题 -->
				<Button v-if="headingConfig.show" ref="headingBtnRef" name="heading" type="display" :title="$editTrans('heading')" :tooltip="config.tooltip" :display-config="headingConfig.displayConfig" :leftBorder="headingConfig.leftBorder" :rightBorder="headingConfig.rightBorder" :color="color" :active="headingConfig.active" :disabled="headingConfig.disabled" @operate="_setHeading" :z-index="zIndex + 1"></Button>
				<!-- 对齐方式 -->
				<Button v-if="alignConfig.show" name="align" ref="alignBtnRef" type="select" :title="$editTrans('align')" :tooltip="config.tooltip" :select-config="alignConfig.selectConfig" :leftBorder="alignConfig.leftBorder" :rightBorder="alignConfig.rightBorder" :color="color" :active="alignConfig.active" :disabled="alignConfig.disabled" @operate="_setAlign" :z-index="zIndex + 1">
					<Icon value="align-left"></Icon>
				</Button>
				<!-- 有序列表 -->
				<Button v-if="orderListConfig.show" name="orderList" :title="$editTrans('orderList')" :tooltip="config.tooltip" :leftBorder="orderListConfig.leftBorder" :rightBorder="orderListConfig.rightBorder" :color="color" :active="orderListConfig.active" :disabled="orderListConfig.disabled" @operate="_setList" :z-index="zIndex + 1">
					<Icon value="list-ordered"></Icon>
				</Button>
				<!-- 无序列表 -->
				<Button v-if="unorderListConfig.show" name="unorderList" :title="$editTrans('unorderList')" :tooltip="config.tooltip" :leftBorder="unorderListConfig.leftBorder" :rightBorder="unorderListConfig.rightBorder" :color="color" :active="unorderListConfig.active" :disabled="unorderListConfig.disabled" @operate="_setList" :z-index="zIndex + 1">
					<Icon value="list-unordered"></Icon>
				</Button>
				<!-- 任务列表 -->
				<Button v-if="taskConfig.show" name="task" :title="$editTrans('task')" :tooltip="config.tooltip" :leftBorder="taskConfig.leftBorder" :rightBorder="taskConfig.rightBorder" :color="color" :active="taskConfig.active" :disabled="taskConfig.disabled" @operate="_setTask" :z-index="zIndex + 1">
					<Icon value="task"></Icon>
				</Button>
				<!-- 加粗  -->
				<Button v-if="boldConfig.show" name="bold" :title="$editTrans('bold')" :tooltip="config.tooltip" :leftBorder="boldConfig.leftBorder" :rightBorder="boldConfig.rightBorder" :color="color" :active="boldConfig.active" :disabled="boldConfig.disabled" @operate="setBold" :z-index="zIndex + 1">
					<Icon value="bold"></Icon>
				</Button>
				<!-- 斜体 -->
				<Button v-if="italicConfig.show" name="italic" :title="$editTrans('italic')" :tooltip="config.tooltip" :leftBorder="italicConfig.leftBorder" :rightBorder="italicConfig.rightBorder" :color="color" :active="italicConfig.active" :disabled="italicConfig.disabled" @operate="setItalic" :z-index="zIndex + 1">
					<Icon value="italic"></Icon>
				</Button>
				<!-- 删除线 -->
				<Button v-if="strikethroughConfig.show" name="strikethrough" :title="$editTrans('strikethrough')" :tooltip="config.tooltip" :leftBorder="strikethroughConfig.leftBorder" :rightBorder="strikethroughConfig.rightBorder" :color="color" :active="strikethroughConfig.active" :disabled="strikethroughConfig.disabled" @operate="setStrikethrough" :z-index="zIndex + 1">
					<Icon value="strikethrough"></Icon>
				</Button>
				<!-- 下划线 -->
				<Button v-if="underlineConfig.show" name="underline" :title="$editTrans('underline')" :tooltip="config.tooltip" :leftBorder="underlineConfig.leftBorder" :rightBorder="underlineConfig.rightBorder" :color="color" :active="underlineConfig.active" :disabled="underlineConfig.disabled" @operate="setUnderline" :z-index="zIndex + 1">
					<Icon value="underline"></Icon>
				</Button>
				<!-- 行内代码块 -->
				<Button v-if="codeConfig.show" name="code" :title="$editTrans('code')" :tooltip="config.tooltip" :leftBorder="codeConfig.leftBorder" :rightBorder="codeConfig.rightBorder" :color="color" :active="codeConfig.active" :disabled="codeConfig.disabled" @operate="setCodeStyle" :z-index="zIndex + 1">
					<Icon value="code"></Icon>
				</Button>
				<!-- 上标 -->
				<Button v-if="superConfig.show" name="superscript" :title="$editTrans('superscript')" :tooltip="config.tooltip" :leftBorder="superConfig.leftBorder" :rightBorder="superConfig.rightBorder" :color="color" :active="superConfig.active" :disabled="superConfig.disabled" @operate="setSuperscript" :z-index="zIndex + 1">
					<Icon value="superscript"></Icon>
				</Button>
				<!-- 下标 -->
				<Button v-if="subConfig.show" name="subscript" :title="$editTrans('subscript')" :tooltip="config.tooltip" :leftBorder="subConfig.leftBorder" :rightBorder="subConfig.rightBorder" :color="color" :active="subConfig.active" :disabled="subConfig.disabled" @operate="setSubscript" :z-index="zIndex + 1">
					<Icon value="subscript"></Icon>
				</Button>
				<!-- 字号大小 -->
				<Button v-if="fontSizeConfig.show" ref="fontSizeBtnRef" name="fontSize" type="display" :title="$editTrans('fontSize')" :tooltip="config.tooltip" :display-config="fontSizeConfig.displayConfig" :leftBorder="fontSizeConfig.leftBorder" :rightBorder="fontSizeConfig.rightBorder" :color="color" :active="fontSizeConfig.active" :disabled="fontSizeConfig.disabled" @operate="setFontSize" :z-index="zIndex + 1"></Button>
				<!-- 字体 -->
				<Button v-if="fontFamilyConfig.show" ref="fontFamilyBtnRef" name="fontFamily" type="display" :title="$editTrans('fontFamily')" :tooltip="config.tooltip" :display-config="fontFamilyConfig.displayConfig" :leftBorder="fontFamilyConfig.leftBorder" :rightBorder="fontFamilyConfig.rightBorder" :color="color" :active="fontFamilyConfig.active" :disabled="fontFamilyConfig.disabled" @operate="setFontFamily" :z-index="zIndex + 1"></Button>
				<!-- 行高 -->
				<Button v-if="lineHeightConfig.show" ref="lineHeightBtnRef" name="lineHeight" type="display" :title="$editTrans('lineHeight')" :tooltip="config.tooltip" :display-config="lineHeightConfig.displayConfig" :leftBorder="lineHeightConfig.leftBorder" :rightBorder="lineHeightConfig.rightBorder" :color="color" :active="lineHeightConfig.active" :disabled="lineHeightConfig.disabled" @operate="_setLineHeight" :z-index="zIndex + 1"></Button>
				<!-- 前景色 -->
				<Button v-if="foreColorConfig.show" name="foreColor" type="select" :title="$editTrans('foreColor')" :tooltip="config.tooltip" :select-config="foreColorConfig.selectConfig" :leftBorder="foreColorConfig.leftBorder" :rightBorder="foreColorConfig.rightBorder" :color="color" :active="foreColorConfig.active" :disabled="foreColorConfig.disabled" hideScroll ref="foreColorBtnRef" :z-index="zIndex + 1">
					<Icon value="font-color"></Icon>
					<template #layer="{ options }">
						<Colors :tooltip="config.tooltip" :color="color" :value="foreColorConfig.value" @change="setForeColor" :data="options"></Colors>
					</template>
				</Button>
				<!-- 背景色 -->
				<Button v-if="backColorConfig.show" name="backColor" type="select" :title="$editTrans('backColor')" :tooltip="config.tooltip" :select-config="backColorConfig.selectConfig" :leftBorder="backColorConfig.leftBorder" :rightBorder="backColorConfig.rightBorder" :color="color" :active="backColorConfig.active" :disabled="backColorConfig.disabled" hideScroll ref="backColorBtnRef" :z-index="zIndex + 1">
					<Icon value="brush"></Icon>
					<template #layer="{ options }">
						<Colors :tooltip="config.tooltip" :color="color" :value="backColorConfig.value" @change="setBackColor" :data="options"></Colors>
					</template>
				</Button>
				<!-- 清除样式 -->
				<Button v-if="formatClearConfig.show" name="formatClear" :title="$editTrans('formatClear')" :tooltip="config.tooltip" :leftBorder="formatClearConfig.leftBorder" :rightBorder="formatClearConfig.rightBorder" :color="color" :active="formatClearConfig.active" :disabled="formatClearConfig.disabled" @operate="clearFormat" :z-index="zIndex + 1">
					<Icon value="format-clear"></Icon>
				</Button>
			</template>
		</div>
	</Layer>
</template>
<script setup lang="ts">
import { Ref, computed, inject, ref } from 'vue'
import { common as DapCommon } from 'dap-util'
import { AlexEditor, AlexElement, AlexElementCreateConfigType, AlexElementsRangeType } from 'alex-editor'
import Layer from '@/components/layer/layer.vue'
import Button from '@/components/button/button.vue'
import Icon from '@/components/icon/icon.vue'
import Checkbox from '@/components/checkbox/checkbox.vue'
import Colors from '@/components/colors/colors.vue'
import { getCellSpanNumber, getTableSize, getMatchElementByRange, removeTextStyle, removeTextMark, setTextStyle, setLineHeight, setTextMark, setList, setTask, setHeading, setAlign, isRangeInList, isRangeInTask, queryTextStyle, queryTextMark, getMatchElementByElement, getCellMergeElement, setTableCellMerged } from '@/core/function'
import { ObjectType } from '@/core/tool'
import { ButtonOptionsItemType } from '@/components/button/props'
import { ToolbarProps } from './props'

defineOptions({
	name: 'Toolbar'
})
const props = defineProps(ToolbarProps)
const emits = defineEmits(['update:modelValue'])

const editor = inject<Ref<AlexEditor>>('editor')!
const dataRangeCaches = inject<Ref<AlexElementsRangeType>>('dataRangeCaches')!
const $editTrans = inject<(key: string) => any>('$editTrans')!

const layerRef = ref<InstanceType<typeof Layer> | null>(null)
const toolbarRef = ref<HTMLElement | null>(null)
const foreColorBtnRef = ref<InstanceType<typeof Button> | null>(null)
const backColorBtnRef = ref<InstanceType<typeof Button> | null>(null)
const languagesBtnRef = ref<InstanceType<typeof Button> | null>(null)
const headingBtnRef = ref<InstanceType<typeof Button> | null>(null)
const alignBtnRef = ref<InstanceType<typeof Button> | null>(null)
const fontSizeBtnRef = ref<InstanceType<typeof Button> | null>(null)
const fontFamilyBtnRef = ref<InstanceType<typeof Button> | null>(null)
const lineHeightBtnRef = ref<InstanceType<typeof Button> | null>(null)

//链接参数配置
const linkConfig = ref<ObjectType>({
	//链接地址
	url: '',
	//链接是否新窗口打开
	newOpen: false
})

//视频参数配置
const videoConfig = ref<ObjectType>({
	//是否显示控制器
	controls: false,
	//是否循环
	loop: false,
	//是否自动播放
	autoplay: false,
	//是否静音
	muted: false
})

//代码块选择语言按钮配置
const languageConfig = ref<ObjectType>({
	show: props.config.codeBlock!.languages!.show,
	displayConfig: {
		options: props.config.codeBlock!.languages!.options,
		value: '',
		width: props.config.codeBlock!.languages!.width,
		maxHeight: props.config.codeBlock!.languages!.maxHeight
	},
	leftBorder: props.config.codeBlock!.languages!.leftBorder,
	rightBorder: props.config.codeBlock!.languages!.rightBorder,
	active: false,
	disabled: false
})

/** 以下是文本工具条的配置参数信息 */
//标题按钮配置
const headingConfig = ref<ObjectType>({
	show: props.config.text!.heading!.show,
	displayConfig: {
		options: props.config.text!.heading!.options,
		value: '',
		width: props.config.text!.heading!.width,
		maxHeight: props.config.text!.heading!.maxHeight
	},
	defaultValue: props.config.text!.heading!.defaultValue,
	leftBorder: props.config.text!.heading!.leftBorder,
	rightBorder: props.config.text!.heading!.rightBorder,
	active: false,
	disabled: false
})
//对齐方式按钮配置
const alignConfig = ref<ObjectType>({
	show: props.config.text!.align!.show,
	selectConfig: {
		options: props.config.text!.align!.options,
		width: props.config.text!.align!.width,
		maxHeight: props.config.text!.align!.maxHeight
	},
	leftBorder: props.config.text!.align!.leftBorder,
	rightBorder: props.config.text!.align!.rightBorder,
	active: false,
	disabled: false
})
//有序列表按钮配置
const orderListConfig = ref<ObjectType>({
	show: props.config.text!.orderList!.show,
	leftBorder: props.config.text!.orderList!.leftBorder,
	rightBorder: props.config.text!.orderList!.rightBorder,
	active: false,
	disabled: false
})
//无序列表按钮配置
const unorderListConfig = ref<ObjectType>({
	show: props.config.text!.unorderList!.show,
	leftBorder: props.config.text!.unorderList!.leftBorder,
	rightBorder: props.config.text!.unorderList!.rightBorder,
	active: false,
	disabled: false
})
//任务列表按钮配置
const taskConfig = ref<ObjectType>({
	show: props.config.text!.task!.show,
	leftBorder: props.config.text!.task!.leftBorder,
	rightBorder: props.config.text!.task!.rightBorder,
	active: false,
	disabled: false
})
//粗体按钮配置
const boldConfig = ref<ObjectType>({
	show: props.config.text!.bold!.show,
	leftBorder: props.config.text!.bold!.leftBorder,
	rightBorder: props.config.text!.bold!.rightBorder,
	active: false,
	disabled: false
})
//斜体按钮配置
const italicConfig = ref<ObjectType>({
	show: props.config.text!.italic!.show,
	leftBorder: props.config.text!.italic!.leftBorder,
	rightBorder: props.config.text!.italic!.rightBorder,
	active: false,
	disabled: false
})
//删除线按钮配置
const strikethroughConfig = ref<ObjectType>({
	show: props.config.text!.strikethrough!.show,
	leftBorder: props.config.text!.strikethrough!.leftBorder,
	rightBorder: props.config.text!.strikethrough!.rightBorder,
	active: false,
	disabled: false
})
//下划线按钮配置
const underlineConfig = ref<ObjectType>({
	show: props.config.text!.underline!.show,
	leftBorder: props.config.text!.underline!.leftBorder,
	rightBorder: props.config.text!.underline!.rightBorder,
	active: false,
	disabled: false
})
//行内代码块按钮配置
const codeConfig = ref<ObjectType>({
	show: props.config.text!.code!.show,
	leftBorder: props.config.text!.code!.leftBorder,
	rightBorder: props.config.text!.code!.rightBorder,
	active: false,
	disabled: false
})
//上标按钮配置
const superConfig = ref<ObjectType>({
	show: props.config.text!.super!.show,
	leftBorder: props.config.text!.super!.leftBorder,
	rightBorder: props.config.text!.super!.rightBorder,
	active: false,
	disabled: false
})
//下标按钮配置
const subConfig = ref<ObjectType>({
	show: props.config.text!.sub!.show,
	leftBorder: props.config.text!.sub!.leftBorder,
	rightBorder: props.config.text!.sub!.rightBorder,
	active: false,
	disabled: false
})
//字号按钮配置
const fontSizeConfig = ref<ObjectType>({
	show: props.config.text!.fontSize!.show,
	displayConfig: {
		options: props.config.text!.fontSize!.options,
		value: '',
		width: props.config.text!.fontSize!.width,
		maxHeight: props.config.text!.fontSize!.maxHeight
	},
	defaultValue: props.config.text!.fontSize!.defaultValue,
	leftBorder: props.config.text!.fontSize!.leftBorder,
	rightBorder: props.config.text!.fontSize!.rightBorder,
	active: false,
	disabled: false
})
//字体按钮配置
const fontFamilyConfig = ref<ObjectType>({
	show: props.config.text!.fontFamily!.show,
	displayConfig: {
		options: props.config.text!.fontFamily!.options,
		value: '',
		width: props.config.text!.fontFamily!.width,
		maxHeight: props.config.text!.fontFamily!.maxHeight
	},
	defaultValue: props.config.text!.fontFamily!.defaultValue,
	leftBorder: props.config.text!.fontFamily!.leftBorder,
	rightBorder: props.config.text!.fontFamily!.rightBorder,
	active: false,
	disabled: false
})
//行高按钮配置
const lineHeightConfig = ref<ObjectType>({
	show: props.config.text!.lineHeight!.show,
	displayConfig: {
		options: props.config.text!.lineHeight!.options,
		value: '',
		width: props.config.text!.lineHeight!.width,
		maxHeight: props.config.text!.lineHeight!.maxHeight
	},
	defaultValue: props.config.text!.lineHeight!.defaultValue,
	leftBorder: props.config.text!.lineHeight!.leftBorder,
	rightBorder: props.config.text!.lineHeight!.rightBorder,
	active: false,
	disabled: false
})
//前景颜色按钮配置
const foreColorConfig = ref<ObjectType>({
	show: props.config.text!.foreColor!.show,
	selectConfig: {
		options: props.config.text!.foreColor!.options
	},
	leftBorder: props.config.text!.foreColor!.leftBorder,
	rightBorder: props.config.text!.foreColor!.rightBorder,
	value: '', //选择的颜色值
	active: false,
	disabled: false
})
//背景颜色按钮配置
const backColorConfig = ref<ObjectType>({
	show: props.config.text!.backColor!.show,
	selectConfig: {
		options: props.config.text!.backColor!.options
	},
	leftBorder: props.config.text!.backColor!.leftBorder,
	rightBorder: props.config.text!.backColor!.rightBorder,
	value: '', //选择的颜色值
	active: false,
	disabled: false
})
//清除格式按钮配置
const formatClearConfig = ref<ObjectType>({
	show: props.config.text!.formatClear!.show,
	leftBorder: props.config.text!.formatClear!.leftBorder,
	rightBorder: props.config.text!.formatClear!.rightBorder,
	active: false,
	disabled: false
})

//是否显示
const show = computed<boolean>({
	get() {
		return props.modelValue
	},
	set(val) {
		emits('update:modelValue', val)
	}
})
//是否可以合并单元格
const canMergeCells = computed<(type: 'left' | 'right' | 'up' | 'down') => boolean>(() => {
	return (type: 'left' | 'right' | 'up' | 'down') => {
		if (!editor.value.range) {
			return false
		}
		//光标所在单元格
		const cell = getMatchElementByElement(editor.value.range.focus.element, {
			parsedom: 'td'
		})
		//如果光标不在单元格内
		if (!cell) {
			return false
		}
		//判断是否可以向左合并
		if (type == 'left') {
			//是否可以向左合并
			let flag = false
			//当前单元格的rowspan
			const cellSpanNum = getCellSpanNumber(cell)
			//获取左侧单元格
			const previousColumn = editor.value.getPreviousElement(cell)
			//如果左侧单元格存在
			if (previousColumn) {
				//左侧单元格是隐藏的单元格
				if (previousColumn.hasMarks() && previousColumn.marks!['data-editify-merged']) {
					//获取合并该隐藏单元格的那个单元格
					const { crossColumnElement } = getCellMergeElement(editor.value, previousColumn)
					//如果是被跨列合并则判断跨列单元格占据的行数与当前单元格的行数是否一致
					if (crossColumnElement) {
						const { rowspan } = getCellSpanNumber(crossColumnElement)
						flag = rowspan == cellSpanNum.rowspan
					}
				}
				//左侧单元格不是隐藏的单元格
				else {
					//判断所占行数是否一致
					const { rowspan } = getCellSpanNumber(previousColumn)
					flag = rowspan == cellSpanNum.rowspan
				}
			}
			return flag
		}
		//判断是否可以向右合并
		if (type == 'right') {
			//是否可以向右合并
			let flag = false
			//当前单元格的rowspan
			const cellSpanNum = getCellSpanNumber(cell)
			//获取右侧的单元格
			let nextColumn = editor.value.getNextElement(cell)
			//如果右侧单元格存在
			while (nextColumn) {
				//右侧单元格是隐藏的单元格
				if (nextColumn.hasMarks() && nextColumn.marks!['data-editify-merged']) {
					//获取合并该隐藏单元格的那个单元格
					const { crossColumnElement } = getCellMergeElement(editor.value, nextColumn)
					//如果是被跨列合并的表示属于当前单元格内，继续向右查询
					if (crossColumnElement) {
						nextColumn = editor.value.getNextElement(nextColumn)
					}
					//被跨行合并的直接结束，不能向右合并
					else {
						break
					}
				}
				//右侧单元格不是隐藏的
				else {
					//判断行数是否与当前单元格一致
					const { rowspan } = getCellSpanNumber(nextColumn)
					//如果一致则可以合并
					flag = rowspan == cellSpanNum.rowspan
					//不管是否一致都直接结束
					break
				}
			}
			return flag
		}
		//判断是否可以向上合并
		if (type == 'up') {
			//是否可以向上合并
			let flag = false
			//当前单元格的colspan
			const cellSpanNum = getCellSpanNumber(cell)
			//获取单元格在行中的序列
			const index = cell.parent!.children!.findIndex(item => item.isEqual(cell))
			//获取上一行
			const previousRow = editor.value.getPreviousElement(cell.parent!)
			//如果上一行存在
			if (previousRow) {
				//获取上一行中对应序列的单元格
				const column = previousRow.children![index]
				//单元格是隐藏的单元格
				if (column.hasMarks() && column.marks!['data-editify-merged']) {
					//获取合并该隐藏单元格的那个单元格
					const { crossRowElement } = getCellMergeElement(editor.value, column)
					//如果是被跨行合并则判断跨列单元格占据的列数与当前单元格的列数是否一致
					if (crossRowElement) {
						const { colspan } = getCellSpanNumber(crossRowElement)
						flag = colspan == cellSpanNum.colspan
					}
				}
				//单元格不是隐藏的单元格
				else {
					//判断所占列数是否一致
					const { colspan } = getCellSpanNumber(column)
					flag = colspan == cellSpanNum.colspan
				}
			}
			return flag
		}
		//判断是否可以向下合并
		if (type == 'down') {
			//是否可以向下合并
			let flag = false
			//当前单元格的colspan
			const cellSpanNum = getCellSpanNumber(cell)
			//获取单元格在行中的序列
			const index = cell.parent!.children!.findIndex(item => item.isEqual(cell))
			//获取下一行
			let nextRow = editor.value.getNextElement(cell.parent!)
			//如果下一行存在
			while (nextRow) {
				//获取下一行中对应序列的单元格
				const column = nextRow.children![index]
				//单元格是隐藏的单元格
				if (column.hasMarks() && column.marks!['data-editify-merged']) {
					//获取合并该隐藏单元格的那个单元格
					const { crossRowElement } = getCellMergeElement(editor.value, column)
					//如果是被跨行合并的表示属于当前单元格内，继续向下查询
					if (crossRowElement) {
						nextRow = editor.value.getNextElement(nextRow)
					}
					//被跨列合并的直接结束，不能向右合并
					else {
						break
					}
				}
				//单元格不是隐藏的
				else {
					//判断列数是否与当前单元格一致
					const { colspan } = getCellSpanNumber(column)
					//如果一致则可以合并
					flag = colspan == cellSpanNum.colspan
					//不管是否一致都直接结束
					break
				}
			}
			return flag
		}
		return false
	}
})
//点击不关闭工具条浮层的元素（算在工具条浮层元素范围内）
const insideElements = computed<HTMLElement[]>(() => {
	let elements: HTMLElement[] = []
	//语言选择浮层元素
	if (languagesBtnRef.value && languagesBtnRef.value.layerRef && languagesBtnRef.value.layerRef.elRef) {
		elements.push(languagesBtnRef.value.layerRef.elRef)
	}
	//前景色选择浮层元素
	if (foreColorBtnRef.value && foreColorBtnRef.value.layerRef && foreColorBtnRef.value.layerRef.elRef) {
		elements.push(foreColorBtnRef.value.layerRef.elRef)
	}
	//背景色选择浮层元素
	if (backColorBtnRef.value && backColorBtnRef.value.layerRef && backColorBtnRef.value.layerRef.elRef) {
		elements.push(backColorBtnRef.value.layerRef.elRef)
	}
	//标题选择浮层元素
	if (headingBtnRef.value && headingBtnRef.value.layerRef && headingBtnRef.value.layerRef.elRef) {
		elements.push(headingBtnRef.value.layerRef.elRef)
	}
	//对齐方式选择浮层元素
	if (alignBtnRef.value && alignBtnRef.value.layerRef && alignBtnRef.value.layerRef.elRef) {
		elements.push(alignBtnRef.value.layerRef.elRef)
	}
	//字号选择浮层元素
	if (fontSizeBtnRef.value && fontSizeBtnRef.value.layerRef && fontSizeBtnRef.value.layerRef.elRef) {
		elements.push(fontSizeBtnRef.value.layerRef.elRef)
	}
	//字体选择浮层元素
	if (fontFamilyBtnRef.value && fontFamilyBtnRef.value.layerRef && fontFamilyBtnRef.value.layerRef.elRef) {
		elements.push(fontFamilyBtnRef.value.layerRef.elRef)
	}
	//行高选择浮层元素
	if (lineHeightBtnRef.value && lineHeightBtnRef.value.layerRef && lineHeightBtnRef.value.layerRef.elRef) {
		elements.push(lineHeightBtnRef.value.layerRef.elRef)
	}
	return elements
})

//输入框获取焦点
const handleInputFocus = (e: Event) => {
	if (props.color) {
		;(<HTMLInputElement>e.currentTarget).style.borderColor = props.color
	}
}
//输入框失去焦点
const handleInputBlur = (e: Event) => {
	;(<HTMLInputElement>e.currentTarget).style.borderColor = ''
}
//清除格式
const clearFormat = () => {
	removeTextStyle(editor.value, dataRangeCaches.value)
	removeTextMark(editor.value, dataRangeCaches.value)
	editor.value.formatElementStack()
	editor.value.domRender()
	editor.value.rangeRender()
}
//设置背景色
const setBackColor = (value: string) => {
	setTextStyle(editor.value, dataRangeCaches.value, {
		'background-color': value
	})
	backColorBtnRef.value!.show = false
	editor.value.formatElementStack()
	editor.value.domRender()
	editor.value.rangeRender()
}
//设置前景色
const setForeColor = (value: string) => {
	setTextStyle(editor.value, dataRangeCaches.value, {
		color: value
	})
	foreColorBtnRef.value!.show = false
	editor.value.formatElementStack()
	editor.value.domRender()
	editor.value.rangeRender()
}
//设置行高
const _setLineHeight = (_name: string, value: string | number) => {
	setLineHeight(editor.value, dataRangeCaches.value, value)
	editor.value.formatElementStack()
	editor.value.domRender()
	editor.value.rangeRender()
}
//设置字体
const setFontFamily = (_name: string, value: string | number) => {
	setTextStyle(editor.value, dataRangeCaches.value, {
		'font-family': value
	})
	editor.value.formatElementStack()
	editor.value.domRender()
	editor.value.rangeRender()
}
//设置字号
const setFontSize = (_name: string, value: string | number) => {
	setTextStyle(editor.value, dataRangeCaches.value, {
		'font-size': value
	})
	editor.value.formatElementStack()
	editor.value.domRender()
	editor.value.rangeRender()
}
//设置上标
const setSuperscript = () => {
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
const setSubscript = () => {
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
//设置行内代码样式
const setCodeStyle = () => {
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
//设置下划线
const setUnderline = () => {
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
//设置删除线
const setStrikethrough = () => {
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
//设置列表
const _setList = (name: string) => {
	setList(editor.value, dataRangeCaches.value, name == 'orderList')
	editor.value.formatElementStack()
	editor.value.domRender()
	editor.value.rangeRender()
}
//设置任务列表
const _setTask = () => {
	setTask(editor.value, dataRangeCaches.value)
	editor.value.formatElementStack()
	editor.value.domRender()
	editor.value.rangeRender()
}
//斜体
const setItalic = () => {
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
//加粗
const setBold = () => {
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
//设置标题
const _setHeading = (_name: string, value: string) => {
	setHeading(editor.value, dataRangeCaches.value, $editTrans, value)
	editor.value.formatElementStack()
	editor.value.domRender()
	editor.value.rangeRender()
}
//设置对齐方式
const _setAlign = (_name: string, value: string) => {
	setAlign(editor.value, dataRangeCaches.value, value as 'left' | 'right' | 'center' | 'justify')
	editor.value.formatElementStack()
	editor.value.domRender()
	editor.value.rangeRender()
}
//设置视频属性
const setVideo = (prop: string) => {
	const element = editor.value.range!.anchor.element
	//当前是拥有该属性
	if (videoConfig.value[prop]) {
		delete element.marks![prop]
	}
	//当前无该属性
	else {
		element.marks![prop] = true
	}
	videoConfig.value[prop] = !videoConfig.value[prop]
	editor.value.formatElementStack()
	editor.value.domRender()
	editor.value.rangeRender()
}
//设置图片或者视频宽度
const setWidth = (value: string) => {
	const element = editor.value.range!.anchor.element
	if (element) {
		const styles = {
			width: value
		}
		if (element.hasStyles()) {
			element.styles = Object.assign(element.styles!, styles)
		} else {
			element.styles = styles
		}
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
		//更新工具条位置
		setTimeout(() => {
			layerRef.value!.setPosition()
		}, 0)
	}
}
//修改链接
const modifyLink = () => {
	if (!linkConfig.value.url) {
		return
	}
	const link = getMatchElementByRange(editor.value, dataRangeCaches.value, { parsedom: 'a' })
	if (link) {
		link.marks!.href = linkConfig.value.url
		if (linkConfig.value.newOpen) {
			link.marks!.target = '_blank'
		} else {
			delete link.marks!.target
		}
		editor.value.formatElementStack()
		editor.value.domRender()
	}
}
//移除链接
const removeLink = () => {
	const link = getMatchElementByRange(editor.value, dataRangeCaches.value, { parsedom: 'a' })
	if (link) {
		link.parsedom = AlexElement.TEXT_NODE
		delete link.marks!['target']
		delete link.marks!['href']
		delete link.marks!['data-editify-element']
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
}
//选择代码语言
const selectLanguage = (_name: string, value: string) => {
	const pre = getMatchElementByRange(editor.value, dataRangeCaches.value, { parsedom: 'pre' })
	if (pre) {
		Object.assign(pre.marks!, {
			'data-editify-hljs': value
		})
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
}
//代码块前后插入段落
const insertParagraphWithPre = (type: string | undefined = 'up') => {
	if (!editor.value.range!.anchor.isEqual(editor.value.range!.focus)) {
		editor.value.range!.anchor.element = editor.value.range!.focus.element
		editor.value.range!.anchor.offset = editor.value.range!.focus.offset
	}
	const pre = getMatchElementByRange(editor.value, dataRangeCaches.value, { parsedom: 'pre' })
	if (pre) {
		const paragraph = AlexElement.create({
			type: 'block',
			parsedom: AlexElement.BLOCK_NODE,
			children: [
				{
					type: 'closed',
					parsedom: 'br'
				}
			]
		})
		if (type == 'up') {
			editor.value.addElementBefore(paragraph, pre)
		} else {
			editor.value.addElementAfter(paragraph, pre)
		}
		editor.value.range!.anchor.moveToEnd(paragraph)
		editor.value.range!.focus.moveToEnd(paragraph)
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
}
//表格前后插入列
const insertTableColumn = (type: string | undefined = 'left') => {
	if (!editor.value.range!.anchor.isEqual(editor.value.range!.focus)) {
		editor.value.range!.anchor.element = editor.value.range!.focus.element
		editor.value.range!.anchor.offset = editor.value.range!.focus.offset
	}
	const column = getMatchElementByRange(editor.value, dataRangeCaches.value, { parsedom: 'td' })
	if (column) {
		const row = column.parent!
		const tbody = row.parent!
		const table = tbody.parent!
		const rows = tbody.children
		const index = row.children!.findIndex(item => {
			return item.isEqual(column)
		})
		//插入列
		rows!.forEach(item => {
			const newColumn = AlexElement.create({
				type: 'inblock',
				parsedom: 'td',
				children: [
					{
						type: 'closed',
						parsedom: 'br'
					}
				]
			})
			if (type == 'left') {
				editor.value.addElementTo(newColumn, item, index)
			} else {
				editor.value.addElementTo(newColumn, item, index + 1)
			}
		})
		//插入col
		const colgroup = table.children!.find(item => {
			return item.parsedom == 'colgroup'
		})!
		const col = AlexElement.create({
			type: 'closed',
			parsedom: 'col'
		})
		if (type == 'left') {
			editor.value.addElementTo(col, colgroup, index)
		} else {
			editor.value.addElementTo(col, colgroup, index + 1)
		}
		if (type == 'left') {
			const previousColumn = editor.value.getPreviousElement(column)!
			editor.value.range!.anchor.moveToStart(previousColumn)
			editor.value.range!.focus.moveToStart(previousColumn)
		} else {
			const nextColumn = editor.value.getNextElement(column)!
			editor.value.range!.anchor.moveToStart(nextColumn)
			editor.value.range!.focus.moveToStart(nextColumn)
		}
		//渲染
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
}
//表格前后插入行
const insertTableRow = (type: string | undefined = 'up') => {
	if (!editor.value.range!.anchor.isEqual(editor.value.range!.focus)) {
		editor.value.range!.anchor.element = editor.value.range!.focus.element
		editor.value.range!.anchor.offset = editor.value.range!.focus.offset
	}
	const row = getMatchElementByRange(editor.value, dataRangeCaches.value, { parsedom: 'tr' })
	if (row) {
		const tbody = row.parent!
		const { columnNumber } = getTableSize(tbody.children!)
		const children: AlexElementCreateConfigType[] = []
		for (let i = 0; i < columnNumber; i++) {
			children.push({
				type: 'inblock',
				parsedom: 'td',
				children: [
					{
						type: 'closed',
						parsedom: 'br'
					}
				]
			})
		}
		const newRow = AlexElement.create({
			type: 'inblock',
			parsedom: 'tr',
			children
		})
		if (type == 'up') {
			editor.value.addElementBefore(newRow, row)
		} else {
			editor.value.addElementAfter(newRow, row)
		}
		//重置光标
		editor.value.range!.anchor.moveToStart(newRow)
		editor.value.range!.focus.moveToStart(newRow)
		//渲染
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
		//更新工具条位置
		setTimeout(() => {
			layerRef.value!.setPosition()
		}, 0)
	}
}
//表格前后插入段落
const insertParagraphWithTable = (type: string | undefined = 'up') => {
	const table = getMatchElementByRange(editor.value, dataRangeCaches.value, { parsedom: 'table' })
	if (table) {
		const paragraph = AlexElement.create({
			type: 'block',
			parsedom: AlexElement.BLOCK_NODE,
			children: [
				{
					type: 'closed',
					parsedom: 'br'
				}
			]
		})
		if (type == 'up') {
			editor.value.addElementBefore(paragraph, table)
		} else {
			editor.value.addElementAfter(paragraph, table)
		}
		editor.value.range!.anchor.moveToEnd(paragraph)
		editor.value.range!.focus.moveToEnd(paragraph)
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
}
//删除元素
const deleteElement = (parsedom: string) => {
	const element = getMatchElementByRange(editor.value, dataRangeCaches.value, { parsedom })
	if (element) {
		element.toEmpty()
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
}
//删除表格行
const deleteTableRow = () => {
	if (!editor.value.range!.anchor.isEqual(editor.value.range!.focus)) {
		editor.value.range!.anchor.element = editor.value.range!.focus.element
		editor.value.range!.anchor.offset = editor.value.range!.focus.offset
	}
	const column = getMatchElementByRange(editor.value, dataRangeCaches.value, { parsedom: 'td' })
	if (column) {
		//光标所在行
		const row = column.parent!
		//如果只有一行则删除表格
		if (row.parent!.children!.length == 1) {
			deleteElement('table')
			return
		}
		//光标所在的单元格在行中的序列
		const index = row.children!.findIndex(item => {
			return item.isEqual(column)
		})
		//上一行
		const previousRow = editor.value.getPreviousElement(row)
		//下一行
		const nextRow = editor.value.getNextElement(row)
		//遍历行中的每一个单元格
		row.children!.forEach((item, i) => {
			//获取单元格占的行数
			const itemSpanNum = getCellSpanNumber(item)
			//是隐藏的单元格
			if (item.hasMarks() && item.marks!['data-editify-merged']) {
				const { crossRowElement } = getCellMergeElement(editor.value, item)
				//如果是被跨行单元格合并的
				if (crossRowElement) {
					const { rowspan } = getCellSpanNumber(crossRowElement)
					if (rowspan - 1 == 1) {
						delete crossRowElement.marks!['rowspan']
					} else {
						crossRowElement.marks!['rowspan'] = rowspan - 1
					}
				}
			}
			//是跨行的单元格
			else if (itemSpanNum.rowspan > 1) {
				//获取下一行
				let el = editor.value.getNextElement(row)
				if (el && itemSpanNum.rowspan - 1 > 1) {
					if (el.children![i].hasMarks()) {
						el.children![i].marks!['rowspan'] = itemSpanNum.rowspan - 1
					} else {
						el.children![i].marks = {
							rowspan: itemSpanNum.rowspan - 1
						}
					}
				}
			}
		})
		//删除行
		row.toEmpty()
		//重置光标
		if (previousRow) {
			editor.value.range!.anchor.moveToEnd(previousRow.children![index])
			editor.value.range!.focus.moveToEnd(previousRow.children![index])
		} else {
			editor.value.range!.anchor.moveToEnd(nextRow!.children![index])
			editor.value.range!.focus.moveToEnd(nextRow!.children![index])
		}
		//渲染
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
		//更新工具条位置
		setTimeout(() => {
			layerRef.value!.setPosition()
		}, 0)
	}
}
//删除表格列
const deleteTableColumn = () => {
	if (!editor.value.range!.anchor.isEqual(editor.value.range!.focus)) {
		editor.value.range!.anchor.element = editor.value.range!.focus.element
		editor.value.range!.anchor.offset = editor.value.range!.focus.offset
	}
	const column = getMatchElementByRange(editor.value, dataRangeCaches.value, { parsedom: 'td' })
	if (column) {
		//光标所在行
		const row = column.parent!
		//所有的行元素
		const rows = row.parent!.children!
		//表格元素
		const table = row.parent!.parent!
		//如果光标所在行只有一个单元格则删除表格
		if (row.children!.length == 1) {
			deleteElement('table')
			return
		}
		//光标所在的单元格在行中的序列
		const index = row.children!.findIndex(item => {
			return item.isEqual(column)
		})
		//前一个单元格
		const previousColumn = editor.value.getPreviousElement(column)
		//后一个单元格
		const nextColumn = editor.value.getNextElement(column)
		//遍历所有的行元素
		rows.forEach(item => {
			//对应序列的单元格
			const cell = item.children![index]
			const cellSpanNum = getCellSpanNumber(cell)
			//是隐藏的单元格
			if (cell.hasMarks() && cell.marks!['data-editify-merged']) {
				const { crossColumnElement } = getCellMergeElement(editor.value, cell)
				//如果是被跨列单元格合并的
				if (crossColumnElement) {
					const { colspan } = getCellSpanNumber(crossColumnElement)
					if (colspan - 1 == 1) {
						delete crossColumnElement.marks!['colspan']
					} else {
						crossColumnElement.marks!['colspan'] = colspan - 1
					}
				}
			}
			//跨列的单元格
			else if (cellSpanNum.colspan > 1) {
				//获取下一个单元格
				let el = editor.value.getNextElement(cell)
				if (el && cellSpanNum.colspan - 1 > 1) {
					if (el.hasMarks()) {
						el.marks!['colspan'] = cellSpanNum.colspan - 1
					} else {
						el.marks = {
							colspan: cellSpanNum.colspan - 1
						}
					}
				}
			}
			cell.toEmpty()
		})
		//删除col
		const colgroup = table.children!.find(item => {
			return item.parsedom == 'colgroup'
		})!
		colgroup.children![index].toEmpty()
		if (previousColumn) {
			editor.value.range!.anchor.moveToEnd(previousColumn)
			editor.value.range!.focus.moveToEnd(previousColumn)
		} else {
			editor.value.range!.anchor.moveToEnd(nextColumn!)
			editor.value.range!.focus.moveToEnd(nextColumn!)
		}
		//渲染
		editor.value.formatElementStack()
		editor.value.domRender()
		editor.value.rangeRender()
	}
}
//合并单元格
const mergeCells = (type: 'left' | 'right' | 'up' | 'down') => {
	if (!canMergeCells.value(type)) {
		return
	}
	if (!editor.value.range!.anchor.isEqual(editor.value.range!.focus)) {
		editor.value.range!.anchor.element = editor.value.range!.focus.element
		editor.value.range!.anchor.offset = editor.value.range!.focus.offset
	}
	const column = getMatchElementByRange(editor.value, dataRangeCaches.value, { parsedom: 'td' })
	if (column) {
		//向左合并单元格
		if (type == 'left') {
			//当前单元格所占行数和列数
			const cellSpanNum = getCellSpanNumber(column)
			//获取左侧单元格
			const previousColumn = editor.value.getPreviousElement(column)
			//如果左侧单元格存在
			if (previousColumn) {
				//左侧单元格是隐藏的单元格
				if (previousColumn.hasMarks() && previousColumn.marks!['data-editify-merged']) {
					//获取合并该隐藏单元格的那个单元格
					const { crossColumnElement } = getCellMergeElement(editor.value, previousColumn)
					//如果是被跨列合并则判断跨列单元格占据的行数与当前单元格的行数是否一致
					if (crossColumnElement) {
						const { rowspan, colspan } = getCellSpanNumber(crossColumnElement)
						//进行合并
						if (rowspan == cellSpanNum.rowspan) {
							crossColumnElement.marks!['colspan'] = colspan + cellSpanNum.colspan
							column.children!.forEach(item => {
								crossColumnElement.children!.push(item)
								item.parent = crossColumnElement
							})
							setTableCellMerged(column)
							editor.value.range!.anchor.moveToEnd(crossColumnElement)
							editor.value.range!.focus.moveToEnd(crossColumnElement)
							editor.value.formatElementStack()
							editor.value.domRender()
							editor.value.rangeRender()
						}
					}
				}
				//左侧单元格不是隐藏的单元格
				else {
					//判断所占行数是否一致
					const { rowspan, colspan } = getCellSpanNumber(previousColumn)
					//进行合并
					if (rowspan == cellSpanNum.rowspan) {
						if (previousColumn.hasMarks()) {
							previousColumn.marks!['colspan'] = colspan + cellSpanNum.colspan
						} else {
							previousColumn.marks = {
								colspan: colspan + cellSpanNum.colspan
							}
						}
						column.children!.forEach(item => {
							previousColumn.children!.push(item)
							item.parent = previousColumn
						})
						setTableCellMerged(column)
						editor.value.range!.anchor.moveToEnd(previousColumn)
						editor.value.range!.focus.moveToEnd(previousColumn)
						editor.value.formatElementStack()
						editor.value.domRender()
						editor.value.rangeRender()
					}
				}
			}
		}
		//向右合并单元格
		else if (type == 'right') {
			//当前单元格所占行数和列数
			const cellSpanNum = getCellSpanNumber(column)
			//获取右侧的单元格
			let nextColumn = editor.value.getNextElement(column)
			//如果右侧单元格存在
			while (nextColumn) {
				//右侧单元格是隐藏的单元格
				if (nextColumn.hasMarks() && nextColumn.marks!['data-editify-merged']) {
					//获取合并该隐藏单元格的那个单元格
					const { crossColumnElement } = getCellMergeElement(editor.value, nextColumn)
					//如果是被跨列合并的表示属于当前单元格内，继续向右查询
					if (crossColumnElement) {
						nextColumn = editor.value.getNextElement(nextColumn)
					}
					//被跨行合并的直接结束，不能向右合并
					else {
						break
					}
				}
				//右侧单元格不是隐藏的
				else {
					//判断行数是否与当前单元格一致
					const { rowspan, colspan } = getCellSpanNumber(nextColumn)
					//如果一致则可以合并
					if (rowspan == cellSpanNum.rowspan) {
						if (column.hasMarks()) {
							column.marks!['colspan'] = cellSpanNum.colspan + colspan
						} else {
							column.marks = {
								colspan: cellSpanNum.colspan + colspan
							}
						}
						nextColumn.children!.forEach(item => {
							column.children!.push(item)
							item.parent = column
						})
						setTableCellMerged(nextColumn)
						editor.value.range!.anchor.moveToEnd(column)
						editor.value.range!.focus.moveToEnd(column)
						editor.value.formatElementStack()
						editor.value.domRender()
						editor.value.rangeRender()
					}
					//不管是否一致都直接结束
					break
				}
			}
		}
		//向上合并单元格
		else if (type == 'up') {
			//当前单元格所占行数和列数
			const cellSpanNum = getCellSpanNumber(column)
			//获取单元格在行中的序列
			const index = column.parent!.children!.findIndex(item => item.isEqual(column))
			//获取上一行
			const previousRow = editor.value.getPreviousElement(column.parent!)
			//如果上一行存在
			if (previousRow) {
				//获取上一行中对应序列的单元格
				const previousColumn = previousRow.children![index]
				//单元格是隐藏的单元格
				if (previousColumn.hasMarks() && previousColumn.marks!['data-editify-merged']) {
					//获取合并该隐藏单元格的那个单元格
					const { crossRowElement } = getCellMergeElement(editor.value, previousColumn)
					//如果是被跨行合并则判断跨列单元格占据的列数与当前单元格的列数是否一致
					if (crossRowElement) {
						const { rowspan, colspan } = getCellSpanNumber(crossRowElement)
						//进行合并
						if (colspan == cellSpanNum.colspan) {
							crossRowElement.marks!['rowspan'] = rowspan + cellSpanNum.rowspan
							column.children!.forEach(item => {
								crossRowElement.children!.push(item)
								item.parent = crossRowElement
							})
							setTableCellMerged(column)
							editor.value.range!.anchor.moveToEnd(crossRowElement)
							editor.value.range!.focus.moveToEnd(crossRowElement)
							editor.value.formatElementStack()
							editor.value.domRender()
							editor.value.rangeRender()
						}
					}
				}
				//单元格不是隐藏的单元格
				else {
					//判断所占列数是否一致
					const { rowspan, colspan } = getCellSpanNumber(previousColumn)
					//进行合并
					if (colspan == cellSpanNum.colspan) {
						if (previousColumn.hasMarks()) {
							previousColumn.marks!['rowspan'] = rowspan + cellSpanNum.rowspan
						} else {
							previousColumn.marks = {
								rowspan: rowspan + cellSpanNum.rowspan
							}
						}
						column.children!.forEach(item => {
							previousColumn.children!.push(item)
							item.parent = previousColumn
						})
						setTableCellMerged(column)
						editor.value.range!.anchor.moveToEnd(previousColumn)
						editor.value.range!.focus.moveToEnd(previousColumn)
						editor.value.formatElementStack()
						editor.value.domRender()
						editor.value.rangeRender()
					}
				}
			}
		}
		//向下合并单元格
		else if (type == 'down') {
			//当前单元格所占行数和列数
			const cellSpanNum = getCellSpanNumber(column)
			//获取单元格在行中的序列
			const index = column.parent!.children!.findIndex(item => item.isEqual(column))
			//获取下一行
			let nextRow = editor.value.getNextElement(column.parent!)
			//如果下一行存在
			while (nextRow) {
				//获取下一行中对应序列的单元格
				const nextColumn = nextRow.children![index]
				//单元格是隐藏的单元格
				if (nextColumn.hasMarks() && nextColumn.marks!['data-editify-merged']) {
					//获取合并该隐藏单元格的那个单元格
					const { crossRowElement } = getCellMergeElement(editor.value, nextColumn)
					//如果是被跨行合并的表示属于当前单元格内，继续向下查询
					if (crossRowElement) {
						nextRow = editor.value.getNextElement(nextRow)
					}
					//被跨列合并的直接结束，不能向右合并
					else {
						break
					}
				}
				//单元格不是隐藏的
				else {
					//判断列数是否与当前单元格一致
					const { rowspan, colspan } = getCellSpanNumber(nextColumn)
					//如果一致则可以合并
					if (colspan == cellSpanNum.colspan) {
						if (column.hasMarks()) {
							column.marks!['rowspan'] = cellSpanNum.rowspan + rowspan
						} else {
							column.marks = {
								rowspan: cellSpanNum.rowspan + rowspan
							}
						}
						nextColumn.children!.forEach(item => {
							column.children!.push(item)
							item.parent = column
						})
						setTableCellMerged(nextColumn)
						editor.value.range!.anchor.moveToEnd(column)
						editor.value.range!.focus.moveToEnd(column)
						editor.value.formatElementStack()
						editor.value.domRender()
						editor.value.rangeRender()
					}
					//不管是否一致都直接结束
					break
				}
			}
		}
	}
}
//浮层显示时
const layerShow = () => {
	//链接初始化展示
	if (props.type == 'link') {
		const link = getMatchElementByRange(editor.value, dataRangeCaches.value, { parsedom: 'a' })
		if (link) {
			linkConfig.value.url = link.marks!['href']
			linkConfig.value.newOpen = link.marks!['target'] == '_blank'
		}
	}
	//视频初始化显示
	else if (props.type == 'video') {
		const video = getMatchElementByRange(editor.value, dataRangeCaches.value, { parsedom: 'video' })
		if (video) {
			videoConfig.value.autoplay = !!video.marks!['autoplay']
			videoConfig.value.loop = !!video.marks!['loop']
			videoConfig.value.controls = !!video.marks!['controls']
			videoConfig.value.muted = !!video.marks!['muted']
		}
	}
	//代码块初始化展示设置
	else if (props.type == 'codeBlock') {
		const pre = getMatchElementByRange(editor.value, dataRangeCaches.value, {
			parsedom: 'pre'
		})
		if (pre) {
			languageConfig.value.displayConfig.value = pre.marks!['data-editify-hljs'] || ''
		}
	}
	//文本工具条初始化显示
	else if (props.type == 'text') {
		//额外禁用判定
		const extraDisabled = (name: string) => {
			if (typeof props.config.extraDisabled == 'function') {
				return props.config.extraDisabled(name) || false
			}
			return false
		}
		//显示已设置标题
		const findHeadingItem = headingConfig.value.displayConfig.options.find((item: string | number | ButtonOptionsItemType) => {
			let val: string | number | ButtonOptionsItemType = item
			if (DapCommon.isObject(item)) {
				val = (<ButtonOptionsItemType>item).value!
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
		headingConfig.value.disabled = extraDisabled('heading')

		//对齐方式禁用
		alignConfig.value.disabled = extraDisabled('align')

		//有序列表按钮激活
		orderListConfig.value.active = isRangeInList(editor.value, dataRangeCaches.value, true)
		//有序列表按钮禁用
		orderListConfig.value.disabled = extraDisabled('orderList')

		//无序列表按钮激活
		unorderListConfig.value.active = isRangeInList(editor.value, dataRangeCaches.value, false)
		//无序列表按钮禁用
		unorderListConfig.value.disabled = extraDisabled('unorderList')

		//任务列表按钮激活
		taskConfig.value.active = isRangeInTask(editor.value, dataRangeCaches.value)
		//任务列表按钮禁用
		taskConfig.value.disabled = extraDisabled('task')

		//粗体按钮激活
		boldConfig.value.active = queryTextStyle(editor.value, dataRangeCaches.value, 'font-weight', 'bold') || queryTextStyle(editor.value, dataRangeCaches.value, 'font-weight', '700')
		//粗体按钮禁用
		boldConfig.value.disabled = extraDisabled('bold')

		//斜体按钮激活
		italicConfig.value.active = queryTextStyle(editor.value, dataRangeCaches.value, 'font-style', 'italic')
		//斜体按钮禁用
		italicConfig.value.disabled = extraDisabled('italic')

		//删除线按钮激活
		strikethroughConfig.value.active = queryTextStyle(editor.value, dataRangeCaches.value, 'text-decoration', 'line-through') || queryTextStyle(editor.value, dataRangeCaches.value, 'text-decoration-line', 'line-through')
		//删除线按钮禁用
		strikethroughConfig.value.disabled = extraDisabled('strikethrough')

		//下划线按钮激活
		underlineConfig.value.active = queryTextStyle(editor.value, dataRangeCaches.value, 'text-decoration', 'underline') || queryTextStyle(editor.value, dataRangeCaches.value, 'text-decoration-line', 'underline')
		//下划线按钮禁用
		underlineConfig.value.disabled = extraDisabled('underline')

		//行内代码按钮激活
		codeConfig.value.active = queryTextMark(editor.value, dataRangeCaches.value, 'data-editify-code')
		//行内代码按钮禁用
		codeConfig.value.disabled = extraDisabled('code')

		//上标按钮激活
		superConfig.value.active = queryTextStyle(editor.value, dataRangeCaches.value, 'vertical-align', 'super')
		//上标按钮禁用
		superConfig.value.disabled = extraDisabled('super')

		//下标按钮激活
		subConfig.value.active = queryTextStyle(editor.value, dataRangeCaches.value, 'vertical-align', 'sub')
		//下标按钮禁用
		subConfig.value.disabled = extraDisabled('sub')

		//显示已选择字号
		const findFontItem = fontSizeConfig.value.displayConfig.options.find((item: string | number | ButtonOptionsItemType) => {
			if (DapCommon.isObject(item)) {
				return queryTextStyle(editor.value, dataRangeCaches.value, 'font-size', (<ButtonOptionsItemType>item).value)
			}
			return queryTextStyle(editor.value, dataRangeCaches.value, 'font-size', <string | number>item)
		})
		fontSizeConfig.value.displayConfig.value = findFontItem ? (DapCommon.isObject(findFontItem) ? findFontItem.value : findFontItem) : fontSizeConfig.value.defaultValue
		//字号按钮禁用
		fontSizeConfig.value.disabled = extraDisabled('fontSize')

		//显示已选择字体
		const findFamilyItem = fontFamilyConfig.value.displayConfig.options.find((item: string | number | ButtonOptionsItemType) => {
			if (DapCommon.isObject(item)) {
				return queryTextStyle(editor.value, dataRangeCaches.value, 'font-family', (<ButtonOptionsItemType>item).value)
			}
			return queryTextStyle(editor.value, dataRangeCaches.value, 'font-family', <string | number>item)
		})
		fontFamilyConfig.value.displayConfig.value = findFamilyItem ? (DapCommon.isObject(findFamilyItem) ? findFamilyItem.value : findFamilyItem) : fontFamilyConfig.value.defaultValue
		//字体按钮禁用
		fontFamilyConfig.value.disabled = extraDisabled('fontFamily')

		//显示已设置行高
		const findHeightItem = lineHeightConfig.value.displayConfig.options.find((item: string | number | ButtonOptionsItemType) => {
			let val: string | number | ButtonOptionsItemType = item
			if (DapCommon.isObject(item)) {
				val = (<ButtonOptionsItemType>item).value!
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
		lineHeightConfig.value.disabled = extraDisabled('lineHeight')

		//显示已选择的前景色
		const findForeColorItem = foreColorConfig.value.selectConfig.options.find((item: string | number | ButtonOptionsItemType) => {
			if (DapCommon.isObject(item)) {
				return queryTextStyle(editor.value, dataRangeCaches.value, 'color', (<ButtonOptionsItemType>item).value)
			}
			return queryTextStyle(editor.value, dataRangeCaches.value, 'color', <string | number>item)
		})
		foreColorConfig.value.value = findForeColorItem ? (DapCommon.isObject(findForeColorItem) ? findForeColorItem.value : findForeColorItem) : ''
		//前景色按钮禁用
		foreColorConfig.value.disabled = extraDisabled('foreColor')

		//显示已选择的背景色
		const findBackColorItem = backColorConfig.value.selectConfig.options.find((item: string | number | ButtonOptionsItemType) => {
			if (DapCommon.isObject(item)) {
				return queryTextStyle(editor.value, dataRangeCaches.value, 'background-color', (<ButtonOptionsItemType>item).value)
			}
			return queryTextStyle(editor.value, dataRangeCaches.value, 'background-color', <string | number>item)
		})
		backColorConfig.value.value = findBackColorItem ? (DapCommon.isObject(findBackColorItem) ? findBackColorItem.value : findBackColorItem) : ''
		//背景色按钮禁用
		backColorConfig.value.disabled = extraDisabled('backColor')

		//清除格式按钮禁用
		formatClearConfig.value.disabled = extraDisabled('formatClear')
	}
}

defineExpose({
	layerRef
})
</script>
<style scoped src="./toolbar.less"></style>

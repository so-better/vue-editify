<template>
	<Layer v-model="show" ref="layerRef" :node="node" :scroll-node="scrollNode" border placement="bottom-start" :useRange="type == 'text'" :z-index="zIndex" :inside-elements="insideElements">
		<div class="editify-toolbar" :style="config.style">
			<!-- 链接工具条 -->
			<linkToolbar v-if="type == 'link'" :color="color" />
			<!-- 图片工具条 -->
			<ImageToolbar v-else-if="type == 'image'" @reset-toolbar="layerRef!.setPosition()" :tooltip="config.tooltip!" :color="color" :z-index="zIndex + 1" />
			<!-- 视频工具条 -->
			<VideoToolbar v-else-if="type == 'video'" @reset-toolbar="layerRef!.setPosition()" :tooltip="config.tooltip!" :color="color" :z-index="zIndex + 1" />
			<!-- 表格工具条 -->
			<TableToolbar v-else-if="type == 'table'" @reset-toolbar="layerRef!.setPosition()" :tooltip="config.tooltip!" :color="color" :z-index="zIndex + 1" />
			<!-- 代码块工具条 -->
			<CodeBlockToolbar v-else-if="type == 'codeBlock'" ref="codeBlockToolbarRef" :language="config.codeBlock!.languages!" :tooltip="config.tooltip!" :color="color" :z-index="zIndex + 1" />
			<!-- 文本工具条 -->
			<template v-else-if="type == 'text'">
				<component v-for="(btn, index) in textToolbarBtns" :ref="el => (textToolbarBtnRefs[index] = (el as BtnComponentPublicInstance))" :is="btn" :color="color" :z-index="zIndex + 1" :config="textButtonConfig(btn.name)" :tooltip="config.tooltip!" />
			</template>
		</div>
	</Layer>
</template>
<script setup lang="ts">
import { ComponentPublicInstance, computed, ref, shallowRef } from 'vue'
import { Layer } from '@/components/layer'
import { Button } from '@/components/button'
import { ToolbarProps } from './props'
import { linkToolbar } from '@/feature/link'
import { ImageToolbar } from '@/feature/image'
import { VideoToolbar } from '@/feature/video'
import { TableToolbar } from '@/feature/table'
import { CodeBlockToolbar } from '@/feature/codeBlock'
import { HeadingToolbarButton } from '@/feature/heading'
import { AlignToolbarButton } from '@/feature/align'
import { OrderListToolbarButton } from '@/feature/orderList'
import { UnorderListToolbarButton } from '@/feature/unorderList'
import { TaskToolbarButton } from '@/feature/task'
import { BoldToolbarButton } from '@/feature/bold'
import { ItalicToolbarButton } from '@/feature/italic'
import { StrikethroughToolbarButton } from '@/feature/strikethrough'
import { UnderlineToolbarButton } from '@/feature/underline'
import { CodeToolbarButton } from '@/feature/code'
import { SuperToolbarButton } from '@/feature/super'
import { SubToolbarButton } from '@/feature/sub'
import { FontSizeToolbarButton } from '@/feature/fontSize'
import { FontFamilyToolbarButton } from '@/feature/fontFamily'
import { LineHeightToolbarButton } from '@/feature/lineHeight'
import { ForeColorToolbarButton } from '@/feature/foreColor'
import { BackColorToolbarButton } from '@/feature/backColor'
import { FormatClearToolbarButton } from '@/feature/formatClear'

defineOptions({
	name: 'Toolbar'
})
//属性
const props = defineProps(ToolbarProps)
//事件
const emits = defineEmits(['update:modelValue'])

//工具条浮层组件实例
const layerRef = ref<InstanceType<typeof Layer> | null>(null)
//文本按钮实例类型
type BtnComponentPublicInstance = ComponentPublicInstance & { btnRef: InstanceType<typeof Button> }
//代码块语言选择按钮实例
const codeBlockToolbarRef = ref<BtnComponentPublicInstance | null>(null)
//文本工具条按钮数组
const textToolbarBtns = shallowRef([HeadingToolbarButton, AlignToolbarButton, OrderListToolbarButton, UnorderListToolbarButton, TaskToolbarButton, BoldToolbarButton, ItalicToolbarButton, StrikethroughToolbarButton, UnderlineToolbarButton, CodeToolbarButton, SuperToolbarButton, SubToolbarButton, FontSizeToolbarButton, FontFamilyToolbarButton, LineHeightToolbarButton, ForeColorToolbarButton, BackColorToolbarButton, FormatClearToolbarButton])
//文本工具条按钮实例
const textToolbarBtnRefs = ref<BtnComponentPublicInstance[]>([])

//是否显示工具条
const show = computed<boolean>({
	get() {
		return props.modelValue
	},
	set(val) {
		emits('update:modelValue', val)
	}
})
//点击不关闭工具条浮层的元素（算在工具条浮层元素范围内）
const insideElements = computed<HTMLElement[]>(() => {
	let elements: HTMLElement[] = []
	//语言选择浮层元素
	if (codeBlockToolbarRef.value && codeBlockToolbarRef.value.btnRef && codeBlockToolbarRef.value.btnRef.layerRef && codeBlockToolbarRef.value.btnRef.layerRef.elRef) {
		elements.push(codeBlockToolbarRef.value.btnRef.layerRef.elRef)
	}
	textToolbarBtnRefs.value.forEach(el => {
		if (el && el.btnRef && el.btnRef.layerRef && el.btnRef.layerRef.elRef) {
			elements.push(el.btnRef.layerRef.elRef)
		}
	})
	return elements
})
//文本按钮配置
const textButtonConfig = computed<any>(() => {
	return (name: string) => {
		return (props.config.text as any)[name.replace('_', '')]
	}
})

defineExpose({
	layerRef
})
</script>
<style scoped src="./toolbar.less"></style>

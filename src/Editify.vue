<template>
	<div class="editify">
		<div ref="wrapRef" class="editify-wrap" :class="{ border: props.border }" :style="wrapStyle"></div>
	</div>
</template>
<script name="editify" setup>
import { computed, ref, onMounted } from 'vue'
import { AlexEditor, AlexElement } from 'alex-editor'
import { Props } from './core'
const props = defineProps(Props)
const emits = defineEmits(['update:modelValue'])
//编辑区域样式
const wrapStyle = computed(() => {
	return props.autoheight ? { minHeight: props.height } : { height: props.height }
})
//编辑器元素
const wrapRef = ref(null)
//编辑器实例对象
let editor = null
onMounted(() => {
	//创建编辑器
	editor = new AlexEditor(wrapRef.value, {
		value: props.modelValue,
		disabled: props.disabled,
		renderRules: [],
		allowCopy: props.allowCopy,
		allowPaste: props.allowPaste,
		allowCut: props.allowCut,
		allowPasteHtml: props.allowPasteHtml,
		allowPasteHtml: props.allowPasteHtml
	})
	editor.formatElementStack()
	editor.domRender()
})
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
	}

	//段落样式
	:deep(p) {
		display: block;
		width: 100%;
		margin: 0 0 10px 0;
		padding: 0;
	}
}
</style>

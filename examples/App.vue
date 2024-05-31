<template>
	<div style="padding: 10px; height: 100%; box-sizing: border-box">
		<button @click="setStart">setStart</button>
		<Editify ref="editify" border v-model="val" :menu="menuConfig" style="height: 100%" placeholder="Please Enter Text..." :toolbar="toolbarConfig" locale="zh_CN" allow-paste-html :plugins="plugins"></Editify>
	</div>
</template>
<script setup lang="ts">
import { h, onMounted, ref } from 'vue'
import { AlexElement, MenuConfigType, Editify, attachment, PluginType, mathformula, ToolbarConfigType, getMatchElementByRange, panel } from '../src/index'
const val = ref<string>('3333<div data-editify-panel="true"><div>标题</div><div>这是一个面板</div></div>333')

const editify = ref<InstanceType<typeof Editify> | null>(null)
const menuConfig = ref<MenuConfigType>({
	use: true,
	mode: 'inner',
	sourceView: {
		show: true
	},
	video: {
		multiple: true
	},
	fullScreen: {
		show: true
	}
})
const toolbarConfig = ref<ToolbarConfigType>({
	use: true
})

const plugins = ref<PluginType[]>([panel(), mathformula(), attachment()])

const setStart = () => {
	editify.value!.editor!.range!.anchor.moveToStart(editify.value!.editor!.stack[0])
	editify.value!.editor!.range!.focus.moveToStart(editify.value!.editor!.stack[0])
	editify.value!.editor!.rangeRender()
}
</script>
<style lang="less">
html,
body {
	height: 100%;
}
body {
	margin: 0;
}

#app {
	height: 100%;
	overflow: auto;
}

table {
	border: 1px solid #ccc;
	width: 100%;
	border-collapse: collapse;

	tr,
	td,
	th {
		border: 1px solid #ccc;
	}

	td {
		text-align: center;
		padding: 10px;
	}
}
</style>

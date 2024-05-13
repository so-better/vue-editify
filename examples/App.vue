<template>
	<div style="padding: 10px; height: 100%; box-sizing: border-box">
		<Editify ref="editify" border v-model="val" :menu="menuConfig" style="height: 100%" placeholder="Please Enter Text..." :toolbar="toolbarConfig" locale="zh_CN" allow-paste-html :plugins="plugins"></Editify>
	</div>
</template>
<script setup lang="ts">
import { h, ref } from 'vue'
import { AlexElement, MenuConfigType, Editify, attachment, PluginType, mathformula, ToolbarConfigType } from '../src/index'
const val = ref<string>('<ul><li>列表1</li><li>列表2</li><li>列表3</li><li>列表4</li></ul>')

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

const plugins = ref<PluginType[]>([
	attachment({
		leftBorder: true
	}),
	mathformula()
])
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
</style>

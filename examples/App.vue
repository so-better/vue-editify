<template>
	<div style="padding: 10px; height: 100%; box-sizing: border-box">
		<Editify ref="editify" border v-model="val" :menu="menuConfig" style="height: 100%" placeholder="Please Enter Text..." locale="zh_CN" allow-paste-html :plugins="plugins"></Editify>
	</div>
</template>
<script setup lang="ts">
import { h, ref } from 'vue'
import { AlexElement, MenuConfigType, Editify, attachment, PluginType } from '../src/index'
const val = ref<string>('<p><code>444</code></p>')
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

const plugins = ref<PluginType[]>([
	attachment({
		multiple: true,
		customUpload: (files: File[]) => {
			return files.map(item => {
				return 'xxx'
			})
		}
	})
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

<template>
	<div style="padding: 10px; height: 100%; box-sizing: border-box">
		<Editify ref="editify" border v-model="val" :menu="menuConfig" style="height: 100%" placeholder="Please Enter Text..." locale="zh_CN" allow-paste-html :plugins="plugins"></Editify>
	</div>
</template>
<script setup lang="ts">
import { h, ref } from 'vue'
import { AlexElement, MenuConfigType, Editify, attachment, PluginType } from '../src/index'
const val = ref<string>('<p><br></p>')
const editify = ref<InstanceType<typeof Editify> | null>(null)
const menuConfig = ref<MenuConfigType>({
	use: true,
	mode: 'inner',
	sourceView: {
		show: true
	},
	fullScreen: {
		show: true
	}
})
const redPlugin: PluginType = () => {
	return {
		customParseNode: el => {
			if (el.hasStyles()) {
				el.styles!['color'] = 'red'
			} else {
				el.styles = {
					color: 'red'
				}
			}
			return el
		}
	}
}
const plugins = ref<PluginType[]>([attachment(), redPlugin])
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

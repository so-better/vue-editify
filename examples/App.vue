<template>
	<div style="height: 100%">
		<Editify :dark="dark" ref="editifyRef" border v-model="val" :menu="menuConfig" placeholder="Please Enter Text..." :toolbar="toolbarConfig" locale="zh_CN" allow-paste-html show-word-length></Editify>
	</div>
</template>
<script setup lang="ts">
import { h, ref, onErrorCaptured } from 'vue'
import { Editify } from '../src'

onErrorCaptured(err => {
	console.log(err)
})

const editifyRef = ref<InstanceType<typeof Editify> | null>(null)
const dark = ref<boolean>(false)
const menuConfig = ref({
	use: true,
	mode: 'inner',
	sequence: {
		dark: 100
	},
	sourceView: {
		show: true
	},
	fullScreen: {
		show: true
	},
	attachment: {
		show: true
	},
	mathformula: {
		show: true,
		handleError: err => {
			console.log(err)
		}
	},
	panel: {
		show: true
	},
	infoBlock: {
		show: true
	},
	extends: {
		dark: {
			title: '深色模式',
			leftBorder: true,
			active: dark.value,
			default: () => h('span', dark.value ? '深色模式' : '浅色模式'),
			onOperate: () => {
				dark.value = !dark.value
			}
		}
	}
})
const toolbarConfig = ref({
	use: true
})
const val = ref<string>(`<ol type="a"><li>33333</li><li>33333</li><li>33333</li></ol>`)
</script>
<style lang="less">
html,
body {
	height: 100%;
}
body {
	margin: 0;
	background-color: var(--editify-background);
}

#app {
	height: 100%;
	overflow: auto;
}
</style>

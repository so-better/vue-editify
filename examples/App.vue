<template>
	<div style="padding: 10px; height: 100%; box-sizing: border-box">
		<Editify ref="editify" border v-model="val" :menu="menuConfig" style="height: 100%" placeholder="Please Enter Text..." :toolbar="toolbarConfig" locale="zh_CN" allow-paste-html :plugins="plugins"></Editify>
	</div>
</template>
<script setup lang="ts">
import { h, ref } from 'vue'
import { AlexElement, MenuConfigType, Editify, attachment, PluginType, mathformula, ToolbarConfigType } from '../src/index'
const val = ref<string>(
	'<p><span>这是一个</span><a href="#" data-editify-element="41"><span>链接</span></a><span>文本这是一</span><span style="font-weight: bold;">个链接</span><span>文本</span></p><p><img src="https://www.ling0523.cn/images/image_0_1701871044625.jpg" data-editify-element="47"></p><p><span>﻿</span><video src="https://video.699pic.com/videos/92/12/46/b_zEMHgCfQS5fV1714921246.mp4" data-editify-element="50"></video><span>﻿</span></p><pre data-editify-element="52"><span class="editify-hljs-keyword">import</span><span> </span><span class="editify-hljs-title class_">AlexEditor</span><span> </span><span class="editify-hljs-keyword">from</span><span> </span><span class="editify-hljs-string">"alex-editor"</span></pre><table data-editify-element="60" style="white-space: pre-wrap; word-break: break-word;"><colgroup><col width="auto"><col width="auto"><col width="auto"><col width="auto"><col width="auto"><col width="auto"></colgroup><tbody><tr><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td></tr><tr><td><br></td><td><br></td><td><br></td><td><br></td><td><br></td><td><br></td></tr><tr><td><br></td><td><br></td><td><br></td><td><br></td><td><br></td><td><br></td></tr><tr><td><br></td><td><br></td><td><br></td><td><br></td><td><br></td><td><br></td></tr></tbody></table>'
)

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

<template>
	<div style="padding: 10px; height: 100%; box-sizing: border-box">
		<Editify ref="editify" border v-model="val" :menu="menuConfig" style="height: 100%" placeholder="Please Enter Text..." locale="zh_CN" allow-paste-html :plugins="plugins"></Editify>
	</div>
</template>
<script setup lang="ts">
import { h, ref } from 'vue'
import { AlexElement, MenuConfigType, Editify, attachment, PluginType, mathformula } from '../src/index'
const val = ref<string>('<p><span data-editify-mathformula="true" contenteditable="false"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi><span>f</span></mi><mo stretchy="false"><span>(</span></mo><mi><span>x</span></mi><mo stretchy="false"><span>)</span></mo><mo><span>=</span></mo><msubsup><mo><span>∫</span></mo><mi><span>ab</span></mi></msubsup><mfrac><mn><span>1</span></mn><msup><mi><span>x</span></mi><mn><span>2</span></mn></msup></mfrac><mi><span>dx</span></mi></mrow></semantics></math></span></p>')

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
	attachment(),
	mathformula({
		leftBorder: true
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

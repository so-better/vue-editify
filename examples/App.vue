<template>
	<div style="padding: 10px; height: 100%; box-sizing: border-box">
		<Editify ref="editify" border v-model="val" :menu="menuConfig" style="height: 100%" placeholder="Please Enter Text..." locale="zh_CN" allow-paste-html :plugins="plugins"></Editify>
	</div>
</template>
<script setup lang="ts">
import { h, ref } from 'vue'
import { AlexElement, MenuConfigType, Editify, attachment, PluginType, mathformula } from '../src/index'
const val = ref<string>(
	'<p><span data-editify-mathformula="true" contenteditable="false" class="katex"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="bold">A</mi><mo>=</mo><mrow><mo fence="true">(</mo><mtable rowspacing="0.16em" columnalign="center center center" columnspacing="1em"><mtr><mtd><mstyle scriptlevel="0" displaystyle="false"><mn>1</mn></mstyle></mtd><mtd><mstyle scriptlevel="0" displaystyle="false"><mn>2</mn></mstyle></mtd><mtd><mstyle scriptlevel="0" displaystyle="false"><mn>3</mn></mstyle></mtd></mtr><mtr><mtd><mstyle scriptlevel="0" displaystyle="false"><mn>4</mn></mstyle></mtd><mtd><mstyle scriptlevel="0" displaystyle="false"><mn>5</mn></mstyle></mtd><mtd><mstyle scriptlevel="0" displaystyle="false"><mn>6</mn></mstyle></mtd></mtr><mtr><mtd><mstyle scriptlevel="0" displaystyle="false"><mn>7</mn></mstyle></mtd><mtd><mstyle scriptlevel="0" displaystyle="false"><mn>8</mn></mstyle></mtd><mtd><mstyle scriptlevel="0" displaystyle="false"><mn>9</mn></mstyle></mtd></mtr></mtable><mo fence="true">)</mo></mrow></mrow><annotation encoding="application/x-tex">\mathbf{A} = \begin{pmatrix} 1 &amp; 2 &amp; 3 \\ 4 &amp; 5 &amp; 6 \\ 7 &amp; 8 &amp; 9 \end{pmatrix}</annotation></semantics></math></span></p>'
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

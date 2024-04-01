<template>
	<div style="padding: 10px; height: 100%; box-sizing: border-box">
		<button @click="handleClick">按钮</button>
		<Editify ref="editify" v-model="val"></Editify>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { setIndentIncrease, Editify } from '../src/index'
const val = ref<string>('<p><br></p>')
const editify = ref<InstanceType<typeof Editify> | null>(null)
const handleClick = () => {
	setIndentIncrease(editify.value!.editor!, editify.value!.dataRangeCaches)
	editify.value!.editor!.formatElementStack()
	editify.value!.editor!.domRender()
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

span[data-zip] {
	display: inline-block;
	width: 40px;
	height: 40px;
	background: url(https://www.ling0523.cn/images/image_0_1702456046669.png) no-repeat center;
	background-size: cover;
	cursor: pointer;
	margin: 0 10px;
}
</style>

<template>
	<div style="padding: 10px; height: 100%; box-sizing: border-box">
		<editify v-model="val"></editify>
	</div>
</template>
<script setup lang="ts">
import { defineComponent, getCurrentInstance, h, inject, onMounted, provide, ref, useSlots } from 'vue'
import Button from '../src/components/button/button.vue'
import Icon from '../src/components/icon/icon.vue'
const instance = getCurrentInstance()!
const val = ref<string>('<p><br></p>')
onMounted(() => {})
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

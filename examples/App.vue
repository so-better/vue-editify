<template>
	<div style="padding: 10px; height: 100%; box-sizing: border-box">
		<Editify ref="editify" border v-model="val" :menu="menuConfig" style="height: 100%" placeholder="Please Enter Text..." locale="zh_CN" :customTextPaste="customTextPaste"></Editify>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { AlexElement, Editify, insertImage, insertVideo } from '../src/index'
import { MenuConfigType } from '../src/index'
const val = ref<string>('<p><br></p>')
const editify = ref<InstanceType<typeof Editify> | null>(null)
const menuConfig = ref<MenuConfigType>({
	use: true,
	mode: 'inner',
	image: {
		accept: ['jpg'],
		handleError: (error, file) => {
			console.log(error, file)
		}
	},
	fullScreen: {
		show: true
	}
})
const customTextPaste = function (data: string) {
	const text = new AlexElement(
		'text',
		null,
		null,
		{
			color: 'red',
			'font-weight': 'bold'
		},
		data
	)
	editify.value!.editor!.insertElement(text)
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

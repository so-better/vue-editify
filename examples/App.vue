<template>
	<div style="padding: 10px; height: 100%; box-sizing: border-box">
		<Editify ref="editify" border v-model="val" :menu="menuConfig" style="height: 100%" placeholder="Please Enter Text..." locale="zh_CN" :customTextPaste="customTextPaste" show-word-length></Editify>
	</div>
</template>
<script setup lang="ts">
import { h, ref } from 'vue'
import { AlexElement, Editify } from '../src/index'
import { MenuConfigType } from '../src/index'
const val = ref<string>('<p><br></p>')
const editify = ref<InstanceType<typeof Editify> | null>(null)
const menuConfig = ref<MenuConfigType>({
	use: true,
	mode: 'inner',
	sequence: {
		imgList: 101
	},
	image: {
		accept: ['png'],
		handleError: (error, file) => {
			console.log(error, file)
		}
	},
	sourceView: {
		show: true
	},
	fullScreen: {
		show: true
	},
	extends: {
		imgList: {
			title: '自定义菜单按钮',
			leftBorder: true,
			rightBorder: false,
			disabled: false,
			active: false,
			type: 'select',
			options: [
				{
					label: '自定义功能1',
					value: '1',
					style: {
						color: '#f30'
					}
				},
				{
					label: '自定义功能2',
					value: '2',
					style: {
						fontWeight: 'bold'
					}
				},
				{
					label: '自定义功能3',
					value: '3'
				}
			],
			onOperate: function (name, val, instance) {
				console.log(name, val, instance)
			},
			default: () => h('span', {}, '自定义菜单')
		}
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
</style>

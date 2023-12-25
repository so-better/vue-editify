<template>
	<div style="padding: 100px 50px 50px 50px; height: 100%; box-sizing: border-box">
		<div style="display: none" ref="bigData">
			<div data-editify-list="ol" data-editify-value="1"><span>333</span></div>
			<div data-editify-list="ol" data-editify-value="2"><span>222</span></div>
			<div data-editify-list="ol" data-editify-value="3"><span>333</span></div>
		</div>
		<editify v-model="value" placeholder="请输入正文内容..." allow-paste-html :menu="menuConfig" ref="editify" :paste-keep-marks="{ 'data-zip': ['span'] }" autofocus :show-word-length="true" :border="true" :disabled="disabled" :customImagePaste="handleImagePaste"></editify>
	</div>
</template>
<script>
import { AlexElement } from '../src'
import { h } from 'vue'
import Dap from 'dap-util'
export default {
	name: 'App',
	data() {
		return {
			value: ``,
			menuConfig: {
				mode: 'default',
				sequence: {
					alert: 100,
					zip: 101
				},
				table: {
					maxRows: 20,
					maxColumns: 20
				},
				sourceView: {
					show: true
				},
				fullScreen: {
					show: true
				}
			},
			btn: null,
			disabled: false
		}
	},
	mounted() {
		setTimeout(() => {
			this.value = this.$refs.bigData.innerHTML
		}, 500)
	},
	methods: {
		handleImagePaste(url) {
			console.log(url)
			return url
		}
	}
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

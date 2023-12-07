<template>
	<div style="padding: 100px 50px 50px 50px">
		<editify ref="editify" border height="600px" v-model="value" placeholder="Please Enter Text..." allow-paste-html show-word-length :menu="menuConfig"> </editify>
	</div>
</template>
<script>
import { h } from 'vue'
export default {
	name: 'App',
	data() {
		return {
			value: '<p><span>这是一个基于 </span><span data-editify-code="true">Vue3 + alex-editor</span><span> 构建的一套</span><span style="font-weight: bold;">精美UI样式</span><span>的</span><span style="font-weight: bold;">开箱即用</span><span>的</span><span style="color: #ec1a0a;">富文本编辑器</span></p>',
			menuConfig: {
				mode: 'fixed',
				sequence: {
					alert: 100
				},
				extends: {
					alert: {
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
			},
			btn: null
		}
	},
	mounted() {
		// setTimeout(() => {
		// 	this.value = '<p><br></p>'
		// }, 3000)
	},
	methods: {
		change() {
			this.$refs.editify.isSourceView = !this.$refs.editify.isSourceView
		},
		operate(name, val) {
			console.log('触发operate事件', name, val)
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
</style>

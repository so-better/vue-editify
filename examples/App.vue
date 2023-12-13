<template>
	<div style="padding: 100px 50px 50px 50px">
		<editify v-model="value" placeholder="请输入正文内容..." allow-paste-html border @change="change" :menu="menuConfig" ref="editify" height="400px" @after-render="afterRender"></editify>
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
			value: '<p><span>这是一个基于 </span><span data-editify-code="true">Vue3 + alex-editor</span><span> 构建的一套</span><span style="font-weight: bold;">精美UI样式</span><span>的</span><span style="font-weight: bold;">开箱即用</span><span>的</span><span style="color: #ec1a0a;">富文本编辑器</span></p>',
			menuConfig: {
				//mode: 'inner',
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
				extends: {
					zip: {
						title: '上传压缩包',
						default: () => {
							return h('span', {}, 'zip')
						},
						onOperate: () => {
							//选择文件上传
							const upload = document.createElement('input')
							upload.setAttribute('type', 'file')
							upload.setAttribute('accept', 'application/zip')
							upload.onchange = async e => {
								//获取到文件
								const file = e.currentTarget.files[0]
								if (file) {
									//转成base64
									const base64 = await Dap.file.dataFileToBase64(file)
									//创建元素
									const zipEle = new AlexElement('closed', 'div', { class: 'zip', 'data-zip': base64, contenteditable: 'false' }, null, null)
									//插入编辑器
									this.$refs.editify.editor.insertElement(zipEle)
									//移动光标到新插入的元素
									this.$refs.editify.editor.range.anchor.moveToStart(zipEle)
									this.$refs.editify.editor.range.focus.moveToStart(zipEle)
									//格式化
									this.$refs.editify.editor.formatElementStack()
									//渲染
									this.$refs.editify.editor.domRender()
								}
							}
							upload.click()
						}
					},
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
		afterRender() {
			this.$refs.editify.$el.querySelectorAll('.zip').forEach(el => {
				el.onclick = function () {
					const url = el.getAttribute('data-zip')
					const a = document.createElement('a')
					a.setAttribute('href', url)
					a.setAttribute('download', 'download.zip')
					a.click()
				}
			})
		},
		change() {
			console.log(this.$refs.editify.textValue)
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

.zip {
	display: inline-block;
	width: 40px;
	height: 40px;
	background: url(https://www.ling0523.cn/images/image_0_1702456046669.png) no-repeat center;
	background-size: cover;
	cursor: pointer;
	margin: 0 10px;
}
</style>

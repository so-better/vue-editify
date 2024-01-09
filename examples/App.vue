<template>
	<div style="padding: 10px; height: 100%; box-sizing: border-box">
		<editify v-model="value" placeholder="请输入正文内容..." allow-paste-html :menu="menuConfig" ref="editify" :paste-keep-marks="{ 'data-zip': ['span'] }" autofocus :show-word-length="true" :border="true" :disabled="disabled" @updateview="updateview" :customParseNode="customParseNode"></editify>
	</div>
</template>
<script>
import { AlexElement, Editify } from '../src'
import { h } from 'vue'
import Dap from 'dap-util'
console.log(Editify)
export default {
	name: 'App',
	data() {
		return {
			value: `<pre data-editify-element="1"><span class="hljs-keyword"><span>const</span></span><span> a = </span><span class="hljs-keyword"><span>new</span></span><span> </span><span class="hljs-title class_"><span>Block</span></span><span>()</span></pre><p><br></p>`,
			// toolbarConfig: {
			// 	codeBlock: {
			// 		languages: {
			// 			options: [{ label: '自动', value: '' }, 'javascript']
			// 		}
			// 	}
			// },
			menuConfig: {
				mode: 'fixed',
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
									const zipEle = new AlexElement('closed', 'span', { 'data-zip': base64, contenteditable: 'false' }, null, null)
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
					}
				}
			},
			btn: null,
			disabled: false
		}
	},
	mounted() {
		this.$refs.editify.$el.style.paddingTop = this.$refs.editify.$refs.menu.$el.offsetHeight + 'px'
		window.addEventListener('resize', e => {
			this.$refs.editify.$el.style.paddingTop = this.$refs.editify.$refs.menu.$el.offsetHeight + 'px'
		})
	},
	methods: {
		updateview() {
			this.$refs.editify.$el.querySelectorAll('span[data-zip]').forEach(el => {
				el.onclick = function () {
					const url = el.getAttribute('data-zip')
					const a = document.createElement('a')
					a.setAttribute('href', url)
					a.setAttribute('download', 'download.zip')
					a.click()
				}
			})
		},
		customParseNode(ele) {
			if (ele.hasMarks() && ele.marks['data-zip']) {
				ele.type = 'closed'
			}
			return ele
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

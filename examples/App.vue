<template>
	<div style="padding: 50px">
		<editify ref="editify" border height="600px" v-model="value" placeholder="Please Enter Text..." highlight allow-paste-html showMenu show-word-length :menu="menuConfig" @menu-operate="operate"> </editify>
	</div>
</template>
<script>
import { h } from 'vue'
export default {
	name: 'App',
	data() {
		return {
			value: '<p>333</p><div data-editify-task>这是一个任务列表</div><blockquote>这是一个引用块</blockquote><h1>这是一个一级标题</h1><h2>这是一个二级标题</h2><h3><span contenteditable="false" style="background:#f30;">这是一个</span><span contenteditable="false"  style="background:#f30;">三级标题</span></h3><h4>这是一个四级标题</h4><h5>这是一个五级标题</h5><h6 contenteditable="false"  style="background:#f30;">这是一个六级标题</h6><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧222<font face="黑体-简">兮西易</font>水寒</p><p><video src="https://video.699pic.com/videos/84/16/65/a_Jf3yXN9UR8A616988416654452_10s.mp4"></video><a href="https://www.mvi-web.cn">跳转到mvi-web-plus官网</a><img src="https://www.mvi-web.cn/resources/images/mvi_image_3_1652322363025.jpeg" />333</p><pre data-editify-hljs="javascript">const a = new Worker()</pre><p><br></p><table><thead><tr><th>姓名</th><th>年龄</th><th>性别</th><th>祖籍</th></tr></thead><tbody><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr></tbody></table><p><br></p><p><br></p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p>',
			menuConfig: {
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
	mounted() {},
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

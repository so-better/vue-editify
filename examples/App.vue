<template>
	<div style="padding: 50px">
		<button @click="change">SourceView</button>
		<editify ref="editify" border height="600px" v-model="value" placeholder="Please Enter Text..." highlight allow-paste-html></editify>
	</div>
</template>
<script>
export default {
	name: 'App',
	data() {
		return {
			value: '<blockquote>这是一个引用块</blockquote><h1>这是一个一级标题</h1><h2>这是一个二级标题</h2><h3>这是一个三级标题</h3><h4>这是一个四级标题</h4><h5>这是一个五级标题</h5><h6>这是一个六级标题</h6><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧222<font face="黑体-简">兮西易</font>水寒</p><p><video src="https://video.699pic.com/videos/84/16/65/a_Jf3yXN9UR8A616988416654452_10s.mp4"></video><a href="https://www.mvi-web.cn">跳转到mvi-web-plus官网</a><img src="https://www.mvi-web.cn/resources/images/mvi_image_3_1652322363025.jpeg" />333</p><pre data-editify-hljs="javascript">const a = new Worker()</pre><p><br></p><table><thead><tr><th>姓名</th><th>年龄</th><th>性别</th><th>祖籍</th></tr></thead><tbody><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr></tbody></table><p><br></p><p><br></p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p><p>风萧萧兮西易水寒</p>'
		}
	},
	mounted() {},
	methods: {
		change() {
			this.$refs.editify.isSourceView = !this.$refs.editify.isSourceView
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

<template>
	<div style="padding: 50px">
		<div style="height: 800px"></div>
		<editify ref="editify" border height="300px" v-model="value" placeholder="Please Enter Text..." highlight color="#78bf3e"></editify>
	</div>
</template>
<script>
export default {
	name: 'App',
	data() {
		return {
			value: '<p><br></p><table><thead><tr><th>姓名</th><th>年龄</th><th>性别</th><th>祖籍</th></tr></thead><tbody><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr><tr><td>凌凯</td><td>28</td><td>男</td><td>安徽</td></tr></tbody></table><p><br></p><p><br></p>'
		}
	},
	mounted() {},
	methods: {}
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

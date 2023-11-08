<template>
	<div style="padding: 50px">
		<editify ref="editify" border height="300px" v-model="value" placeholder="Please Enter Text..." highlight color="#78bf3e"></editify>
	</div>
</template>
<script>
export default {
	name: 'App',
	data() {
		return {
			value: '<p><a href="https://www.mvi-web.cn">跳转到mvi-web-plus官网</a></p><pre>const a = new Worker()</pre>'
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

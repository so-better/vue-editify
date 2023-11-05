<template>
	<div>
		<editify ref="editify" border height="300px" autoheight v-model="value" placeholder="Please Enter Text..." highlight></editify>
	</div>
</template>
<script>
export default {
	name: 'App',
	data() {
		return {
			value: '<pre>const a = new Block()</pre>'
		}
	},
	mounted() {},
	methods: {}
}
</script>
<style lang="less"></style>

<template>
	<div>
		{{ value }}
		<editify @focus="editorFocus" @blur="editorBlur" ref="editify" border height="300px" autoheight v-model="value" placeholder="Please Enter Text..."></editify>
	</div>
</template>
<script>
export default {
	name: 'App',
	data() {
		return {
			value: ''
		}
	},
	methods: {
		editorFocus(val) {
			console.log('获取焦点', val)
		},
		editorBlur(val) {
			console.log('失去焦点', val)
		}
	}
}
</script>
<style lang="less"></style>

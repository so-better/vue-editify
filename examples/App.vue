<template>
	<div>
		<editify @focus="editorFocus" @blur="editorBlur" ref="editify" border height="300px" autoheight v-model="value" allowPasteHtml placeholder="Please Enter Text..."></editify>
	</div>
</template>
<script>
export default {
	name: 'App',
	data() {
		return {
			value: '<ol><li>A</li><li>B</li><li>C</li><li>D</li></ol>'
		}
	},
	mounted() {},
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

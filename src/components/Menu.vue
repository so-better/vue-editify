<template>
	<div class="editify-menu" :class="{ border: $parent.border }"></div>
</template>
<script>
import Icon from './Icon'
import Button from './Button'
export default {
	name: 'Menu',
	props: {
		//是否显示边框
		border: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {}
	},
	components: {
		Button,
		Icon
	},
	methods: {}
}
</script>
<style lang="less" scoped>
.editify-menu {
	display: flex;
	justify-content: flex-start;
	width: 100%;
	padding: 6px 10px;
	background-color: #fff;
	border-radius: 4px;
	margin-bottom: 10px;

	&.border {
		border: 1px solid @border-color;
	}
}
</style>

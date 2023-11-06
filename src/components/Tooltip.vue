<template>
	<div class="editify-tooltip" @mouseenter="show = true" @mouseleave="show = false">
		<slot></slot>
		<transition name="editify-tooltip">
			<div v-if="show" class="editify-tooltip-content">{{ content }}</div>
		</transition>
	</div>
</template>
<script>
export default {
	name: 'Tooltip',
	props: {
		content: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			//是否显示
			show: false
		}
	},
	methods: {}
}
</script>
<style lang="less" scoped>
.editify-tooltip {
	position: relative;
	display: inline-block;
}

.editify-tooltip-enter-from,
.editify-tooltip-leave-to {
	opacity: 0;
}

.editify-tooltip-enter-active,
.editify-tooltip-leave-active {
	transition: opacity 300ms;
}

.editify-tooltip-content {
	display: inline-block;
	background-color: #000;
	color: #fff;
	font-size: 14px;
}
</style>

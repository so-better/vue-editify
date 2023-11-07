<template>
	<div class="editify-tooltip" @mouseenter="showContent" @mouseleave="hideContent">
		<div ref="target" class="editify-tooltip-target">
			<slot></slot>
		</div>
		<Layer v-model="show" :node="node" border border-color="#000" background="#000" show-triangle color="#fff" placement="bottom" animation="fade">
			<div class="editify-tooltip-content">{{ content }}</div>
		</Layer>
	</div>
</template>
<script>
import Layer from './Layer'
export default {
	name: 'Tooltip',
	props: {
		//提示内容
		content: {
			type: String,
			default: ''
		},
		//是否禁用
		disabled: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			show: false,
			node: null
		}
	},
	components: {
		Layer
	},
	methods: {
		showContent() {
			if (this.disabled) {
				return
			}
			this.node = this.$refs.target
			this.show = true
		},
		hideContent() {
			if (this.disabled) {
				return
			}
			this.show = false
		}
	}
}
</script>
<style lang="less" scoped>
.editify-tooltip {
	position: relative;
	display: inline-block;

	.editify-tooltip-target {
		display: inline-block;
	}

	.editify-tooltip-content {
		display: block;
		padding: 6px 10px;
		font-size: 13px;
		white-space: nowrap;
	}
}
</style>

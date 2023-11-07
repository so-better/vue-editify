<template>
	<Layer v-model="show" ref="layer" :node="node" border borderColor="#dfdfdf" background="#fff" color="#666" placement="bottom-start" show-triangle>
		<div class="editify-toolbar">
			<template v-if="type == 'table'">
				<span>新增列</span>
				<span>新增列</span>
				<span>新增列</span>
				<span>新增列</span>
				<span>新增列</span>
			</template>
		</div>
	</Layer>
</template>
<script>
import Dap from 'dap-util'
import Layer from './Layer'
import Tooltip from './Tooltip'
export default {
	name: 'Toolbar',
	props: {
		//是否显示
		modelValue: {
			type: Boolean,
			default: false
		},
		//关联元素
		node: {
			type: Node,
			default: null
		},
		//类型
		type: {
			type: String,
			default: 'default',
			validator(value) {
				return ['default', 'table', 'link', 'pre', 'image', 'video'].includes(value)
			}
		}
	},
	data() {
		return {}
	},
	computed: {
		show: {
			get() {
				return this.modelValue
			},
			set(val) {
				this.$emit('update:modelValue', val)
			}
		}
	},
	components: {
		Layer,
		Tooltip
	},
	methods: {}
}
</script>
<style lang="less" scoped>
.editify-toolbar {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding: 6px 10px;
}
</style>

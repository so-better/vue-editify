<template>
	<div v-if="modelValue" class="editify-toolbar">
		<div ref="wrap" class="editify-toolbar-wrap">
			<template v-if="type == 'table'">
				<Tooltip content="插入列">
					<i class="editify-icon editify-icon-delete-column"></i>
				</Tooltip>
			</template>
		</div>
	</div>
</template>
<script>
import Dap from 'dap-util'
import { getCurrentInstance } from 'vue'
import Tooltip from './Tooltip.vue'
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
	setup() {
		const instance = getCurrentInstance()
		return {
			uid: instance.uid
		}
	},
	components: {
		Tooltip
	},
	methods: {
		//根据元素位置设置工具条显示位置
		setPosition() {
			this.$nextTick(() => {
				const rect = Dap.element.getElementBounding(this.node)
				const rootRect = Dap.element.getElementBounding(this.$parent.$el)
				this.$el.style.left = rect.left - rootRect.left + 'px'
				this.$el.style.right = 'auto'
				if (rect.bottom >= rootRect.bottom + this.$el.offsetHeight) {
					this.$el.style.padding = '4px 0 0 0'
					this.$refs.wrap.style.boxShadow = '4px 4px 8px rgba(0, 0, 0, 0.1)'
					this.$el.style.top = 'auto'
					this.$el.style.bottom = rect.bottom - rootRect.bottom - this.$el.offsetHeight + 'px'
				} else if (rect.top >= rootRect.top + this.$el.offsetHeight) {
					this.$el.style.padding = '0 0 4px 0'
					this.$refs.wrap.style.boxShadow = '4px -4px 8px rgba(0, 0, 0, 0.1)'
					this.$el.style.top = rect.top - rootRect.top - this.$el.offsetHeight + 'px'
					this.$el.style.bottom = 'auto'
				}
			})
		},
		//监听滚动，隐藏工具条
		onScroll(node) {
			const setScroll = el => {
				Dap.event.on(el, `scroll.editify_toolbar_${this.uid}`, e => {
					this.$emit('update:modelValue', false)
				})
				if (el.parentNode) {
					setScroll(el.parentNode)
				}
			}
			setScroll(node)
		},
		//移除上述滚动事件的监听
		removeScroll(node) {
			const removeScroll = el => {
				Dap.event.off(el, `scroll.editify_toolbar_${this.uid}`)
				if (el.parentNode) {
					removeScroll(el.parentNode)
				}
			}
			removeScroll(node)
		}
	}
}
</script>
<style lang="less" scoped>
.editify-toolbar {
	display: block;
	padding: 0;
	margin: 0;
	position: absolute;
	z-index: 1;

	.editify-toolbar-wrap {
		display: flex;
		justify-content: flex-start;
		padding: 6px 10px;
		background-color: #fff;
		color: #666;
		border: 1px solid #dfdfdf;
		line-height: 1.5;
		border-radius: 2px;
	}
}
</style>

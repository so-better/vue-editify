<template>
	<div class="editify-menu" :class="{ border: config.border }">
		<MenuItem v-for="item in menuNames" :name="item"> </MenuItem>
	</div>
</template>
<script>
import Icon from './Icon'
import Button from './Button'
import { h, getCurrentInstance } from 'vue'
import Dap from 'dap-util'
export default {
	name: 'Menu',
	props: {
		//菜单栏配置
		config: {
			type: Object,
			default: null
		},
		//是否禁用整个菜单栏
		disabled: {
			type: Boolean,
			default: false
		}
	},
	setup() {
		const instance = getCurrentInstance()
		return {
			uid: instance.uid
		}
	},
	data() {
		return {
			//撤销按钮配置
			undoConfig: {
				show: this.config.undo.show,
				leftBorder: this.config.undo.leftBorder,
				rightBorder: this.config.undo.rightBorder,
				active: false,
				disabled: false
			},
			//重做按钮配置
			redoConfig: {
				show: this.config.redo.show,
				leftBorder: this.config.redo.leftBorder,
				rightBorder: this.config.redo.rightBorder,
				active: false,
				disabled: false
			}
		}
	},
	computed: {
		//菜单名称数组
		menuNames() {
			return Object.keys(this.config.sequence).sort((a, b) => {
				if (this.config.sequence[a] > this.config.sequence[b]) {
					return 1
				}
				return -1
			})
		}
	},
	components: {
		Icon,
		Button,
		MenuItem: {
			props: {
				name: String
			},
			inject: ['$editTrans'],
			render: function () {
				//共同设置的属性
				const props = {
					tooltip: this.$parent.config.tooltip,
					name: this.name
				}
				//撤销按钮
				if (this.name == 'undo' && this.$parent.undoConfig.show) {
					return h(
						Button,
						{
							...props,
							title: this.$editTrans('undo'),
							leftBorder: this.$parent.undoConfig.leftBorder,
							rightBorder: this.$parent.undoConfig.rightBorder,
							disabled: this.$parent.undoConfig.disabled || this.$parent.disabled,
							active: this.$parent.undoConfig.active,
							onOperate: this.$parent.handleOperate
						},
						() => h(Icon, { value: 'undo' })
					)
				}
				//重做按钮
				if (this.name == 'redo' && this.$parent.redoConfig.show) {
					return h(
						Button,
						{
							...props,
							title: this.$editTrans('redo'),
							leftBorder: this.$parent.redoConfig.leftBorder,
							rightBorder: this.$parent.redoConfig.rightBorder,
							disabled: this.$parent.redoConfig.disabled || this.$parent.disabled,
							active: this.$parent.redoConfig.active,
							onOperate: this.$parent.handleOperate
						},
						() => h(Icon, { value: 'redo' })
					)
				}
				return null
			}
		}
	},
	methods: {
		//处理光标更新
		handleRangeUpdate() {
			//撤销按钮是否禁用
			this.undoConfig.disabled = !this.$parent.editor.history.get(-1)
			//重做按钮是否禁用
			this.redoConfig.disabled = !this.$parent.editor.history.get(1)
		},
		//按钮操作触发函数
		handleOperate(name, val) {
			console.log(name, val)
			//撤销
			if (name == 'undo') {
				this.$parent.undo()
			}
			//重做
			else if (name == 'redo') {
				this.$parent.redo()
			}
		}
	}
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

<template>
	<Tooltip :content="title" :disabled="!tooltip">
		<span class="editify-button">
			<div ref="wrap" class="editify-button-wrap" :class="{ 'right-border': rightBorder, 'left-border': leftBorder, disabled: disabled }" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" @click="handleClick">
				<div v-if="type == 'default' || type == 'select'" class="editify-button-slot">
					<slot></slot>
				</div>
				<i v-if="type == 'select' || type == 'display'" class="editify-icon editify-icon-caret-down editify-button-caret"></i>
			</div>
			<Layer v-model="layerConfig.show" :node="layerConfig.node" border fade placement="bottom-start" :z-index="20" animation="translate">
				<div class="editify-button-layer" :style="{ width: width + 'px' }">
					<slot v-if="$slots.layer" name="layer" :options="cmpOptions"></slot>
					<div v-else class="editify-button-options">
						<div @click="select(item)" class="editify-button-option" v-for="item in cmpOptions">{{ item.label }}</div>
					</div>
				</div>
			</Layer>
		</span>
	</Tooltip>
</template>
<script>
import Tooltip from './components/Tooltip'
import Layer from './components/Layer'
import Dap from 'dap-util'
export default {
	name: 'editify-button',
	emits: ['operate'],
	props: {
		//按钮类型
		type: {
			type: String,
			default: 'default',
			validator(value) {
				//default表示默认的点击按钮
				//select表示下拉列表的按钮
				//display表示显示值的下拉列表按钮
				return ['default', 'select', 'display'].includes(value)
			}
		},
		//按钮名称，唯一值
		name: {
			type: String,
			default: ''
		},
		//按钮提示内容
		title: {
			type: String,
			default: ''
		},
		//是否显示工具提示
		tooltip: {
			type: Boolean,
			default: false
		},
		//是否显示右侧边框
		rightBorder: {
			type: Boolean,
			default: false
		},
		//是否显示左侧边框
		leftBorder: {
			type: Boolean,
			default: false
		},
		//主题色，用于按钮悬浮颜色变化使用
		color: {
			type: String,
			default: '#25caae'
		},
		//是否禁用
		disabled: {
			type: Boolean,
			default: false
		},
		//选项配置
		options: {
			type: Array,
			default: function () {
				return []
			}
		},
		//浮层宽度
		width: {
			type: Number,
			default: 80
		}
	},
	data() {
		return {
			//选择列表的浮层配置
			layerConfig: {
				show: false,
				node: null
			}
		}
	},
	computed: {
		cmpOptions() {
			return this.options.map(item => {
				if (Dap.common.isObject(item)) {
					return {
						label: item.label,
						value: item.value
					}
				}
				return {
					label: item,
					value: item
				}
			})
		}
	},
	components: {
		Tooltip,
		Layer
	},
	methods: {
		//列表选择
		select(item) {
			if (this.disabled) {
				return
			}
			this.$emit('operate', this.name, item.value)
			this.layerConfig.show = false
			this.layerConfig.node = null
		},
		//按钮点击处理
		handleClick() {
			if (this.disabled) {
				return
			}
			if (this.type == 'default') {
				this.$emit('operate', this.name)
				return
			}
			if (this.layerConfig.show) {
				this.layerConfig.show = false
				this.layerConfig.node = null
			} else {
				this.layerConfig.node = this.$refs.wrap
				this.layerConfig.show = true
			}
		},
		//鼠标移入处理
		handleMouseEnter(e) {
			if (this.disabled) {
				return
			}
			if (this.color) {
				e.currentTarget.style.color = this.color
			}
		},
		//鼠标移出处理
		handleMouseLeave(e) {
			if (this.disabled) {
				return
			}
			e.currentTarget.style.color = ''
		}
	}
}
</script>
<style lang="less" scoped>
.editify-button {
	display: inline-block;
	position: relative;
	box-sizing: border-box;
	-webkit-tap-highlight-color: transparent;
	outline: none;
	font-family: 'PingFang SC', 'Helvetica Neue', Helvetica, Roboto, 'Segoe UI', 'Microsoft YaHei', Arial, sans-serif;
	height: 36px;
	padding: 4px;

	*,
	*::before,
	*::after {
		box-sizing: border-box;
		-webkit-tap-highlight-color: transparent;
		outline: none;
	}

	.editify-button-wrap {
		display: inline-flex;
		justify-content: flex-start;
		align-items: center;
		height: 100%;
		font-size: 14px;
		color: #666;
		line-height: 1;
		transition: all 200ms;
		background-color: #fff;
		padding: 0 10px;
		cursor: pointer;

		&.right-border {
			border-right: 1px solid #dfdfdf;
		}

		&.left-border {
			border-left: 1px solid #dfdfdf;
		}

		&.disabled {
			color: #ccc;
			cursor: not-allowed;
		}
	}

	.editify-button-slot {
		display: inline-flex;
		justify-content: flex-start;
		align-items: center;
	}

	.editify-button-caret {
		margin-left: 4px;
		transform: scale(0.6);
	}

	.editify-button-layer {
		display: block;
		position: relative;

		.editify-button-options {
			display: block;
			width: 100%;
			padding: 4px 0;

			.editify-button-option {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				padding: 6px 10px;
				color: #333;
				font-size: 14px;
				transition: all 200ms;
				opacity: 0.8;

				&:hover {
					opacity: 1;
					cursor: pointer;
					background-color: #f7f8fa;
				}
			}
		}
	}
}
</style>

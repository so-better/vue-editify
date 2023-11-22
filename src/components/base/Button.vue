<template>
	<div class="editify-button">
		<div class="editify-button-wrap" :class="{ 'right-border': rightBorder, 'left-border': leftBorder }">
			<Tooltip :content="title" :disabled="!tooltip">
				<div ref="btn" :style="btnStyle" class="editify-button-el" :class="{ disabled: disabled }" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" @mousedown="handleMouseDown" @mouseup="handleMouseUp" @click="handleClick">
					<div v-if="type == 'default' || type == 'select'" class="editify-button-slot">
						<slot></slot>
					</div>
					<div v-else-if="type == 'display'">{{ displayLabel }}</div>
					<Icon v-if="type == 'select' || type == 'display'" value="caret-down" class="editify-button-caret" :class="{ rotate: layerConfig.show }"></Icon>
				</div>
			</Tooltip>
			<Layer ref="layer" v-model="layerConfig.show" :node="layerConfig.node" border fade placement="bottom-start" :z-index="20" animation="translate" @show="layerShow" @shown="layerShown" @hidden="layerHidden">
				<div class="editify-button-layer" :style="{ width: (type == 'select' ? parseSelectConfig.width : parseDisplayConfig.width) + 'px', maxHeight: (type == 'select' ? parseSelectConfig.maxHeight : parseDisplayConfig.maxHeight) + 'px', overflow: hideScroll ? 'visible' : '' }">
					<slot v-if="$slots.layer" name="layer" :options="cmpOptions"></slot>
					<div v-else class="editify-button-options">
						<div @click="select(item)" class="editify-button-option" :class="{ active: type == 'display' ? item.value == parseDisplayConfig.value : false }" :style="item.style || ''" v-for="item in cmpOptions">
							<slot v-if="$slots.option" name="option" :item="item"></slot>
							<div class="editify-button-option-flex" v-else>
								<Icon v-if="item.icon" :value="item.icon"></Icon>
								<span>{{ item.label }}</span>
							</div>
						</div>
					</div>
				</div>
			</Layer>
		</div>
	</div>
</template>
<script>
import Tooltip from './Tooltip'
import Layer from './Layer'
import Icon from './Icon'
import Dap from 'dap-util'
export default {
	name: 'Button',
	emits: ['operate', 'layerShow', 'layerShown', 'layerHidden'],
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
		//主题色，用于按钮悬浮颜色变化使用,仅支持十六进制
		color: {
			type: String,
			default: ''
		},
		//是否禁用
		disabled: {
			type: Boolean,
			default: false
		},
		//是否激活
		active: {
			type: Boolean,
			default: false
		},
		//type=select时的配置
		selectConfig: {
			type: Object,
			default: null
		},
		//type=display时的配置
		displayConfig: {
			type: Object,
			default: null
		},
		//浮层隐藏滚动条
		hideScroll: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			//选择列表的浮层配置
			layerConfig: {
				show: false,
				node: null
			},
			//按钮状态
			status: null //hover表示悬浮，down表示按下
		}
	},
	computed: {
		//显示在页面的value值对应的label
		displayLabel() {
			const val = this.parseDisplayConfig.options.find(item => {
				return item.value == this.parseDisplayConfig.value
			})
			return val ? val.label : ''
		},
		//渲染的浮层列表数据
		cmpOptions() {
			return this.type == 'select' ? this.parseSelectConfig.options : this.parseDisplayConfig.options
		},
		//处理后的select配置
		parseSelectConfig() {
			let options = []
			let width = ''
			let maxHeight = ''
			if (Dap.common.isObject(this.selectConfig)) {
				if (Array.isArray(this.selectConfig.options)) {
					options = this.selectConfig.options.map(item => {
						if (Dap.common.isObject(item)) {
							return {
								label: item.label,
								value: item.value,
								icon: item.icon,
								style: item.style
							}
						}
						return {
							label: item,
							value: item
						}
					})
				}
				if (typeof this.selectConfig.width == 'number') {
					width = this.selectConfig.width
				}
				if (typeof this.selectConfig.maxHeight == 'number') {
					maxHeight = this.selectConfig.maxHeight
				}
			}
			return {
				options,
				width,
				maxHeight
			}
		},
		//处理后的display配置
		parseDisplayConfig() {
			let options = []
			let width = ''
			let maxHeight = ''
			let value = ''
			if (Dap.common.isObject(this.displayConfig)) {
				if (typeof this.displayConfig.value == 'string' || typeof this.displayConfig.value == 'number') {
					value = this.displayConfig.value
				}
				if (Array.isArray(this.displayConfig.options)) {
					options = this.displayConfig.options.map(item => {
						if (Dap.common.isObject(item)) {
							return {
								label: item.label,
								value: item.value,
								icon: item.icon,
								style: item.style
							}
						}
						return {
							label: item,
							value: item
						}
					})
					let optItem = options.find(item => {
						return item.value == value
					})
					if (!optItem && options[0]) {
						value = options[0].value
					}
				}
				if (typeof this.displayConfig.width == 'number') {
					width = this.displayConfig.width
				}
				if (typeof this.displayConfig.maxHeight == 'number') {
					maxHeight = this.displayConfig.maxHeight
				}
			}
			return {
				options,
				width,
				maxHeight,
				value
			}
		},
		//十六进制颜色转换的rgb颜色数组
		parseColor() {
			return Dap.color.hex2rgb(this.color)
		},
		//按钮样式
		btnStyle() {
			if (this.disabled) {
				return {}
			}
			if (this.color) {
				//激活情况下和鼠标按下状态
				if (this.active || this.status == 'down') {
					return {
						color: this.color,
						backgroundColor: `rgba(${this.parseColor[0]},${this.parseColor[1]},${this.parseColor[2]},0.15)`
					}
				}
				//鼠标悬浮状态
				if (this.status == 'hover') {
					return {
						color: `rgba(${this.parseColor[0]},${this.parseColor[1]},${this.parseColor[2]},0.9)`,
						backgroundColor: `rgba(${this.parseColor[0]},${this.parseColor[1]},${this.parseColor[2]},0.05)`
					}
				}
			}
			return {}
		}
	},
	components: {
		Tooltip,
		Layer,
		Icon
	},
	methods: {
		//主动关闭浮层
		hideLayer() {
			this.layerConfig.show = false
			this.layerConfig.node = null
		},
		//浮层显示时
		layerShow() {
			this.$emit('layerShow')
		},
		//浮层显示后
		layerShown() {
			this.$emit('layerShown')
		},
		//浮层隐藏后
		layerHidden() {
			this.$emit('layerHidden')
		},
		//列表选择
		select(item) {
			if (this.disabled) {
				return
			}
			this.$emit('operate', this.name, item.value)
			this.hideLayer()
		},
		//按钮点击处理
		handleClick() {
			if (this.disabled) {
				return
			}
			if (this.type == 'default') {
				this.$emit('operate', this.name)
			} else {
				if (this.layerConfig.show) {
					this.hideLayer()
				} else {
					this.layerConfig.node = this.$refs.btn
					this.layerConfig.show = true
				}
			}
		},
		//鼠标移入处理
		handleMouseEnter() {
			this.status = 'hover'
		},
		//鼠标移出处理
		handleMouseLeave() {
			this.status = null
		},
		//鼠标按下处理
		handleMouseDown() {
			this.status = 'down'
		},
		//鼠标松开处理
		handleMouseUp() {
			this.status = 'hover'
		}
	}
}
</script>
<style lang="less" scoped>
.editify-button {
	display: inline-flex;
	justify-content: center;
	align-items: center;
	position: relative;
	color: @font-color;
	font-size: @font-size;

	.editify-button-wrap {
		padding: 0 4px;
		position: relative;

		&.right-border::after {
			position: absolute;
			right: 0;
			top: 50%;
			content: '';
			transform: translateY(-50%);
			height: 18px;
			width: 1px;
			background-color: @border-color;
		}

		&.left-border::before {
			position: absolute;
			left: 0;
			top: 50%;
			content: '';
			transform: translateY(-50%);
			height: 18px;
			width: 1px;
			background-color: @border-color;
		}

		.editify-button-el {
			display: inline-flex;
			justify-content: flex-start;
			align-items: center;
			white-space: nowrap;
			height: 28px;
			line-height: 1;
			transition: all 200ms;
			background-color: @background;
			padding: 0 8px;
			border-radius: 2px;
			cursor: pointer;

			&.disabled {
				color: @font-color-disabled;
				cursor: not-allowed;
				background-color: @background;
			}

			.editify-button-slot {
				display: inline-flex;
				justify-content: flex-start;
				align-items: center;
			}

			.editify-button-caret {
				margin-left: 2px;
				transform: scale(0.6);
				transition: transform 200ms;
				font-size: 14px;

				&.rotate {
					transform: scale(0.6) rotate(180deg);
				}
			}
		}
	}

	.editify-button-layer {
		display: block;
		position: relative;
		overflow-x: hidden;
		overflow-y: auto;

		.editify-button-options {
			display: block;
			width: 100%;
			padding: 4px 0;

			.editify-button-option {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				width: 100%;
				padding: 6px 12px;
				transition: all 200ms;
				opacity: 0.8;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				box-sizing: border-box;

				&:hover {
					opacity: 1;
					cursor: pointer;
					background-color: @background-dark;
				}

				&:active {
					opacity: 1;
					background-color: @background-darker;
				}

				&.active {
					opacity: 1;
					background-color: @background-darker;
				}

				.editify-button-option-flex {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					width: 100%;

					:deep(.editify-icon) {
						margin-right: 10px;
					}
				}
			}
		}
	}
}
</style>

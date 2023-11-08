<template>
	<label class="editify-checkbox" :class="{ disabled: disabled }">
		<span v-if="placement == 'left' && label" class="editify-checkbox-label" :data-editify-placement="placement" v-text="label"></span>
		<input @change="change" :value="value" :disabled="disabled" :checked="check" type="checkbox" />
		<span :class="['editify-checkbox-item', round ? 'round' : '']" :style="itemStyle">
			<Icon value="check" :size="size" :style="{ opacity: check ? '' : 0 }" />
		</span>
		<span v-if="placement == 'right' && label" class="editify-checkbox-label" :data-editify-placement="placement" v-text="label"></span>
	</label>
</template>

<script>
import Dap from 'dap-util'
import Icon from './Icon'
export default {
	name: 'Checkbox',
	emits: ['update:modelValue', 'change'],
	props: {
		//是否禁用
		disabled: {
			type: Boolean,
			default: false
		},
		//是否选中
		modelValue: {
			type: [Boolean, Array],
			default: false
		},
		//label文字
		label: {
			type: String,
			default: null
		},
		//值
		value: {
			type: [Object, Number, String, Array],
			default: ''
		},
		//是否圆形
		round: {
			type: Boolean,
			default: false
		},
		//文字位置
		placement: {
			type: String,
			default: 'right',
			validator(value) {
				return ['left', 'right'].includes(value)
			}
		},
		//大小
		size: {
			type: Number,
			default: null
		},
		//主题颜色
		color: {
			type: String,
			default: '#03a8f3',
			validator(value) {
				return Dap.common.matchingText(value, 'hex')
			}
		}
	},
	computed: {
		check() {
			if (typeof this.modelValue == 'boolean') {
				return this.modelValue
			}
			if (Array.isArray(this.modelValue)) {
				//数组中是否已包含此复选框的值
				return this.modelValue.some(item => {
					return Dap.common.equal(item, this.value)
				})
			}
			return false
		},
		itemStyle() {
			let style = {}
			if (this.color && this.check && !this.disabled) {
				style.backgroundColor = this.color
				style.borderColor = this.color
			}
			return style
		}
	},
	components: {
		Icon
	},
	methods: {
		change(event) {
			if (Array.isArray(this.modelValue)) {
				let arr = [...this.modelValue]
				//勾选且不包含
				if (event.target.checked && !this.check) {
					arr.push(this.value)
				}
				//取消且包含
				else if (this.check) {
					arr = arr.filter(item => {
						return !Dap.common.equal(item, this.value)
					})
				}
				this.$emit('update:modelValue', arr)
				this.$emit('change', arr)
			} else if (typeof this.modelValue == 'boolean') {
				this.$emit('update:modelValue', event.target.checked)
				this.$emit('change', event.target.checked)
			}
		}
	}
}
</script>

<style scoped lang="less">
.editify-checkbox {
	display: inline-flex;
	margin: 0;
	padding: 0;
	position: relative;
	vertical-align: middle;
	justify-content: flex-start;
	align-items: center;
	cursor: pointer;
	user-select: none;

	input[type='checkbox'] {
		width: 0;
		height: 0;
		opacity: 0;
		border: none;
		display: none;
	}

	.editify-checkbox-item {
		display: inline-flex;
		display: -webkit-inline-flex;
		justify-content: center;
		align-items: center;
		position: relative;
		margin: 0;
		padding: 1px;
		border: 1px solid #dfdfdf;
		background-color: #fff;
		border-radius: 2px;
		color: #fff;
		transition: border-color 0.1s cubic-bezier(0.71, -0.46, 0.29, 1.46), background-color 0.1s cubic-bezier(0.71, -0.46, 0.29, 1.46), color 0.1s cubic-bezier(0.71, -0.46, 0.29, 1.46);

		&.round {
			border-radius: 50%;
		}
	}

	.editify-checkbox-label {
		vertical-align: middle;
		font-size: 13px;
		color: #666;
		user-select: none;

		&[data-editify-placement='left'] {
			margin-right: 6px;
		}

		&[data-editify-placement='right'] {
			margin-left: 6px;
		}
	}

	&.disabled {
		cursor: not-allowed;
		.editify-checkbox-item,
		.editify-checkbox-item.check {
			background-color: #ebedf0;
			border-color: #dfdfdf;
			color: #ccc;
		}

		.editify-checkbox-label {
			color: #ccc;
		}
	}
}
</style>

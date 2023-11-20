<template>
	<div class="editify-colors">
		<div class="editify-colors-header" @click="selectColor({ value: '' })">
			<Icon value="remove"></Icon>
			<span>{{ $editTrans('defaultColor') }}</span>
		</div>
		<div class="editify-colors-list">
			<div class="editify-color" v-for="item in data" :style="{ borderColor: value == item.value ? color : '' }">
				<Tooltip block :content="item.label" :disabled="!tooltip">
					<div @click="selectColor(item)" class="editify-color-el" :style="{ background: item.value }"></div>
				</Tooltip>
			</div>
		</div>
	</div>
</template>
<script>
import Icon from '../base/Icon'
import Tooltip from '../base/Tooltip'
export default {
	name: 'Colors',
	emits: ['change'],
	props: {
		//颜色数组
		data: {
			type: Array,
			default: function () {
				return []
			}
		},
		//选中的颜色
		value: {
			type: String,
			default: null
		},
		//激活状态颜色
		color: {
			type: String,
			default: ''
		},
		//是否使用工具提示
		tooltip: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {}
	},
	inject: ['$editTrans'],
	components: {
		Icon,
		Tooltip
	},
	methods: {
		//选择颜色
		selectColor(item) {
			this.$emit('change', item.value)
		}
	}
}
</script>
<style lang="less" scoped>
.editify-colors {
	display: block;
	color: @font-color;
	font-size: @font-size;
	padding: 6px 10px;
	box-sizing: border-box;
	width: 244px;

	.editify-colors-header {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		position: relative;
		padding: 6px 10px;
		transform: all 200ms;
		margin-bottom: 10px;
		opacity: 0.8;

		&::after {
			content: '';
			width: 100%;
			height: 1px;
			background-color: @background-darker;
			position: absolute;
			left: 0;
			bottom: -5px;
		}

		:deep(.editify-icon) {
			margin-right: 10px;
		}

		&:hover {
			cursor: pointer;
			background-color: @background-dark;
			opacity: 1;
		}

		&:active {
			opacity: 1;
			background-color: @background-darker;
		}
	}

	.editify-colors-list {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;

		.editify-color {
			display: block;
			padding: 4px;
			border: 1px solid transparent;
			border-radius: 2px;

			.editify-color-el {
				display: block;
				width: 16px;
				height: 16px;
				border: 1px solid @border-color;
				border-radius: 2px;
				cursor: pointer;
				transition: all 200ms;

				&:hover {
					transform: scale(1.2);
				}
			}
		}
	}
}
</style>

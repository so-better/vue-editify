<template>
	<div class="editify-link">
		<div class="editify-link-label">{{ $editTrans('linkAddress') }}</div>
		<input @focus="handleInputFocus" @blur="handleInputBlur" :placeholder="$editTrans('linkTextEnterPlaceholder')" v-model.trim="text" type="text" />
		<input @focus="handleInputFocus" @blur="handleInputBlur" :placeholder="$editTrans('linkUrlEnterPlaceholder')" v-model.trim="url" type="url" />
		<div class="editify-link-footer">
			<Checkbox v-model="newOpen" :label="$editTrans('newWindowOpen')" :color="color" :size="10"></Checkbox>
			<div class="editify-link-operations">
				<span :style="{ color: color }" @click="insertLink">{{ $editTrans('insertLink') }}</span>
			</div>
		</div>
	</div>
</template>
<script>
import Checkbox from './Checkbox'
export default {
	name: 'InsertLink',
	emits: ['linkInsert'],
	inject: ['$editTrans'],
	props: {
		//是否禁用
		disabled: {
			type: Boolean,
			default: false
		},
		//主题色
		color: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			//链接地址
			url: '',
			//链接文本
			text: '',
			//是否新窗口打开
			newOpen: false
		}
	},
	components: {
		Checkbox
	},
	methods: {
		//输入框获取焦点
		handleInputFocus(e) {
			if (this.disabled) {
				return
			}
			if (this.color) {
				e.currentTarget.style.borderColor = this.color
			}
		},
		//输入框失去焦点
		handleInputBlur(e) {
			if (this.disabled) {
				return
			}
			e.currentTarget.style.borderColor = ''
		},
		//插入链接
		insertLink() {
			this.$emit('linkInsert', this.text, this.url, this.newOpen)
		}
	}
}
</script>
<style lang="less" scoped>
.editify-link {
	display: block;
	width: 280px;
	padding: 10px 14px;

	.editify-link-label {
		display: block;
		text-align: left;
		margin-bottom: 10px;
		font-size: @font-size;
		color: @font-color;
	}

	input {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		display: block;
		width: 100%;
		margin: 0 0 10px 0;
		padding: 4px 2px;
		border: none;
		font-size: @font-size;
		color: @font-color;
		border-bottom: 1px solid @border-color;
		line-height: 1.5;
		transition: border-color 500ms;
		background-color: transparent;
		outline: none;
		box-sizing: border-box;

		&::-webkit-input-placeholder,
		&::placeholder {
			color: @font-color-disabled;
			font-family: inherit;
			font-size: inherit;
			vertical-align: middle;
		}

		&[disabled] {
			background-color: transparent;
			opacity: 0.6;
		}
	}

	.editify-link-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;

		.editify-link-operations {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			& > span {
				cursor: pointer;
				opacity: 0.8;
				transition: all 200ms;
				font-size: @font-size;

				&:hover {
					opacity: 1;
				}
			}
		}
	}
}
</style>

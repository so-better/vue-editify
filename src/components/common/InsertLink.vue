<template>
	<div class="editify-link">
		<div class="editify-link-label">{{ $editTrans('linkAddress') }}</div>
		<input @focus="handleInputFocus" @blur="handleInputBlur" :placeholder="$editTrans('linkTextEnterPlaceholder')" v-model.trim="linkText" type="text" />
		<input @focus="handleInputFocus" @blur="handleInputBlur" :placeholder="$editTrans('linkUrlEnterPlaceholder')" v-model.trim="linkUrl" type="url" />
		<div class="editify-link-footer">
			<Checkbox v-model="newOpen" :label="$editTrans('newWindowOpen')" :color="color" :size="10"></Checkbox>
			<div class="editify-link-operations">
				<span :style="{ color: color }" @click="insertLink">{{ $editTrans('insertLink') }}</span>
			</div>
		</div>
	</div>
</template>
<script>
import Checkbox from '../base/Checkbox'
export default {
	name: 'InsertLink',
	emits: ['insert'],
	inject: ['$editTrans'],
	props: {
		//主题色
		color: {
			type: String,
			default: ''
		},
		//预置的链接文本值
		text: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			//链接地址
			linkUrl: '',
			//链接文本
			linkText: '',
			//是否新窗口打开
			newOpen: false
		}
	},
	watch: {
		text: {
			immediate: true,
			handler: function (newValue) {
				this.linkText = newValue
			}
		}
	},
	components: {
		Checkbox
	},
	methods: {
		//输入框获取焦点
		handleInputFocus(e) {
			if (this.color) {
				e.currentTarget.style.borderColor = this.color
			}
		},
		//输入框失去焦点
		handleInputBlur(e) {
			e.currentTarget.style.borderColor = ''
		},
		//插入链接
		insertLink() {
			this.$emit('insert', this.linkText, this.linkUrl, this.newOpen)
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

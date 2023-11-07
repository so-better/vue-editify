<template>
	<div class="editify-triangle" :style="style" :data-editify-placement="placement">
		<div class="editify-triangle-el" :style="elStyle"></div>
	</div>
</template>

<script>
export default {
	name: 'Triangle',
	props: {
		//位置
		placement: {
			type: String,
			default: 'top',
			validator(value) {
				return ['top', 'left', 'right', 'bottom'].includes(value)
			}
		},
		//边框颜色
		color: {
			type: String,
			default: null
		},
		//背景色
		background: {
			type: String,
			default: null
		}
	},
	computed: {
		style() {
			if (this.placement == 'top') {
				return {
					borderBottomColor: this.color ? this.color : ''
				}
			}
			if (this.placement == 'bottom') {
				return {
					borderTopColor: this.color ? this.color : ''
				}
			}
			if (this.placement == 'left') {
				return {
					borderRightColor: this.color ? this.color : ''
				}
			}
			if (this.placement == 'right') {
				return {
					borderLeftColor: this.color ? this.color : ''
				}
			}
		},
		elStyle() {
			if (this.placement == 'top') {
				return {
					borderBottomColor: this.background ? this.background : ''
				}
			}
			if (this.placement == 'bottom') {
				return {
					borderTopColor: this.background ? this.background : ''
				}
			}
			if (this.placement == 'left') {
				return {
					borderRightColor: this.background ? this.background : ''
				}
			}
			if (this.placement == 'right') {
				return {
					borderLeftColor: this.background ? this.background : ''
				}
			}
		}
	}
}
</script>

<style lang="less" scoped>
//三角形尺寸大小
@size: 6px;
.editify-triangle {
	position: relative;
	display: inline-block;
	width: 0;
	height: 0;
	border-color: transparent;
	border-style: solid;
	border-width: @size;

	.editify-triangle-el {
		position: absolute;
		display: inline-block;
		width: 0;
		height: 0;
		border-color: transparent;
		border-style: solid;
		border-width: calc(@size - 1px);
	}

	&[data-editify-placement='top'] {
		border-top: none;
		border-bottom-color: #dfdfdf;

		.editify-triangle-el {
			border-top: none;
			border-bottom-color: #fff;
			left: 1px;
			top: 1.5px;
			right: auto;
			bottom: 0;
			margin-left: -@size;
		}
	}

	&[data-editify-placement='bottom'] {
		border-bottom: none;
		border-top-color: #dfdfdf;

		.editify-triangle-el {
			border-bottom: none;
			border-top-color: #fff;
			left: 1px;
			bottom: 1.5px;
			top: auto;
			right: auto;
			margin-left: -@size;
		}
	}

	&[data-editify-placement='left'] {
		border-left: none;
		border-right-color: #dfdfdf;

		.editify-triangle-el {
			border-left: none;
			border-right-color: #fff;
			left: 1.5px;
			top: 1px;
			right: auto;
			bottom: auto;
			margin-top: -@size;
		}
	}

	&[data-editify-placement='right'] {
		border-right: none;
		border-left-color: #dfdfdf;

		.editify-triangle-el {
			border-right: none;
			border-left-color: #fff;
			right: 1.5px;
			top: 1px;
			bottom: auto;
			left: auto;
			margin-top: -@size;
		}
	}
}
</style>

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
.editify-triangle {
	position: relative;
	display: inline-block;
	width: 0;
	height: 0;
	border-color: transparent;
	border-style: solid;
	border-width: @triangle-size;

	.editify-triangle-el {
		position: absolute;
		display: inline-block;
		width: 0;
		height: 0;
		border-color: transparent;
		border-style: solid;
		border-width: calc(@triangle-size - 1px);
	}

	&[data-editify-placement='top'] {
		border-top: none;
		border-bottom-color: @border-color;

		.editify-triangle-el {
			border-top: none;
			border-bottom-color: @background;
			left: 1px;
			top: 1.5px;
			right: auto;
			bottom: 0;
			margin-left: -@triangle-size;
		}
	}

	&[data-editify-placement='bottom'] {
		border-bottom: none;
		border-top-color: @border-color;

		.editify-triangle-el {
			border-bottom: none;
			border-top-color: @background;
			left: 1px;
			bottom: 1.5px;
			top: auto;
			right: auto;
			margin-left: -@triangle-size;
		}
	}

	&[data-editify-placement='left'] {
		border-left: none;
		border-right-color: @border-color;

		.editify-triangle-el {
			border-left: none;
			border-right-color: @background;
			left: 1.5px;
			top: 1px;
			right: auto;
			bottom: auto;
			margin-top: -@triangle-size;
		}
	}

	&[data-editify-placement='right'] {
		border-right: none;
		border-left-color: @border-color;

		.editify-triangle-el {
			border-right: none;
			border-left-color: @background;
			right: 1.5px;
			top: 1px;
			bottom: auto;
			left: auto;
			margin-top: -@triangle-size;
		}
	}
}
</style>

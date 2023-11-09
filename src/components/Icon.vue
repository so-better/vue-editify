<template>
	<i class="editify-icon" :class="'editify-icon-' + value" :style="{ fontSize: size ? size + 'px' : '' }"></i>
</template>
<script>
export default {
	name: 'Icon',
	props: {
		//图标值
		value: {
			type: String,
			default: ''
		},
		//图标大小
		size: {
			type: Number,
			default: null
		}
	}
}
</script>
<style lang="less " scoped>
@font-face {
	font-family: 'editify-icon';
	src: url('../icon/iconfont.woff?t=1699274556400') format('woff'), url('../icon/iconfont.ttf?t=1699274556400') format('truetype');
}

.editify-icon {
	font-family: 'editify-icon' !important;
	font-size: inherit;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	line-height: 1;
	vertical-align: middle;
}
</style>

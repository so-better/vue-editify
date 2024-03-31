<template>
	<i class="editify-icon" :class="'editify-icon-' + value"></i>
</template>
<script setup lang="ts">
import { IconProps } from './props'
defineOptions({
	name: 'Icon'
})
defineProps(IconProps)
</script>
<style scoped src="./icon.less"></style>

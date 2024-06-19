<template>
	<div class="editify-triangle" :style="style" :data-editify-placement="placement">
		<div class="editify-triangle-el" :style="elStyle"></div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TriangleProps } from './props'
import { ObjectType } from '@/core/tool'

defineOptions({
	name: 'Triangle'
})
const props = defineProps(TriangleProps)

const style = computed<ObjectType>(() => {
	if (props.placement == 'top') {
		return {
			borderBottomColor: props.color || ''
		}
	}
	if (props.placement == 'bottom') {
		return {
			borderTopColor: props.color || ''
		}
	}
	if (props.placement == 'left') {
		return {
			borderRightColor: props.color || ''
		}
	}
	if (props.placement == 'right') {
		return {
			borderLeftColor: props.color || ''
		}
	}
	return {}
})
const elStyle = computed<ObjectType>(() => {
	if (props.placement == 'top') {
		return {
			borderBottomColor: props.background || ''
		}
	}
	if (props.placement == 'bottom') {
		return {
			borderTopColor: props.background || ''
		}
	}
	if (props.placement == 'left') {
		return {
			borderRightColor: props.background || ''
		}
	}
	if (props.placement == 'right') {
		return {
			borderLeftColor: props.background || ''
		}
	}
	return {}
})
</script>

<style scoped src="./triangle.less"></style>

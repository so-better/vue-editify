<template>
	<div class="editify-tooltip" :class="{ block: block }">
		<div ref="targetRef" class="editify-tooltip-target" @mouseenter="showContent" @mouseleave="hideContent">
			<slot></slot>
		</div>
		<Layer v-model="show" :node="targetRef" border border-color="#000" background="#000" show-triangle color="#fff" placement="bottom" animation="fade">
			<div class="editify-tooltip-content">{{ content }}</div>
		</Layer>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Layer from '../layer/layer.vue'
import { TooltipProps } from './props'

defineOptions({
	name: 'Tooltip'
})
const props = defineProps(TooltipProps)

const show = ref<boolean>(false)
const targetRef = ref<HTMLElement | null>(null)

const showContent = () => {
	if (props.disabled) {
		return
	}
	show.value = true
}
const hideContent = () => {
	if (props.disabled) {
		return
	}
	show.value = false
}
</script>
<style scoped src="./tooltip.less"></style>

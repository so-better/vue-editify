<template>
	<div class="editify-tooltip" :class="{ 'editify-block': block }">
		<div ref="targetRef" class="editify-tooltip-target" @mouseenter="showContent" @mouseleave="hideContent">
			<slot></slot>
		</div>
		<Layer v-model="show" :node="targetRef" border :border-color="isDark ? '#e8e8e8' : '#1a1a1a'" :background="isDark ? '#e8e8e8' : '#1a1a1a'" show-triangle :color="isDark ? '#1a1a1a' : '#e8e8e8'" placement="bottom" animation="fade" :z-index="10">
			<div class="editify-tooltip-content">{{ content }}</div>
		</Layer>
	</div>
</template>
<script setup lang="ts">
import { ComputedRef, inject, ref } from 'vue'
import Layer from '@/components/layer/layer.vue'
import { TooltipProps } from './props'

defineOptions({
	name: 'Tooltip'
})
const props = defineProps(TooltipProps)

const isDark = inject<ComputedRef<boolean>>('isDark')

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

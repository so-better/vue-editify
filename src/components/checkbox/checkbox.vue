<template>
	<label class="editify-checkbox" :class="{ disabled: disabled }">
		<span v-if="placement == 'left' && label" class="editify-checkbox-label" :data-editify-placement="placement" v-text="label"></span>
		<input @change="change" :value="value" :disabled="disabled" :checked="check" type="checkbox" />
		<span class="editify-checkbox-item" :class="{ reverse: !color, round: round, checked: check && !disabled }" :style="itemStyle">
			<Icon value="check" :style="{ opacity: check ? '' : 0 }" />
		</span>
		<span v-if="placement == 'right' && label" class="editify-checkbox-label" :data-editify-placement="placement" v-text="label"></span>
	</label>
</template>

<script setup lang="ts">
import { common as DapCommon } from 'dap-util'
import Icon from '../icon/icon.vue'
import { CheckboxProps } from './props'
import { computed } from 'vue'
import { ObjectType } from '../../core/tool'

defineOptions({
	name: 'Checkbox'
})
const props = defineProps(CheckboxProps)
const emits = defineEmits(['update:modelValue', 'change'])

const check = computed<boolean>(() => {
	if (typeof props.modelValue == 'boolean') {
		return props.modelValue
	}
	if (Array.isArray(props.modelValue)) {
		//数组中是否已包含此复选框的值
		return props.modelValue.some(item => {
			return DapCommon.equal(item, props.value)
		})
	}
	return false
})
const itemStyle = computed<ObjectType>(() => {
	let style: ObjectType = {}
	if (props.color && check.value && !props.disabled) {
		style.backgroundColor = props.color
		style.borderColor = props.color
	}
	return style
})

const change = (event: Event) => {
	if (Array.isArray(props.modelValue)) {
		let arr = [...props.modelValue]
		//勾选且不包含
		if ((<HTMLInputElement>event.target).checked && !check.value) {
			arr.push(props.value)
		}
		//取消且包含
		else if (check.value) {
			arr = arr.filter(item => {
				return !DapCommon.equal(item, props.value)
			})
		}
		emits('update:modelValue', arr)
		emits('change', arr)
	} else if (typeof props.modelValue == 'boolean') {
		emits('update:modelValue', (<HTMLInputElement>event.target).checked)
		emits('change', (<HTMLInputElement>event.target).checked)
	}
}
</script>

<style scoped src="./checkbox.less"></style>

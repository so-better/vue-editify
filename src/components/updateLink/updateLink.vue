<template>
	<div class="editify-link">
		<div class="editify-link-label">{{ $editTrans('linkAddress') }}</div>
		<input @change="modifyLink" @focus="handleInputFocus" @blur="handleInputBlur" :placeholder="$editTrans('linkUrlEnterPlaceholder')" v-model.trim="url" type="url" />
		<div class="editify-link-footer">
			<Checkbox @change="modifyLink" v-model="newOpen" :label="$editTrans('newWindowOpen')" :color="color" :size="10"></Checkbox>
			<div class="editify-link-operations">
				<span @click="removeLink">{{ $editTrans('removeLink') }}</span>
				<a :href="url" target="_blank" :style="{ color: color || '' }">{{ $editTrans('viewLink') }}</a>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { inject, onBeforeUnmount, ref, watch } from 'vue'
import { Checkbox } from '../checkbox'
import { UpdateLinkProps } from './props'

defineOptions({
	name: 'UpdateLink'
})
const props = defineProps(UpdateLinkProps)
const emits = defineEmits(['remove', 'modify'])

const $editTrans = inject<(key: string) => any>('$editTrans')!

//链接地址
const url = ref<string>('')
//是否新窗口打开
const newOpen = ref<boolean>(false)

watch(
	() => props.presetNewOpen,
	newVal => {
		newOpen.value = !!newVal
	},
	{
		immediate: true
	}
)
watch(
	() => props.presetUrl,
	newVal => {
		url.value = newVal || ''
	},
	{
		immediate: true
	}
)
//输入框获取焦点
const handleInputFocus = (e: Event) => {
	if (props.color) {
		;(e.currentTarget as HTMLInputElement).style.borderColor = props.color
	}
}
//输入框失去焦点
const handleInputBlur = (e: Event) => {
	;(e.currentTarget as HTMLInputElement).style.borderColor = ''
}
//移除链接
const removeLink = () => {
	emits('remove')
}
//修改链接
const modifyLink = () => {
	emits('modify', url.value, newOpen.value)
}

//组件销毁前触发修改，解决组件销毁时change事件触发不了emits的问题
onBeforeUnmount(() => {
	emits('modify', url.value, newOpen.value)
})
</script>
<style scoped src="./updateLink.less"></style>

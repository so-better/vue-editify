<template>
	<div class="editify-link">
		<div class="editify-link-label">{{ $editTrans('linkAddress') }}</div>
		<input @focus="handleInputFocus" @blur="handleInputBlur" :placeholder="$editTrans('linkTextEnterPlaceholder')" v-model.trim="text" type="text" />
		<input @focus="handleInputFocus" @blur="handleInputBlur" :placeholder="$editTrans('linkUrlEnterPlaceholder')" v-model.trim="url" type="url" />
		<div class="editify-link-footer">
			<Checkbox v-model="newOpen" :label="$editTrans('newWindowOpen')" :color="color" :size="10"></Checkbox>
			<div class="editify-link-operations">
				<span :style="{ color: color || '' }" @click="insertLink">{{ $editTrans('insertLink') }}</span>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { inject, ref, watch } from 'vue'
import { Checkbox } from '@/components/checkbox'
import { InsertLinkProps } from './props'

defineOptions({
	name: 'InsertLink'
})
const props = defineProps(InsertLinkProps)
const emits = defineEmits(['insert'])

const $editTrans = inject<(key: string) => any>('$editTrans')!

//链接地址
const url = ref<string>('')
//链接文本
const text = ref<string>('')
//是否新窗口打开
const newOpen = ref<boolean>(false)

watch(
	() => props.presetText,
	newVal => {
		text.value = newVal || ''
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
//插入链接
const insertLink = () => {
	emits('insert', text.value, url.value, newOpen.value)
}
</script>
<style scoped src="./insertLink.less"></style>

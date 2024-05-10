<template>
	<div class="editify-mathformula">
		<div class="editify-mathformula-label">{{ props.defaultLaTexContent ? $editTrans('editMathformula') : $editTrans('insertMathformula') }}</div>
		<textarea class="editify-mathformula-textarea" v-model.trim="latexContent" :placeholder="$editTrans('mathformulaPlaceholder')" @focus="handleInputFocus" @blur="handleInputBlur"></textarea>
		<div class="editify-mathformula-footer">
			<span :style="{ color: color || '' }" @click="insertMathformula">{{ $editTrans('confirm') }}</span>
		</div>
	</div>
</template>
<script setup lang="ts">
import { inject, ref, watch } from 'vue'
import { InsertMathformulaProps } from './props'

defineOptions({
	name: 'InsertMathformula'
})
const props = defineProps(InsertMathformulaProps)
const emits = defineEmits(['insert'])

const $editTrans = inject<(key: string) => any>('$editTrans')!

const latexContent = ref<string>('')

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

//插入数学公式
const insertMathformula = () => {
	emits('insert', latexContent.value)
}

watch(
	() => props.defaultLaTexContent,
	newVal => {
		latexContent.value = newVal
	},
	{
		immediate: true
	}
)
</script>
<style scoped src="./insertMathformula.less"></style>

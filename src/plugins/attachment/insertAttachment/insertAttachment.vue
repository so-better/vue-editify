<template>
	<div class="editify-attachment">
		<div class="editify-attachment-header">
			<div @click="current = 'upload'" class="editify-attachment-header-item" :class="{ 'editify-active': current == 'upload' }" :style="activeStyle('upload')">{{ $editTrans('uploadAttachment') }}</div>
			<div @click="current = 'remote'" class="editify-attachment-header-item" :class="{ 'editify-active': current == 'remote' }" :style="activeStyle('remote')">{{ $editTrans('remoteAttachment') }}</div>
			<div class="editify-attachment-header-slider" :class="'editify-' + current" :style="{ backgroundColor: color || '' }"></div>
		</div>
		<!-- 远程地址 -->
		<div class="editify-attachment-remote" v-if="current == 'remote'">
			<input v-model.trim="attachmentName" :placeholder="$editTrans('attachmentNamePlaceholder')" @blur="handleInputBlur" @focus="handleInputFocus" type="text" />
			<input v-model.trim="attachmentUrl" :placeholder="$editTrans('attachmentUrlPlaceholder')" @blur="handleInputBlur" @focus="handleInputFocus" type="url" />
			<div class="editify-attachment-remote-footer" :style="{ color: color || '' }">
				<span @click="insertRemoteAttachment">{{ $editTrans('insert') }}</span>
			</div>
		</div>
		<!-- 上传地址 -->
		<div class="editify-attachment-upload" v-else>
			<input v-model.trim="attachmentName" :placeholder="$editTrans('attachmentNamePlaceholder')" @blur="handleInputBlur" @focus="handleInputFocus" type="text" />
			<div class="editify-attachment-btn" @click="triggerFileInput">
				<Icon value="upload"></Icon>
				<input ref="fileInputRef" :multiple="multiple" :accept="accept" @change="selectFile" type="file" />
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { file as DapFile } from 'dap-util'
import Icon from '../../../components/icon/icon.vue'
import { InsertAttachmentProps } from './props'
import { computed, inject, ref, watch } from 'vue'
import { ObjectType } from '../../../core/tool'

defineOptions({
	name: 'InsertAttachment'
})
const props = defineProps(InsertAttachmentProps)
const emits = defineEmits(['change', 'insert'])

const $editTrans = inject<(key: string) => any>('$editTrans')!

//当前展示的面板，取值remote和upload
const current = ref<'remote' | 'upload'>('upload')
//附件名称
const attachmentName = ref<string>('')
//附件远程地址
const attachmentUrl = ref<string>('')
//文件选择框
const fileInputRef = ref<HTMLInputElement | null>(null)

const activeStyle = computed<(name: 'remote' | 'upload') => ObjectType>(() => {
	return (name: 'remote' | 'upload') => {
		if (current.value == name) {
			return {
				color: props.color
			}
		}
		return {}
	}
})

//获取文件后缀
const getSuffix = (file: File) => {
	const index = file.name.lastIndexOf('.')
	if (index <= 0) {
		return ''
	}
	return file.name.substring(index + 1)
}
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
//插入网络文件
const insertRemoteAttachment = () => {
	emits('insert', attachmentName.value, [attachmentUrl.value])
}
//触发文件选择框
const triggerFileInput = () => {
	fileInputRef.value!.click()
}
//选择文件
const selectFile = async () => {
	const files = fileInputRef.value!.files
	if (!files || !files.length) {
		return
	}
	let filterFiles = []
	for (let i = 0; i < files.length; i++) {
		const file = files[i]
		const suffix = getSuffix(file)
		const isMatch =
			props.allowedFileType && Array.isArray(props.allowedFileType) && props.allowedFileType.length
				? props.allowedFileType.some(item => {
						return item.toLocaleLowerCase() == suffix.toLocaleLowerCase()
				  })
				: true
		//后缀不符合
		if (!isMatch) {
			//如果自定义了异常处理
			if (typeof props.handleError == 'function') {
				props.handleError('suffixError', file)
			}
			continue
		}
		//超过最大值
		if (props.maxSize && file.size / 1024 > props.maxSize) {
			//如果自定义了异常处理
			if (typeof props.handleError == 'function') {
				props.handleError('maxSizeError', file)
			}
			continue
		}
		//没达到最小值
		if (props.minSize && file.size / 1024 < props.minSize) {
			//如果自定义了异常处理
			if (typeof props.handleError == 'function') {
				props.handleError('minSizeError', file)
			}
			continue
		}
		filterFiles.push(file)
	}
	//有文件可上传
	if (filterFiles.length) {
		let attachments = []
		//自定义上传方法
		if (typeof props.customUpload == 'function') {
			attachments = (await props.customUpload(filterFiles)) || []
		}
		//默认上传方法
		else {
			for (let i = 0; i < filterFiles.length; i++) {
				const url = await DapFile.dataFileToBase64(filterFiles[i])
				attachments.push(url)
			}
		}
		emits('insert', attachmentName.value, attachments)
	}
	//清空文件选择框
	fileInputRef.value!.value = ''
}

//监听current变更触发change事件
watch(
	() => current.value,
	() => {
		emits('change')
	}
)
</script>
<style scoped src="./insertAttachment.less"></style>

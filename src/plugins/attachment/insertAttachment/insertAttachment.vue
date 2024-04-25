<template>
	<div class="editify-attachment">
		<div class="editify-attachment-header">
			<div @click="current = 'upload'" class="editify-attachment-header-item" :class="{ 'editify-active': current == 'upload' }" :style="activeStyle('upload')">{{ $editTrans('uploadAttachment') }}</div>
			<div @click="current = 'remote'" class="editify-attachment-header-item" :class="{ 'editify-active': current == 'remote' }" :style="activeStyle('remote')">{{ $editTrans('remoteAttachment') }}</div>
			<div class="editify-attachment-header-slider" :class="'editify-' + current" :style="{ backgroundColor: color || '' }"></div>
		</div>
		<!-- 网络图片 -->
		<div class="editify-attachment-remote" v-if="current == 'remote'">
			<input v-model.trim="remoteUrl" :placeholder="$editTrans('attachmentUrlPlaceholder')" @blur="handleInputBlur" @focus="handleInputFocus" />
			<div class="editify-attachment-remote-footer" :style="{ color: color || '' }">
				<span @click="insertRemoteAttachment">{{ $editTrans('insert') }}</span>
			</div>
		</div>
		<!-- 上传图片 -->
		<div class="editify-attachment-upload" v-else>
			<Icon value="upload"></Icon>
			<input @change="selectFile" type="file" />
		</div>
	</div>
</template>
<script setup lang="ts">
import { file as DapFile } from 'dap-util'
import Icon from '../../../components/icon/icon.vue'
import { InsertAttachmentProps } from './props'
import { ComponentInternalInstance, computed, getCurrentInstance, inject, ref, watch } from 'vue'
import { ObjectType } from '../../../core/tool'

const instance = getCurrentInstance()!

defineOptions({
	name: 'InsertAttachment'
})
const props = defineProps(InsertAttachmentProps)
const emits = defineEmits(['change', 'insert'])

const $editTrans = inject<(key: string) => any>('$editTrans')!
const editify = inject<ComponentInternalInstance>('editify')!

//当前展示的面板，取值remote和upload
const current = ref<'remote' | 'upload'>('upload')
//远程图片链接
const remoteUrl = ref<string>('')

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
		;(<HTMLInputElement>e.currentTarget).style.borderColor = props.color
	}
}
//输入框失去焦点
const handleInputBlur = (e: Event) => {
	;(<HTMLInputElement>e.currentTarget).style.borderColor = ''
}
//插入网络文件
const insertRemoteAttachment = () => {
	emits('insert', remoteUrl.value, instance.proxy)
}
//选择文件
const selectFile = async (e: Event) => {
	const inputEle = <HTMLInputElement>e.currentTarget
	const files = inputEle.files
	if (!files || !files.length) {
		return
	}
	let filterFiles = []
	for (let i = 0; i < files.length; i++) {
		const file = files[i]
		const suffix = getSuffix(file)
		const isMatch =
			props.accept && Array.isArray(props.accept) && props.accept.length
				? props.accept.some(item => {
						return item.toLocaleLowerCase() == suffix.toLocaleLowerCase()
				  })
				: true
		//后缀不符合
		if (!isMatch) {
			//如果自定义了异常处理
			if (typeof props.handleError == 'function') {
				props.handleError.apply(editify.proxy!, ['suffixError', file])
			}
			continue
		}
		//超过最大值
		if (props.maxSize && file.size / 1024 > props.maxSize) {
			//如果自定义了异常处理
			if (typeof props.handleError == 'function') {
				props.handleError.apply(editify.proxy!, ['maxSizeError', file])
			}
			continue
		}
		//没达到最小值
		if (props.minSize && file.size / 1024 < props.minSize) {
			//如果自定义了异常处理
			if (typeof props.handleError == 'function') {
				props.handleError.apply(editify.proxy!, ['minSizeError', file])
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
			attachments = (await props.customUpload.apply(editify.proxy!, [filterFiles])) || []
		}
		//默认上传方法
		else {
			for (let i = 0; i < filterFiles.length; i++) {
				const url = await DapFile.dataFileToBase64(filterFiles[i])
				attachments.push(url)
			}
		}
		attachments.forEach(url => {
			emits('insert', url, instance.proxy)
		})
	}
	//清空文件选择框
	inputEle.value = ''
}

//监听current变更触发change事件
watch(
	() => current.value,
	() => {
		emits('change', instance.proxy)
	}
)
</script>
<style scoped src="./insertAttachment.less"></style>

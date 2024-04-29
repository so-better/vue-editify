<template>
	<div class="editify-video">
		<div class="editify-video-header">
			<div @click="current = 'upload'" class="editify-video-header-item" :class="{ 'editify-active': current == 'upload' }" :style="activeStyle('upload')">{{ $editTrans('uploadVideo') }}</div>
			<div @click="current = 'remote'" class="editify-video-header-item" :class="{ 'editify-active': current == 'remote' }" :style="activeStyle('remote')">{{ $editTrans('remoteVideo') }}</div>
			<div class="editify-video-header-slider" :class="'editify-' + current" :style="{ backgroundColor: color || '' }"></div>
		</div>
		<!-- 网络视频 -->
		<div class="editify-video-remote" v-if="current == 'remote'">
			<input v-model.trim="remoteUrl" :placeholder="$editTrans('videoUrlPlaceholder')" @blur="handleInputBlur" @focus="handleInputFocus" />
			<div class="editify-video-remote-footer" :style="{ color: color || '' }">
				<span @click="insertRemoteVideo">{{ $editTrans('insert') }}</span>
			</div>
		</div>
		<!-- 上传视频 -->
		<div class="editify-video-upload" v-else>
			<Icon value="upload"></Icon>
			<input :multiple="multiple" accept="video/*" @change="selectFile" type="file" />
		</div>
	</div>
</template>
<script setup lang="ts">
import { file as DapFile } from 'dap-util'
import Icon from '../icon/icon.vue'
import { InsertVideoProps } from './props'
import { computed, inject, ref, watch } from 'vue'
import { ObjectType } from '../../core/tool'

defineOptions({
	name: 'InsertVideo'
})
const props = defineProps(InsertVideoProps)
const emits = defineEmits(['change', 'insert'])

const $editTrans = inject<(key: string) => any>('$editTrans')!

//当前展示的面板，取值remote和upload
const current = ref<'remote' | 'upload'>('upload')
//远程视频链接
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
//插入网络视频
const insertRemoteVideo = () => {
	emits('insert', [remoteUrl.value])
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
		let videos = []
		//自定义上传方法
		if (typeof props.customUpload == 'function') {
			videos = (await props.customUpload(filterFiles)) || []
		}
		//默认上传方法
		else {
			for (let i = 0; i < filterFiles.length; i++) {
				const url = await DapFile.dataFileToBase64(filterFiles[i])
				videos.push(url)
			}
		}
		emits('insert', videos)
	}
	//清空文件选择框
	inputEle.value = ''
}

//监听current变更触发change事件
watch(
	() => current.value,
	() => {
		emits('change')
	}
)
</script>
<style scoped src="./insertVideo.less"></style>

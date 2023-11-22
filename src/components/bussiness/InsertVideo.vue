<template>
	<div class="editify-video">
		<div class="editify-video-header">
			<div @click="current = 'upload'" class="editify-video-header-item" :class="{ active: current == 'upload' }" :style="activeStyle('upload')">{{ $editTrans('uploadVideo') }}</div>
			<div @click="current = 'remote'" class="editify-video-header-item" :class="{ active: current == 'remote' }" :style="activeStyle('remote')">{{ $editTrans('remoteVideo') }}</div>
			<div class="editify-video-header-slider" :class="current" :style="{ backgroundColor: color || '' }"></div>
		</div>
		<!-- 网络视频 -->
		<div class="editify-video-remote" v-if="current == 'remote'">
			<input v-model.trim="remoteUrl" :placeholder="$editTrans('videoUrlPlaceholder')" @blur="handleInputBlur" @focus="handleInputFocus" />
			<div class="editify-video-remote-footer" :style="{ color: color }">
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
<script>
import Dap from 'dap-util'
import Icon from '../base/Icon'
export default {
	name: 'InsertVideo',
	emits: ['change', 'insert'],
	props: {
		//主题色
		color: {
			type: String,
			default: ''
		},
		//支持的视频类型数组
		accept: {
			type: Array,
			default: null
		},
		//是否支持多选
		multiple: {
			type: Boolean,
			default: false
		},
		//单个文件最大值
		maxSize: {
			type: Number,
			default: null
		},
		//单个文件最小值
		minSize: {
			type: Number,
			default: null
		},
		//是否自定义上传视频
		customUpload: {
			type: Function,
			default: null
		},
		//处理上传视频异常
		handleError: {
			type: Function,
			default: null
		}
	},
	inject: ['$editTrans'],
	data() {
		return {
			current: 'upload', //当前展示的面板，取值remote和upload
			remoteUrl: '' //远程视频链接
		}
	},
	computed: {
		activeStyle() {
			return name => {
				if (this.current == name) {
					return {
						color: this.color
					}
				}
				return {}
			}
		}
	},
	components: {
		Icon
	},
	watch: {
		//监听current变更触发change事件
		current() {
			this.$emit('change')
		}
	},
	methods: {
		//选择文件
		async selectFile(e) {
			const inputEle = e.currentTarget
			const files = inputEle.files
			if (!files.length) {
				return
			}
			let filterFiles = []
			for (let i = 0; i < files.length; i++) {
				const file = files[i]
				const suffix = this.getSuffix(file)
				const isMatch = this.accept.some(item => {
					return item.toLocaleLowerCase() == suffix.toLocaleLowerCase()
				})
				//后缀不符合
				if (!isMatch) {
					//如果自定义了异常处理
					if (typeof this.handleError == 'function') {
						this.handleError.apply(this, ['suffixError', file])
					}
					continue
				}
				//超过最大值
				if (this.maxSize && file.size / 1024 > this.maxSize) {
					//如果自定义了异常处理
					if (typeof this.handleError == 'function') {
						this.handleError.apply(this, ['maxSizeError', file])
					}
					continue
				}
				//没达到最小值
				if (this.minSize && file.size / 1024 < this.minSize) {
					//如果自定义了异常处理
					if (typeof this.handleError == 'function') {
						this.handleError.apply(this, ['minSizeError', file])
					}
					continue
				}
				filterFiles.push(file)
			}
			//有文件可上传
			if (filterFiles.length) {
				//自定义上传方法
				if (typeof this.customUpload == 'function') {
					this.customUpload.apply(this, [filterFiles])
				}
				//默认上传方法
				else {
					let videos = []
					for (let i = 0; i < filterFiles.length; i++) {
						const url = await Dap.file.dataFileToBase64(filterFiles[i])
						videos.push(url)
					}
					videos.forEach(url => {
						this.$emit('insert', url)
					})
				}
			}
			//清空文件选择框
			inputEle.value = ''
		},
		//获取文件后缀
		getSuffix(file) {
			const index = file.name.lastIndexOf('.')
			if (index <= 0) {
				return ''
			}
			return file.name.substring(index + 1)
		},
		//输入框获取焦点
		handleInputFocus(e) {
			if (this.color) {
				e.currentTarget.style.borderColor = this.color
			}
		},
		//输入框失去焦点
		handleInputBlur(e) {
			e.currentTarget.style.borderColor = ''
		},
		//插入网络视频
		insertRemoteVideo() {
			this.$emit('insert', this.remoteUrl)
		}
	}
}
</script>
<style lang="less" scoped>
.editify-video {
	display: block;
	width: 280px;
	padding: 10px 14px;

	.editify-video-header {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		margin-bottom: 20px;
		position: relative;
		padding-bottom: 6px;

		.editify-video-header-slider {
			position: absolute;
			width: 50px;
			height: 2px;
			border-radius: 2px;
			left: 0;
			bottom: 0;
			transition: left 200ms;

			&.upload {
				left: 5px;
			}

			&.remote {
				left: 85px;
			}
		}

		.editify-video-header-item {
			display: block;
			text-align: center;
			font-size: @font-size;
			color: @font-color;
			opacity: 0.8;
			transition: all 200ms;
			width: 60px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;

			&:hover {
				opacity: 1;
				cursor: pointer;
			}

			&:first-child {
				margin-right: 20px;
			}

			&.active {
				opacity: 1;
				color: @font-color-dark;
			}
		}
	}

	.editify-video-remote {
		display: block;
		width: 100%;

		input {
			appearance: none;
			-webkit-appearance: none;
			-moz-appearance: none;
			display: block;
			width: 100%;
			margin: 0 0 10px 0;
			padding: 4px 2px;
			border: none;
			font-size: @font-size;
			color: @font-color;
			border-bottom: 1px solid @border-color;
			line-height: 1.5;
			transition: border-color 500ms;
			background-color: transparent;
			outline: none;
			box-sizing: border-box;

			&::-webkit-input-placeholder,
			&::placeholder {
				color: @font-color-disabled;
				font-family: inherit;
				font-size: inherit;
				vertical-align: middle;
			}
		}

		.editify-video-remote-footer {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			width: 100%;
			font-size: @font-size;
			opacity: 0.8;
			transition: all 200ms;

			&:hover {
				cursor: pointer;
				opacity: 1;
			}
		}
	}

	.editify-video-upload {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding: 15px 0;
		font-size: 36px;
		opacity: 0.8;
		transition: all 200ms;
		position: relative;

		&:hover {
			cursor: pointer;
			opacity: 1;
		}

		input {
			opacity: 0;
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			cursor: pointer;
		}
	}
}
</style>

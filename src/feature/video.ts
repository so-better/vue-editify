import { computed, defineComponent, h, inject, PropType, ref, Ref } from 'vue'
import { AlexEditor, AlexElementsRangeType } from 'alex-editor'
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'
import { getMatchElementByRange, hasPreInRange, insertVideo } from '@/core/function'
import { InsertVideo } from '@/components/insertVideo'
import { MenuVideoButtonType } from '@/core/tool'

export type VideoConfigType = {
	controls: boolean
	loop: boolean
	autoplay: boolean
	muted: boolean
}

/**
 * feature名称
 */
const FEATURE_NAME = 'video'

/**
 * 工具栏 - 视频操作
 */
export const VideoToolbar = defineComponent(
	(props, { emit }) => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const dataRangeCaches = inject<Ref<AlexElementsRangeType>>('dataRangeCaches')!
		const $editTrans = inject<(key: string) => any>('$editTrans')!

		//视频参数配置
		const videoConfig = computed<VideoConfigType>(() => {
			const video = getMatchElementByRange(editor.value, dataRangeCaches.value, { parsedom: 'video' })
			if (video) {
				return {
					controls: !!video.marks!['controls'],
					loop: !!video.marks!['loop'],
					autoplay: !!video.marks!['autoplay'],
					muted: !!video.marks!['muted']
				}
			}
			return {
				controls: false,
				loop: false,
				autoplay: false,
				muted: false
			}
		})

		//设置视频宽度
		const setWidth = (value: string) => {
			const element = editor.value.range!.anchor.element
			if (element) {
				const styles = {
					width: value
				}
				if (element.hasStyles()) {
					element.styles = Object.assign(element.styles!, styles)
				} else {
					element.styles = styles
				}
				editor.value.formatElementStack()
				editor.value.domRender()
				editor.value.rangeRender()
				//更新工具条位置
				setTimeout(() => {
					emit('reset-toolbar')
				}, 0)
			}
		}
		//设置视频属性
		const setVideo = (prop: 'controls' | 'loop' | 'autoplay' | 'muted') => {
			const element = editor.value.range!.anchor.element
			//当前是拥有该属性
			if (videoConfig.value[prop]) {
				delete element.marks![prop]
			}
			//当前无该属性
			else {
				element.marks![prop] = true
			}
			videoConfig.value[prop] = !videoConfig.value[prop]
			editor.value.formatElementStack()
			editor.value.domRender()
			editor.value.rangeRender()
		}

		return () => {
			return [
				//30%
				h(
					Button,
					{
						name: 'set30Width',
						title: $editTrans('width30'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						onOperate: () => setWidth('30%')
					},
					{
						default: () => ' 30% '
					}
				),
				//50%
				h(
					Button,
					{
						name: 'set50Width',
						title: $editTrans('width50'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						onOperate: () => setWidth('50%')
					},
					{
						default: () => ' 50% '
					}
				),
				//100%
				h(
					Button,
					{
						name: 'set100Width',
						title: $editTrans('width100'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						onOperate: () => setWidth('100%')
					},
					{
						default: () => ' 100% '
					}
				),
				//宽度自适应
				h(
					Button,
					{
						name: 'setAutoWidth',
						title: $editTrans('auto'),
						tooltip: props.tooltip,
						color: props.color,
						rightBorder: true,
						zIndex: props.zIndex,
						onOperate: () => setWidth('auto')
					},
					{
						default: () => h(Icon, { value: 'auto-width' })
					}
				),
				//自动播放
				h(
					Button,
					{
						name: 'autoplay',
						title: videoConfig.value.autoplay ? $editTrans('disabledAutoplay') : $editTrans('autoplay'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						onOperate: () => setVideo('autoplay')
					},
					{
						default: () =>
							h(Icon, {
								value: videoConfig.value.autoplay ? 'autoplay' : 'stop'
							})
					}
				),
				//循环
				h(
					Button,
					{
						name: 'loop',
						title: videoConfig.value.loop ? $editTrans('disabledLoop') : $editTrans('loop'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						onOperate: () => setVideo('loop')
					},
					{
						default: () =>
							h(Icon, {
								value: videoConfig.value.loop ? 'loop' : 'single'
							})
					}
				),
				//静音
				h(
					Button,
					{
						name: 'muted',
						title: videoConfig.value.muted ? $editTrans('unmuted') : $editTrans('muted'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						onOperate: () => setVideo('muted')
					},
					{
						default: () =>
							h(Icon, {
								value: videoConfig.value.muted ? 'muted' : 'unmuted'
							})
					}
				),
				//控制器
				h(
					Button,
					{
						name: 'controls',
						title: $editTrans('controls'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						leftBorder: true,
						onOperate: () => setVideo('controls')
					},
					{
						default: () =>
							h(Icon, {
								value: 'controls'
							})
					}
				),
				//删除视频
				h(
					Button,
					{
						name: 'deleteVideo',
						title: $editTrans('deleteVideo'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						onOperate: () => {
							const element = getMatchElementByRange(editor.value, dataRangeCaches.value, { parsedom: 'video' })
							if (element) {
								element.toEmpty()
								editor.value.formatElementStack()
								editor.value.domRender()
								editor.value.rangeRender()
							}
						}
					},
					{
						default: () => h(Icon, { value: 'delete' })
					}
				)
			]
		}
	},
	{
		name: `_${FEATURE_NAME}`,
		props: {
			color: String as PropType<string | null>,
			zIndex: Number,
			tooltip: Boolean
		},
		emits: ['reset-toolbar']
	}
)

/**
 * 菜单栏 - 插入视频
 */
export const VideoMenuButton = defineComponent(
	props => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const dataRangeCaches = inject<Ref<AlexElementsRangeType>>('dataRangeCaches')!
		const $editTrans = inject<(key: string) => any>('$editTrans')!
		const isSourceView = inject<Ref<boolean>>('isSourceView')!

		const btnRef = ref<InstanceType<typeof Button> | null>(null)

		return () => {
			return props.config.show
				? h(
						Button,
						{
							ref: btnRef,
							name: FEATURE_NAME,
							tooltip: props.tooltip,
							color: props.color,
							zIndex: props.zIndex,
							type: 'select',
							hideScroll: true,
							title: $editTrans('insertImage'),
							leftBorder: props.config.leftBorder,
							rightBorder: props.config.rightBorder,
							active: false,
							disabled: props.disabled || isSourceView.value || hasPreInRange(editor.value, dataRangeCaches.value) || props.config.disabled
						},
						{
							default: () =>
								h(Icon, {
									value: 'video'
								}),
							layer: () =>
								h(InsertVideo, {
									color: props.color,
									allowedFileType: props.config.allowedFileType!,
									multiple: props.config.multiple!,
									maxSize: props.config.maxSize!,
									minSize: props.config.minSize!,
									customUpload: props.config.customUpload!,
									handleError: props.config.handleError!,
									onChange: () => btnRef.value!.layerRef!.setPosition(),
									onInsert: (val: string[]) => {
										//过滤掉空的地址
										const urls = val.filter(url => {
											return !!url
										})
										//如果数组为0
										if (urls.length == 0) {
											return
										}
										//遍历每个地址进行插入
										urls.forEach(url => {
											insertVideo(editor.value, url)
										})
										editor.value.formatElementStack()
										editor.value.domRender()
										editor.value.rangeRender()
										btnRef.value!.show = false
									}
								})
						}
				  )
				: null
		}
	},
	{
		name: `_${FEATURE_NAME}`,
		props: {
			color: String as PropType<string | null>,
			zIndex: Number,
			config: Object as PropType<MenuVideoButtonType>,
			tooltip: Boolean,
			disabled: Boolean
		}
	}
)

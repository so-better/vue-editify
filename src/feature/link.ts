import { computed, defineComponent, h, inject, PropType, ref, Ref } from 'vue'
import { UpdateLink } from '@/components/updateLink'
import { getMatchElementByRange, getRangeText, hasAttachmentInRange, hasLinkInRange, hasPreInRange, insertLink } from '@/core/function'
import { AlexEditor, AlexElement, AlexElementsRangeType } from 'alex-editor'
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'
import { InsertLink } from '@/components/insertLink'
import { MenuSelectButtonType } from '@/core/tool'

/**
 * feature名称
 */
const FEATURE_NAME = 'link'

/**
 * 工具栏 - 编辑链接
 */
export const linkToolbar = defineComponent(
	props => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const dataRangeCaches = inject<Ref<AlexElementsRangeType>>('dataRangeCaches')!

		const preset = computed(() => {
			const link = getMatchElementByRange(editor.value, dataRangeCaches.value, { parsedom: 'a' })
			if (link) {
				return {
					url: link.marks!['href'],
					newOpen: link.marks!['target'] == '_blank'
				}
			}
			return {
				url: '',
				newOpen: false
			}
		})

		return () => {
			return h(UpdateLink, {
				color: props.color,
				toolbar: true,
				presetNewOpen: preset.value.newOpen,
				presetUrl: preset.value.url,
				onModify: (url: string, newOpen: boolean) => {
					if (!url) {
						return
					}
					const link = getMatchElementByRange(editor.value, dataRangeCaches.value, { parsedom: 'a' })
					if (link) {
						link.marks!.href = url
						if (newOpen) {
							link.marks!.target = '_blank'
						} else {
							delete link.marks!.target
						}
						editor.value.formatElementStack()
						editor.value.domRender()
					}
				},
				onRemove: () => {
					const link = getMatchElementByRange(editor.value, dataRangeCaches.value, { parsedom: 'a' })
					if (link) {
						link.parsedom = AlexElement.TEXT_NODE
						delete link.marks!['target']
						delete link.marks!['href']
						delete link.marks!['data-editify-element']
						editor.value.formatElementStack()
						editor.value.domRender()
						editor.value.rangeRender()
					}
				}
			})
		}
	},
	{
		name: `_${FEATURE_NAME}`,
		props: {
			color: String
		}
	}
)

/**
 * 菜单栏 - 插入链接
 */
export const LinkMenuButton = defineComponent(
	props => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const dataRangeCaches = inject<Ref<AlexElementsRangeType>>('dataRangeCaches')!
		const $editTrans = inject<(key: string) => any>('$editTrans')!
		const isSourceView = inject<Ref<boolean>>('isSourceView')!

		const btnRef = ref<InstanceType<typeof Button> | null>(null)

		const presetText = computed<string>(() => getRangeText(dataRangeCaches.value))

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
							title: $editTrans('insertLink'),
							leftBorder: props.config.leftBorder,
							rightBorder: props.config.rightBorder,
							active: false,
							disabled: props.disabled || isSourceView.value || hasLinkInRange(editor.value, dataRangeCaches.value) || hasPreInRange(editor.value, dataRangeCaches.value) || hasAttachmentInRange(editor.value, dataRangeCaches.value) || props.config.disabled
						},
						{
							default: () =>
								h(Icon, {
									value: 'link'
								}),
							layer: () =>
								h(InsertLink, {
									color: props.color,
									presetText: presetText.value,
									onInsert: (text: string, url: string, newOpen: boolean) => {
										if (!url) {
											return
										}
										insertLink(editor.value, text, url, newOpen)
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
			color: String,
			zIndex: Number,
			config: Object as PropType<MenuSelectButtonType>,
			tooltip: Boolean,
			disabled: Boolean
		}
	}
)

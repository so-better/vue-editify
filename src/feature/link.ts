import { computed, defineComponent, h, inject, PropType, Ref } from 'vue'
import { UpdateLink } from '@/components/updateLink'
import { getMatchElementByRange } from '@/core/function'
import { AlexEditor, AlexElement, AlexElementsRangeType } from 'alex-editor'

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
			color: String as PropType<string | null>
		}
	}
)

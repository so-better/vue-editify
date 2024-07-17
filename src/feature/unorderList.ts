import { computed, defineComponent, h, inject, PropType, Ref } from 'vue'
import { AlexElementsRangeType, AlexEditor, AlexElement } from 'alex-editor'
import { MenuButtonType } from '@/core/tool'
import { elementIsList, getMatchElementByRange, hasPanelInRange, hasPreInRange, hasTableInRange, rangeIsInList, setList } from '@/core/function'
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'

/**
 * feature名称
 */
const FEATURE_NAME = 'unorderList'

type orderType = 'disc' | 'circle' | 'square'

/**
 * 工具栏 - 无序列表
 */
export const UnorderListToolbar = defineComponent(
	props => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const dataRangeCaches = inject<Ref<AlexElementsRangeType>>('dataRangeCaches')!
		const $editTrans = inject<(key: string) => any>('$editTrans')!

		const active = computed<(val: orderType) => boolean>(() => {
			return val => {
				const el = getMatchElementByRange(editor.value, dataRangeCaches.value, {
					parsedom: 'div',
					marks: {
						'data-editify-list': 'ul'
					}
				})
				if (el && el.marks!['data-editify-list-style']) {
					return el.marks!['data-editify-list-style'] == val
				}
				return val == 'disc'
			}
		})

		//设置前面列表的序标样式
		const setPreviouseListStyle = (element: AlexElement, val: orderType) => {
			element.marks!['data-editify-list-style'] = val
			const previousElement = editor.value.getPreviousElement(element)
			if (previousElement && elementIsList(previousElement, false)) {
				setPreviouseListStyle(previousElement, val)
			}
		}

		//设置后面列表的序标样式
		const setNextListStyle = (element: AlexElement, val: orderType) => {
			element.marks!['data-editify-list-style'] = val
			const nextElement = editor.value.getNextElement(element)
			if (nextElement && elementIsList(nextElement, false)) {
				setNextListStyle(nextElement, val)
			}
		}

		//设置列表序标样式
		const setListStyle = (val: orderType) => {
			const el = getMatchElementByRange(editor.value, dataRangeCaches.value, {
				parsedom: 'div',
				marks: {
					'data-editify-list': 'ul'
				}
			})!
			el.marks!['data-editify-list-style'] = val
			const previousElement = editor.value.getPreviousElement(el)
			const nextElement = editor.value.getNextElement(el)
			if (previousElement && elementIsList(previousElement, false)) {
				setPreviouseListStyle(previousElement, val)
			}
			if (nextElement && elementIsList(nextElement, false)) {
				setNextListStyle(nextElement, val)
			}
			editor.value.domRender()
			editor.value.rangeRender()
		}

		return () => {
			return [
				h(
					Button,
					{
						name: 'disc',
						title: $editTrans('disc'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						active: active.value('disc'),
						onOperate: () => setListStyle('disc')
					},
					{
						default: () => h(Icon, { value: 'list-disc', style: { fontSize: '20px' } })
					}
				),
				h(
					Button,
					{
						name: 'circle',
						title: $editTrans('circle'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						active: active.value('circle'),
						onOperate: () => setListStyle('circle')
					},
					{
						default: () => h(Icon, { value: 'list-circle', style: { fontSize: '20px' } })
					}
				),
				h(
					Button,
					{
						name: 'square',
						title: $editTrans('square'),
						tooltip: props.tooltip,
						color: props.color,
						zIndex: props.zIndex,
						active: active.value('square'),
						onOperate: () => setListStyle('square')
					},
					{
						default: () => h(Icon, { value: 'list-square', style: { fontSize: '20px' } })
					}
				)
			]
		}
	},
	{
		name: `_${FEATURE_NAME}`,
		props: {
			color: String,
			zIndex: Number,
			tooltip: Boolean
		}
	}
)

/**
 * 菜单栏 - 无序列表
 */
export const UnorderListMenuButton = defineComponent(
	props => {
		const editor = inject<Ref<AlexEditor>>('editor')!
		const dataRangeCaches = inject<Ref<AlexElementsRangeType>>('dataRangeCaches')!
		const $editTrans = inject<(key: string) => any>('$editTrans')!
		const isSourceView = inject<Ref<boolean>>('isSourceView')!

		return () => {
			return props.config.show
				? h(
						Button,
						{
							name: FEATURE_NAME,
							tooltip: props.tooltip,
							color: props.color,
							zIndex: props.zIndex,
							title: $editTrans('unorderList'),
							leftBorder: props.config.leftBorder,
							rightBorder: props.config.rightBorder,
							active: rangeIsInList(editor.value, dataRangeCaches.value, false),
							disabled: props.disabled || isSourceView.value || hasPreInRange(editor.value, dataRangeCaches.value) || hasTableInRange(editor.value, dataRangeCaches.value) || hasPanelInRange(editor.value, dataRangeCaches.value) || props.config.disabled,
							onOperate: () => {
								setList(editor.value, dataRangeCaches.value, false)
								editor.value.domRender()
								editor.value.rangeRender()
							}
						},
						{
							default: () => h(Icon, { value: 'list-unordered' })
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
			config: Object as PropType<MenuButtonType>,
			tooltip: Boolean,
			disabled: Boolean
		}
	}
)

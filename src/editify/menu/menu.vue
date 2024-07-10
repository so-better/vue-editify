<template>
	<div ref="menuRef" class="editify-menu" :class="{ 'editify-border': menuShowBorder, 'editify-source': isSourceView && menuMode == 'inner', 'editify-fullscreen': isFullScreen }" :data-editify-mode="menuMode" :style="{ zIndex: zIndex, ...(config.style || {}) }">
		<template v-for="item in menuNames">
			<!-- 内置菜单按钮 -->
			<component v-if="!!currentDefaultMenu(item)" :is="currentDefaultMenu(item)" :color="color" :z-index="zIndex + 1" :config="(config as any)[item]" :disabled="isDisabled || !rangeKey" :tooltip="config.tooltip!"></component>
			<!-- 拓展菜单按钮 -->
			<ExtendMenuButton v-else :name="item" />
		</template>
	</div>
</template>
<script setup lang="ts">
import { ref, computed, inject, Ref, ComputedRef, onMounted, getCurrentInstance, onBeforeUnmount, shallowRef, defineComponent, h } from 'vue'
import { event as DapEvent } from 'dap-util'
import { MenuModeType } from '@/core/tool'
import { Button } from '@/components/button'
import { MenuProps } from './props'
import { UndoMenuButton } from '@/feature/undo'
import { RedoMenuButton } from '@/feature/redo'
import { HeadingMenuButton } from '@/feature/heading'
import { IndentMenuButton } from '@/feature/indent'
import { QuoteMenuButton } from '@/feature/quote'
import { SeparatorMenuButton } from '@/feature/separator'
import { AlignMenuButton } from '@/feature/align'
import { OrderListMenuButton } from '@/feature/orderList'
import { UnorderListMenuButton } from '@/feature/unorderList'
import { TaskMenuButton } from '@/feature/task'
import { BoldMenuButton } from '@/feature/bold'
import { UnderlineMenuButton } from '@/feature/underline'
import { ItalicMenuButton } from '@/feature/italic'
import { StrikethroughMenuButton } from '@/feature/strikethrough'
import { CodeMenuButton } from '@/feature/code'
import { SuperMenuButton } from '@/feature/super'
import { SubMenuButton } from '@/feature/sub'
import { FormatClearMenuButton } from '@/feature/formatClear'
import { FontSizeMenuButton } from '@/feature/fontSize'
import { FontFamilyMenuButton } from '@/feature/fontFamily'
import { LineHeightMenuButton } from '@/feature/lineHeight'
import { ForeColorMenuButton } from '@/feature/foreColor'
import { BackColorMenuButton } from '@/feature/backColor'
import { LinkMenuButton } from '@/feature/link'
import { ImageMenuButton } from '@/feature/image'
import { VideoMenuButton } from '@/feature/video'
import { TableMenuButton } from '@/feature/table'
import { CodeBlockMenuButton } from '@/feature/codeBlock'
import { SourceViewMenuButton } from '@/feature/sourceView'
import { FullScreenMenuButton } from '@/feature/fullScreen'

defineOptions({
	name: 'Menu'
})
//内部实例
const instance = getCurrentInstance()!
//属性
const props = defineProps(MenuProps)
//是否源码视图
const isSourceView = inject<Ref<boolean>>('isSourceView')!
//是否全屏
const isFullScreen = inject<Ref<boolean>>('isFullScreen')!
//光标更新标记
const rangeKey = inject<Ref<number | null>>('rangeKey')!
//编辑器是否显示边框
const showBorder = inject<ComputedRef<boolean>>('showBorder')!
//编辑器是否外部禁用
const isDisabled = inject<ComputedRef<boolean>>('isDisabled')!
//编辑器是否自适应高度
const isAutoHeight = inject<ComputedRef<boolean>>('isAutoHeight')!

//菜单dom
const menuRef = ref<HTMLElement | null>(null)
//菜单高度
const height = ref<number>(0)

//菜单名称数组（包括内置的和拓展的）
const menuNames = computed<string[]>(() => {
	return Object.keys(props.config.sequence!).sort((a, b) => {
		if (props.config.sequence![a]! > props.config.sequence![b]!) {
			return 1
		}
		return -1
	})
})
//内置菜单组件的数组
const defaultMenus = shallowRef([UndoMenuButton, RedoMenuButton, HeadingMenuButton, IndentMenuButton, QuoteMenuButton, SeparatorMenuButton, AlignMenuButton, OrderListMenuButton, UnorderListMenuButton, TaskMenuButton, BoldMenuButton, UnderlineMenuButton, ItalicMenuButton, StrikethroughMenuButton, CodeMenuButton, SuperMenuButton, SubMenuButton, FormatClearMenuButton, FontSizeMenuButton, FontFamilyMenuButton, LineHeightMenuButton, ForeColorMenuButton, BackColorMenuButton, LinkMenuButton, ImageMenuButton, VideoMenuButton, TableMenuButton, CodeBlockMenuButton, SourceViewMenuButton, FullScreenMenuButton])
//根据菜单名称获取对应的内置菜单组件
const currentDefaultMenu = computed(() => {
	return (name: string) => defaultMenus.value.find(item => item.name == `_${name}`)
})
//菜单显示模式
const menuMode = computed<MenuModeType>(() => {
	//如果是全屏状态下或者高度自适应状态下
	if (isFullScreen.value || isAutoHeight.value) {
		//fixed模式改为默认模式
		if (props.config.mode == 'fixed') {
			return 'default'
		}
	}
	return props.config.mode!
})
//菜单栏是否显示边框
const menuShowBorder = computed<boolean>(() => {
	//fixed模式下不显示边框
	if (menuMode.value == 'fixed') {
		return false
	}
	//由编辑器的border属性来决定
	return showBorder.value
})

//拓展菜单组件
const ExtendMenuButton = defineComponent(
	extendProps => {
		//按钮实例
		const btnRef = ref<InstanceType<typeof Button> | null>(null)
		//拓展菜单配置
		const configuration = props.config.extends![extendProps.name]
		return () => {
			return configuration
				? h(
						Button,
						{
							name: extendProps.name,
							tooltip: props.config.tooltip,
							color: props.color,
							zIndex: props.zIndex + 1,
							ref: btnRef,
							type: configuration.type || 'default',
							title: configuration.title || '',
							leftBorder: configuration.leftBorder || false,
							rightBorder: configuration.rightBorder || false,
							hideScroll: configuration.hideScroll || false,
							disabled: isDisabled.value || !rangeKey.value || configuration.disabled,
							active: configuration.active || false,
							selectConfig: {
								width: configuration.width,
								maxHeight: configuration.maxHeight,
								options: configuration.options
							},
							displayConfig: {
								width: configuration.width,
								maxHeight: configuration.maxHeight,
								value: configuration.value,
								options: configuration.options
							},
							onLayerShow: () => {
								if (typeof configuration.onLayerShow == 'function') {
									configuration.onLayerShow(extendProps.name, btnRef.value!)
								}
							},
							onLayerShown: () => {
								if (typeof configuration.onLayerShown == 'function') {
									configuration.onLayerShown(extendProps.name, btnRef.value!)
								}
							},
							onLayerHidden: () => {
								if (typeof configuration.onLayerHidden == 'function') {
									configuration.onLayerHidden(extendProps.name, btnRef.value!)
								}
							},
							onOperate: (name, val) => {
								if (typeof configuration.onOperate == 'function') {
									configuration.onOperate(name, val, btnRef.value!)
								}
							}
						},
						{
							default: () => {
								if (configuration.default) {
									return configuration.default(extendProps.name, btnRef.value!)
								}
								return null
							},
							layer: () => {
								if (configuration.layer) {
									return configuration.layer(extendProps.name, btnRef.value!)
								}
								return null
							},
							option: () => {
								if (configuration.option) {
									return configuration.option(extendProps.name, btnRef.value!)
								}
								return null
							}
						}
				  )
				: null
		}
	},
	{
		props: {
			name: String
		}
	}
)

onMounted(() => {
	height.value = menuRef.value!.offsetHeight
	DapEvent.on(window, `resize.editify_menu_${instance.uid}`, () => {
		height.value = menuRef.value!.offsetHeight
	})
})

onBeforeUnmount(() => {
	DapEvent.off(window, `resize.editify_menu_${instance.uid}`)
})

defineExpose({
	height
})
</script>
<style scoped src="./menu.less"></style>

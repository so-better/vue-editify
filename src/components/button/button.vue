<template>
	<div class="editify-button">
		<div class="editify-button-wrap" :class="{ 'editify-right-border': rightBorder, 'editify-left-border': leftBorder }">
			<Tooltip :content="title" :disabled="!tooltip" :z-index="zIndex">
				<div ref="btnRef" :style="btnStyle" class="editify-button-el" :class="{ 'editify-disabled': disabled, 'editify-active': active }" @mouseenter="status = 'hover'" @mouseleave="status = null" @mousedown="status = 'down'" @mouseup="status = 'hover'" @click="handleClick">
					<div v-if="type == 'default' || type == 'select'" class="editify-button-slot">
						<slot></slot>
					</div>
					<div v-else-if="type == 'display'">{{ displayLabel }}</div>
					<Icon v-if="type == 'select' || type == 'display'" value="caret-down" class="editify-button-caret" :class="{ 'editify-rotate': show }"></Icon>
				</div>
			</Tooltip>
			<Layer ref="layerRef" v-model="show" :node="btnRef" border placement="bottom-start" :z-index="zIndex + 1" animation="translate" @show="emits('layerShow')" @shown="emits('layerShown')" @hidden="emits('layerHidden')">
				<div class="editify-button-layer" :style="{ width: (type == 'select' ? parseSelectConfig.width : parseDisplayConfig.width) + 'px', maxHeight: (type == 'select' ? parseSelectConfig.maxHeight : parseDisplayConfig.maxHeight) + 'px', overflow: hideScroll ? 'visible' : '' }">
					<slot v-if="$slots.layer" name="layer" :options="cmpOptions"></slot>
					<div v-else class="editify-button-options">
						<div @click="select(item)" class="editify-button-option" :class="{ 'editify-active': type == 'display' ? item.value == parseDisplayConfig.value : false }" :style="item.style || ''" v-for="item in cmpOptions">
							<slot v-if="$slots.option" name="option" :item="item"></slot>
							<div class="editify-button-option-flex" v-else>
								<Icon v-if="item.icon" :value="item.icon"></Icon>
								<span>{{ item.label }}</span>
							</div>
						</div>
					</div>
				</div>
			</Layer>
		</div>
	</div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { common as DapCommon, color as DapColor } from 'dap-util'
import { ObjectType } from '@/core/tool'
import { Tooltip } from '../tooltip'
import { Layer } from '../layer'
import { Icon } from '../icon'
import { ButtonOptionsItemType, ButtonParseDisplayConfigType, ButtonParseSelectConfigType, ButtonProps } from './props'

defineOptions({
	name: 'Button'
})
const props = defineProps(ButtonProps)
const emits = defineEmits(['operate', 'layerShow', 'layerShown', 'layerHidden'])

//是否显示浮层
const show = ref<boolean>(false)
//按钮状态，hover表示悬浮，down表示按下
const status = ref<'hover' | 'down' | null>(null)
const btnRef = ref<HTMLElement | null>(null)
const layerRef = ref<InstanceType<typeof Layer> | null>(null)

//处理后的select配置
const parseSelectConfig = computed<ButtonParseSelectConfigType>(() => {
	let options: ButtonOptionsItemType[] = []
	let width: number | '' = ''
	let maxHeight: number | '' = ''
	if (DapCommon.isObject(props.selectConfig)) {
		if (Array.isArray(props.selectConfig.options)) {
			options = props.selectConfig.options.map(item => {
				if (DapCommon.isObject(item)) {
					return {
						label: (item as ButtonOptionsItemType).label,
						value: (item as ButtonOptionsItemType).value,
						icon: (item as ButtonOptionsItemType).icon,
						style: (item as ButtonOptionsItemType).style
					}
				}
				return {
					label: item as string | number,
					value: item as string | number
				}
			})
		}
		if (typeof props.selectConfig.width == 'number') {
			width = props.selectConfig.width
		}
		if (typeof props.selectConfig.maxHeight == 'number') {
			maxHeight = props.selectConfig.maxHeight
		}
	}
	return {
		options,
		width,
		maxHeight
	}
})
//处理后的display配置
const parseDisplayConfig = computed<ButtonParseDisplayConfigType>(() => {
	let options: ButtonOptionsItemType[] = []
	let width: number | '' = ''
	let maxHeight: number | '' = ''
	let value: string | number = ''
	if (DapCommon.isObject(props.displayConfig)) {
		if (typeof props.displayConfig.value == 'string' || typeof props.displayConfig.value == 'number') {
			value = props.displayConfig.value
		}
		if (Array.isArray(props.displayConfig.options)) {
			options = props.displayConfig.options.map(item => {
				if (DapCommon.isObject(item)) {
					return {
						label: (item as ButtonOptionsItemType).label,
						value: (item as ButtonOptionsItemType).value,
						icon: (item as ButtonOptionsItemType).icon,
						style: (item as ButtonOptionsItemType).style
					}
				}
				return {
					label: item as string | number,
					value: item as string | number
				}
			})
			let optItem = options.find(item => {
				return item.value == value
			})
			if (!optItem && options[0]) {
				value = options[0].value!
			}
		}
		if (typeof props.displayConfig.width == 'number') {
			width = props.displayConfig.width
		}
		if (typeof props.displayConfig.maxHeight == 'number') {
			maxHeight = props.displayConfig.maxHeight
		}
	}
	return {
		options,
		width,
		maxHeight,
		value
	}
})
//渲染的浮层列表数据
const cmpOptions = computed<ButtonOptionsItemType[]>(() => {
	return props.type == 'select' ? parseSelectConfig.value.options! : parseDisplayConfig.value.options!
})
//显示在页面的value值对应的label
const displayLabel = computed<string | number>(() => {
	const val = parseDisplayConfig.value.options!.find(item => {
		return item.value == parseDisplayConfig.value.value
	})
	return val ? val.label! : ''
})
//十六进制颜色转换的rgb颜色数组
const parseColor = computed<number[]>(() => {
	if (props.color) {
		return DapColor.hex2rgb(props.color)
	}
	return []
})
//按钮样式
const btnStyle = computed<ObjectType>(() => {
	if (!props.disabled && props.color) {
		//激活情况下和鼠标按下状态
		if (props.active || status.value == 'down') {
			return {
				color: props.color,
				backgroundColor: `rgba(${parseColor.value[0]},${parseColor.value[1]},${parseColor.value[2]},0.15)`
			}
		}
		//鼠标悬浮状态
		if (status.value == 'hover') {
			return {
				color: `rgba(${parseColor.value[0]},${parseColor.value[1]},${parseColor.value[2]},0.9)`,
				backgroundColor: `rgba(${parseColor.value[0]},${parseColor.value[1]},${parseColor.value[2]},0.05)`
			}
		}
	}
	return {}
})

//列表选择
const select = (item: ButtonOptionsItemType) => {
	if (props.disabled) {
		return
	}
	emits('operate', props.name, item.value)
	show.value = false
}
//按钮点击处理
const handleClick = () => {
	if (props.disabled) {
		return
	}
	if (props.type == 'default') {
		emits('operate', props.name)
	} else {
		show.value = !show.value
	}
}

defineExpose({
	show,
	status,
	layerRef
})
</script>
<style scoped src="./button.less"></style>

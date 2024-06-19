import { ExtractPublicPropTypes, PropType } from 'vue'
import { ObjectType } from '@/core/tool'

export type ButtonTypeType = 'default' | 'select' | 'display'

export type ButtonOptionsItemType = {
	label?: string | number
	value?: string | number
	icon?: string
	style?: ObjectType
}

export type ButtonSelectConfigType = {
	options?: (ButtonOptionsItemType | number | string)[]
	width?: number | ''
	maxHeight?: number | ''
}

export type ButtonDisplayConfigType = {
	options?: (ButtonOptionsItemType | number | string)[]
	width?: number | ''
	maxHeight?: number | ''
	value?: string | number
}

export const ButtonProps = {
	//按钮类型
	type: {
		type: String as PropType<ButtonTypeType>,
		default: 'default',
		validator(value: any) {
			//default表示默认的点击按钮
			//select表示下拉列表的按钮
			//display表示显示值的下拉列表按钮
			return ['default', 'select', 'display'].includes(value)
		}
	},
	//按钮名称，唯一值
	name: {
		type: String,
		default: ''
	},
	//按钮提示内容
	title: {
		type: String,
		default: ''
	},
	//是否显示工具提示
	tooltip: {
		type: Boolean,
		default: false
	},
	//是否显示右侧边框
	rightBorder: {
		type: Boolean,
		default: false
	},
	//是否显示左侧边框
	leftBorder: {
		type: Boolean,
		default: false
	},
	//主题色，用于按钮悬浮颜色变化使用,仅支持十六进制
	color: {
		type: String as PropType<string | null>,
		default: ''
	},
	//是否禁用
	disabled: {
		type: Boolean,
		default: false
	},
	//是否激活
	active: {
		type: Boolean,
		default: false
	},
	//type=select时的配置
	selectConfig: {
		type: Object as PropType<ButtonSelectConfigType>,
		default: null
	},
	//type=display时的配置
	displayConfig: {
		type: Object as PropType<ButtonDisplayConfigType>,
		default: null
	},
	//浮层隐藏滚动条
	hideScroll: {
		type: Boolean,
		default: false
	}
}

export type ButtonPropsType = ExtractPublicPropTypes<typeof ButtonProps>

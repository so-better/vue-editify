import { ExtractPublicPropTypes, PropType } from 'vue'

export type LayerPlacementType = 'top' | 'bottom' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'

export type LayerAnimationType = 'translate' | 'fade' | null

export const LayerProps = {
	//是否显示
	modelValue: {
		type: Boolean,
		default: false
	},
	//关联元素
	node: {
		type: [String, HTMLElement] as PropType<string | HTMLElement | null>,
		default: null
	},
	//是否显示边框
	border: {
		type: Boolean,
		default: false
	},
	//边框颜色
	borderColor: {
		type: String,
		default: null
	},
	//背景色
	background: {
		type: String,
		default: null
	},
	//字体颜色
	color: {
		type: String,
		default: null
	},
	//位置
	placement: {
		type: String as PropType<LayerPlacementType>,
		default: 'bottom',
		validator(value: any) {
			return ['top', 'bottom', 'top-start', 'top-end', 'bottom-start', 'bottom-end'].includes(value)
		}
	},
	//是否显示三角形
	showTriangle: {
		type: Boolean,
		default: false
	},
	//层级
	zIndex: {
		type: Number,
		default: 1
	},
	//动画
	animation: {
		type: String as PropType<LayerAnimationType>,
		default: null,
		validator(value: any) {
			return ['translate', 'fade', null].includes(value)
		}
	},
	//是否根据range对象来定位，此时不需要传入node
	useRange: {
		type: Boolean,
		default: false
	}
}

export type LayerPropsType = ExtractPublicPropTypes<typeof LayerProps>

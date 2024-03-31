import { ExtractPublicPropTypes, PropType } from 'vue'

export type TrianglePlacementType = 'top' | 'left' | 'right' | 'bottom'

export const TriangleProps = {
	//位置
	placement: {
		type: String as PropType<TrianglePlacementType>,
		default: 'top',
		validator(value: any) {
			return ['top', 'left', 'right', 'bottom'].includes(value)
		}
	},
	//边框颜色
	color: {
		type: String,
		default: null
	},
	//背景色
	background: {
		type: String,
		default: null
	}
}

export type TrianglePropsType = ExtractPublicPropTypes<typeof TriangleProps>

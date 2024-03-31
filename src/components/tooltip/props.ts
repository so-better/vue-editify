import { ExtractPublicPropTypes } from 'vue'

export const TooltipProps = {
	//提示内容
	content: {
		type: String,
		default: ''
	},
	//是否禁用
	disabled: {
		type: Boolean,
		default: false
	},
	//是否块级
	block: {
		type: Boolean,
		default: false
	}
}

export type TooltipPropsType = ExtractPublicPropTypes<typeof TooltipProps>

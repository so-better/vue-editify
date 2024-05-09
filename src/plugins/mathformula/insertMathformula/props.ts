import { ExtractPublicPropTypes, PropType } from 'vue'

export const InsertMathformulaProps = {
	//主题色
	color: {
		type: String as PropType<string | null>,
		default: ''
	},
	//预置的LaTex文本内容
	defaultLaTexContent: {
		type: String,
		default: ''
	}
}

export type InsertMathformulaPropsType = ExtractPublicPropTypes<typeof InsertMathformulaProps>

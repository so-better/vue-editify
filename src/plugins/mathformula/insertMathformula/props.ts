import { ExtractPublicPropTypes, PropType } from 'vue'

export const InsertMathformulaProps = {
	//主题色
	color: {
		type: String as PropType<string | null>,
		default: ''
	}
}

export type InsertMathformulaPropsType = ExtractPublicPropTypes<typeof InsertMathformulaProps>

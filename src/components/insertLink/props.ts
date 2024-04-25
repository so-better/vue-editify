import { ExtractPublicPropTypes, PropType } from 'vue'

export const InsertLinkProps = {
	//主题色
	color: {
		type: String as PropType<string | null>,
		default: ''
	},
	//预置的链接文本值
	text: {
		type: String,
		default: ''
	}
}

export type InsertLinkPropsType = ExtractPublicPropTypes<typeof InsertLinkProps>

import { ExtractPublicPropTypes } from 'vue'

export const InsertLinkProps = {
	//主题色
	color: {
		type: String,
		default: ''
	},
	//预置的链接文本值
	presetText: {
		type: String,
		default: ''
	}
}

export type InsertLinkPropsType = ExtractPublicPropTypes<typeof InsertLinkProps>

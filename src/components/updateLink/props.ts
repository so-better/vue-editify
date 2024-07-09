import { ExtractPublicPropTypes, PropType } from 'vue'

export const UpdateLinkProps = {
	//主题色
	color: {
		type: String as PropType<string | null>,
		default: ''
	},
	//预置链接值
	presetUrl: {
		type: String,
		default: ''
	},
	//预置是否新窗口打开
	presetNewOpen: {
		type: Boolean,
		default: false
	}
}

export type UpdateLinkPropsType = ExtractPublicPropTypes<typeof UpdateLinkProps>

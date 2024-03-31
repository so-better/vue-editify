import { ExtractPublicPropTypes } from 'vue'

export const IconProps = {
	//图标值
	value: {
		type: String,
		default: ''
	}
}

export type IconPropsType = ExtractPublicPropTypes<typeof IconProps>

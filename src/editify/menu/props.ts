import { ExtractPublicPropTypes, PropType } from 'vue'
import { MenuConfigType } from '@/core/tool'

export const MenuProps = {
	//菜单栏配置
	config: {
		type: Object as PropType<MenuConfigType>,
		default: null
	},
	//主题色
	color: {
		type: String,
		default: ''
	},
	//层级
	zIndex: {
		type: Number,
		default: 1
	}
}

export type MenuPropsType = ExtractPublicPropTypes<typeof MenuProps>

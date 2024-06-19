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
		type: String as PropType<string | null>,
		default: ''
	}
}

export type MenuPropsType = ExtractPublicPropTypes<typeof MenuProps>

import { ExtractPublicPropTypes, PropType } from 'vue'
import { ButtonOptionsItemType } from '@/components/button/props'

export const ColorsProps = {
	//颜色数组
	data: {
		type: Array as PropType<ButtonOptionsItemType[]>,
		default: function () {
			return []
		}
	},
	//选中的颜色
	value: {
		type: String,
		default: null
	},
	//激活状态颜色
	color: {
		type: String as PropType<string | null>,
		default: ''
	},
	//是否使用工具提示
	tooltip: {
		type: Boolean,
		default: false
	}
}

export type ColorsPropsType = ExtractPublicPropTypes<typeof ColorsProps>

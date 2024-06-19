import { ExtractPublicPropTypes, PropType } from 'vue'
import { common as DapCommon } from 'dap-util'
import { ObjectType } from '@/core/tool'

export const CheckboxProps = {
	//是否禁用
	disabled: {
		type: Boolean,
		default: false
	},
	//是否选中
	modelValue: {
		type: [Boolean, Array] as PropType<boolean | any[]>,
		default: false
	},
	//label文字
	label: {
		type: String,
		default: null
	},
	//值
	value: {
		type: [Object, Number, String, Array] as PropType<ObjectType | number | string | any[]>,
		default: ''
	},
	//是否圆形
	round: {
		type: Boolean,
		default: false
	},
	//文字位置
	placement: {
		type: String as PropType<'left' | 'right'>,
		default: 'right',
		validator(value: any) {
			return ['left', 'right'].includes(value)
		}
	},
	//主题颜色
	color: {
		type: String as PropType<string | null>,
		default: '',
		validator(value: any) {
			return DapCommon.matchingText(value, 'hex')
		}
	}
}

export type CheckboxPropsType = ExtractPublicPropTypes<typeof CheckboxProps>

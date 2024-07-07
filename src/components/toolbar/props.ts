import { ExtractPublicPropTypes, PropType } from 'vue'
import { ToolbarConfigType } from '@/core/tool'

export const ToolbarProps = {
	//是否显示
	modelValue: {
		type: Boolean,
		default: false
	},
	//关联元素
	node: {
		type: [String, Node] as PropType<string | HTMLElement>,
		default: null
	},
	//类型
	type: {
		type: String as PropType<'text' | 'table' | 'link' | 'codeBlock' | 'image' | 'video'>,
		default: 'text',
		validator(value: any) {
			return ['text', 'table', 'link', 'codeBlock', 'image', 'video'].includes(value)
		}
	},
	//工具条配置
	config: {
		type: Object as PropType<ToolbarConfigType>,
		default: null
	},
	//主题色
	color: {
		type: String as PropType<string | null>,
		default: ''
	},
	//层级
	zIndex: {
		type: Number,
		default: 1
	}
}

export type ToolbarPropsType = ExtractPublicPropTypes<typeof ToolbarProps>

import { ExtractPublicPropTypes, PropType } from 'vue'

export type InsertTableGridType = {
	x: number
	y: number
	inside: boolean
}

export const InsertTableProps = {
	//主题色
	color: {
		type: String as PropType<string | null>,
		default: ''
	},
	//最大行数
	maxRows: {
		type: Number,
		default: 10
	},
	//最大列数
	maxColumns: {
		type: Number,
		default: 10
	}
}

export type InsertTablePropsType = ExtractPublicPropTypes<typeof InsertTableProps>

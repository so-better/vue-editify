export const Props = {
	//编辑器内容
	modelValue: {
		type: String,
		default: '<p><br></p>'
	},
	//占位符
	placeholder: {
		type: String,
		default: ''
	},
	//是否禁用编辑器
	disabled: {
		type: Boolean,
		default: false
	},
	//是否允许复制
	allowCopy: {
		type: Boolean,
		default: true
	},
	//是否允许粘贴
	allowPaste: {
		type: Boolean,
		default: true
	},
	//是否允许剪切
	allowCut: {
		type: Boolean,
		default: true
	},
	//是否允许粘贴html
	allowPasteHtml: {
		type: Boolean,
		default: false
	},
	//编辑内容高度
	height: {
		type: String,
		default: '600px'
	},
	//是否自适应高度
	autoheight: {
		type: Boolean,
		default: false
	},
	//是否显示边框
	border: {
		type: Boolean,
		default: false
	},

	//主题色
	color: {
		type: String,
		default: '#000'
	}
}

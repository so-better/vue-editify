import { AlexElement } from 'alex-editor'

//props组件属性
export const props = {
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
	//是否自动获取焦点
	autofocus: {
		type: Boolean,
		default: false
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
		default: '#25caae'
	}
}

//判断是否列表
export const isList = (element, ordered = false) => {
	return element.type == 'block' && element.parsedom == 'div' && element.hasMarks() && element.marks['data-editify-list'] == (ordered ? 'ol' : 'ul')
}

//将某个块元素转为段落
export const blockToParagraph = element => {
	//如果是有序列表或者无序列表
	if (isList(element, true) || isList(element, false)) {
		let marks = {}
		for (let key in element.marks) {
			if (key != 'data-editify-list' && key != 'data-editify-value') {
				marks[key] = element.marks[key]
			}
		}
		element.marks = marks
	}
	element.parsedom = AlexElement.BLOCK_NODE
}

//其他元素转为列表
export const blockToList = (element, ordered = false) => {
	element.parsedom = 'div'
	if (!element.hasMarks()) {
		element.marks = {}
	}
	element.marks['data-editify-list'] = ordered ? 'ol' : 'ul'
}

//列表元素的替换，即转换ol和li标签
export const parseList = function (element) {
	//ol标签和ul标签转为div
	if (element.parsedom == 'ol' || element.parsedom == 'ul') {
		if (element.hasChildren()) {
			element.children.forEach((el, index) => {
				const newEl = el.clone()
				newEl.parsedom = 'div'
				newEl.type = 'block'
				if (!newEl.hasMarks()) {
					newEl.marks = {}
				}
				newEl.marks['data-editify-list'] = element.parsedom
				if (element.parsedom == 'ol') {
					newEl.marks['data-editify-value'] = index + 1
				}
				//插入到该元素之后
				this.addElementAfter(newEl, element)
			})
		}
		element.toEmpty()
	}
	//有序列表的序号处理
	if (element.type == 'block' && element.hasMarks() && element.marks['data-editify-list'] == 'ol') {
		//获取前一个元素
		const previousElement = this.getPreviousElement(element)
		//如果前一个元素存在并且也是有序列表
		if (previousElement && previousElement.hasMarks() && previousElement.marks['data-editify-list'] == 'ol') {
			const previousValue = Number(previousElement.marks['data-editify-value'])
			element.marks['data-editify-value'] = previousValue + 1
		}
		//前一个元素不是有序列表，则从0开始
		else {
			element.marks['data-editify-value'] = 1
		}
	}
}

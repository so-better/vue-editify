import { App } from 'vue'
import { AlexElement } from 'alex-editor'
import { withInstall } from '@/core/tool'

//重写AlexElement.isPreStyle，将td加入到代码块样式中去
const originFn = AlexElement.prototype.isPreStyle
AlexElement.prototype.isPreStyle = function () {
	const block = this.getInblock() || this.getBlock()
	if (block.parsedom == 'td') {
		return true
	}
	return originFn.apply(this)
}

//引入根节点颜色变量样式
import '@/css/var.less'
//引入字体图标样式
import '@/icon/iconfont.css'
//引入组件
import editify from '@/editify/editify.vue'
//注入install方法
const Editify = withInstall(editify)

//导出类型
export type * from '@/components/button'
export type * from '@/components/checkbox'
export type * from '@/components/colors'
export type * from '@/components/icon'
export type * from '@/components/insertImage'
export type * from '@/components/insertLink'
export type * from '@/components/insertTable'
export type * from '@/components/insertVideo'
export type * from '@/components/layer'
export type * from '@/components/tooltip'
export type * from '@/components/triangle'
export type * from '@/components/updateLink'
export type * from '@/core/tool'
export type * from '@/core/function'
export type * from '@/editify/menu'
export type * from '@/editify/toolbar'

//导出编辑器操作方法
export {
	elementIsMatch,
	getMatchElementByElement,
	getMatchElementByRange,
	elementIsList,
	getListByElement,
	hasListInRange,
	rangeIsInList,
	elementIsTask,
	getTaskByElement,
	hasTaskInRange,
	rangeIsInTask,
	elementIsAttachment,
	hasAttachmentInRange,
	elementIsMathformula,
	getMathformulaByElement,
	hasMathformulaInRange,
	elementIsInfoBlock,
	getInfoBlockByElement,
	hasInfoBlockInRange,
	rangeIsInInfoBlock,
	hasPreInRange,
	hasTableInRange,
	hasQuoteInRange,
	rangeIsInQuote,
	hasLinkInRange,
	hasImageInRange,
	hasVideoInRange,
	queryTextStyle,
	setTextStyle,
	removeTextStyle,
	queryTextMark,
	setTextMark,
	removeTextMark,
	getRangeText,
	addSpaceTextToBothSides,
	setHeading,
	setIndentIncrease,
	setIndentDecrease,
	setQuote,
	setAlign,
	setList,
	setTask,
	setLineHeight,
	insertLink,
	insertImage,
	insertVideo,
	insertTable,
	insertCodeBlock,
	insertSeparator,
	insertAttachment,
	insertMathformula,
	insertInfoBlock
} from '@/core/function'

//安装函数
const install = (app: App) => {
	app.component(Editify.name!, Editify)
}
//版本号
const version = '0.2.20'

//导出组件和安装函数
export { Editify as default, Editify, install, AlexElement, version }

console.log(`%c vue-editify %c v${version} `, 'padding: 2px 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060; font-weight: bold;', 'padding: 2px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e; font-weight: bold;')

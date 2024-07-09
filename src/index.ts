import { App } from 'vue'
import { withInstall } from '@/core/tool'
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
export type * from '@/plugins/attachment'
export type * from '@/plugins/attachment/insertAttachment'
export type * from '@/plugins/mathformula'
export type * from '@/plugins/mathformula/insertMathformula'
export type * from '@/plugins/panel'
export type * from '@/plugins/infoBlock'

//导出编辑器操作方法
export { elementIsMatch, getMatchElementByElement, getMatchElementByRange, isList, isTask, elementIsInList, elementIsInTask, hasPreInRange, hasQuoteInRange, hasListInRange, hasTaskInRange, hasLinkInRange, hasTableInRange, hasImageInRange, hasVideoInRange, isRangeInQuote, isRangeInList, isRangeInTask, queryTextStyle, queryTextMark, getRangeText, setIndentIncrease, setIndentDecrease, setQuote, setAlign, setList, setTask, setTextStyle, setTextMark, removeTextStyle, removeTextMark, setLineHeight, insertLink, insertImage, insertVideo, insertTable, insertCodeBlock, insertSeparator } from '@/core/function'
export { attachment, isAttachment, hasAttachmentInRange } from '@/plugins/attachment'
export { mathformula, isMathformula, isUnderMathformula, getMathformulaElement, hasMathformulaInRange, getMathformulaElementByRange } from '@/plugins/mathformula'
export { panel, isPanel, isUnderPanel, getPanelElement, hasPanelInRange, getPanelElementByRange } from '@/plugins/panel'
export { infoBlock, isInfoBlock, isUnderInfoBlock, getInfoBlockElement, hasInfoBlockInRange, getInfoBlockElementByRange } from '@/plugins/infoBlock'

//安装函数
const install = (app: App) => {
	app.component(Editify.name!, Editify)
}
//版本号
const version = '0.2.14'

//导出AlexElement元素
export { AlexElement } from 'alex-editor'

//导出组件和安装函数
export { Editify as default, Editify, install, version }

console.log(`%c vue-editify %c v${version} `, 'padding: 2px 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060; font-weight: bold;', 'padding: 2px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e; font-weight: bold;')

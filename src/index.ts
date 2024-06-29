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
export type { ButtonTypeType, ButtonOptionsItemType, ButtonSelectConfigType, ButtonDisplayConfigType } from '@/components/button/props'
export type { InsertImageUploadErrorType } from '@/components/insertImage/props'
export type { InsertVideoUploadErrorType } from '@/components/insertVideo/props'
export type { MenuButtonType, MenuSelectButtonType, MenuDisplayButtonType, MenuImageButtonType, MenuVideoButtonType, MenuTableButtonType, MenuCustomButtonType, CodeBlockToolbarType, TextToolbarType, ToolbarConfigType, MenuSequenceType, MenuModeType, MenuExtendType, MenuConfigType, PluginType, PluginResultType } from '@/core/tool'
export type { ElementMatchConfigType } from '@/core/function'

//导出编辑器操作方法
export { elementIsMatch, getMatchElementByElement, getMatchElementByRange, isList, isTask, elementIsInList, elementIsInTask, hasPreInRange, hasQuoteInRange, hasListInRange, hasTaskInRange, hasLinkInRange, hasTableInRange, hasImageInRange, hasVideoInRange, isRangeInQuote, isRangeInList, isRangeInTask, queryTextStyle, queryTextMark, getRangeText, setIndentIncrease, setIndentDecrease, setQuote, setAlign, setList, setTask, setTextStyle, setTextMark, removeTextStyle, removeTextMark, setLineHeight, insertLink, insertImage, insertVideo, insertTable, insertCodeBlock, insertSeparator } from '@/core/function'

//安装函数
const install = (app: App) => {
	app.component(Editify.name!, Editify)
}
//版本号
const version = '0.2.7'

//导出AlexElement元素
export { AlexElement } from 'alex-editor'

//导出attachment插件相关的方法和类型
export type { AttachmentOptionsType } from '@/plugins/attachment'
export type { InsertAttachmentUploadErrorType } from '@/plugins/attachment/insertAttachment/props'
export { attachment, isAttachment, hasAttachmentInRange } from '@/plugins/attachment'
//导出mathformula插件相关的方法和类型
export type { MathformulaOptionsType } from '@/plugins/mathformula'
export { mathformula, isMathformula, isUnderMathformula, getMathformulaElement, hasMathformulaInRange, getMathformulaElementByRange } from '@/plugins/mathformula'
//导出panel插件相关的方法和类型
export type { PanelOptionsType } from '@/plugins/panel'
export { panel, isPanel, isUnderPanel, getPanelElement, hasPanelInRange, getPanelElementByRange } from '@/plugins/panel'
//导出infoBlock插件相关的方法和类型
export type { InfoBlockOptionsType } from '@/plugins/infoBlock'
export { infoBlock, isInfoBlock, isUnderInfoBlock, getInfoBlockElement, hasInfoBlockInRange, getInfoBlockElementByRange } from '@/plugins/infoBlock'

//导出组件和安装函数
export { Editify as default, Editify, install, version }

console.log(`%c vue-editify %c v${version} `, 'padding: 2px 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060; font-weight: bold;', 'padding: 2px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e; font-weight: bold;')

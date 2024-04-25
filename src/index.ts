import { App, FunctionPlugin } from 'vue'
//引入字体图标样式
import './icon/iconfont.css'
//引入组件
import Editify from './editify/editify.vue'

//导出类型
export type { ButtonTypeType, ButtonOptionsItemType, ButtonSelectConfigType, ButtonDisplayConfigType } from './components/button/props'
export type { MenuButtonType, MenuSelectButtonType, MenuDisplayButtonType, MenuImageButtonType, MenuVideoButtonType, MenuTableButtonType, MenuCustomButtonType, CodeBlockToolbarType, TextToolbarType, ToolbarConfigType, MenuSequenceType, MenuModeType, MenuConfigType, EditifyPluginType, EditifyPluginResultType } from './core/tool'
export type { InsertImageUploadErrorType } from './components/insertImage/props'
export type { InsertVideoUploadErrorType } from './components/insertVideo/props'
export type { AttachmentAcceptType, AttachmentOptionsType } from './plugins/attachment'

//导出编辑器操作方法
export { getParsedomElementByElement, getCurrentParsedomElement, elementIsInList, elementIsInTask, isList, isTask, hasPreInRange, isRangeInPre, hasQuoteInRange, isRangeInQuote, hasListInRange, isRangeInList, hasTaskInRange, isRangeInTask, hasLinkInRange, hasTableInRange, hasImageInRange, hasVideoInRange, queryTextStyle, queryTextMark, getRangeText, setIndentIncrease, setIndentDecrease, setQuote, setAlign, setList, setTask, setTextStyle, setTextMark, removeTextStyle, removeTextMark, setLineHeight, insertLink, insertImage, insertVideo, insertTable, insertCodeBlock } from './core/function'

//安装函数
const install: FunctionPlugin = (app: App) => {
	app.component(Editify.name!, Editify)
}
//版本号
const version = '0.1.22'

//导出AlexElement元素
export { AlexElement } from 'alex-editor'

//导出组件和安装函数
export { install as default, install, Editify, version }

//导出插件
export { attachment } from './plugins/attachment'

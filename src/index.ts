//引入AlexElement
import { AlexElement } from 'alex-editor'
//引入组件
import Editify from './editify/editify.vue'
//引入图标样式
import './icon/iconfont.css'

import { App } from 'vue'
import { ButtonTypeType, ButtonOptionsItemType, ButtonSelectConfigType, ButtonDisplayConfigType } from './components/button/props'
import { MenuButtonType, MenuSelectButtonType, MenuDisplayButtonType, MenuImageButtonType, MenuVideoButtonType, MenuTableButtonType, MenuCustomButtonType, CodeBlockToolbarType, TextToolbarType, ToolbarConfigType, MenuSequenceType, MenuModeType, MenuConfigType } from './core/tool'
import { InsertImageUploadErrorType } from './components/insertImage/props'
import { InsertVideoUploadErrorType } from './components/insertVideo/props'

//版本号
const version = '0.1.14'
//安装函数
const install = (app: App) => {
	app.component(Editify.name!, Editify)
}
//全局导出的对象
const stdin_default = {
	install,
	version
}

//导出一些编辑器操作方法
export * from './core/function'

//导出类型
export type { ButtonTypeType, ButtonOptionsItemType, ButtonSelectConfigType, ButtonDisplayConfigType, MenuButtonType, MenuSelectButtonType, MenuDisplayButtonType, MenuImageButtonType, MenuVideoButtonType, MenuTableButtonType, MenuCustomButtonType, CodeBlockToolbarType, TextToolbarType, ToolbarConfigType, MenuSequenceType, MenuModeType, MenuConfigType, InsertImageUploadErrorType, InsertVideoUploadErrorType }

export { stdin_default as default, install, version, Editify, AlexElement }

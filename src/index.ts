//引入AlexElement
import { AlexElement } from 'alex-editor'
//引入组件
import Editify from './editify/editify.vue'
//引入图标样式
import './icon/iconfont.css'

import { App } from 'vue'

//版本号
const version = '0.1.12'
//安装函数
const install = (app: App) => {
	app.component(Editify.name!, Editify)
}
//全局导出的对象
const stdin_default = {
	install,
	version
}

export * from './core/function'

export { stdin_default as default, install, version, Editify, AlexElement }

//引入AlexElement
import { AlexElement } from 'alex-editor'
//引入组件
import Editify from './editify/editify.vue'
//引入图标样式
import './icon/iconfont.css'
//引入国际化
import { trans } from './locale'
import { App } from 'vue'
import { ObjectType } from './core/tool'
//版本号
const version = '0.1.10'
//安装函数
const install = (app: App, props?: ObjectType) => {
	const locale = (props ? props.locale : 'zh_CN') || 'zh_CN'
	app.provide('$editTrans', trans(locale))
	app.provide('$editLocale', locale)
	app.component(Editify.name!, Editify)
}

const stdin_default = {
	install,
	version
}

export { stdin_default as default, install, version, Editify, AlexElement }

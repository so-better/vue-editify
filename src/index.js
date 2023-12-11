//引入AlexElement
import AlexElement from 'alex-editor'
//引入组件
import Editify from './Editify'
//引入图标样式
import './icon/iconfont.css'
//引入国际化
import i18n from './locale'
//版本号
const version = '0.0.25'
//安装函数
const install = (app, props) => {
	const locale = (props ? props.locale : 'zh_CN') || 'zh_CN'
	app.provide('$editTrans', i18n(locale))
	app.provide('$editLocale', locale)
	app.component(Editify.name, Editify)
}

const stdin_default = {
	install,
	version
}

export { stdin_default as default, install, version, AlexElement }

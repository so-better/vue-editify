//引入组件
import Editify from './Editify.vue'
//引入国际化
import i18n from './locale'
//版本号
const version = '0.0.1'
//安装函数
const install = (app, props) => {
	const locale = (props ? props.locale : 'zh_CN') || 'zh_CN'
	app.provide('$editTrans', i18n(locale))
	app.component(Editify.name, Editify)
}

const stdin_default = {
	install,
	version
}

export { stdin_default as default, install, version }

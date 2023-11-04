//引入组件
import Editify from './Editify.vue'
//版本号
const version = '0.0.1'
//安装函数
const install = (app, props) => {
	console.log(props)
	app.component(Editify.name, Editify)
}

const stdin_default = {
	install,
	version
}

export { stdin_default as default, install, version }

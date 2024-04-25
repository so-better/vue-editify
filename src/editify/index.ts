import { App } from 'vue'
import Editify from './editify.vue'

Editify.install = (app: App) => {
	app.component(Editify.name!, Editify)
}

export { Editify }

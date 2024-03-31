import { createApp } from 'vue'
import App from './App.vue'
import editify from '../src/index'
const app = createApp(App)
app.use(editify).mount('#app')

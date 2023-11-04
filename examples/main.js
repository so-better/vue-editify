import { createApp } from 'vue'
import App from './App.vue'
import Editify from '../src'
createApp(App).use(Editify, { locale: 'en_US' }).mount('#app')

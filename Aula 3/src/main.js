import './style.css' // importa o Tailwind
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // se você estiver usando Vue Router

const app = createApp(App)
app.use(router) // só mantenha essa linha se tiver router configurado
app.mount('#app')
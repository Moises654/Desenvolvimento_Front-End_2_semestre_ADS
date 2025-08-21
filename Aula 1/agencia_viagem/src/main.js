import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

// Cria a aplicação Vue
const app = createApp(App)

// Usa o Vue Router
app.use(router)

// Monta a aplicação no elemento #app
app.mount('#app')
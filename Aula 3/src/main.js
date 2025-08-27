import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

// Importar estilos
import './styles/main.css'

// Criar a aplicação Vue
const app = createApp(App)

// Usar plugins
app.use(createPinia())
app.use(router)

// Configuração global de propriedades
app.config.globalProperties.$filters = {
  formatDate: (date) => {
    return new Date(date).toLocaleDateString('pt-BR')
  },
  formatCurrency: (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }
}

// Montar a aplicação
app.mount('#app')
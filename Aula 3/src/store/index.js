import { createPinia } from 'pinia'

// Criar instância do Pinia
const pinia = createPinia()

// Plugin para persistir dados no localStorage
pinia.use(({ store }) => {
  // Configurar persistência para stores específicos
  const persistentStores = ['auth', 'settings', 'preferences']
  
  if (persistentStores.includes(store.$id)) {
    // Restaurar dados do localStorage
    const stored = localStorage.getItem(`${store.$id}-store`)
    if (stored) {
      store.$patch(JSON.parse(stored))
    }

    // Observar mudanças e salvar no localStorage
    store.$subscribe((mutation, state) => {
      localStorage.setItem(`${store.$id}-store`, JSON.stringify(state))
    })
  }
})

export default pinia
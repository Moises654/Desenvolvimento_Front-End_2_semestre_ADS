<template>
  <div id="app">
    <!-- Componente Header -->
    <Header />
    
    <!-- Área principal onde as páginas aparecem -->
    <main class="main-container">
      <router-view />
    </main>
    
    <!-- Componente Footer -->
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-container {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

@media (max-width: 768px) {
  .main-container {
    padding: 1rem;
  }
}
</style>
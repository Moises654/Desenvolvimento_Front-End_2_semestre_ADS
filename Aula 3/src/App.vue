<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <Navbar />
    <main class="flex-grow">
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>
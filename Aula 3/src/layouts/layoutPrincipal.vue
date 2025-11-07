<template>
  <div>
    <Navbar />
    <main class="p-6">
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  name: 'LayoutPrincipal',
  components: { Navbar }
}
</script>

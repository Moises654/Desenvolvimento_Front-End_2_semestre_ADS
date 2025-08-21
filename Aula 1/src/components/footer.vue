<template>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; {{ currentYear }} Agência Aventura. Todos os direitos reservados.</p>
      <p>Desenvolvido com Vue.js 3 | Contato: (11) 9999-9999</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 2rem;
  margin-top: auto;
}

.footer-content p {
  margin: 0.5rem 0;
}

.footer-content p:first-child {
  font-weight: bold;
}
</style>
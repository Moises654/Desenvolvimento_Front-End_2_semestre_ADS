<template>
  <div class="home-page">
    <h1>{{ greetingMessage }}</h1>
    <p>Esta é uma página de exemplo usando interpolação e variáveis globais.</p>
    
    <div v-if="globalAppName">
      <p>Nome da aplicação (variável global): <strong>{{ globalAppName }}</strong></p>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';

// Variável local para interpolação
const greetingMessage = ref('Bem-vindo à Agência Aventura!');

// Acessando uma variável "global" injetada
const globalAppName = inject('appName');
</script>

<style scoped>
.home-page {
  padding: 2rem;
  font-family: Arial, sans-serif;
  text-align: center;
}
h1 {
  color: #35495e;
}
p {
  color: #41b883;
}
</style>
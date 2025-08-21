<template>
  <div class="destination-card">
    <div class="destination-image" :class="{ 'no-image': !destino.imagem }">
      <img v-if="destino.imagem" 
           :src="destino.imagem" 
           :alt="destino.nome"
           @error="onImageError"
           loading="lazy">
      <div class="fallback-emoji">{{ destino.emoji }}</div>
    </div>
    
    <div class="destination-content">
      <h3>{{ destino.nome }}</h3>
      <p>{{ destino.descricao }}</p>
      <div class="card-footer">
        <div class="price">{{ destino.preco }}</div>
        <button class="btn-card" @click="verMais">Ver Mais</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DestinationCard',
  props: {
    destino: {
      type: Object,
      required: true
    }
  },
  methods: {
    verMais() {
      alert(`Você se interessou por ${this.destino.nome}! Em breve mais detalhes sobre este destino.`)
    },
    onImageError(event) {
      // Se a imagem falhar ao carregar, mostra o emoji como fallback
      console.log(`Erro ao carregar imagem de ${this.destino.nome}`);
      event.target.style.display = 'none';
      event.target.parentElement.classList.add('no-image');
    }
  }
}
</script>

<style scoped>
.destination-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.destination-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.2);
}

.destination-image {
  height: 200px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.destination-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.destination-image:hover img {
  transform: scale(1.1);
}

.destination-image .fallback-emoji {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 4rem;
  background: rgba(102, 126, 234, 0.9);
  color: white;
  padding: 20px;
  border-radius: 50%;
  display: none;
}

.destination-image.no-image {
  background: linear-gradient(45deg, #667eea, #764ba2);
}

.destination-image.no-image .fallback-emoji {
  display: block;
}

.destination-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.destination-content h3 {
  color: #667eea;
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
}

.destination-content p {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
  flex: 1;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #28a745;
}

.btn-card {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;
}

.btn-card:hover {
  background: #764ba2;
}
</style>
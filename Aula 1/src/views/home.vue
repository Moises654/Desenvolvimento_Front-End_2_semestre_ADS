<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <h1>{{ heroTitle }}</h1>
      <p>{{ heroSubtitle }}</p>
      <button class="btn-primary" @click="scrollToDestinations">
        Explorar Destinos
      </button>
    </section>

    <!-- Destinations Section -->
    <section id="destinations" class="destinations-section">
      <h2>Destinos Populares</h2>
      
      <div class="destinations-grid">
        <DestinationCard 
          v-for="destino in destinos" 
          :key="destino.id" 
          :destino="destino"
        />
      </div>
    </section>
  </div>
</template>

<script>
import DestinationCard from '../components/DestinationCard.vue'

export default {
  name: 'Home',
  components: {
    DestinationCard
  },
  data() {
    return {
      heroTitle: "Descubra o Mundo com a Agência Aventura",
      heroSubtitle: "Viagens incríveis, experiências únicas e memórias para toda vida",
      destinos: [
        {
          id: 1,
          nome: "Paris, França",
          emoji: "🗼",
          imagem: "https://plus.unsplash.com/premium_photo-1718035557075-5111d9d906d2?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          descricao: "A cidade luz te espera com sua arquitetura única, museus mundialmente famosos e a melhor gastronomia francesa.",
          preco: "A partir de R$ 3.500"
        },
        {
          id: 2,
          nome: "Tokyo, Japão",
          emoji: "🏯",
          imagem: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=250&fit=crop&q=85",
          descricao: "Uma viagem entre tradição e modernidade. Experimente a cultura japonesa, templos históricos e tecnologia de ponta.",
          preco: "A partir de R$ 4.200"
        },
        {
          id: 3,
          nome: "Nova York, EUA",
          emoji: "🗽",
          imagem: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=250&fit=crop&q=85",
          descricao: "A cidade que nunca dorme! Broadway, Central Park, e os arranha-céus mais famosos do mundo te aguardam.",
          preco: "A partir de R$ 3.800"
        },
        {
          id: 4,
          nome: "Rio de Janeiro, Brasil",
          emoji: "🏖️",
          imagem: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&h=250&fit=crop&q=85",
          descricao: "Cidade maravilhosa com praias paradisíacas, Cristo Redentor e uma cultura vibrante que contagia qualquer visitante.",
          preco: "A partir de R$ 1.800"
        },
        {
          id: 5,
          nome: "Londres, Inglaterra",
          emoji: "👑",
          imagem: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=250&fit=crop&q=85",
          descricao: "História, realeza e modernidade se encontram. Visite palácios, museus e desfrute da cultura britânica.",
          preco: "A partir de R$ 3.200"
        },
        {
          id: 6,
          nome: "Dubai, Emirados Árabes",
          emoji: "🏙️",
          imagem: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=250&fit=crop&q=85",
          descricao: "Luxo e inovação no deserto. Arranha-céus impressionantes, compras e experiências únicas te esperam.",
          preco: "A partir de R$ 4.500"
        }
      ]
    }
  },
  methods: {
    scrollToDestinations() {
      const element = document.getElementById('destinations');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
</script>

<style scoped>
.hero {
  text-align: center;
  background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), 
              linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 4rem 2rem;
  margin: -2rem -2rem 3rem -2rem;
  border-radius: 0 0 20px 20px;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: fadeInUp 1s ease;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  animation: fadeInUp 1s ease 0.2s both;
}

.btn-primary {
  background: linear-gradient(45deg, #ffd700, #ffed4a);
  color: #333;
  padding: 12px 30px;
  border: none;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: fadeInUp 1s ease 0.4s both;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.destinations-section h2 {
  text-align: center;
  font-size: 2.5rem;
  color: #667eea;
  margin-bottom: 2rem;
}

.destinations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }
  
  .destinations-grid {
    grid-template-columns: 1fr;
  }
}
</style>
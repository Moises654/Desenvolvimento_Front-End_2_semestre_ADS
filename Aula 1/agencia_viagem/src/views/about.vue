<template>
  <div class="about">
    <div class="about-content">
      <h1>{{ pageTitle }}</h1>
      
      <div class="about-text">
        <p v-for="paragraph in aboutText" :key="paragraph.id">
          {{ paragraph.content }}
        </p>
      </div>

      <!-- Features Grid -->
      <div class="features-grid">
        <div v-for="feature in features" :key="feature.id" class="feature-item">
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3>{{ feature.titulo }}</h3>
          <p>{{ feature.descricao }}</p>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="stats-section">
        <h2>Nossos Números</h2>
        <div class="stats-grid">
          <div v-for="stat in stats" :key="stat.label" class="stat-item">
            <div class="stat-number">{{ stat.numero }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      pageTitle: "Sobre a Agência Aventura",
      aboutText: [
        {
          id: 1,
          content: "Há mais de 15 anos realizando sonhos e criando memórias inesquecíveis. A Agência Aventura nasceu da paixão por descobrir novos lugares e compartilhar experiências únicas com nossos clientes."
        },
        {
          id: 2,
          content: "Nossa missão é tornar suas viagens extraordinárias, oferecendo roteiros personalizados, atendimento especializado e suporte completo em todas as etapas da sua jornada."
        }
      ],
      features: [
        {
          id: 1,
          icon: "✈️",
          titulo: "Viagens Personalizadas",
          descricao: "Roteiros únicos criados especialmente para você e sua família."
        },
        {
          id: 2,
          icon: "🛡️",
          titulo: "Segurança Garantida",
          descricao: "Parcerias com as melhores empresas e seguro viagem completo."
        },
        {
          id: 3,
          icon: "💬",
          titulo: "Suporte 24h",
          descricao: "Atendimento especializado antes, durante e depois da sua viagem."
        },
        {
          id: 4,
          icon: "💰",
          titulo: "Melhor Custo-Benefício",
          descricao: "Preços competitivos com a melhor qualidade de serviços."
        }
      ],
      stats: [
        { numero: "15+", label: "Anos de Experiência" },
        { numero: "50k+", label: "Clientes Satisfeitos" },
        { numero: "120+", label: "Destinos Disponíveis" },
        { numero: "98%", label: "Satisfação do Cliente" }
      ]
    }
  }
}
</script>

<style scoped>
.about-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.about-content h1 {
  color: #667eea;
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

.about-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 3rem;
}

.about-text p {
  margin-bottom: 1.5rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.feature-item {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  border: 2px solid transparent;
  transition: border-color 0.3s ease, transform 0.3s ease;
}

.feature-item:hover {
  border-color: #667eea;
  transform: translateY(-2px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-item h3 {
  color: #667eea;
  margin-bottom: 1rem;
}

.stats-section {
  margin-top: 3rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 3rem;
  border-radius: 15px;
}

.stats-section h2 {
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.1rem;
}
</style>
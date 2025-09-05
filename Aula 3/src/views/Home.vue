<template>
  <div 
    class="w-full flex items-center justify-center mx-auto min-h-[calc(100vh-143px)]
    bg-[url('https://media.sankhya.com.br/wp-content/uploads/2022/05/importancia-ordem-de-servico-de-manutencao..png')] 
    bg-cover bg-center bg-no-repeat"
  >
    <div class="flex flex-col m-10 p-10 bg-black/60 rounded-xl max-w-4xl">
      <h1 class="text-4xl text-center text-white font-bold drop-shadow">
        Bem-vindo à TekPro
      </h1>
      <p class="py-5 text-2xl text-white drop-shadow max-w-3xl max-sm:text-center">
        Somos especialistas em serviços de manutenção industrial, oferecendo soluções 
        eficientes e personalizadas para garantir a operação contínua e segura 
        dos equipamentos da sua indústria. Com equipe qualificada e tecnologia 
        avançada, asseguramos qualidade, rapidez e redução de custos operacionais.
      </p>
      <button 
        type="button"
        class="p-2 bg-blue-500 hover:bg-blue-600 w-60 cursor-pointer rounded-3xl flex text-center mx-auto text-[18px] text-white drop-shadow-lg animate-bounce"
      >
        <router-link 
          to="/contato" 
          class="mx-auto"
        >
          SOLICITAR ORÇAMENTO
        </router-link>
      </button>
    </div>
  </div>
</template>

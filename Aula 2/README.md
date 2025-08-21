Novas funcionalidades

Foram adicionados recursos ao projeto para demonstrar conceitos básicos do Vue 3. As principais adições são:

Nova página (src/views/HomePage.vue): Um novo componente de página foi criado para servir como a tela inicial da aplicação.

Interpolação de Dados: A página HomePage.vue agora exibe dados dinâmicos ({{ mensagem }}) diretamente no HTML, permitindo que a interface mude conforme as variáveis do componente.

Variáveis Globais: Foi implementado um mecanismo para compartilhar informações entre diferentes componentes de forma simples, sem a necessidade de passar dados manualmente. Isso foi feito configurando uma variável "global" no arquivo main.js, que pode ser acessada por qualquer componente filho.

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- [Vue.js 3](https://vuejs.org/) – framework front-end reativo
- [Vite](https://vitejs.dev/) – build tool e servidor de desenvolvimento
- [Vue Router 4](https://router.vuejs.org/) – gerenciamento de rotas
- [JavaScript (ESNext)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [HTML5](https://developer.mozilla.org/pt-BR/docs/Web/HTML) e [CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
- [Node.js](https://nodejs.org/) e [NPM](https://www.npmjs.com/) – ambiente de execução e dependências

---

Vue.js 3
 → Framework progressivo para construção da interface reativa.

Vite
 → Ferramenta de build e servidor de desenvolvimento rápido.

Vue Router 4
 → Gerenciamento de rotas para navegação entre páginas (Home / Sobre).

JavaScript (ESNext) → Linguagem principal do projeto, aproveitando recursos modernos do ECMAScript.

HTML5 + CSS3 → Estrutura e estilização base da aplicação.

CSS Custom Properties (variáveis CSS) → Para definir tema (cores, fundo, texto).

Scoped CSS (Vue Single File Components) → Estilo aplicado por componente sem afetar o resto do app.

Node.js + NPM → Ambiente de execução e gerenciamento de pacotes.

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.provide('appName', 'Agência Aventura');

app.use(router); // Uso do router
app.mount('#app');
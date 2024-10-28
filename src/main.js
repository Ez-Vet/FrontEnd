// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import './style.css';

// i18n Setup
import { createI18n } from 'vue-i18n';
import messages from './i18n';

const i18n = createI18n({
  locale: 'es', // Idioma por defecto
  messages,
});

const app = createApp(App);
app.use(i18n);
app.mount('#app');

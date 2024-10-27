import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createI18n } from 'vue-i18n';
import messages from './i18n/index.js'; // Importa correctamente el archivo index.js

const i18n = createI18n({
  locale: 'es', // Idioma predeterminado
  fallbackLocale: 'en',
  messages,
});

createApp(App)
  .use(router)
  .use(i18n)
  .mount('#app');

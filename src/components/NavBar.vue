<template>
    <div class="navbar">
      <button @click="switchLanguage">{{ currentLanguage }}</button>
      <div class="notification-icon">🔔</div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentLanguage: 'EN',
      };
    },
    methods: {
      switchLanguage() {
        this.currentLanguage = this.currentLanguage === 'EN' ? 'ES' : 'EN';
        this.$i18n.locale = this.currentLanguage.toLowerCase();
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos de la barra de navegación */
  </style>
  
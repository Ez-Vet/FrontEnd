<template>
    <div class="language-switch">
      <button @click="toggleLanguage">{{ currentLanguage }}</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentLanguage: 'EN'
      };
    },
    methods: {
      toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'EN' ? 'ES' : 'EN';
        this.$i18n.locale = this.currentLanguage.toLowerCase();
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos CSS del selector de idioma */
  .language-switch {
    margin-bottom: 20px;
  }
  button {
    background-color: transparent;
    border: none;
    color: white;
    cursor: pointer;
  }
  </style>
  
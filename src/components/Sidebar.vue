<template>
    <div class="sidebar">
      <div class="sidebar-language">
        <LanguageSwitch />
      </div>
      <ul>
        <li @click="navigateTo('ProfileView')">
          <i class="icon-user"></i> {{ $t("profile") }}
        </li>
        <li @click="navigateTo('PetsView')">
          <i class="icon-pets"></i> {{ $t("pets") }}
        </li>
        <li @click="navigateTo('CommunityView')">
          <i class="icon-community"></i> {{ $t("community") }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import LanguageSwitch from './LanguageSwitch.vue';
  
  export default {
    components: {
      LanguageSwitch
    },
    methods: {
      navigateTo(routeName) {
        this.$router.push({ name: routeName });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos CSS de la barra lateral */
  .sidebar {
    width: 200px;
    background-color: #4b4b8a;
    color: white;
    height: 100vh;
    padding: 20px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    padding: 15px;
    cursor: pointer;
  }
  </style>
  
<template>
    <div class="pets-view">
      <Sidebar />
      <div class="pets-content">
        <h1>{{ $t("pets") }}</h1>
        <p>Aquí se mostraría información sobre las mascotas.</p>
      </div>
    </div>
  </template>
  
  <script>
  import Sidebar from '@/components/Sidebar.vue';
  
  export default {
    components: {
      Sidebar
    }
  };
  </script>
  
  <style scoped>
  .pets-view {
    display: flex;
  }
  .pets-content {
    flex-grow: 1;
    padding: 20px;
    background-color: #b0e0e6;
  }
  </style>
  
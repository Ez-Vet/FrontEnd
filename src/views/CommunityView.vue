<template>
    <div class="community-view">
      <Sidebar />
      <div class="community-content">
        <h1>{{ $t("community") }}</h1>
        <p>Aquí se mostraría la sección de comunidad.</p>
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
  .community-view {
    display: flex;
  }
  .community-content {
    flex-grow: 1;
    padding: 20px;
    background-color: #b0e0e6;
  }
  </style>
  
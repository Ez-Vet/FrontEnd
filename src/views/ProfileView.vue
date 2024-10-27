<template>
    <div class="profile-view">
      <Sidebar />
      <div class="profile-content">
        <UserProfile />
      </div>
    </div>
  </template>
  
  <script>
  import Sidebar from '@/components/Sidebar.vue';
  import UserProfile from '@/components/UserProfile.vue';
  
  export default {
    components: {
      Sidebar,
      UserProfile
    }
  };
  </script>
  
  <style scoped>
  /* Estilos CSS de la vista de perfil */
  .profile-view {
    display: flex;
  }
  .profile-content {
    flex-grow: 1;
    padding: 20px;
    background-color: #b0e0e6;
  }
  </style>
  
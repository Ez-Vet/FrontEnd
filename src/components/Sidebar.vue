<!-- src/components/Sidebar.vue -->
<template>
    <div class="sidebar">
      <div class="menu-item">
        <span class="icon">👤</span> Perfil
      </div>
      <div class="menu-item">
        <span class="icon">📖</span> Citas
      </div>
      <div class="menu-item">
        <span class="icon">🐶</span> Inventario
      </div>
      <div class="menu-item">
        <span class="icon">👥</span> Comunidad
      </div>
    </div>
  </template>
  
  <style scoped>
  .sidebar {
    background: #7068C0;
    width: 200px;
    height: 96.1vh;
    padding: 1rem;
    color: white;
  }
  .menu-item {
    margin: 20px 0;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .menu-item .icon {
    margin-right: 10px;
  }
  </style>
  
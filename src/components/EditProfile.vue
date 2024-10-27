<template>
    <div>
      <h2>Editar Perfil</h2>
      <label>Nombre Completo:</label>
      <input v-model="userData.name" />
      <label>Mascotas:</label>
      <input v-model="userData.pets" type="number" />
      <label>Correo Electrónico:</label>
      <input v-model="userData.email" type="email" />
      <label>DNI:</label>
      <input v-model="userData.dni" />
      <label>Celular:</label>
      <input v-model="userData.cell" />
      <button @click="saveData">Guardar</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userData: this.$route.params.userData || {}
      };
    },
    methods: {
      saveData() {
        // Guardar los datos o enviar a un backend
        this.$router.push({ name: 'ProfileView' });
      }
    }
  };
  </script>
  
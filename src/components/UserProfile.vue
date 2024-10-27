<template>
    <div class="user-profile">
      <h1>{{ $t("personal_data") }}</h1>
      <div>
        <label>{{ $t("full_name") }}</label>
        <p>{{ userData.name }}</p>
      </div>
      <div>
        <label>{{ $t("num_pets") }}</label>
        <p>{{ userData.pets }}</p>
      </div>
      <div>
        <label>{{ $t("email") }}</label>
        <p>{{ userData.email }}</p>
      </div>
      <div>
        <label>{{ $t("dni") }}</label>
        <p>{{ userData.dni }}</p>
      </div>
      <div>
        <label>{{ $t("cell") }}</label>
        <p>{{ userData.cell }}</p>
      </div>
      <button @click="editData">{{ $t("edit") }}</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userData: {
          name: 'Seba Escobar Palomino',
          pets: 2,
          email: 'dseba23@gmail.com',
          dni: '12695662',
          cell: '963221583'
        }
      };
    },
    methods: {
      editData() {
        this.$router.push({ name: 'EditProfile' });
      }
    }
  };
  </script>
  
<!-- src/App.vue -->
<template>
  <div class="app">
    <Sidebar />
    <div class="main-content">
      <UserProfile />
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue';
import UserProfile from './components/UserProfile.vue';
</script>

<style>
.app {
  display: flex;
}
.main-content {
  flex-grow: 1;
  padding: 1rem;
}
</style>

<!-- src/components/UserProfile.vue -->
<template>
    <div class="profile-container">
      <h2>{{ $t("personalInfo.title") }}</h2>
      <button class="edit-btn">{{ $t("personalInfo.editButton") }}</button>
  
      <div class="info-grid">
        <div>
          <strong>{{ $t("personalInfo.fullName") }}</strong>
          <p>Diego Daniel Bastidas</p>
        </div>
        <div>
          <strong>{{ $t("personalInfo.specialty") }}</strong>
          <p>{{ $t("specialty.surgeon") }}</p>
        </div>
        <div>
          <strong>DNI</strong>
          <p>74658432</p>
        </div>
        <div>
          <strong>{{ $t("personalInfo.phone") }}</strong>
          <p>980441940</p>
        </div>
        <div>
          <strong>{{ $t("personalInfo.email") }}</strong>
          <p>diego123@gmail.com</p>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .profile-container {
    padding: 2rem;
    background: #f0f5f7;
  }
  .edit-btn {
    float: right;
    cursor: pointer;
  }
  .info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  </style>
  
<script setup lang = 'ts'>
import { CButton } from '@coreui/vue';
</script>
<template>
  <div class="login-page">
    <h1 class="page-title">Campus Response Team</h1>
    <p class="page-description">Sign in to access your account.</p>
    <CButton @click="redirectToLogin" color="primary" class="sign-in-button">Sign In</CButton>
  </div>
</template>

<script lang="ts">

export default {
  methods: {
    redirectToLogin() {
      
      const loginUrl = `${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/oauth2/login`;
      window.location.href = loginUrl;
    }
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #343a40;
}

.page-description {
  font-size: 1rem;
  margin-bottom: 30px;
  color: #6c757d;
}


</style>
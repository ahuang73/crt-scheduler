<template>
  <div>
    <h1>Redirecting to UWaterloo ADFS</h1>
    <p>Please wait while we redirect you to the login page...</p>
  </div>
</template>

<script lang="ts">

export default {
  mounted() {
    // Send login request to the backend
    this.redirectToLogin();
  },
  methods: {
    redirectToLogin() {
      const loginUrl = `${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/oauth2/login`;
      window.location.href = loginUrl;
    }
  }
}
</script>

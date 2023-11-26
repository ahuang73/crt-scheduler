<template>
  <div>
    <h1>Redirecting to UWaterloo ADFS</h1>
    <p>Please wait while we redirect you to the login page...</p>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
export default {
  mounted() {
    // Send login request to the backend
    this.login();
  },
  methods: {
    login() {
      axios.get('http://localhost:3000/oauth2/login')
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        });
    }
  }
}
</script>

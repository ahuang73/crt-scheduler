<template>
  <div>
    <h1>Redirecting to UWaterloo ADFS</h1>
    <p>Please wait while we redirect you to the login page...</p>
  </div>
</template>

<script lang="ts">
export default {

  data() {
    return {
      user: {},
    };
  },
  mounted() {
    // Send login request to the backend
    if(this.user == null){
      this.redirectToLogin();
    }

  },
  methods: {
    redirectToLogin() {
      const loginUrl = `${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/oauth2/login`;
      window.location.href = loginUrl;
    }
  },
  created() {
    // Check for the authentication token in the cookie
    const userDataString = JSON.stringify(this.$cookies.get('userData'));
    if(userDataString){
      this.user = JSON.parse(userDataString);
    }
    else{
      console.log("No user data found");
    }
  }
}
</script>

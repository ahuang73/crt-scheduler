<template>
    <div>
        <h1>Logging out...</h1>
        <p>Please wait while we log you out...</p>
    </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
    mounted() {
        this.$cookies.remove('userData');
        this.redirectToLogout();
    },
    methods: {

        async redirectToLogout() {
            
            const logoutUrl = `${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/oauth/logout`;
            try {
                await axios.get(logoutUrl);
            } catch (error) {
                console.error('Error logging out:', error);
            }
            window.location.href = '/';
        }
    }
}
</script>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import navbar from './components/Navbar.vue'
</script>

<template>

  <header>
    <navbar></navbar>
  </header>
  <RouterView />
</template>

<style scoped>



</style>

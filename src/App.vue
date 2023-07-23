<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import navbar from './components/Navbar.vue'
</script>

<template>
    <div class="wrapper">
      
<!--       
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/shifts">Shifts</RouterLink>
        <RouterLink to="/">Profile</RouterLink>
      </nav> -->

    </div>
  <header>
    <navbar></navbar>
  </header>
  <RouterView />
</template>

<style scoped>



</style>

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

/* header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
} */

/* nav {
  position:fixed;
  right:0;
  left:0;
  z-index: 1000000;
  width: 100%;
  font-size: 16px;
  background-color: black;
  

}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
 
}

nav a:first-of-type {
  border: 0;
} */

</style>

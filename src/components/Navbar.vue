<script setup lang="ts">
import  {CNavbar, CContainer, CNavbarBrand, CNavbarToggler, CCollapse,CNavbarNav,CNavItem,CNavLink,CDropdown,CDropdownToggle,CDropdownMenu,CDropdownItem,CDropdownDivider,CForm,CFormInput,CButton, CNav} from '@coreui/vue';
import { ref, onMounted } from 'vue';
import router from '@/router';
const scheduler = ref(false); // Default value
const isLoggedin = ref(false);
onMounted(() => {
  // Get user data from cookies
  const userDataString = document.cookie.replace(/(?:(?:^|.*;\s*)userData\s*=\s*([^;]*).*$)|^.*$/, '$1');
  if (userDataString) {
    if (userDataString != "undefined") {
      isLoggedin.value = true;
    }
    else {
        router.push('/login')

    }
    const userData = JSON.parse(decodeURIComponent(userDataString));
    scheduler.value = userData.isAdmin || false;
  }
  else {
    router.push('/login')

  }
});
</script>
<template>
  <CNavbar expand="sm" color-scheme="dark" class="bg-dark" placement="fixed-top">
  <CContainer fluid>
    <CNavbarBrand href="/">Campus Response Team</CNavbarBrand>
    
    <CNavbarToggler @click="
    //@ts-ignore
    visible = !visible"/>
    <CCollapse class="navbar-collapse" :visible="
    //@ts-ignore
    visible
    ">
      <CNavbarNav>

        <CNavItem>
          <CNavLink href="/shifts">Shifts</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="/profile">Profile</CNavLink>
        </CNavItem>
        <CNavItem v-if="scheduler">
          <CNavLink href="/shift_types">Shift Types</CNavLink>
        </CNavItem>
        <CNavItem v-if="scheduler">
          <CNavLink href="/responders">Responders</CNavLink>
        </CNavItem>
        <CNavItem v-if="scheduler">
          <CNavLink href="/eot">EoT</CNavLink>
        </CNavItem>        
      </CNavbarNav>
      <CNavbarNav class="ms-auto">
        <CNavItem v-if="!isLoggedin">
          <CNavLink href="/login">Login</CNavLink>
        </CNavItem>
        <CNavItem v-if="isLoggedin">
          <CNavLink href="/logout">Logout</CNavLink>
        </CNavItem>
      </CNavbarNav>
     
    </CCollapse>
  </CContainer>
</CNavbar>
</template>


<script lang="ts">

</script>
<style scoped>
    
</style>
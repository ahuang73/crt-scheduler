<script setup lang="ts">
import  {CNavbar, CContainer, CNavbarBrand, CNavbarToggler, CCollapse,CNavbarNav,CNavItem,CNavLink,CDropdown,CDropdownToggle,CDropdownMenu,CDropdownItem,CDropdownDivider,CForm,CFormInput,CButton} from '@coreui/vue';

</script>
<template>
  <CNavbar expand="sm" color-scheme="dark" class="bg-dark" placement="fixed-top">
  <CContainer fluid>
    <CNavbarBrand href="/">Campus Response Team</CNavbarBrand>
    <CNavbarToggler @click="visible = !visible"/>
    <CCollapse class="navbar-collapse" :visible="visible">
      <CNavbarNav>
        <CNavItem>
          <CNavLink href="/" active>
            Home
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="/shifts">Shifts</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="/profile">Profile</CNavLink>
        </CNavItem>
        
      </CNavbarNav>
     
    </CCollapse>
  </CContainer>
</CNavbar>
</template>

<style scoped>
    
</style>
<template>
  <MDBNavbar expand="lg" light bg="white" container>
    <MDBNavbarToggler
      target="navbarExample01"
      @click="collapse1 = !collapse1"
    />
    <MDBCollapse id="navbarExample01" v-model="collapse1">
      <MDBNavbarNav>
        <MDBNavbarItem to="/rooms" :class="{ active: isActive('/rooms') }">Home</MDBNavbarItem>
        <MDBNavbarItem to="/profile" :class="{ active: isActive('/profile') }">Profile</MDBNavbarItem>
        <MDBNavbarItem tag="a" href="#" @click.prevent="logout">Logout</MDBNavbarItem>
        <MDBNavbarItem to="/contact" :class="{ active: isActive('/contact') }">Contact</MDBNavbarItem>
        <MDBNavbarItem to="/about" :class="{ active: isActive('/about') }">About</MDBNavbarItem>
      </MDBNavbarNav>
    </MDBCollapse>
  </MDBNavbar>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
import {
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBCollapse,
} from 'mdb-vue-ui-kit';

const collapse1 = ref(false);
const router = useRouter();
const route = useRoute(); // ⬅️ get current route

const logout = async () => {
  localStorage.removeItem('token');
  toast.success('Logout successful!');
  await new Promise(resolve => setTimeout(resolve, 1500));
  router.push('/login');
};

// Function to check if a path is active
const isActive = (path: string) => {
  return route.path === path;
};

</script>
<style scoped>
.active {
  font-weight: bold;
  color: #2c3e50 !important;
}
</style>
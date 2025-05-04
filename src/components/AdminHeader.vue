<template>
  <MDBNavbar expand="lg" light bg="white" container>
    <MDBNavbarToggler target="navbarExample01" @click="collapse1 = !collapse1" />
    <MDBCollapse id="navbarExample01" v-model="collapse1">
      <MDBNavbarNav>
        <MDBNavbarItem :class="{ active: route.path === '/admin-dashboard' }" to="/admin-dashboard">DASHBOARD</MDBNavbarItem>
        <MDBNavbarItem :class="{ active: route.path === '/BookedRooms' }" to="/BookedRooms">BOOKEDROOM</MDBNavbarItem>
        <MDBNavbarItem :class="{ active: route.path === '/add-room' }" to="/add-room">ADDROOM</MDBNavbarItem>
        <MDBNavbarItem :class="{ active: route.path === '/admin-profile' }" to="/admin-profile">PPROFILE</MDBNavbarItem>
        <MDBNavbarItem tag="a" href="#" @click.prevent="logout">LOG-OUT</MDBNavbarItem>
      </MDBNavbarNav>
    </MDBCollapse>
  </MDBNavbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
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
const route = useRoute();

const logout = async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  toast.success('Logout successful!');
  await new Promise(resolve => setTimeout(resolve, 1500));
  router.push('/login');
};
</script>

<style scoped>
.active {
  font-weight: bold;
  color: #3A7D44 !important;
}

</style>
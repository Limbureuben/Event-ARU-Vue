<template>
    <MDBNavbar expand="lg" light bg="white" container>
      <MDBNavbarToggler
        target="navbarExample01"
        @click="collapse1 = !collapse1"
      />
      <MDBCollapse id="navbarExample01" v-model="collapse1">
        <MDBNavbarNav>
          <MDBNavbarItem to="/BookedRooms" active>Home</MDBNavbarItem>
          <MDBNavbarItem to="/add-room">AddRoom</MDBNavbarItem>
          <MDBNavbarItem to="/admin-profile">Profile</MDBNavbarItem>
          <MDBNavbarItem tag="a" href="#" @click.prevent="logout">Logout</MDBNavbarItem>
          <MDBNavbarItem to="#">Contact</MDBNavbarItem>
          <MDBNavbarItem to="#">About</MDBNavbarItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
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
  
  const logout = async () => {
    localStorage.removeItem('token');
    toast.success('Logout successful!');
    await new Promise(resolve => setTimeout(resolve, 1500)); // match toast duration
    router.push('/login');
  };
  </script>
  
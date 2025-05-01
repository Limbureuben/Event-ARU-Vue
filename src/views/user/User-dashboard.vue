<template>
    <header>
      <!-- Fixed and responsive navbar -->
      <MDBNavbar expand="lg" light bg="white" container fixed="top">
        <MDBNavbarToggler
          target="navbarExample01"
          @click="collapse1 = !collapse1"
        />
        <MDBCollapse id="navbarExample01" v-model="collapse1">
          <MDBNavbarNav class="mb-2 mb-lg-0">
            <MDBNavbarItem to="#" active> Home </MDBNavbarItem>
            <MDBNavbarItem to="#"> Features </MDBNavbarItem>
            <MDBNavbarItem to="#"> Pricing </MDBNavbarItem>
            <MDBNavbarItem to="#"> About </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
  
      <!-- Jumbotron -->
      <div class="p-5 text-center bg-light mt-5">
        <h1 class="mb-3">Heading</h1>
        <h4 class="mb-3">Subheading</h4>
        <a class="btn btn-primary" href="#" role="button">Call to action</a>
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
  import {
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBCollapse
  } from 'mdb-vue-ui-kit';
  import { ref } from 'vue';
  
  const collapse1 = ref(false);
  </script>
  
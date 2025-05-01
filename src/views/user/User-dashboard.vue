<template>
    <header>
      <!-- Navbar -->
      <MDBNavbar expand="lg" light bg="white" container>
        <MDBNavbarToggler
        target="#navbarExample02"
        @click="collapse2 = !collapse2"
        ></MDBNavbarToggler>
        <MDBCollapse id="navbarExample02" v-model="collapse2">
          <MDBNavbarNav class="mb-2 mb-lg-0">
            <MDBNavbarItem to="#" active>
              Home
            </MDBNavbarItem>
            <MDBNavbarItem to="#">
              Features
            </MDBNavbarItem>
            <MDBNavbarItem to="#">
              Pricing
            </MDBNavbarItem>
            <MDBNavbarItem to="#">
              About
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
      <!-- Navbar -->
      <!-- Background image -->
      <div
        class="p-5 text-center bg-image"
        style="
          background-image: url('https://mdbootstrap.com/img/new/slides/041.webp');
          height: 400px;
        "
      >
        <div class="mask" style="background-color: rgba(0, 0, 0, 0.6);">
          <div class="d-flex justify-content-center align-items-center h-100">
            <div class="text-white">
              <h1 class="mb-3">Heading</h1>
              <h4 class="mb-3">Subheading</h4>
              <MDBBtn tag="a" lg outline="light"
                href="#!"
                role="button"
                >Call to action
              </MDBBtn>
            </div>
          </div>
        </div>
      </div>
      <!-- Background image -->
    </header>
  </template>
  <script setup lang="ts">
  import {
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBBtn,
    MDBCollapse,
  } from 'mdb-vue-ui-kit';
  import { ref } from 'vue';

  const collapse2 = ref(false);
</script>
<template>
  <MDBNavbar container expand="lg" bg="light" class="d-flex justify-content-between">
    <MDBNavbarBrand>
      <MDBIcon icon="gem" iconStyle="fas" size="2x" />
    </MDBNavbarBrand>

    <MDBNavbarToggler target="#navbarColor01" @click="collapse7 = !collapse7" />

    <MDBCollapse id="navbarColor01" v-model="collapse7">
      <MDBNavbarNav class="mb-2 mb-lg-0">
        <MDBNavbarItem href="#" linkClass="link-secondary">Dashboard</MDBNavbarItem>
        <MDBNavbarItem href="#" linkClass="link-secondary">Team</MDBNavbarItem>
        <MDBNavbarItem href="#" linkClass="link-secondary">Projects</MDBNavbarItem>
      </MDBNavbarNav>
    </MDBCollapse>

    <MDBNavbarNav class="mb-2 mb-lg-0 d-flex flex-row align-items-center">
      <MDBNavbarItem to="#" class="me-3 me-lg-0" linkClass="link-secondary">
        <MDBIcon icon="shopping-cart" />
      </MDBNavbarItem>

      <MDBNavbarItem to="#" class="me-3 me-lg-0" linkClass="link-secondary">
        <MDBIcon icon="bell" />
        <MDBBadge notification color="danger" pill>1</MDBBadge>
      </MDBNavbarItem>

      <MDBDropdown>
        <MDBDropdownToggle tag="a" class="nav-link" role="button">
          <img
            src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg"
            class="rounded-circle"
            height="32"
            alt="Profile"
            loading="lazy"
          />
        </MDBDropdownToggle>
        <MDBDropdownMenu>
          <MDBDropdownItem>Profile</MDBDropdownItem>
          <MDBDropdownItem>Settings</MDBDropdownItem>
          <MDBDropdownItem>Logout</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
    </MDBNavbarNav>
  </MDBNavbar>
</template>

<script setup lang="ts">
  import { MDBNavbar, MDBNavbarItem,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBBadge,
  MDBIcon,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from 'mdb-vue-ui-kit';
  import { ref } from "vue";

  const collapse7 = ref(false);
</script>
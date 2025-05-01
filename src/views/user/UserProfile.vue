<template>
  <UserHeaderComponent />
  <section class="container py-5" v-if="user">
    <MDBCard>
      <MDBCardBody class="text-center">
        <img
          :src="user.avatar || 'https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg'"
          alt="avatar"
          class="rounded-circle img-fluid"
          style="width: 150px"
        />
        <h5 class="my-3">{{ user.username }}</h5>
        <p class="text-muted mb-1">{{ user.email }}</p>
        <p class="text-muted mb-4">{{ user.location || 'No location provided' }}</p>
        <div class="d-flex justify-content-center mb-2">
          <MDBBtn color="primary" class="me-2">Edit Profile</MDBBtn>
        </div>
      </MDBCardBody>
    </MDBCard>
  </section>
  <div v-else class="text-center mt-5">
    <MDBSpinner />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UserHeaderComponent from '@/components/UserHeader.vue'
import { MDBCard, MDBCardBody, MDBBtn, MDBSpinner } from 'mdb-vue-ui-kit'

const user = ref<any>(null)

onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found. Please log in.');

    const response = await fetch('http://localhost:8000/api/profile/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // Add JWT token
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.status}`);
    }

    const data = await response.json();
    user.value = data;
  } catch (error) {
    console.error('Error loading profile:', error);
  }
});
</script>

<style scoped>
section {
  max-width: 500px;
  margin: auto;
}
</style>

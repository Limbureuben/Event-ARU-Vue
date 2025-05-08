<template>
  <AdminHeaderComponent />
  <BackgroundLayout>
  <section class="container py-5" v-if="user">
    <transition name="fade-slide">
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
    </transition>
  </section>
  <div v-else class="text-center mt-5">
    <MDBSpinner />
  </div>
</BackgroundLayout>
</template>

  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import AdminHeaderComponent from '@/components/AdminHeader.vue'
  import BackgroundLayout from '@/components/BackgroundLayout.vue'
  import { MDBCard, MDBCardBody, MDBBtn, MDBSpinner } from 'mdb-vue-ui-kit'
  
  const user = ref<any>(null)
  
  onMounted(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found. Please log in.');
  
      const response = await fetch('https://house-backend-3.onrender.com/api/profile/', {
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

.fade-slide-enter-active {
  animation: fadeSlideIn 0.6s ease-out;
}

.fade-slide-leave-active {
  animation: fadeSlideOut 0.6s ease-in;
}

@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeSlideOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(30px);
  }
}

  </style>
  
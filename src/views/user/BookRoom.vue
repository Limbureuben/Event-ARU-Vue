<template>
  <UserHeaderComponent />
  <BackgroundLayout>
  <div class="add-room-page">
    <transition name="fade-slide">
      <form
        v-if="showForm"
        @submit.prevent="onSubmit"
        class="form-container"
        autocomplete="off"
      >
        <h2 class="form-title">Book Event</h2>

        <v-text-field
          label="Username"
          v-model="form.username"
          variant="outlined"
          density="comfortable"
          class="form-field"
          required
        />

        <div class="form-row">
          <v-text-field
            label="Email"
            type="email"
            v-model="form.email"
            variant="outlined"
            density="comfortable"
            class="form-field half"
            required
          />
          <v-text-field
            label="Phone number"
            type="tel"
            v-model="form.phone"
            variant="outlined"
            density="comfortable"
            class="form-field half"
            required
          />
        </div>

        <div class="form-row">
          <v-text-field
            label="Event Date"
            type="date"
            v-model="form.event_date"
            variant="outlined"
            density="comfortable"
            class="form-field half"
            required
          />
        </div>

        <v-btn
          style="background-color: rgb(100, 100, 177); color: white"
          variant="flat"
          class="submit-btn"
          type="submit"
          block
        >
          Book Room
        </v-btn>
      </form>
    </transition>
  </div>
</BackgroundLayout>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import UserHeaderComponent from '@/components/UserHeader.vue'
import Swal from 'sweetalert2'
import BackgroundLayout from '@/components/BackgroundLayout.vue'

const router = useRouter()
const roomId = router.currentRoute.value.params.id

// Define the form object as a ref
const form = ref({
username: '',
email: '',
phone: '',
event_date: '',
})

const showForm = ref(false)

// Function to handle form submission
const onSubmit = async () => {
// Log the payload to check what is being sent
console.log('Booking payload:', {
  user_details: {
    username: form.value.username,
    email: form.value.email,
    phone: form.value.phone,
  },
  room: roomId,
  event_date: form.value.event_date,
})

try {
  const response = await fetch('http://localhost:8000/api/booking-events/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      user_details: {
        username: form.value.username,
        email: form.value.email,
        phone: form.value.phone,
      },
      room: roomId,
      event_date: form.value.event_date,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Server error')
  }

  // Success message
  await Swal.fire({
    title: 'Booking Confirmed!',
    text: 'Your booking has been confirmed. A payment PDF has been sent to your email.',
    icon: 'success',
    confirmButtonColor: '#3085d6',
  })

  // Reset the form
  form.value = {
    username: '',
    email: '',
    phone: '',
    event_date: '',
  }

  // Navigate to the rooms page
  router.push('/rooms')
} catch (error) {
  console.error('Error submitting booking:', error)

  // Show error message if something goes wrong
  Swal.fire({
    title: 'Booking Error',
    text: 'An error occurred while processing your booking.',
    icon: 'error',
    confirmButtonColor: '#d33',
  })
}
}

// Set the form visibility after the component is mounted
onMounted(() => {
setTimeout(() => {
  showForm.value = true
}, 50)
})
</script>


<style scoped>

.add-room-page {
display: flex;
justify-content: center;
align-items: center;
height: 90vh;
padding-left: 400px;
width: 140vh;
}

.form-container {
display: flex;
flex-direction: column;
width: 100%;
background: #fff;
padding: 20px;
border-radius: 8px;
box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

.form-title {
font-size: 24px;
font-weight: bold;
color: rgb(100, 100, 177);
margin-bottom: 30px;
text-align: center;
}

.form-row {
display: flex;
gap: 10px;
margin-bottom: 10px;
}

.form-field {
width: 100%;
margin-bottom: 10px;
}

.submit-btn {
margin-top: 5px;
font-weight: bold;
}

.image-wrapper {
margin-bottom: 20px;
}

.image-label {
display: block;
font-size: 14px;
font-weight: 600;
margin-bottom: 5px;
color: rgb(100, 100, 177);
}

/* Animation for fade-slide */
.fade-slide-enter-active {
animation: fadeSlideIn 0.6s ease-out;
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


</style>
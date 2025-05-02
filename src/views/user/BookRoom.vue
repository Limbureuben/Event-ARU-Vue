<template>
    <UserHeaderComponent />
    <div class="booking-form-container">
      <h2>Complete Your Booking</h2>
      <form @submit.prevent="submitBooking">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" required />
        </div>
  
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>
  
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input type="tel" id="phone" v-model="phone" required />
        </div>
  
        <div class="form-group">
          <label for="event_date">Event Date</label>
          <input type="date" id="event_date" v-model="eventDate" required />
        </div>
  
        <div class="form-group">
          <button type="submit" class="submit-btn">Confirm Booking</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import Swal from 'sweetalert2'
  import UserHeaderComponent from '@/components/UserHeader.vue'
  
  // Get the room ID from the route params
  const router = useRouter()
  const roomId = router.currentRoute.value.params.id
  
  const username = ref('')
  const email = ref('')
  const phone = ref('')
  const eventDate = ref('')
  
  // Submit booking details
  const submitBooking = async () => {
    try {
        const response = await fetch(`http://localhost:8000/api/booking-events/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_details: {
            username: username.value,
            email: email.value,
            phone: phone.value,
            },
            room: roomId,
            event_date: eventDate.value,
        }),
        })

  
      if (!response.ok) {
        throw new Error('Booking failed')
      }
  
      const data = await response.json()
  
      // Show success message
      Swal.fire({
        title: 'Booking Confirmed!',
        text: `Your booking has been confirmed. A payment PDF has been sent to your email.`,
        icon: 'success',
        confirmButtonColor: '#3085d6',
      })
  
      // Optionally, navigate to a confirmation page or reset the form
      router.push({ name: 'BookingConfirmation' })
    } catch (error) {
      console.error('Error submitting booking:', error)
      Swal.fire({
        title: 'Booking Error',
        text: 'An error occurred while processing your booking.',
        icon: 'error',
        confirmButtonColor: '#d33',
      })
    }
  }
  </script>
  
  <style scoped>
  .booking-form-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-size: 1.1rem;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  
  .submit-btn {
    width: 100%;
    padding: 10px;
    background-color: #3A7D44;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .submit-btn:hover {
    background-color: #2a5b30;
  }
  </style>
  
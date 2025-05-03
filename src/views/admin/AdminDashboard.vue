

<template>
  <div class="rooms-container">
    <div class="room-cards">
      <div v-for="booking in bookings" :key="booking.id" class="room-card">
        <h3>{{ booking.room.name }}</h3>
        <p><strong>Booking Date:</strong> {{ booking.booking_date }}</p>
        <p><strong>Reference No:</strong> {{ booking.reference_number }}</p>
        <p><strong>Status:</strong> {{ booking.payment_status }}</p>
        <p><strong>Active:</strong> {{ booking.room.is_active ? 'Yes' : 'No' }}</p>

        <button
          class="book-btn"
          @click="toggleRoomStatus(booking.room.id, booking.room.is_active)"
        >
          {{ booking.room.is_active ? 'Deactivate' : 'Activate' }}
        </button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'

const bookings = ref([])

onMounted(() => {
    fetchAvailableRooms()
  })

const token = localStorage.getItem('token');

const fetchAvailableRooms = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/booked-event-rooms/', {
      headers: {
        'Authorization': `Token ${token}`  // or 'Bearer' if JWT
      }
    })
    if (!response.ok) throw new Error('Failed to fetch rooms')
    const data = await response.json()
    bookings.value = data
  } catch (error) {
    console.error('Error fetching rooms:', error)
  }
}

const toggleRoomStatus = async (roomId, currentStatus) => {
  try {
    const response = await fetch(`http://localhost:8000/api/rooms/${roomId}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify({ is_active: !currentStatus })
    })
    if (!response.ok) throw new Error('Failed to update room status')

    // Refresh the bookings list after update
    fetchAvailableRooms()
  } catch (error) {
    console.error('Error toggling room status:', error)
  }
}

</script>

<style scoped>
  .rooms-container {
    padding: 20px;
    max-width: 1200px;
    margin: auto;
  }
  
  .room-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }
  
  .room-card {
    background: #fff;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
  }
  
  .room-card:hover {
    transform: translateY(-5px);
  }
  
  .book-btn {
    margin-top: 10px;
    padding: 7px 16px;
    background-color: #3A7D44;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .book-btn:hover {
    background-color: #2a5b30;
  }
  
  .book-btn.unavailable {
    background-color: #d33;
    cursor: not-allowed;
  }
  
  .view-btn {
    color: red;
  }
  
  .button-group {
    display: flex;
    gap: 140px;
    margin-top: 0px;
  }
  </style>
<template>
  <AdminHeaderComponent />
  <BackgroundLayout>
  <div class="rooms-container">
    <transition-group name="fade-slide" tag="div" class="room-cards">
      <div
        v-for="room in rooms"
        :key="room.id"
        class="room-card"
      >
        <h3>{{ room.name }}</h3>
        <p><strong>Location:</strong> {{ room.location }}</p>
        <p><strong>Booked Date:</strong> {{ formatDate(room.available_date) }}</p>
        <div class="button-group">
          <button class="book-btn" @click="activateRoom(room.id)">Activate Room</button>
        </div>
      </div>
    </transition-group>
  </div>
</BackgroundLayout>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import AdminHeaderComponent from '@/components/AdminHeader.vue'
import BackgroundLayout from '@/components/BackgroundLayout.vue'

const router = useRouter()
const rooms = ref([])

const BASE_URL = 'https://house-backend-3.onrender.com'

// Fetch rooms from the backend
const fetchAvailableRooms = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/inactive-rooms/`)
    if (!response.ok) throw new Error('Failed to fetch rooms')
    const data = await response.json()
    rooms.value = data
  } catch (error) {
    console.error('Error fetching rooms:', error)
  }
}

// Format the available date of the room
const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

// Confirm before activating a room
const activateRoom = async (roomId) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This will activate the room and make it available for booking.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3A7D44",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, activate it!"
  })

  if (!result.isConfirmed) return

  try {
    const response = await fetch(`${BASE_URL}/api/activate-room/${roomId}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ is_available: true })
    })

    if (!response.ok) throw new Error('Failed to activate room')

    Swal.fire({
      icon: 'success',
      title: 'Room activated successfully'
    })

    fetchAvailableRooms()
  } catch (error) {
    console.error('Error activating room:', error)
    Swal.fire({
      icon: 'error',
      title: 'Activation failed',
      text: error.message
    })
  }
}

onMounted(() => {
  fetchAvailableRooms()
})
</script>

<style scoped>
.rooms-container {
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  min-height: 90vh; 
}

.room-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.room-card {
  background: #fff;
  padding: 16px;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  transition: transform 0.2s ease;
}

.room-card:hover {
  transform: translateY(-5px);
}

.book-btn {
  margin-top: 10px;
  padding: 7px 16px;
  background-color: rgb(100, 100, 177);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.book-btn:hover {
  background-color: rgb(100, 100, 177);
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

/* Existing styles... */

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.6s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

</style>

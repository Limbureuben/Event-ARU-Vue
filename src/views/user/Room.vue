<template>
    <div class="rooms-container">
  
      <div class="room-cards">
        <div v-for="room in rooms" :key="room.id" class="room-card">
          <h3>{{ room.name }}</h3>
          <p><strong>Location:</strong> {{ room.location }}</p>
          <p><strong>Price:</strong> Tsh {{ room.price }}</p>
          <p><strong>Available Date:</strong> {{ formatDate(room.available_date) }}</p>
          <div class="button-group">
            <button class="view-btn" @click="viewImage(room.image)">View Image</button>
            <button class="book-btn" @click="bookRoom(room.id)">Book</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()
const rooms = ref([])

const fetchAvailableRooms = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/available-rooms/')
    if (!response.ok) throw new Error('Failed to fetch rooms')
    const data = await response.json()
    rooms.value = data
  } catch (error) {
    console.error('Error fetching rooms:', error)
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const bookRoom = (roomId) => {
  router.push({ name: 'BookRoom', params: { id: roomId } })
}

onMounted(() => {
  fetchAvailableRooms()
})

const BASE_URL = 'http://localhost:8000'

const viewImage = (imagePath) => {
  Swal.fire({
    title: 'Room Image',
    imageUrl: `${BASE_URL}${imagePath}`,
    imageWidth: 400,
    imageHeight: 250,
    imageAlt: 'Room image'
  })
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
    padding: 10px 16px;
    background-color: #3A7D44;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .book-btn:hover {
    background-color: #2a5b30;
  }

  .view-btn {
  margin-right: 10px;
  padding: 10px 16px;
  background-color: #1976D2;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.view-btn:hover {
  background-color: #155a9a;
}

  </style>
  
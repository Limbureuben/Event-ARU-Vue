<template>
    <UserHeaderComponent />
    <BackgroundLayout>
    <div class="rooms-container">
      <TransitionGroup name="fade-slide" tag="div" class="room-cards">
        <div v-for="room in rooms" :key="room.id" class="room-card">
          <h3>{{ room.name }}</h3>
          <p><strong>Location:</strong> {{ room.location }}</p>
          <p><strong>Price:</strong> Tsh {{ room.price }}</p>
          <p><strong>Available Date:</strong> {{ formatDate(room.available_date) }}</p>
          <div class="button-group">
            <button class="view-btn" @click="viewImage(room.image)">View Image</button>
            <button 
              class="book-btn" 
              :disabled="!room.is_available"
              @click="bookRoom(room.id)"
              :class="{ 'unavailable': !room.is_available }">
              {{ room.is_available ? 'Book' : 'Unavailable' }}
            </button>
          </div>
        </div>
      </TransitionGroup>
    </div>
    <AppPagination
      v-model="currentPage"
      :total-pages="pageCount"
    />
  </BackgroundLayout>
  </template>
  
    
    <script setup>
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import Swal from 'sweetalert2'
    import UserHeaderComponent from '@/components/UserHeader.vue'
    import BackgroundLayout from '@/components/BackgroundLayout.vue'
    import AppPagination from '@/components/Pagination.vue'
    
    const router = useRouter()
    const rooms = ref([])
    
    // Fetch rooms from the backend
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
    
    // Format the available date of the room
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString()
    }
    
    // Booking logic
    const bookRoom = (roomId) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You are about to start the booking process.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, proceed!"
      }).then((result) => {
        if (result.isConfirmed) {
          // Navigate to the booking page
          router.push({ name: 'BookRoom', params: { id: roomId } })
        }
      })
    }
    
    // Fetch available rooms on component mount
    onMounted(() => {
      fetchAvailableRooms()
    })
    
    const BASE_URL = 'http://localhost:8000'
    
    // Display room image in a SweetAlert modal
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
      border-radius: 4px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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
  
    .fade-slide-enter-from {
    opacity: 0;
    transform: translateY(20px);
  }
  .fade-slide-enter-active {
    transition: all 0.5s ease;
  }
  .fade-slide-enter-to {
    opacity: 1;
    transform: translateY(0);
  }
  
    </style>
    
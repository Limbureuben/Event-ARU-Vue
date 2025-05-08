<template>
  <div class="dashboard-background">
    <div class="overlay"></div>
    <AdminHeaderComponent class="admin-header"/>
    <BackgroundLayout>
    <div class="rooms-container">
      <div class="room-cards">
        <div class="room-card">
          <div class="icon-container">
            <i class="fas fa-building"></i>
          </div>
          <h3>ROOMS</h3>
          <p><strong>Location:</strong> ARDHI UNIVERSITY</p>
          <p><strong>Total Rooms: </strong>{{ stats.total_rooms }}</p>
        </div>
        <div class="room-card">
          <div class="icon-container">
            <i class="fas fa-users"></i>
          </div>
          <h3>USERS</h3>
          <p><strong>Location:</strong> Room</p>
          <p><strong>Registred Users: </strong>{{ stats.total_users }}</p>
        </div>
        <div class="room-card">
          <div class="icon-container">
            <i class="fas fa-calendar-check"></i>
          </div>
          <h3>BOOKED ROOM</h3>
          <p><strong>Location:</strong> Room</p>
          <p><strong>Total Booked Rooms: </strong>{{ stats.total_bookings }}</p>
        </div>

      </div>
    </div>
  </BackgroundLayout>
  </div>

</template>


<script setup>
import AdminHeaderComponent from '@/components/AdminHeader.vue'
import AdminFooter from '@/components/AdminFooter.vue'
import BackgroundLayout from '@/components/BackgroundLayout.vue'
import { ref, onMounted } from 'vue'

const stats = ref({
  total_rooms: 0,
  total_users: 0,
  total_bookings: 0,
})

const fetchDashboardStats = async () => {
  try {
    const response = await fetch('https://house-backend-3.onrender.com/api/dashboard-stats/')
    if(!response.ok ) throw new Error('Failed to fetch stats')
    const data =  await response.json()
    stats.value = data
  } catch (error) {
    toast.error('Error fetching stats:', error)
  }
}

onMounted(() => {
  fetchDashboardStats()
})

</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.rooms-container {
  padding: 20px;
  max-width: 1200px;
  margin: auto;
}

.icon-container {
  font-size: 40px;
  color: rgb(100, 100, 177);
  margin-bottom: 10px;
  text-align: center;
}

.room-cards {
  display: grid;
  margin-top: 60px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.room-card {
  background: #fff;
  padding: 16px;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0; /* Hidden by default, shown after animation */
}

.room-card:nth-child(1) {
  animation-delay: 0.1s;
}
.room-card:nth-child(2) {
  animation-delay: 0.2s;
}
.room-card:nth-child(3) {
  animation-delay: 0.3s;
}

.room-card:hover {
  transform: translateY(-6px);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 12px;
}

.dashboard-background {
  position: relative;

  overflow: hidden;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.3); /* Dim the background */
  z-index: 1;
}

/* Header fix */
:deep(.admin-header) {
  position: relative;
  z-index: 2;
}

/* Content fix */
.rooms-container {
  position: relative;
  z-index: 2;
}

</style>


<template>
  <AdminHeaderComponent />
  <div class="rooms-container">
    <div class="room-cards">
      <div class="room-card" style="animation-delay: 0.1s">
        <div class="icon-container">
          <i class="fas fa-building"></i>
        </div>
        <h3>ROOMS</h3>
        <p><strong>Location:</strong> ARDHI UNIVERSITY</p>
        <p><strong>Total Rooms: </strong>{{ stats.total_rooms }}</p>
      </div>
      <div class="room-card" style="animation-delay: 0.2s">
        <div class="icon-container">
          <i class="fas fa-users"></i>
        </div>
        <h3>USERS</h3>
        <p><strong>Location:</strong> Room</p>
        <p><strong>Registred Users: </strong>{{ stats.total_users }}</p>
      </div>
      <div class="room-card" style="animation-delay: 0.3s">
        <div class="icon-container">
          <i class="fas fa-calendar-check"></i>
        </div>
        <h3>BOOKED ROOM</h3>
        <p><strong>Location:</strong> Room</p>
        <p><strong>Total Booked Rooms: </strong>{{ stats.total_bookings }}</p>
      </div>
    </div>
  </div>
</template>


<script setup>
import AdminHeaderComponent from '@/components/AdminHeader.vue'
import { ref, onMounted } from 'vue'

const stats = ref({
  total_rooms: 0,
  total_users: 0,
  total_bookings: 0,
})

const fetchDashboardStats = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/dashboard-stats/')
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
  color: #3A7D44;
  margin-bottom: 10px;
  text-align: center;
}

.room-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.room-card {
  background: #fff;
  padding: 16px;
  border-radius: 8px;
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
</style>


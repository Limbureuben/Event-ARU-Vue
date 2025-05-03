<template>
  <AdminHeaderComponent />
  <div class="rooms-container">
    <div class="room-cards">
      <div class="room-card">
        <h3>ROOMS</h3>
        <p><strong>Location:</strong> Room</p>
        <p><strong>Booked Date:</strong> 4546</p>
        <div class="button-group">
        <button class="book-btn">Activate Room</button>
        </div>
      </div>
      <div class="room-card">
        <h3>DHDT</h3>
        <p><strong>Location:</strong> Room</p>
        <p><strong>Booked Date:</strong> 4546</p>
        <div class="button-group">
        <button class="book-btn">Activate Room</button>
        </div>
      </div>
      <div class="room-card">
        <h3>BOOKED ROOM</h3>
        <p><strong>Location:</strong> Room</p>
        <p><strong>Booked Date:</strong> 4546</p>
        <div class="button-group">
        <button class="book-btn">Activate Room</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AdminHeaderComponent from '@/components/AdminHeader.vue'

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
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
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
  border-radius: 4px;
  cursor: pointer;
}

.book-btn:hover {
  background-color: #2a5b30;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>

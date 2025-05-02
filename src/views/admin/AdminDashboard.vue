<template>
  <div class="min-h-screen bg-gray-100 py-10 px-4">
    <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">Booked Rooms</h2>

    <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
      <div
        v-for="booking in bookings"
        :key="booking.id"
        class="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300"
      >
        <h3 class="text-lg font-semibold text-blue-700 mb-1">Room: {{ booking.room.name }}</h3>
        <p class="text-gray-800"><strong>User:</strong> {{ booking.user.username }}</p>
        <p class="text-gray-700"><strong>Start:</strong> {{ booking.start_time }}</p>
        <p class="text-gray-700"><strong>End:</strong> {{ booking.end_time }}</p>
        <p class="text-gray-600 mt-2 text-sm italic">Booked on {{ new Date(booking.created_at).toLocaleDateString() }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const bookings = ref([])

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8000/api/booked-event-rooms/') // Update with your actual API endpoint
    if (!response.ok) throw new Error('Failed to fetch bookings')
    bookings.value = await response.json()
  } catch (error) {
    console.error('Fetch error:', error)
  }
})
</script>

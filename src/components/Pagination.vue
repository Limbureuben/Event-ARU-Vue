<template>
    <fwb-pagination
      v-model="currentPage"
      :layout="'navigation'"
      :total-pages="100"
      show-icons
    />
    <fwb-pagination
      v-model="currentPage"
      :layout="'navigation'"
      :total-pages="100"
      show-icons
      large
    />
  </template>
  
  <script setup>
  import { FwbPagination } from 'flowbite-vue'
  import { ref } from 'vue'
  
  const currentPage = ref(1)
  </script>
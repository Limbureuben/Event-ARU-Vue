<template>
    <div class="background-wrapper">
      <slot></slot>
    </div>
  </template>
  
  <style scoped>
  .background-wrapper {
  background-image: url('/public/images/winners.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  position: relative; /* Needed to contain the overlay
}

  .background-wrapper::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.3); /* White overlay with 70% opacity */
  z-index: 1;
}

.background-wrapper > * {
  position: relative;
  z-index: 2;
}
  </style>
  
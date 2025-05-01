import { Component } from './../../node_modules/@vue/runtime-core/dist/runtime-core.d';
import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/sharing/Login.vue'
import AdminDashboard from '../views/admin/AdminDashboard.vue'
import NotFound from '../views/NotFound.vue'
import Register from '../views/sharing/Register.vue';
import UserDashboard from '@/views/user/User-dashboard.vue';
import AddRoom from '@/views/admin/AddRoom.vue';
import Sidebar from '@/views/admin/Sidebar.vue';
import Room from '@/views/user/Room.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/rooms', component: Room },
  {
    path: '/admin',
    component: Sidebar,
    children: [
      {
        path: 'admin-dashboard',
        component: AdminDashboard,
      },
      {
        path: 'add-room',
        component: AddRoom,
      },
    ],
  },
  { path: '/user-dashboard', component: UserDashboard },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

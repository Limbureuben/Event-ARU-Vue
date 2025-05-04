import { Component } from './../../node_modules/@vue/runtime-core/dist/runtime-core.d';
import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/sharing/Login.vue'
import AdminDashboard from '../views/admin/AdminDashboard.vue'
import NotFound from '../views/NotFound.vue'
import Register from '../views/sharing/Register.vue';
import UserDashboard from '@/views/user/User-dashboard.vue';
import AddRoom from '@/views/admin/AddRoom.vue';
import Room from '@/views/user/Room.vue';
import UserProfile from '@/views/user/UserProfile.vue';
import BookRoom from '@/views/user/BookRoom.vue';
import InactiveRoom from '@/views/admin/InactiveRoom.vue';
import AdminProfile from '@/views/admin/AdminProfile.vue';


const routes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/rooms', component: Room, meta: { requiresAuth: true, role: 'user'} },
  { path: '/bookroom/:id', component: BookRoom, name: 'BookRoom', meta: { requiresAuth: true, role: 'user'} },
  { path: '/profile', component: UserProfile, meta: { requiresAuth: true, role: 'user'} },
  { path: '/admin-profile', component: AdminProfile, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/admin-dashboard', component: AdminDashboard, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/add-room', component: AddRoom, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/BookedRooms', component: InactiveRoom, meta: { requiresAuth: true, role:'admin' } },
  { path: '/user-dashboard', component: UserDashboard, meta: { requiresAuth: true, role: 'user' } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (to.meta.requiresAuth) {
    if (!token) {
      return next('/login');
    }

    if (to.meta.role && to.meta.role !== role) {
      return next('/login');
    }
  }
  
  next();
});

export default router

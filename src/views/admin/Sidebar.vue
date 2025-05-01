<template>
    <div class="dashboard-container">
      <!-- Menu Icon -->
      <div class="menu-icon" @click="toggleSidebar">
        <i class="fa fa-bars"></i>
      </div>
  
      <!-- Sidebar -->
      <div :class="['sidebar', { open: isSidebarOpen }]">
        <!-- Close Icon -->
        <div class="close-icon" @click="toggleSidebar">
          <i class="fa fa-times"></i>
        </div>
  
        <ul>
          <li>
            <router-link to="/admin/admin-dashboard">
              <i class="fa fa-home"></i> Dashboard
            </router-link>
          </li>
          <li>
            <router-link to="/admin/add-room">
              <i class="fa fa-upload"></i> Upload Room
            </router-link>
          </li>
          <li>
            <router-link to="/admin/booked-room">
              <i class="fa fa-calendar-check-o"></i> Booked Room
            </router-link>
          </li>
          <li @click="logout">
            <i class="fa fa-sign-out"></i> Logout
          </li>
        </ul>
      </div>
      <div class="main-content">
      <router-view />
    </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AdminSidebar',
    data() {
      return {
        isSidebarOpen: false,
      };
    },
    methods: {
      toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen;
      },
      logout() {
        // Handle logout logic
        this.$router.push('/login');
      },
    },
  };
  </script>
  
  <style scoped>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css');
  
  .dashboard-container {
    display: flex;
    height: 90vh;
    background-color: #f5f6fa;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .menu-icon {
    position: fixed;
    top: 20px;
    left: 20px;
    font-size: 26px;
    color: #2c3e50;
    cursor: pointer;
    z-index: 1001;
    transition: color 0.3s;
  }
  .menu-icon:hover {
    color: #2980b9;
  }
  
  .sidebar {
    width: 0;
    background: linear-gradient(180deg, #2c3e50, #34495e);
    color: #ecf0f1;
    overflow-x: hidden;
    transition: width 0.3s ease;
    padding-top: 20px;
    position: fixed;
    height: 100%;
    top: 0;
    left: 0;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
  }
  
  .sidebar.open {
    width: 230px;
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
    margin-top: 30px;
  }
  
  .sidebar ul li {
    padding: 15px 25px;
    margin: 8px 10px;
    display: flex;
    align-items: center;
    font-size: 16px;
    border-radius: 8px;
    transition: background 0.3s, transform 0.2s;
  }
  
  .sidebar ul li i {
    margin-right: 12px;
    width: 20px;
    text-align: center;
    font-size: 18px;
  }
  
  .sidebar ul li:hover {
    background-color: #1abc9c;
    color: #fff;
    transform: translateX(5px);
    cursor: pointer;
  }
  
  .sidebar ul li a {
    text-decoration: none;
    color: inherit;
    width: 100%;
    display: flex;
    align-items: center;
  }
  
  .sidebar ul li a.router-link-active {
    font-weight: bold;
    color: #1abc9c;
  }
  
  .close-icon {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 20px;
    cursor: pointer;
    color: #ecf0f1;
    transition: color 0.3s;
  }
  .close-icon:hover {
    color: #e74c3c;
  }
  </style>
  
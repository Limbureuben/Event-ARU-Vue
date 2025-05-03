<template>
  <div class="register-background">
    <div class="register-overlay">
      <div class="register-container">
        <img src="/public/images/ardhi.png" alt="Event System Logo" class="logo" />
        <div class="system-title">ARU EVENT SYSTEM</div>
        <!-- Animate the form -->
        <transition name="fade-slide">
          <form v-if="showForm" @submit.prevent="onSubmit">
            <div class="full-width custom-input">
              <input v-model="form.username" id="username" type="text" placeholder="Enter your username" required />
            </div>
            <div class="full-width custom-input">
              <input v-model="form.password" id="password" type="password" placeholder="Enter your password" required />
            </div>
            <div class="full-width custom-input">
              <input v-model="form.confirmPassword" id="confirmPassword" type="password" placeholder="Confirm your password" required />
            </div>
            <div class="actions">
              <button class="register-btn" type="submit">Register</button>
            </div>
          </form>
        </transition>

        <div class="login-link">
          <p>Already have an account? <router-link to="/">Login</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useMutation } from '@vue/apollo-composable';
  import REGISTER_USER from '@/graphql/registerUser.graphql'
  import { toast } from 'vue3-toastify';
  import router from '@/router';
  import { on } from 'events';
  
  const form = ref({
    username: '',
    password: '',
    confirmPassword: '',
  });
  
  const { mutate: registerUser, onDone, onError } = useMutation(REGISTER_USER);
  
  const onSubmit = async () => {
    registerUser({
      username: form.value.username,
      password: form.value.password,
      confirmPassword: form.value.confirmPassword,
    });
  
    onDone(({ data }) => {
      if (data.registerUser.success) {
        toast.success('Registration successful!')

        form.value.username = '';
        form.value.password = '';
        form.value.confirmPassword = '';

        setTimeout(() => {
          router.push('/login');

        }, 2000);
      } else {
        toast.error('Registration failed: ' + data.registerUser.message);
      }
    });
  
    onError((error) => {
      toast.error('Registration failed: ' + error.message);
    });
  };

  const showForm = ref(false);
  onMounted(() => {
    showForm.value = true;
  });
  </script>
  
  <style scoped>
  /* Background styling */
  .register-background {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: url('/public//images/ardhi.jpeg') no-repeat center center fixed;
    background-size: cover;
  }
  
  /* Overlay for a clean look */
  .register-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    padding: 20px;
  }
  
  /* Container for the form */
  .register-container {
    background: #ffffff;
    padding: 2rem;
    border-radius: 2px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    max-width: 450px;
    width: 100%;
    position: fixed;
    text-align: center;
    color: #333;
  }
  
  /* Header text */
  .country-name {
    font-size: 24px;
    font-weight: bold;
    color: #3A7D44;
    margin-bottom: 20px;
  }
  
  /* Form input fields */
  .full-width.custom-input {
    margin-bottom: 1rem;
    width: 100%;
    text-align: left;
  }
  
  .full-width.custom-input label {
    font-size: 14px;
    margin-bottom: 5px;
    color: #555;
  }
  
  .full-width.custom-input input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
    transition: border-color 0.3s ease;
  }
  
  .full-width.custom-input input:focus {
    outline: none;
    border-color: #3A7D44;
  }
  
  /* Login button */
  .actions {
    margin-top: 1rem;
  }
  
  .register-btn {
    padding: 12px 20px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background-color: #3A7D44;
    border: none;
    border-radius: 8px;
    width: 100%;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .register-btn:hover {
    background-color: #2a5b30;
  }
  
  /* Login link */
  .login-link {
    margin-top: 20px;
    font-size: 14px;
  }
  
  .login-link a {
    color: #3A7D44;
    text-decoration: none;
    font-weight: bold;
  }
  
  .login-link a:hover {
    text-decoration: underline;
  }
  
  /* Back button style */
  .back-button {
    position: fixed;
    top: 20px;
    left: 20px;
    background-color: transparent;
    border: none;
    font-size: 24px;
    color: #333;
    cursor: pointer;
    z-index: 10;
  }
  
  .back-button:hover {
    color: #3A7D44;
  }
  
  /* Responsive Design */
  @media (max-width: 600px) {
    .register-container {
      padding: 1.5rem;
      width: 95%;
    }
  
    .register-btn {
      font-size: 14px;
    }
  
    .login-link {
      font-size: 12px;
    }
  }

  .fade-slide-enter-active {
  transition: all 0.5s ease;
}
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.logo {
  width: 120px;
  height: auto;
  margin-bottom: 10px;
}

.system-title {
  font-size: 20px;
  font-weight: bold;
  color: #3A7D44;
  margin-bottom: 20px;
}

  </style>
  
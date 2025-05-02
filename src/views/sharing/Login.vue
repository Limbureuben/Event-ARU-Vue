<template>
  <div class="register-background">
    <div class="register-overlay">
      <transition name="fade-slide">
        <div v-if="visible" class="register-container">
          <img src="/public/images/ardhi.png" alt="Event System Logo" class="logo" />

          <form @submit.prevent="onSubmit" autocomplete="off">
            <div class="full-width custom-input">
              <label for="username">Username</label>
              <input v-model="form.username" id="username" type="text" placeholder="Enter your username" required />
            </div>

            <div class="full-width custom-input">
              <label for="password">Password</label>
              <input v-model="form.password" id="password" type="password" placeholder="Enter your password" required />
            </div>

            <div class="actions">
              <button class="register-btn" type="submit">Login</button>
            </div>
          </form>

          <div class="login-link">
            <p>Don't have an account? <router-link to="/register">Register</router-link></p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMutation } from '@vue/apollo-composable';
import { toast } from 'vue3-toastify';
import LOGIN_USER from '@/graphql/loginUser.graphql';

const router = useRouter();

const form = ref({
  username: '',
  password: '',
});

const { mutate: loginUser, onDone, onError } = useMutation(LOGIN_USER);

onDone( async ({ data }) => {
  console.log('GraphQL response:', data);
  const result = data.loginUser;

  if (result.success && result.token) {
    localStorage.setItem('token', result.token);
    toast.success('Login successful!');
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (result.user.isStaff) {
      router.push('/admin/admin-dashboard');
    } else {
      router.push('/rooms');
    }
  } else {
    console.log('Login failed:', result.message);
    toast.error('Login failed! Please check your credentials.');
  }
});

onError((error) => {
  console.error('GraphQL error:', error);
  toast.error('Login error: ' + error.message);
});

const onSubmit = async () => {
  console.log('Login button clicked');
  loginUser({
    username: form.value.username,
    password: form.value.password,
  });
};

const visible = ref(false);

onMounted(() => {
  visible.value = true
})
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
    width: 110%;
    background: rgba(0, 0, 0, 0.5);
    height: 100%;
    padding: 20px;
  }
  
  /* Container for the form */
  .register-container {
    background: #ffffff;
    padding: 2rem;
    margin-top: 0px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    position: fixed;
    width: 100%;
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
    border-radius: 8px;
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
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.logo {
  width: 120px;
  height: auto;
  margin-bottom: 10px;
}


  </style>
  
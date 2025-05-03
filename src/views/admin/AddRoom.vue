<template>
  <AdminHeaderComponent />
    <div class="add-room-page">
      <form @submit.prevent="onSubmit" class="form-container" autocomplete="off">
        <h2 class="form-title">Add Event Room</h2>
        <v-text-field
          label="Room Name"
          v-model="form.roomName"
          @input="form.roomName = form.roomName.toUpperCase()"
          variant="outlined"
          density="comfortable"
          class="form-field"
          required
        />
        <div class="form-row">
          <v-text-field
            label="Capacity"
            type="number"
            v-model="form.capacity"
            variant="outlined"
            density="comfortable"
            class="form-field half"
            required
          />
          <v-text-field
            label="Price"
            type="number"
            v-model="form.price"
            variant="outlined"
            density="comfortable"
            class="form-field half"
            required
          />
        </div>
  
        <div class="form-row">
          <v-text-field
            label="Location"
            variant="outlined"
            v-model="form.location"
            density="comfortable"
            class="form-field half"
            readonly
            required
          />
          <v-text-field
            label="Available Date"
            type="date"
            variant="outlined"
            v-model="form.available_date"
            density="comfortable"
            class="form-field half"
            required
          />
        </div>
  
        <div class="image-wrapper">
          <label for="image" class="image-label">Upload Room Image</label>
          <input
            type="file"
            id="image"
            @change="onImageSelected"
            class="image-input"
            accept="image/*"
            required
          />
          <p v-if="selectedImage" class="image-name">{{ selectedImage.name }}</p>
        </div>
  
        <v-btn
          color="indigo"
          variant="flat"
          class="submit-btn"
          type="submit"
          block
        >
          Add Room
        </v-btn>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { toast } from 'vue3-toastify';
  import { useRouter } from 'vue-router';
  import AdminHeaderComponent from '@/components/AdminHeader.vue';

  const router = useRouter();

  const form = ref({
    roomName: '',
    capacity: '',
    price: '',
    location: 'ARDHI UNIVERSITY',
    available_date: '',
  })

  const selectedImage = ref(null);

  const onImageSelected = (event) => {
    const file = event.target.files[0];
    if (file) {
      selectedImage.value = file;
    }
  };

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append('name', form.value.roomName.toUpperCase());
    formData.append('capacity', form.value.capacity);
    formData.append('price', form.value.price);
    formData.append('location', form.value.location.toUpperCase());
    formData.append('available_date', form.value.available_date);
    formData.append('image', selectedImage.value);

    try {
      const response = await fetch('http://localhost:8000/api/register-room/', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Room added successfully!');
        await new Promise(resolve => setTimeout(resolve, 2000));
        router.push('/admin/admin-dashboard');
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
      }
    }
    catch (error) {
      toast.error('An error occurred while adding the room.');
      console.error('Error:', error);
    }
  };
  </script>
  
  
<style scoped>

.add-room-page {
  display: flex; /* Enable Flexbox */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  height: 100vh; /* Full height of the viewport */
  /* padding: 40px; */
  padding-left: 450px;
  width: 150vh;
}

.form-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 24px;
  font-weight: bold;
  color: #3f51b5;
  margin-bottom: 30px;
  text-align: center;
}

.form-row {
  display: flex;
  gap: 10px;
  margin-bottom: 10px; /* Increased bottom margin */
}

.form-field {
  width: 100%;
  margin-bottom: 10px;
}

.submit-btn {
  margin-top: 5px;
  font-weight: bold;
}

/* Style the file input wrapper */
.image-wrapper {
  margin-bottom: 20px; /* Increased bottom margin */
}

/* Label for the image file input */
.image-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
  color: #3f51b5;
}

/* Style the actual file input field */
.image-input {
  width: 100%;
  padding: 12px;
  border: 2px solid #F1F2FAFF;
  border-radius: 8px;
  background-color: #f1f1f1;
  display: block;
  font-size: 14px;
  color: #333;
  transition: border-color 0.3s ease;
}

/* When the field is focused */
.image-input:focus {
  border-color: #EBEFF3FF;
  outline: none;
}

/* Style the file name below the input */
.image-name {
  font-size: 14px;
  font-weight: 500;
  color: #3f51b5;
}

/* Customize the file input button */
.image-input::-webkit-file-upload-button {
  color: #E7E8EEFF;
  background-color: #e1f5fe;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
}

.image-input::-webkit-file-upload-button:hover {
  background-color: #bbdefb;
}

</style>
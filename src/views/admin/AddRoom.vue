<template>
    <div class="add-room-page">
      <form class="form-container">
        <h2 class="form-title">Add Event Room</h2>
  
        <v-text-field
          label="Room Name"
          variant="outlined"
          density="comfortable"
          class="form-field"
          required
        />
  
        <!-- Use .form-row to make Capacity, Price, and Available Date horizontally aligned -->
        <div class="form-row">
          <v-text-field
            label="Capacity"
            type="number"
            variant="outlined"
            density="comfortable"
            class="form-field half"
            required
          />
          <v-text-field
            label="Price"
            type="number"
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
            density="comfortable"
            class="form-field half"
            required
          />
          <v-text-field
            label="Available Date"
            type="date"
            variant="outlined"
            density="comfortable"
            class="form-field half"
            required
          />
        </div>
  
        <!-- File input wrapper -->
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
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const selectedImage = ref(null);
  
      const onImageSelected = (event) => {
        const file = event.target.files[0];
        if (file) {
          selectedImage.value = file;
        }
      };
  
      return {
        selectedImage,
        onImageSelected,
      };
    },
  };
  </script>
  
  
<style scoped>

.add-room-page {
  box-sizing: border-box;
  padding: 40px 110px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  width: 100%; /* Increase width to 70% */
  margin: 0 auto;
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
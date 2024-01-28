<script setup>
import { ref, watchEffect } from 'vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const user = storeToRefs(userStore).user;

const name = ref('');
const address = ref('');
const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');


watchEffect(() => {
  if (user.value) {
    name.value = user.value.name;
    address.value = user.value.address || '';
  }
});

const submitForm = async () => {
  try {
    await userStore.updateProfile({
      name: name.value,
      address: address.value,
    });
    // The user reference should be updated automatically
    alert('Profile updated successfully!');
  } catch (error) {
    alert(error.message);
  }
};

const changePassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    alert("New passwords do not match.");
    return;
  }

  try {
    const result = await userStore.changePassword({
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
    });

    if (result.errors) {
      // Convert the errors object to a string for display
      const errorsString = JSON.stringify(result.errors, null, 2);
      alert(`Validation errors: ${errorsString}`);
      return;
    }

    alert('Password changed successfully!');
    // Clear the form or redirect the user
  } catch (error) {
    // Convert the error object to a string if it's not already a string
    const errorMessage = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
    alert(`Error: ${errorMessage}`);
  }
};



</script>

<template>
  <div class="container mx-auto p-6">
    <div class="flex flex-wrap -mx-4">
      <!-- Update Information Section -->
      <div class="w-full md:w-1/2 px-4 mb-6 md:mb-0">
        <div class="bg-white rounded shadow p-6 h-full flex flex-col">
          <h2 class="text-xl font-semibold mb-4">Update Information</h2>
          <form @submit.prevent="submitForm" class="flex-grow">
            <div class="mb-4">
              <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" id="name" v-model="name" required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>
            <div class="mb-4">
              <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
              <input type="text" id="address" v-model="address" required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>
            <div class="mt-auto">
              <button type="submit"
                class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Change Password Section -->
      <div class="w-full md:w-1/2 px-4">
        <div class="bg-white rounded shadow p-6 h-full flex flex-col">
          <h2 class="text-xl font-semibold mb-4">Change Password</h2>
          <form @submit.prevent="changePassword" class="flex-grow">
            <div class="mb-4">
              <label for="currentPassword" class="block text-sm font-medium text-gray-700">Current Password</label>
              <input type="password" id="currentPassword" v-model="currentPassword" required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50" />
            </div>
            <div class="mb-4">
              <label for="newPassword" class="block text-sm font-medium text-gray-700">New Password</label>
              <input type="password" id="newPassword" v-model="newPassword" required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50" />
            </div>
            <div class="mb-4">
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input type="password" id="confirmPassword" v-model="confirmPassword" required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50" />
            </div>
            <div class="mt-auto">
              <button type="submit"
                class="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:bg-red-700">
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
.mt-auto {
  margin-top: auto;
}
</style>





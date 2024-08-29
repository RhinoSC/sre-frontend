<template>
  <div class="flex flex-col items-center justify-center gap-6">
    <div class="">
      <div class="flex flex-col items-center justify-center gap-6">
        <h1 class="text-4xl font-bold text-center text-violet-600">Users</h1>
        <p class="text-xl">Total users: {{ users?.length }}</p>
        <RouterLink class="h-12 text-center w-60" to="/users/new">
          <div
            class="py-1 border rounded-lg dark:bg-gray-dark-300 bg-gray-light-200 dark:border-violet-600 dark:hover:bg-gray-light-400 dark:active:bg-gray-dark-100 border-gray-dark-100 hover:bg-gray-light-300 active:bg-gray-dark-100">
            Add new User
          </div>
        </RouterLink>
      </div>
    </div>
    <div class="flex flex-col items-center justify-center gap-6">
      <input v-model="searchQuery" type="text" placeholder="Search users..."
        class="block w-full px-4 py-3 mb-1 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600" />
    </div>
    <div class="flex flex-col items-center justify-center w-full" v-if="users">
      <table class="w-full text-left table-auto rtl:text-right">
        <thead class="dark:bg-gray-dark-300 bg-gray-light-300">
          <tr>
            <th class="px-6 py-3">
              Name
            </th>
            <th class="px-6 py-3">
              Username
            </th>
            <th class="px-6 py-3">
              Contact
            </th>
            <th class="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="user in filteredUsers"
            :key="user.id">
            <td class="px-6 py-4">{{ user.name }}</td>
            <td class="px-6 py-4">{{ user.username }}</td>
            <td class="px-6 py-4">
              <div class="flex flex-col gap-4">
                <!-- <p><strong>Twitch: </strong> {{ user.socials.twitch }}</p> -->
                <!-- <p><strong>Twitter: </strong> {{ user.socials.twitter }}</p> -->
                <!-- <p><strong>Youtube: </strong> {{ user.socials.facebook }}</p> -->
                <!-- <p><strong>Facebook: </strong> {{ user.socials.youtube }}</p> -->
                <div class="flex flex-row items-center gap-3">
                  <a :href="`https://twitch.tv/${user.socials.twitch}`" target="_blank">
                    <img src="https://www.vectorlogo.zone/logos/twitch/twitch-icon.svg" alt="Twitch: "
                      class="w-5 h-5 brightness-0 invert">
                  </a>
                  <p> {{ user.socials.twitch }}</p>
                </div>
                <div class="flex flex-row items-center gap-2" v-if="user.socials.twitter">
                  <a :href="`https://twitter.com/${user.socials.twitter}`" target="_blank">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd"
                        d="M22 5.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.343 8.343 0 0 1-2.605.981A4.13 4.13 0 0 0 15.85 4a4.068 4.068 0 0 0-4.1 4.038c0 .31.035.618.105.919A11.705 11.705 0 0 1 3.4 4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 6.1 13.635a4.192 4.192 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 2 18.184 11.732 11.732 0 0 0 8.291 20 11.502 11.502 0 0 0 19.964 8.5c0-.177 0-.349-.012-.523A8.143 8.143 0 0 0 22 5.892Z"
                        clip-rule="evenodd" />
                    </svg>
                  </a>
                  <p>{{ user.socials.twitter }}</p>
                </div>
                <div class="flex flex-row items-center gap-2" v-if="user.socials.youtube">
                  <a :href="`https://youtube.com/channel/${user.socials.youtube}`" target="_blank">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd"
                        d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z"
                        clip-rule="evenodd" />
                    </svg>
                  </a>
                  <p>{{ user.socials.facebook }}</p>
                </div>
                <div class="flex flex-row items-center gap-2" v-if="user.socials.facebook">
                  <a :href="`https://facebook.com/${user.socials.facebook}`" target="_blank">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd"
                        d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
                        clip-rule="evenodd" />
                    </svg>
                  </a>
                  <p>{{ user.socials.youtube }}</p>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="flex flex-row items-center justify-center gap-2">
                <RouterLink :to="`/users/edit/${user.id}`">
                  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                      d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                      clip-rule="evenodd" />
                    <path fill-rule="evenodd"
                      d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                      clip-rule="evenodd" />
                  </svg>
                </RouterLink>
                <button @click="openDeleteModal(user)">
                  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                      d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                      clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <ModalComponent v-if="selectedUserToDelete" :isOpen="isModalOpened" @modal-close="closeDeleteModal"
        name="first-modal">
        <template #header>Delete {{ selectedUserToDelete.name }}?</template>
        <template #content>Are you sure you want to delete <span class="font-bold">{{
          selectedUserToDelete.name }}</span>?
          Users related will be
          deleted.</template>
        <template #footer>
          <button @click="handleDeleteUser"
            class="px-4 py-2 text-sm text-white border rounded bg-violet-600 border-violet-600 hover:bg-violet-700 active:bg-violet-900">
            Delete </button>
        </template>
      </ModalComponent>
    </div>
    <div v-else>
      Loading users...
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import router from '@/router';
import ModalComponent from "@/components/modal/ModalComponent.vue";

import type { APIResponse } from '@/types/api';
import type { User } from '@/types/user';

import { apiDeleteUser, apiGetUsers } from '@/api/user/user';

const isModalOpened = ref(false);
const selectedUserToDelete = ref<User>()

const openDeleteModal = (user: User) => {
  selectedUserToDelete.value = user
  isModalOpened.value = true;
};
const closeDeleteModal = () => {
  isModalOpened.value = false;
  selectedUserToDelete.value = undefined
};

const searchQuery = ref('');

const filteredUsers = computed(() => {
  if (!users.value) return [];
  return users.value.filter(user => {
    const lowerCaseQuery = searchQuery.value.toLowerCase();
    if (user.socials.twitch) {
      return (
        user.name.toLowerCase().includes(lowerCaseQuery) ||
        user.username.toLowerCase().includes(lowerCaseQuery) ||
        user.socials.twitch.toLowerCase().includes(lowerCaseQuery) ||
        user.socials.twitter?.toLowerCase().includes(lowerCaseQuery) ||
        user.socials.youtube?.toLowerCase().includes(lowerCaseQuery) ||
        user.socials.facebook?.toLowerCase().includes(lowerCaseQuery)
      );
    }
  });
});

const handleDeleteUser = async () => {
  try {
    if (!selectedUserToDelete.value) {
      throw new Error("there is no user");
    }
    const response: APIResponse<User[]> = await apiDeleteUser(selectedUserToDelete.value.id)
    users.value = response.data
    closeDeleteModal()
    window.location.reload();
  } catch (error) {
    console.error("Failed to delete user:", error);
    alert("There was an error deleting the user. Please try again.");
  }
}

const users = ref<User[]>()

const handleGetAllUsers = async () => {
  try {

    const response: APIResponse<User[]> = await apiGetUsers()
    users.value = response.data
  } catch (error) {
    console.error("Failed to get users:", error);
    alert("There was an error getting the user. Please try again.");
  }
}

onMounted(async () => {
  await handleGetAllUsers()
})
</script>
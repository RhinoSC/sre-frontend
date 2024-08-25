<template>
  <div class="flex flex-col items-center justify-center gap-6" v-if="oldPrize">
    <div class="">
      <div class="flex flex-col items-center justify-center gap-6">
        <h1 class="text-4xl font-bold text-center text-violet-600">Edit Prize {{ oldPrize.name }}</h1>
      </div>
    </div>
    <div class="w-full" v-if="newPrize">
      <form @submit.prevent class="flex flex-col items-center justify-center">
        <div class="max-w-3xl">
          <div class="flex flex-wrap mb-6 -mx-3">
            <div class="w-1/2 px-3">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-name">
                Name
              </label>
              <input v-model="newPrize.name"
                class="block w-full px-4 py-3 mb-3 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
                id="grid-name" type="text" placeholder="Prize name">
            </div>
            <div class="w-1/2 px-3">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-url">
                Image Url
              </label>
              <input v-model="newPrize.url"
                class="block w-full px-4 py-3 mb-3 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
                id="grid-url" type="url" placeholder="Prize image url">
            </div>
          </div>
          <div class="flex flex-wrap mb-6 -mx-3">
            <div class="w-1/2 px-3">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-amount">
                Min Amount
              </label>
              <input v-model="newPrize.min_amount"
                class="block w-full px-4 py-3 mb-3 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
                id="grid-amount" type="number" placeholder="5">
            </div>
            <div class="flex flex-col w-1/2 px-3">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-event">
                Event
              </label>
              <select
                class="block w-full px-4 py-3 pr-8 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
                id="grid-event" v-model="selectedEvent">
                <option
                  class="font-sans cursor-pointer dark:bg-gray-dark-300 bg-gray-light-200 dark:hover:bg-gray-dark-400 hover:bg-gray-light-300"
                  v-for="event in events" :value="event">{{ event.name }}</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap items-center justify-center mb-6 -mx-3">
            <div class="flex flex-col w-2/3 px-3">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-first-name">
                Description
              </label>
              <textarea v-model="newPrize.description"
                class="block p-2.5 w-full h-24 text-sm rounded-lg border px-4 py-3 mb-3 leading-tight border-gray-200 appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600 resize-none"
                placeholder="Write your thoughts here..." maxlength="300"></textarea>
            </div>
            <div class="flex flex-col w-1/3 px-3">
              <div class="mb-3">
                <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-status">
                  Status
                </label>
                <select
                  class="block w-full px-4 py-3 pr-8 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
                  id="grid-status" v-model="newPrize.status">
                  <option
                    class="font-sans cursor-pointer dark:bg-gray-dark-300 bg-gray-light-200 dark:hover:bg-gray-dark-400 hover:bg-gray-light-300"
                    v-for="status in allStatus" :value="status">{{ status }}</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                  <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div class="flex flex-row items-center justify-center gap-2 px-3">
                <input type="checkbox" id="checkbox" v-model="newPrize.international_delivery"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label for="checkbox"> International delivery?</label>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-row items-center justify-end gap-2 font-bold">
          <RouterLink to="/prizes">
            <button
              class="px-4 py-2 text-sm border rounded text-gray-dark-400 bg-gray-light-200 dark:bg-gray-dark-300 dark:text-white-smoke dark:hover:bg-gray-dark-200 dark:active:bg-gray-light-400 border-violet-600 hover:bg-gray-light-300 active:bg-gray-dark-100">
              Cancel
            </button>
          </RouterLink>
          <button
            class="px-4 py-2 text-sm text-white border rounded bg-violet-600 border-violet-600 hover:bg-violet-700 active:bg-violet-900"
            @click="handleUpdatePrize">
            Update
          </button>
        </div>
      </form>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router'

import type { APIResponse } from '@/types/api';
import type { Prize } from '@/types/prize';
import type { MyEvent } from '@/types/event';

import { apiGetPrizeByID, apiUpdatePrize } from '@/api/prize/prize';
import { apiGetEvents } from '@/api/event/event';

const router = useRouter()
const route = useRoute()

const allStatus = ref(["Available", "Disable"])
const events = ref<MyEvent[]>([])
const selectedEvent = ref<MyEvent>()

const oldPrize = ref<Prize>({ id: "", name: "", url: "", description: "", event_id: "", international_delivery: true, min_amount: 0, status: "Available" })
const newPrize = ref<Prize>({ id: "", name: "", url: "", description: "", event_id: "", international_delivery: true, min_amount: 0, status: "Available" })

watch(selectedEvent, (newEvent, _) => {
  const selected = events.value.find(event => event.id === newEvent?.id)
  if (newPrize.value && selected) {
    newPrize.value.event_id = selected.id
  }
})


const handleUpdatePrize = async () => {
  try {
    if (!newPrize.value) return
    const response: APIResponse<Prize> = await apiUpdatePrize(newPrize.value)

    console.log("Prize updated:", response.data);
    router.push('/prizes')
  } catch (error) {
    console.error("Failed to create prize:", error);
    alert("There was an error creating the prize. Please try again.");
  }
}

const getEvents = async () => {
  try {
    const response: APIResponse<MyEvent[]> = await apiGetEvents()
    events.value = response.data
  } catch (error) {
    console.error("Failed to get events:", error);
    alert("There was an error getting events. Please try again.");
    router.push('/prizes')
  }
}

const handleGetPrizeById = async () => {
  try {
    const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
    if (!id) throw new Error("Error getting id");

    const response: APIResponse<Prize> = await apiGetPrizeByID(id)
    oldPrize.value = response.data
    newPrize.value = JSON.parse(JSON.stringify(response.data))

    selectedEvent.value = events.value.find(event => event.id = response.data.event_id)
  } catch (error) {
    console.error("Failed to get prize:", error);
    alert("There was an error getting the prize. Please try again.");
    router.push('/prizes')
  }
}

onMounted(() => {
  getEvents()
  handleGetPrizeById()
})

</script>
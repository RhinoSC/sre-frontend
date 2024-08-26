<template>
  <div class="flex flex-row items-center w-4/5">
    <div class="flex flex-row items-center justify-between flex-grow w-1/3 text-xl">
      <div>
        <RouterLink to="/">Home</RouterLink>
      </div>
      <div>
        <RouterLink to="/schedules">Schedules</RouterLink>
      </div>
      <div>
        <RouterLink to="/runs">Runs</RouterLink>
      </div>
      <div>
        <RouterLink to="/prizes">Prizes</RouterLink>
      </div>
      <div>
        <RouterLink to="/bids">Bids</RouterLink>
      </div>
      <div>
        <RouterLink to="/donations">Donations</RouterLink>
      </div>
      <div>
        <RouterLink to="/users">Users</RouterLink>
      </div>
    </div>
    <div class="flex justify-end w-1/3">
      <div class="flex flex-row items-center justify-center">
        <select id="bid-type" v-model="localSelectedEvent"
          class="w-full px-4 py-1 font-sans leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
          required>
          <option v-for="event in events" :key="event.id" :value="event">{{ event.name }}</option>
        </select>
        <ThemeToggle />
        <RouterLink to="/schedules">
          <button
            class="px-3 py-1.5 text-sm text-white border rounded  bg-violet-600 border-violet-600 hover:bg-violet-700 active:bg-violet-900">
            Logout
          </button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MyEvent } from '@/types/event';
import ThemeToggle from './ThemeToggle.vue';
import { onMounted, ref, watch } from 'vue';
import type { APIResponse } from '@/types/api';
import { apiGetEvents } from '@/api/event/event';
import { useEventStore } from '@/stores/useEventStore';

const { eventSelected, setEvent, clearEvent } = useEventStore();

const localSelectedEvent = ref<MyEvent>()
const events = ref<MyEvent[]>([]);

watch(localSelectedEvent, (newEvent, _) => {
  if (newEvent) {
    setEvent(newEvent)
  }

})

const getEvents = async () => {
  try {
    const response: APIResponse<MyEvent[]> = await apiGetEvents()
    events.value = response.data
  } catch (error) {
    console.error("Failed to get events:", error);
  }
}

onMounted(() => {
  getEvents()
  console.log("hli: ", eventSelected.value)
  if (eventSelected.value) {
    localSelectedEvent.value = eventSelected.value
  }
})

</script>
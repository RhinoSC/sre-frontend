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
          <option v-for="event in localEvents" :key="event.id" :value="event">{{ event.name }}</option>
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
import { useEventStore } from '@/stores/useEventStore'
import { storeToRefs } from 'pinia';

const eventStore = useEventStore()
const { events, selectedEvent } = storeToRefs(eventStore)

const localEvents = ref<MyEvent[]>([])
const localSelectedEvent = ref<MyEvent>({} as MyEvent)

watch(localSelectedEvent, (newEvent) => {
  if (newEvent) {
    eventStore.selectEvent(newEvent)
  }
})

onMounted(async () => {
  // Esperar a que los eventos se hayan cargado
  await eventStore.fetchEvents()

  // Revisar si selectedEvent ya está definido después de cargar los eventos
  if (selectedEvent.value) {
    localSelectedEvent.value = {
      id: selectedEvent.value.id,
      name: selectedEvent.value.name,
      start_time_mili: selectedEvent.value.start_time_mili,
      end_time_mili: selectedEvent.value.end_time_mili,
    }
    localEvents.value = events.value
  }
})


</script>
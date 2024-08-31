<template>
  <div class="flex flex-row items-center w-4/5" v-if="showNavbar">
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
        <RouterLink to="/login">
          <button @click="useAuth.logout"
            class="px-3 py-1.5 text-sm text-white border rounded  bg-violet-600 border-violet-600 hover:bg-violet-700 active:bg-violet-900">
            Logout
          </button>
        </RouterLink>
      </div>
    </div>
  </div>
  <div v-else class="flex flex-row items-center w-1/2">
    <div class="flex flex-row items-center justify-between flex-grow w-1/3 -ml-10 text-xl">
      <h1 class="text-4xl font-bold text-center text-violet-600">SRE X</h1>
      <div class="flex flex-row items-center justify-center">
        <ThemeToggle />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MyEvent } from '@/types/event';
import ThemeToggle from './ThemeToggle.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { useEventStore } from '@/stores/useEventStore'
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/auth/useAuth';

const eventStore = useEventStore()
const { events, selectedEvent } = storeToRefs(eventStore)

const localEvents = ref<MyEvent[]>([])
const localSelectedEvent = ref<MyEvent>({} as MyEvent)

watch(localSelectedEvent, (newEvent) => {
  if (newEvent) {
    eventStore.selectEvent(newEvent)
  }
})

const useAuth = useAuthStore(); // Asume que tienes un hook o una función para gestionar la autenticación
const { isLoggedIn } = storeToRefs(useAuth)

// Computed property to check if the Navbar should be displayed
const showNavbar = computed(() => isLoggedIn.value);

watch(isLoggedIn, async (ne, ol) => {
  if (ne) {
    await eventStore.fetchEvents()

    // Revisar si selectedEvent ya está definido después de cargar los eventos
    if (selectedEvent.value) {
      localSelectedEvent.value = {
        id: selectedEvent.value.id,
        name: selectedEvent.value.name,
        start_time_mili: selectedEvent.value.start_time_mili,
        end_time_mili: selectedEvent.value.end_time_mili,
        schedule_id: selectedEvent.value.schedule_id
      }
      localEvents.value = events.value
    }
  }
})

onMounted(async () => {
  if (isLoggedIn.value) {
    await eventStore.fetchEvents()

    // Revisar si selectedEvent ya está definido después de cargar los eventos
    if (selectedEvent.value) {
      localSelectedEvent.value = {
        id: selectedEvent.value.id,
        name: selectedEvent.value.name,
        start_time_mili: selectedEvent.value.start_time_mili,
        end_time_mili: selectedEvent.value.end_time_mili,
        schedule_id: selectedEvent.value.schedule_id
      }
      localEvents.value = events.value
    }
  }
})


</script>
<template>
  <div class="flex flex-col items-center justify-center gap-6">
    <div class="">
      <div class="flex flex-col items-center justify-center gap-6">
        <h1 class="text-4xl font-bold text-center text-violet-600">Add new schedule</h1>
      </div>
    </div>
    <form class="w-full max-w-lg" @submit.prevent>
      <div class="flex flex-wrap mb-6 -mx-3">
        <div class="w-1/2 px-3">
          <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-name">
            Name
          </label>
          <input v-model="newSchedule.name"
            class="block w-full px-4 py-3 mb-3 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
            id="grid-name" type="text" placeholder="Schedule name">
        </div>
        <div class="w-full px-3 mb-6 md:w-1/2 md:mb-0">
          <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-event">
            Event
          </label>
          <div class="relative">
            <select
              class="block w-full px-4 py-3 pr-8 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
              id="grid-event" v-model="newSchedule.event_id">
              <option class="font-sans" v-for="event in events" :value="event.id">{{ event.name }}</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
              <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap mb-6 -mx-3">
        <div class="w-full px-3 mb-6 md:w-1/2 md:mb-0">
          <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-first-name">
            Start date
          </label>
          <VueDatePicker v-model="startDate" placeholder="Start date" text-input :flow="flow" utc locale="es-CO"
            format="dd/MM/yyyy, HH:mm" class="block w-full py-1 leading-tight " />
        </div>
        <div class="w-full px-3 mb-6 md:w-1/2 md:mb-0">
          <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-first-name">
            End date
          </label>
          <VueDatePicker v-model="endDate" placeholder="End date" text-input :flow="flow" utc locale="es-CO"
            format="dd/MM/yyyy, HH:mm" class="block w-full py-1 leading-tight " />
        </div>
      </div>
      <div class="flex flex-wrap mb-6">
        <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-first-name">
          Setup time
        </label>
        <VueDatePicker v-model="setupTime" time-picker />
      </div>
      <div class="flex flex-wrap mb-6 -mx-3">
      </div>
      <div class="flex flex-row items-center justify-end gap-2 font-bold">
        <RouterLink to="/schedules">
          <button
            class="px-4 py-2 text-sm border rounded text-gray-dark-400 bg-gray-light-200 dark:bg-gray-dark-300 dark:text-white-smoke dark:hover:bg-gray-dark-200 dark:active:bg-gray-light-400 border-violet-600 hover:bg-gray-light-300 active:bg-gray-dark-100">
            Cancel
          </button>
        </RouterLink>
        <button
          class="px-4 py-2 text-sm text-white border rounded bg-violet-600 border-violet-600 hover:bg-violet-700 active:bg-violet-900"
          @click="handleCreateSchedule">
          Create
        </button>
      </div>
    </form>
  </div>

</template>

<script lang="ts" setup>
import { apiGetEvents } from '@/api/event/event';
import { apiCreateSchedule } from '@/api/schedule/schedule';
import type { APIResponse } from '@/types/api';
import type { Schedule, ScheduleDTO } from '@/types/schedule';
import type { MyEvent } from '@/types/event';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

const newSchedule = ref<ScheduleDTO>({ name: "", start_time_mili: 0, end_time_mili: 0, event_id: "", setup_time_mili: 0 })

const events = ref<MyEvent[]>([])

const startDate = ref();
const endDate = ref();
const setupTime = ref({
  hours: new Date().getHours(),
  minutes: new Date().getMinutes()
});
const flow = ref(['year', 'month', 'calendar']);

watch(startDate, (newDate, _) => {
  let dateObject = new Date(newDate)
  newSchedule.value.start_time_mili = dateObject.getTime()
})

watch(endDate, (newDate, _) => {
  let dateObject = new Date(newDate)
  newSchedule.value.end_time_mili = dateObject.getTime()
})

watch(setupTime, (newTime, _) => {
  newSchedule.value.setup_time_mili = (newTime.hours * 3.6e+6 + newTime.minutes * 60000)
})

const handleCreateSchedule = async () => {
  try {
    const response: APIResponse<Schedule> = await apiCreateSchedule(newSchedule.value)

    // console.log("Schedule created:", response.data);
    router.push('/schedules')
  } catch (error) {
    console.error("Failed to create schedule:", error);
    alert("There was an error creating the schedule. Please try again.");
  }
}

const getEvents = async () => {
  try {
    const response: APIResponse<MyEvent[]> = await apiGetEvents()
    events.value = response.data
  } catch (error) {
    console.error("Failed to get events:", error);
    alert("There was an error getting events. Please try again.");
    router.push('/schedules')
  }
}

onMounted(() => {
  getEvents()
})

</script>
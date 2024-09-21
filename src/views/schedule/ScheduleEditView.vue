<template>
  <div class="flex flex-col justify-center w-full gap-6" v-if="oldSchedule">
    <div class="flex flex-col items-center">
      <div class="flex flex-col items-center justify-center gap-6">
        <h1 class="text-4xl font-bold text-center text-violet-600">Edit Schedule {{ oldSchedule.name }}</h1>
      </div>
    </div>
    <div class="flex flex-col items-center w-full" v-if="newSchedule">
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
          <div class="flex flex-wrap w-1/2 mb-6">
            <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-first-name">
              Setup time
            </label>
            <VueDatePicker v-model="setupTime" time-picker />
          </div>
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
            @click="handleUpdateSchedule">
            Save
          </button>
        </div>
      </form>
      <template v-if="editRunsOrderSchedule">
        <div class="flex flex-col w-full gap-1 my-8">
          <hr class="w-full bg-gray-200 border-0 h-[2px] m dark:bg-gray-light-400">
          <hr class="w-full bg-gray-200 border-0 h-[2px] dark:bg-gray-light-400">
        </div>
        <RunManagerComponent :schedule="editRunsOrderSchedule" @saveRuns="saveRuns($event)">
        </RunManagerComponent>
      </template>
      <template v-else>
        <h1>Schedule editor</h1>
      </template>
    </div>

    <div v-else>
      <p>Loading schedule...</p>
    </div>
  </div>

</template>

<script lang="ts" setup>
import RunManagerComponent from '@/components/schedule/RunsManager.vue'

import { apiGetScheduleByID, apiUpdateSchedule } from '@/api/schedule/schedule';
import type { APIResponse } from '@/types/api';
import type { ManageSchedule, Schedule } from '@/types/schedule';
import { ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import type { Run } from '@/types/run';
import { apiUpdateScheduleRuns } from '@/api/run/run';
import type { MyEvent } from '@/types/event';
import { apiGetEvents } from '@/api/event/event';

const route = useRoute()
const router = useRouter()

const oldSchedule = ref<Schedule>()
const newSchedule = ref<Schedule>()
const editRunsOrderSchedule = ref<ManageSchedule | null>(null)


const events = ref<MyEvent[]>([])

const startDate = ref();
const endDate = ref();
const setupTime = ref({
  hours: 0,
  minutes: 0
});
const flow = ref(['year', 'month', 'calendar']);

watch(startDate, (newDate, _) => {
  let dateObject = new Date(newDate)
  if (newSchedule.value) {
    newSchedule.value.start_time_mili = dateObject.getTime()
  }
})

watch(endDate, (newDate, _) => {
  let dateObject = new Date(newDate)
  if (newSchedule.value) {
    newSchedule.value.end_time_mili = dateObject.getTime()
  }
})

watch(setupTime, (newTime, _) => {
  if (newSchedule.value) {
    newSchedule.value.setup_time_mili = (newTime.hours * 3.6e+6 + newTime.minutes * 60000)
  }
})

const handleGetScheduleById = async () => {
  try {
    const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
    if (!id) throw new Error("Error getting id");

    const response: APIResponse<Schedule> = await apiGetScheduleByID(id)
    oldSchedule.value = response.data
    newSchedule.value = JSON.parse(JSON.stringify(response.data))

    editRunsOrderSchedule.value = { ...response.data, rows: [] }

    if (newSchedule.value) {
      const startDateApi = new Date(newSchedule.value.start_time_mili);
      startDate.value = startDateApi.toISOString()

      const endDateApi = new Date(newSchedule.value.end_time_mili);
      endDate.value = endDateApi.toISOString()

      const totalMinutes = Math.floor(newSchedule.value.setup_time_mili / 60000);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      setupTime.value.hours = hours
      setupTime.value.minutes = minutes
    }

  } catch (error) {
    console.error("Failed to create schedule:", error);
    alert("There was an error getting the schedule. Please try again.");
    router.push('/schedules')
  }
}

const handleUpdateSchedule = async () => {
  try {
    if (!newSchedule.value) {
      throw new Error("no hay schedule");
    }

    const response: APIResponse<Schedule> = await apiUpdateSchedule(newSchedule.value)

    // console.log("Schedule updated:", response.data);
    router.push('/schedules')
  } catch (error) {
    console.error("Failed to update schedule:", error);
    alert("There was an error updating the schedule. Please try again.");
  }
}

const handleUpdateScheduleRuns = async () => {
  try {
    if (!editRunsOrderSchedule.value) {
      throw new Error("no hay schedule");
    }

    const runs: Run[] = [...editRunsOrderSchedule.value.runs, ...editRunsOrderSchedule.value.backup_runs, ...editRunsOrderSchedule.value.ordered_runs]
    const response: APIResponse<Schedule> = await apiUpdateScheduleRuns(runs)

    // console.log("Runs updated:", response.data);
  } catch (error) {
    console.error("Failed to update schedule runs:", error);
    alert("There was an error upting schedule runs. Please try again.");
  }
}

const saveRuns = ($event: { runs: Run[], backup: Run[], ordered: Run[] }) => {
  if (editRunsOrderSchedule.value) {
    editRunsOrderSchedule.value.runs = $event.runs
    editRunsOrderSchedule.value.backup_runs = $event.backup
    editRunsOrderSchedule.value.ordered_runs = $event.ordered
  }
  handleUpdateScheduleRuns()
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
  handleGetScheduleById()
  getEvents()
})

</script>
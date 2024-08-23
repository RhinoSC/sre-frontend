<template>
  <div class="flex flex-col items-center justify-center gap-6">
    <div class="">
      <div class="flex flex-col items-center justify-center gap-6">
        <h1 class="text-4xl font-bold text-center text-violet-600">Schedules</h1>
        <p class="text-xl">Total schedules: 10</p>
        <RouterLink class="h-12 text-center w-60" to="/schedules/new">
          <div
            class="py-1 border dark:bg-gray-dark-300 bg-gray-light-200 rounded-2xl dark:border-violet-600 dark:hover:bg-gray-light-400 dark:active:bg-gray-dark-100 border-gray-dark-100 hover:bg-gray-light-300 active:bg-gray-dark-100">
            Add new Schedule
          </div>
        </RouterLink>
      </div>
    </div>
    <div class="flex flex-col items-center justify-center w-full">
      <table class="w-full text-left table-auto rtl:text-right">
        <thead class="dark:bg-gray-dark-300 bg-gray-light-300">
          <tr>
            <th class="px-6 py-3">Event</th>
            <th class="px-6 py-3">Name</th>
            <th class="px-6 py-3"># Runs</th>
            <th class="px-6 py-3">Start / End</th>
            <th class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="schedule in schedules"
            :key="schedule.event_id">
            <td class="px-6 py-4">{{ schedule.event_id }}</td>
            <td class="px-6 py-4">{{ schedule.name }}</td>
            <td class="px-6 py-4">{{ schedule.runs.length }}</td>
            <td class="px-6 py-4">{{ MStoStringTime(schedule.start_time_mili) }} / {{
              MStoStringTime(schedule.end_time_mili) }}</td>
            <td>
              <RouterLink :to="`/schedules/edit/${schedule.id}`"><img src="" alt="Edit"></RouterLink>
              <a href="#"><img src="" alt="Delete"></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { APIResponse } from '@/types/api';
import type { Schedule } from '@/types/schedule';
import { apiGetSchedules } from '@/api/schedule/schedule';
import { MStoStringTime } from '@/utils/strings';

// const schedules = [{ "event_id": "event1", "name": "event 1 name", "runs": [], "start_time_mili": "12:00 - 22-09-2024", "end_time_mili": "12:00 - 22-09-2024" }]
const schedules = ref<Schedule[]>([])

const handleGetAllSchedules = async () => {
  try {

    const response: APIResponse<Schedule[]> = await apiGetSchedules()
    schedules.value = response.data

  } catch (error) {
    console.error("Failed to get schedules:", error);
    alert("There was an error getting the schedule. Please try again.");
  }
}

onMounted(async () => {
  await handleGetAllSchedules()
})
</script>
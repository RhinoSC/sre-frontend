<template>
  <div class="flex flex-col items-center justify-center gap-6">
    <div class="">
      <div class="flex flex-col items-center justify-center gap-6">
        <h1 class="text-4xl font-bold text-center text-violet-600">Add new run</h1>
      </div>
    </div>
    <div class="w-full">
      <form @submit.prevent class="flex flex-col items-center justify-center">
        <div class="max-w-3xl">

          <div class="flex flex-wrap mb-6 -mx-3">
            <div class="w-1/3 px-3">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-name">
                Name
              </label>
              <input v-model="newRun.name"
                class="block w-full px-4 py-3 mb-3 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
                id="grid-name" type="text" placeholder="Run name">
            </div>
            <div class="w-1/3 px-3">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-name">
                Twitch Game
              </label>
              <CategorySelect @selectCategory="selectCategory($event)"></CategorySelect>
            </div>
            <div class="w-full px-3 mb-6 md:w-1/3 md:mb-0">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-event">
                Schedule
              </label>
              <div class="relative">
                <select
                  class="block w-full px-4 py-3 pr-8 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
                  id="grid-event" v-model="selectedSchedule">
                  <option
                    class="font-sans cursor-pointer dark:bg-gray-dark-300 bg-gray-light-200 dark:hover:bg-gray-dark-400 hover:bg-gray-light-300"
                    v-for="schedule in schedules" :value="schedule">{{ schedule.name }}</option>
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
            <div class="w-1/3 px-3">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-name">
                Category
              </label>
              <input v-model="newRun.run_metadata.category"
                class="block w-full px-4 py-3 mb-3 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
                id="grid-name" type="text" placeholder="Category">
            </div>
            <div class="w-1/3 px-3">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-name">
                Platform
              </label>
              <input v-model="newRun.run_metadata.platform"
                class="block w-full px-4 py-3 mb-3 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
                id="grid-name" type="text" placeholder="Platform">
            </div>
            <div class="w-1/3 px-3">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-first-name" value>
                Setup time
              </label>
              <VueDatePicker v-model="setupTime" time-picker />
            </div>
          </div>
          <div class="flex flex-wrap mb-6 -mx-3">
            <div class="w-1/3 px-3">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-first-name">
                Run time
              </label>
              <VueDatePicker v-model="runTime" time-picker />
            </div>
            <div class="flex flex-col w-2/3 px-3">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-first-name">
                Description
              </label>
              <textarea v-model="newRun.run_metadata.note"
                class="block p-2.5 w-full h-24 text-sm rounded-lg border px-4 py-3 mb-3 leading-tight border-gray-200 appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600 resize-none"
                placeholder="Write your thoughts here..." maxlength="300"></textarea>
            </div>
          </div>
        </div>
        <div class="flex flex-row w-full gap-20">
          <div class="flex flex-col mb-6 -mx-3 border rounded basis-1 grow">
            <!-- Encabezado del acordeón -->
            <div @click="toggleTeamsAccordion" class="p-4 text-white cursor-pointer bg-violet-600">
              <h2 class="text-xl font-semibold">Teams</h2>
            </div>
            <transition name="slide">
              <div v-if="isTeamsExpanded" class="p-4">
                <TeamCreator :oldTeams="newRun.teams" @addTeams="addTeams"></TeamCreator>
              </div>
            </transition>
          </div>
          <div class="flex flex-col mb-6 -mx-3 border rounded basis-1 grow">
            <!-- Encabezado del acordeón -->
            <div @click="toggleTeamsAccordion" class="p-4 text-white cursor-pointer bg-violet-600">
              <h2 class="text-xl font-semibold">Bids</h2>
            </div>
            <transition name="slide">
              <div v-if="isTeamsExpanded" class="p-4">
                <BidCreator :oldBids="newRun.bids" @addBids="addBids"></BidCreator>
              </div>
            </transition>
          </div>
        </div>
        <div class="flex flex-row items-center justify-end gap-2 font-bold">
          <RouterLink to="/runs">
            <button
              class="px-4 py-2 text-sm border rounded text-gray-dark-400 bg-gray-light-200 dark:bg-gray-dark-300 dark:text-white-smoke dark:hover:bg-gray-dark-200 dark:active:bg-gray-light-400 border-violet-600 hover:bg-gray-light-300 active:bg-gray-dark-100">
              Cancel
            </button>
          </RouterLink>
          <button
            class="px-4 py-2 text-sm text-white border rounded bg-violet-600 border-violet-600 hover:bg-violet-700 active:bg-violet-900"
            @click="handleCreateRun">
            Create
          </button>
        </div>
      </form>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router'

import type { APIResponse } from '@/types/api';
import type { Run, RunDTO, RunMetadata, TwitchCategory } from '@/types/run';
import type { Schedule } from '@/types/schedule';
import type { Team, TeamDTO } from '@/types/team';
import type { BidDTO } from '@/types/bid';

import CategorySelect from '@/components/run/CategorySelect.vue'
import TeamCreator from '@/components/run/TeamCreator.vue'
import BidCreator from '@/components/run/BidCreator.vue'

import { apiGetSchedules } from '@/api/schedule/schedule';
import { apiCreateRun } from '@/api/run/run';
import { MStoStringTime } from '@/utils/strings';

const router = useRouter()


const isTeamsExpanded = ref(false);

function toggleTeamsAccordion() {
  isTeamsExpanded.value = !isTeamsExpanded.value;
}

const newTeams = ref<TeamDTO[]>([])
const newBids = ref<BidDTO[]>([])
const newRunMetadata = ref<RunMetadata>({ category: "", note: "", platform: "", run_name: "", twitch_game_name: "", twitch_game_id: "" })
const newRun = ref<RunDTO>({ name: "", start_time_mili: new Date().getTime(), schedule_id: "", setup_time_mili: 0, teams: newTeams.value, status: "default", bids: newBids.value, estimate_mili: 0, estimate_string: "", run_metadata: newRunMetadata.value })

const schedules = ref<Schedule[]>([])

const selectedSchedule = ref<Schedule>()
const runTime = ref({
  hours: 0,
  minutes: 0
});
const setupTime = ref({
  hours: 0,
  minutes: 0
});


watch(runTime, (newTime, _) => {
  newRun.value.estimate_mili = (newTime.hours * 3.6e+6 + newTime.minutes * 60000)
})

watch(setupTime, (newTime, _) => {
  newRun.value.setup_time_mili = (newTime.hours * 3.6e+6 + newTime.minutes * 60000)
})

watch(selectedSchedule, (newSchedule, _) => {
  const selected = schedules.value.find(sch => sch.id === newSchedule?.id)
  if (newRun.value && selected) {
    const totalMinutes = Math.floor(selected.setup_time_mili / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    setupTime.value.hours = hours
    setupTime.value.minutes = minutes
    newRun.value.schedule_id = selected.id
  }
})
const handleCreateRun = async () => {
  try {
    newRun.value.estimate_mili = (runTime.value.hours * 3.6e+6 + runTime.value.minutes * 60000)
    newRun.value.setup_time_mili = (setupTime.value.hours * 3.6e+6 + setupTime.value.minutes * 60000)
    newRun.value.estimate_string = MStoStringTime(newRun.value.estimate_mili)
    const response: APIResponse<Run> = await apiCreateRun(newRun.value)

    // console.log("Run created:", response.data);
    router.push('/runs')
  } catch (error) {
    console.error("Failed to create run:", error);
    alert("There was an error creating the run. Please try again.");
  }
}

const getSchedules = async () => {
  try {
    const response: APIResponse<Schedule[]> = await apiGetSchedules()
    schedules.value = response.data
  } catch (error) {
    console.error("Failed to get schedules:", error);
    alert("There was an error getting schedules. Please try again.");
    router.push('/runs')
  }
}

const selectCategory = ($event: TwitchCategory) => {
  if (newRun.value) {
    newRun.value.run_metadata.twitch_game_id = $event.id
    newRun.value.run_metadata.twitch_game_name = $event.name
  }
}

const addTeams = ($event: TeamDTO[]) => {
  if (newRun.value) {
    newRun.value.teams = $event
  }
}

const addBids = ($event: BidDTO[]) => {
  if (newRun.value) {
    newRun.value.bids = $event
  }
}

onMounted(() => {
  getSchedules()
})

</script>

<style scoped>
/* Estilo para la transición del acordeón */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  max-height: 0;
  opacity: 0;
}

.slide-enter-to {
  max-height: 1000px;
  /* Valor suficiente para el contenido */
  opacity: 1;
}

.slide-leave-from {
  max-height: 1000px;
  opacity: 1;
}

.slide-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
<template>
  <div class="flex flex-col items-center justify-center gap-6">
    <div class="">
      <div class="flex flex-col items-center justify-center gap-6">
        <h1 class="text-4xl font-bold text-center text-violet-600">Edit schedule {{ schedule.name }}</h1>
        <p class="text-xl">Total runs: {{ schedule.runs.length }}</p>
      </div>
    </div>
    <form class="w-full max-w-lg">
      <div class="flex flex-wrap mb-6 -mx-3">
        <div class="w-1/2 px-3">
          <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-name">
            Name
          </label>
          <input
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
              id="grid-event" v-model="eventSelected">
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
          <!-- <input
            class="block w-full px-4 py-3 mb-3 leading-tight border border-red-500 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
            id="grid-first-name" type="text" placeholder="Jane"> -->
          <!-- <input
            class="block w-full px-4 py-3 mb-3 leading-tight border rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
            id="grid-first-name" type="text" placeholder="Jane"> -->
          <!-- <p class="text-xs italic text-red-500">Please fill out this field.</p> -->
          <VueDatePicker v-model="startDate" placeholder="Start date" text-input :flow="flow" utc locale="es-CO"
            format="dd/MM/yyyy, HH:mm" class="block w-full py-1 leading-tight " />
        </div>
        <div class="w-full px-3 mb-6 md:w-1/2 md:mb-0">
          <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-first-name">
            Start date
          </label>
          <VueDatePicker v-model="endDate" placeholder="End date" text-input :flow="flow" utc locale="es-CO"
            format="dd/MM/yyyy, HH:mm" class="block w-full py-1 leading-tight " />
        </div>
      </div>
      <div class="flex flex-wrap mb-6 -mx-3">

      </div>
      <!-- <div class="flex flex-wrap mb-6 -mx-3">
        <div class="w-full px-3">
          <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="grid-password">
            Password
          </label>
          <input
            class="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:border-violet-600"
            id="grid-password" type="password" placeholder="******************">
          <p class="text-xs italic text-gray-600">Make it as long and as crazy as you'd like</p>
        </div>
      </div> -->
      <!-- <div class="flex flex-wrap mb-2 -mx-3">
        <div class="w-full px-3 mb-6 md:w-1/3 md:mb-0">
          <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="grid-city">
            City
          </label>
          <input
            class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:border-violet-600"
            id="grid-city" type="text" placeholder="Albuquerque">
        </div>
        <div class="w-full px-3 mb-6 md:w-1/3 md:mb-0">
          <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="grid-state">
            State
          </label>
          <div class="relative">
            <select
              class="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:border-violet-600"
              id="grid-state">
              <option>New Mexico</option>
              <option>Missouri</option>
              <option>Texas</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
              <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div class="w-full px-3 mb-6 md:w-1/3 md:mb-0">
          <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="grid-zip">
            Zip
          </label>
          <input
            class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:border-violet-600 focus:border-gray-500"
            id="grid-zip" type="text" placeholder="90210">
        </div>
      </div> -->
    </form>
  </div>

</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()

const schedule = { "event_id": "event1", "name": "event 1 name", "runs": [], "start_time_mili": "12:00 - 22-09-2024", "end_time_mili": "12:00 - 22-09-2024" }
const newSchedule = { "event_id": "event1", "name": "event 1 name", "runs": [], "start_time_mili": "12:00 - 22-09-2024", "end_time_mili": "12:00 - 22-09-2024" }

const events = [{ "id": "event 1 id", "name": "event 1" }]
const eventSelected = ref()
console.log(route.params.id)

const startDate = ref();
const endDate = ref();
const flow = ref(['year', 'month', 'calendar']);

watch(eventSelected, (newEvent, _) => {
  console.log(newEvent, typeof (newEvent))
})

watch(startDate, (newDate, oldDate) => {
  console.log(newDate, typeof (newDate))
  let dateObject = new Date(newDate)
  console.log(dateObject)
})
</script>
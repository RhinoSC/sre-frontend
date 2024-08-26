<template>
  <div class="flex flex-col items-center justify-center gap-6" v-if="oldBid">
    <div class="">
      <div class="flex flex-col items-center justify-center gap-6">
        <h1 class="text-4xl font-bold text-center text-violet-600">Edit Bid {{ oldBid.bidname }}</h1>
      </div>
    </div>
    <div class="w-full" v-if="newBid">
      <form @submit.prevent class="flex flex-col items-center justify-center">
        <div class="max-w-3xl">
          <div class="flex flex-wrap mb-6 -mx-3">
            <div class="w-1/3 px-3">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-name">
                Name
              </label>
              <input v-model="newBid.bidname"
                class="block w-full px-4 py-3 mb-3 leading-tight border rounded shadow-xl appearance-none border-gray-light-300 dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
                id="grid-name" type="text" placeholder="Bid name">
            </div>
            <div class="w-1/3 px-3">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-run">
                Run
              </label>
              <div class="relative" ref="dropdown">
                <input @focus="showDropdown = true" v-model="searchQueryRun" type="text" placeholder="Search..."
                  class="block w-full px-4 py-3 mb-3 leading-tight border rounded shadow-xl appearance-none border-gray-light-300 dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600" />
                <!-- Lista de sugerencias -->
                <ul v-if="showDropdown && filteredOptions().length"
                  class="absolute left-0 z-10 w-full -mt-1 overflow-y-auto border rounded-md shadow-lg dark:bg-gray-dark-300 bg-gray-light-200 max-h-60">
                  <li v-for="option in filteredOptions()" :key="option.id" @click="selectOption(option)"
                    class="p-2 cursor-pointer dark:hover:bg-gray-dark-400 hover:bg-gray-light-300 bg-gray-light-100 dark:bg-gray-dark-300">
                    {{ option.name }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="w-1/3 px-3">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-type">
                Type
              </label>
              <div class="relative">
                <select
                  class="block w-full px-4 py-3 pr-8 leading-tight border rounded shadow-xl appearance-none border-gray-light-300 dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
                  id="grid-type" v-model="newBid.type">
                  <option
                    class="font-sans cursor-pointer dark:bg-gray-dark-300 bg-gray-light-200 dark:hover:bg-gray-dark-400 hover:bg-gray-light-300"
                    v-for="type in types" :value="type">{{ type }}</option>
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
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-goal">
                Goal
              </label>
              <input v-model="newBid.goal"
                class="block w-full px-4 py-3 mb-3 leading-tight border rounded shadow-xl appearance-none dark:border-gray-200 border-gray-light-300 dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
                id="grid-amount" type="number" placeholder="10.0">
            </div>
            <div class="w-1/3 px-3">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-current">
                Current Amount
              </label>
              <input v-model="newBid.current_amount"
                class="block w-full px-4 py-3 mb-3 leading-tight border rounded shadow-xl appearance-none dark:border-gray-200 border-gray-light-300 dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
                id="grid-current" type="number" placeholder="5.0">
            </div>
            <div class="flex items-center justify-center w-1/3 px-3">
              <div class="flex flex-col items-center justify-center gap-2">
                <div class="flex flex-col items-start w-full gap-2">
                  <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-status">
                    Status
                  </label>
                  <div class="relative w-full -mt-2">
                    <select
                      class="block w-full px-4 py-3 pr-8 leading-tight border rounded shadow-xl appearance-none dark:border-gray-200 border-gray-light-300 dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
                      id="grid-status" v-model="newBid.status">
                      <option
                        class="font-sans cursor-pointer dark:bg-gray-dark-300 bg-gray-light-200 dark:hover:bg-gray-dark-400 hover:bg-gray-light-300"
                        v-for="status in allBidStatus" :value="status">{{ status }}</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                      <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="flex flex-row items-center justify-center w-full h-full gap-2">
                  <input :disabled="setCreatingDisable" type="checkbox" id="checkbox-options"
                    v-model="newBid.create_new_options"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label for="checkbox-options"> Allow creating new options?</label>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap items-center justify-center mb-6 -mx-3">
            <div class="flex flex-col w-full px-3">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-first-name">
                Description
              </label>
              <textarea v-model="newBid.description"
                class="shadow-xl border-gray-light-300 block p-2.5 w-full h-24 text-sm rounded-lg border px-4 py-3 mb-3 leading-tight dark:border-gray-200 appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600 resize-none"
                placeholder="Write your thoughts here..." maxlength="300"></textarea>
            </div>
          </div>
          <div v-if="newBid.type === 'bidwar'" class="w-full mt-4">
            <div class="flex flex-row items-center justify-start gap-2 mb-2">
              <h2 class="text-lg font-semibold">Bid Options</h2>
            </div>
            <div v-for="(option, index) in newBid.bid_options" :key="index" class="flex gap-2 mb-2">
              <input v-model="option.name" type="text" placeholder="Option Name"
                class="w-full px-4 py-3 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
                required />
              <input v-model.number="option.current_amount" type="number" placeholder="Current Amount"
                class="w-full px-4 py-3 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600" />
              <button @click.prevent="removeBidOption(index)"
                class="px-4 py-2 text-sm text-red-500 border border-red-500 rounded bg-gray-light-200 dark:bg-gray-dark-300 dark:hover:bg-gray-dark-200 dark:active:bg-gray-light-400 hover:bg-gray-light-300 active:bg-gray-dark-100">Remove</button>
            </div>
            <button @click.prevent="addBidOption"
              class="px-4 py-2 text-sm text-blue-500 border border-blue-500 rounded bg-gray-light-200 dark:bg-gray-dark-300 dark:hover:bg-gray-dark-200 dark:active:bg-gray-light-400 hover:bg-gray-light-300 active:bg-gray-dark-100">Add
              Option</button>
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
            @click="handleUpdateBid">
            Update
          </button>
        </div>
      </form>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router'

import type { APIResponse } from '@/types/api';
import type { Bid } from '@/types/bid';
import type { MyEvent } from '@/types/event';

import { apiGetBidByID, apiUpdateBid } from '@/api/bid/bid';
import { apiGetEvents } from '@/api/event/event';
import type { Run } from '@/types/run';
import { apiGetRuns } from '@/api/run/run';

const router = useRouter()
const route = useRoute()

const searchQueryRun = ref('');
const showDropdown = ref(false);
const dropdown = ref();
const setCreatingDisable = ref(false)

const allBidStatus = ref(["active", "disable"])
const types = ref(["bidwar", "goal", "total"])

const runs = ref<Run[]>([])
const selectedRun = ref<Run>()


const oldBid = ref<Bid>({ id: "", bidname: "", type: "bidwar", status: "available", goal: 0, description: "", current_amount: 0, create_new_options: false, bid_options: [], run_id: "" })
const newBid = ref<Bid>({ id: "", bidname: "", type: "bidwar", status: "available", goal: 0, description: "", current_amount: 0, create_new_options: false, bid_options: [], run_id: "" })


const filteredOptions = (() => {
  return runs.value.filter(option =>
    option.name.toLowerCase().includes(searchQueryRun.value.toLowerCase())
  );
});

const selectOption = (option: Run) => {
  searchQueryRun.value = option.name;
  showDropdown.value = false;
  selectedRun.value = option
};

const handleClickOutside = (event: Event) => {
  if (dropdown.value && !dropdown.value.contains(event.target)) {
    showDropdown.value = false;  // Cerrar el dropdown si se hace clic fuera de él
  }
};

watch(selectedRun, (newRun, _) => {
  const selected = runs.value.find(run => run.id === newRun?.id)
  if (newBid.value && selected) {
    newBid.value.run_id = selected.id
  }
})

const getRuns = async () => {
  try {
    const response: APIResponse<Run[]> = await apiGetRuns("")
    runs.value = response.data
  } catch (error) {
    console.error("Failed to get runs:", error);
    alert("There was an error getting runs. Please try again.");
    router.push('/bids')
  }
}

watch(() => newBid.value.type, (newType, oldType) => {
  if (newType !== 'bidwar') {
    setCreatingDisable.value = true
    newBid.value.bid_options = [];
    newBid.value.create_new_options = false
  }
});


function addBidOption() {
  newBid.value.bid_options.push({ id: "", name: '', current_amount: 0 });
}

function removeBidOption(index: number) {
  newBid.value.bid_options.splice(index, 1);
}


const handleUpdateBid = async () => {
  try {
    if (!newBid.value) return
    const response: APIResponse<Bid> = await apiUpdateBid(newBid.value)

    console.log("Bid updated:", response.data);
    router.push('/bids')
  } catch (error) {
    console.error("Failed to create bid:", error);
    alert("There was an error creating the bid. Please try again.");
  }
}

const handleGetBidById = async () => {
  try {
    const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
    if (!id) throw new Error("Error getting id");

    const response: APIResponse<Bid> = await apiGetBidByID(id)
    oldBid.value = response.data
    newBid.value = JSON.parse(JSON.stringify(response.data))

    selectedRun.value = runs.value.find(run => run.id === response.data.run_id)
    if (selectedRun.value) {
      selectOption(selectedRun.value)
    }
  } catch (error) {
    console.error("Failed to get bid:", error);
    alert("There was an error getting the bid. Please try again.");
    router.push('/bids')
  }
}

onMounted(async () => {
  document.addEventListener('click', handleClickOutside);
  await getRuns()
  await handleGetBidById()
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
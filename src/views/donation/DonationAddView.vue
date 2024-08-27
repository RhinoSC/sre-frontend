<template>
  <div class="flex flex-col items-center justify-center gap-6">
    <div class="">
      <div class="flex flex-col items-center justify-center gap-6">
        <h1 class="text-4xl font-bold text-center text-violet-600">Add new donation</h1>
      </div>
    </div>
    <div class="w-full">
      <form @submit.prevent class="flex flex-col items-center justify-center">
        <div class="max-w-3xl px-4 py-2 rounded-lg shadow-2xl">
          <div class="flex flex-wrap mb-6 -mx-3">
            <div class="w-1/2 px-3">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-name">
                Name
              </label>
              <input v-model="newDonation.name"
                class="block w-full px-4 py-3 mb-1 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
                id="grid-name" type="text" placeholder="Your name">
              <transition name="fade">
                <span v-if="!validations.name" class="text-xs text-red-500">Name is required.</span>
              </transition>
            </div>
            <div class="w-1/2 px-3">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-email">
                Email
              </label>
              <input v-model="newDonation.email"
                class="block w-full px-4 py-3 mb-1 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
                id="grid-email" type="email" placeholder="Your email">
              <transition name="fade">
                <span v-if="!validations.email" class="text-xs text-red-500">Valid email is required.</span>
              </transition>
            </div>
          </div>
          <div class="flex flex-wrap mb-6 -mx-3">
            <div class="w-1/2 px-3">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-amount">
                Amount
              </label>
              <input v-model="newDonation.amount"
                class="block w-full px-4 py-3 mb-1 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
                id="grid-amount" type="number" min="0" placeholder="Donation amount">
              <transition name="fade">
                <span v-if="!validations.amount" class="text-xs text-red-500">Amount should be greater than zero.</span>
              </transition>
            </div>
            <div class="flex items-center w-1/2 px-3">
              <div class="flex flex-row items-center justify-center gap-2">
                <input type="checkbox" id="checkbox" v-model="newDonation.to_bid"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label for="checkbox"> Donation goes to an incentive?</label>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap items-center justify-center mb-6 -mx-3">
            <div class="flex flex-col w-full px-3">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-first-name">
                Description
              </label>
              <textarea v-model="newDonation.description"
                class="block p-2.5 w-full h-24 text-sm rounded-lg border px-4 py-3 mb-1 leading-tight border-gray-200 appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600 resize-none"
                placeholder="Write your thoughts here..." maxlength="300"></textarea>
              <transition name="fade">
                <span v-if="!validations.description" class="text-xs text-red-500">Description should not exceed 300
                  characters.</span>
              </transition>
            </div>
          </div>
          <transition name="fade">
            <div class="flex flex-wrap items-center justify-center h-20 mb-6 -mx-4 bg-violet-600"
              v-if="newDonation.to_bid">
              <h1 class="text-4xl font-bold text-center text-white-smoke">Incentive selector</h1>
            </div>
          </transition>
          <transition name="fade">
            <div class="flex flex-wrap items-center justify-center mb-6 -mx-3" v-if="newDonation.to_bid">
              <div class="flex flex-col w-full px-3">
                <DonationBidSelector :amount="newDonation.amount" :runs="runs" @save-bid="saveBidOptions($event)"
                  @remove-bid="removeBidOptions">
                </DonationBidSelector>
              </div>
            </div>
          </transition>
          <div class="flex flex-row items-center justify-center gap-2 font-bold">
            <RouterLink to="/runs">
              <button
                class="px-4 py-2 text-sm border rounded text-gray-dark-400 bg-gray-light-200 dark:bg-gray-dark-300 dark:text-white-smoke dark:hover:bg-gray-dark-200 dark:active:bg-gray-light-400 border-violet-600 hover:bg-gray-light-300 active:bg-gray-dark-100">
                Cancel
              </button>
            </RouterLink>
            <button
              class="px-4 py-2 text-sm text-white border rounded bg-violet-600 border-violet-600 hover:bg-violet-700 active:bg-violet-900"
              @click="validateForm">
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

import DonationBidSelector from '@/components/donation/DonationBidSelector.vue';

import type { APIResponse } from '@/types/api';
import type { BidDetailsDonationDTO, Donation, DonationDTO } from '@/types/donation';

import { apiCreateDonation } from '@/api/donation/donation';
import type { Run } from '@/types/run';
import { apiGetRuns } from '@/api/run/run';
import { useEventStore } from '@/stores/useEventStore';
import { storeToRefs } from 'pinia';

const eventStore = useEventStore()
const { selectedEvent } = storeToRefs(eventStore)

watch(selectedEvent, (newEvent) => {
  if (newEvent) {
    console.log("Selected event changed:", newEvent)
    newDonation.value.event_id = newEvent.id
  }
})

const router = useRouter();
const runs = ref<Run[]>([]);

const newDonation = ref<DonationDTO>({
  name: "",
  to_bid: false,
  time_mili: new Date().getTime(),
  event_id: "",
  email: "",
  description: "",
  bid_details: { bid_id: "", create_new_options: false },
  amount: 0,
});

const validations = ref({
  name: true,
  email: true,
  amount: true,
  description: true,
});

const validateForm = () => {
  validations.value.name = !!newDonation.value.name;
  validations.value.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newDonation.value.email);
  validations.value.amount = Number(newDonation.value.amount) > 0;
  validations.value.description = newDonation.value.description.length <= 300;

  if (validations.value.name && validations.value.email && validations.value.amount && validations.value.description) {
    handleCreateDonation();
  } else {
    alert("Please fill out the form correctly.");
  }
};

const saveBidOptions = ($event: BidDetailsDonationDTO) => {
  newDonation.value.bid_details = $event
}

const removeBidOptions = () => {
  newDonation.value.bid_details = undefined
}

const getRuns = async () => {
  try {
    const response: APIResponse<Run[]> = await apiGetRuns("bids");
    runs.value = response.data;
  } catch (error) {
    console.error("Failed to get runs:", error);
    alert("There was an error getting runs. Please try again.");
    router.push('/donations');
  }
};

const handleCreateDonation = async () => {
  try {
    if (!selectedEvent) {
      alert("select an event to donate")
      return
    }
    const response: APIResponse<Donation> = await apiCreateDonation(newDonation.value);
    console.log("Donation created:", response.data);
    router.push('/donations');
  } catch (error) {
    console.error("Failed to create donation:", error);
    alert("There was an error creating the donation. Please try again.");
  }
};

onMounted(() => {
  getRuns();
  if (selectedEvent) {
    newDonation.value.event_id = selectedEvent.value.id
  }
});

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

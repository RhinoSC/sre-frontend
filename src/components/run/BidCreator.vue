<template>
  <div class="flex flex-col items-start justify-center p-3">
    <!-- Formulario para agregar un nuevo bid -->
    <div class="flex flex-col items-start justify-center w-full mb-4">
      <div class="flex flex-row items-center justify-between w-full gap-2 mb-2">
        <h1 class="text-xl font-semibold ">Add Bid</h1>
        <button
          class="px-4 py-2 text-sm text-white border rounded bg-violet-600 border-violet-600 hover:bg-violet-700 active:bg-violet-900"
          @click="handleSaveBids">
          Save Bids
        </button>
      </div>
      <div class="w-full">
        <form @submit.prevent="addBid" class="flex flex-wrap gap-2 mb-6 -mx-3">
          <div class="flex flex-wrap w-full gap-2">
            <div class="basis-1 grow">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="bid-name">Bid Type</label>
              <input id="bid-name" v-model="newBid.bidname" type="text" placeholder="Bid Name"
                class="w-full px-4 py-3 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
                required />
            </div>
            <div class="basis-1 grow">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="bid-type">Bid Type</label>
              <select id="bid-type" v-model="newBid.type"
                class="w-full px-4 py-3 font-sans leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
                required>
                <option value="bidwar">Bidwar</option>
                <option value="total">Total</option>
                <option value="goal">Goal</option>
              </select>
            </div>
          </div>
          <div class="flex flex-wrap w-full gap-2">
            <div class="basis-1 grow">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="bid-goal">Bid goal</label>
              <input id="bid-goal" v-model.number="newBid.goal" type="number" placeholder="Goal"
                class="w-full px-4 py-3 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
                required />
            </div>
            <div class="basis-1 grow">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="bid-description">Bid
                Description</label>
              <textarea maxlength="300" id="bid-description" v-model="newBid.description" placeholder="Description"
                class="block p-2.5 h-24 w-full px-4 py-3 leading-tight border border-gray-200 rounded appearance-none resize-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"></textarea>
            </div>
          </div>

          <!-- Mostrar el formulario para BidOptions si el tipo es 'bidwar' -->
          <div v-if="newBid.type === 'bidwar'" class="w-full mt-4">
            <div class="flex flex-row items-center justify-start gap-2 mb-2">
              <h2 class="text-lg font-semibold">Bid Options</h2>
              <div>
                <input type="checkbox" id="checkbox" v-model="newBid.create_new_options"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label for="checkbox"> Allow creating new options?</label>
              </div>
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

          <button type="submit"
            class="w-full px-6 py-3 text-sm font-bold text-blue-500 border border-blue-500 rounded bg-gray-light-200 dark:bg-gray-dark-300 dark:hover:bg-gray-dark-200 dark:active:bg-gray-light-400 hover:bg-gray-light-300 active:bg-gray-dark-100">Add
            Bid</button>
        </form>
      </div>
    </div>

    <!-- Lista de bids -->
    <div v-for="(bid, index) in bids" :key="index"
      class="flex flex-col w-full gap-2 p-4 mb-4 border rounded bg-gray-light-200 dark:bg-gray-dark-300">
      <h3 class="mb-2 text-lg font-semibold">{{ bid.bidname }} ({{ bid.type }})</h3>
      <p>Goal: {{ bid.goal }}</p>
      <p>Current Amount: {{ bid.current_amount }}</p>
      <p>Description: {{ bid.description }}</p>

      <!-- Lista de opciones de bid si es un 'bidwar' -->
      <div v-if="bid.type === 'bidwar'" class="w-full mt-2">
        <h4 class="mb-2 font-semibold text-md">Options</h4>
        <ul>
          <li v-for="(option, optionIndex) in bid.bid_options" :key="optionIndex"
            class="flex items-center justify-between py-1 border-b">
            <span>{{ option.name }}: {{ option.current_amount }}</span>
          </li>
        </ul>
      </div>

      <!-- Botón para eliminar el bid -->
      <button @click="removeBid(index)"
        class="px-4 py-2 text-sm text-red-500 border border-red-500 rounded bg-gray-light-200 dark:bg-gray-dark-300 dark:hover:bg-gray-dark-200 dark:active:bg-gray-light-400 hover:bg-gray-light-300 active:bg-gray-dark-100">Remove
        Bid</button>
    </div>

    <!-- Validación para asegurar que al menos un bid exista -->
    <div v-if="bids.length === 0" class="text-red-500">You must add at least one bid.</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { BidDTO, BidOption } from '@/types/bid';

const emit = defineEmits(['addBids'])

const bids = ref<BidDTO[]>([]);
const newBid = ref<BidDTO>({
  bidname: '',
  goal: 0,
  current_amount: 0,
  description: '',
  type: 'bidwar', // Valor predeterminado
  create_new_options: false,
  status: "active",
  bid_options: []
});

// Función para agregar un nuevo bid
function addBid() {
  if (newBid.value.bidname.trim() && newBid.value.goal >= 0) {
    bids.value.push({ ...newBid.value, current_amount: 0 }); // Se inicializa con 0 el current_amount
    resetNewBid();
  }
}

// Función para agregar una nueva opción de bid en caso de 'bidwar'
function addBidOption() {
  newBid.value.bid_options.push({ name: '', current_amount: 0 });
}

// Función para eliminar una opción de bid
function removeBidOption(index: number) {
  newBid.value.bid_options.splice(index, 1);
}

// Función para eliminar un bid
function removeBid(index: number) {
  bids.value.splice(index, 1);
}

// Función para guardar los bids
function handleSaveBids() {
  emit("addBids", bids.value);
}

// Resetear el formulario
function resetNewBid() {
  newBid.value = {
    bidname: '',
    goal: 0,
    current_amount: 0,
    description: '',
    type: 'bidwar',
    create_new_options: false,
    status: "active",
    bid_options: []
  };
}
</script>

<style scoped>
/* Agrega estilos específicos aquí si es necesario */
</style>

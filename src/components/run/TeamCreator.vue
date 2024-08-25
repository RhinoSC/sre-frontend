<template>
  <div class="flex flex-col items-start justify-center p-3" v-if="users.length > 0">
    <!-- Formulario para agregar un nuevo equipo -->
    <div class="flex flex-col items-start justify-center w-full mb-4">
      <div class="flex flex-row items-center justify-between w-full gap-2 mb-2">
        <h1 class="text-xl font-semibold ">Add Team </h1>
        <button
          class="px-4 py-2 text-sm text-white border rounded bg-violet-600 border-violet-600 hover:bg-violet-700 active:bg-violet-900"
          @click="handleSaveTeams">
          Save
        </button>
      </div>
      <div class="w-2/3">
        <form @submit.prevent="addTeam" class="flex flex-row items-start gap-2">
          <input v-model="newTeamName" type="text" placeholder="Nombre del equipo"
            class="w-2/3 px-4 py-3 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
            required />
          <button type="submit"
            class="px-6 py-3 text-sm font-bold text-blue-500 border border-blue-500 rounded bg-gray-light-200 dark:bg-gray-dark-300 dark:hover:bg-gray-dark-200 dark:active:bg-gray-light-400 hover:bg-gray-light-300 active:bg-gray-dark-100">Agregar
            Equipo</button>
        </form>
      </div>
    </div>
    <!-- Lista de equipos -->
    <div v-for="(team, index) in teams" :key="index"
      class="flex flex-col w-full gap-2 p-4 mb-4 border rounded bg-gray-light-200 dark:bg-gray-dark-300">
      <h3 class="mb-2 text-lg font-semibold">{{ team.team.name }}</h3>

      <div class="flex flex-row gap-4">
        <!-- Formulario para agregar jugadores -->
        <form @submit.prevent="addPlayer(index)" class="flex flex-row items-start justify-start w-7/12 gap-2">
          <div class="relative">
            <input v-model="team.searchQueryPlayer" type="text" placeholder="Buscar..."
              class="block w-full px-4 py-3 mb-3 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600" />
            <!-- Lista de sugerencias -->
            <ul v-if="showUserSuggestionList(index)"
              class="absolute left-0 z-10 w-full mt-1 overflow-y-auto border rounded-md shadow-lg dark:bg-gray-dark-300 bg-gray-light-200 max-h-60">
              <li v-for="option in filteredOptions(index)" :key="option.id" @click="selectOption(index, option)"
                class="p-2 cursor-pointer dark:hover:bg-gray-dark-400 hover:bg-gray-light-300 bg-gray-light-100 dark:bg-gray-dark-300">
                {{ option.name }}
              </li>
            </ul>
          </div>
          <!-- <input v-model="newPlayerName" type="text" placeholder="Nombre del jugador"
            class="block px-4 py-3 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
            required /> -->
          <button type="submit"
            class="px-6 py-3 text-sm font-bold text-green-500 border border-green-500 rounded bg-gray-light-200 dark:bg-gray-dark-300 dark:hover:bg-gray-dark-200 dark:active:bg-gray-light-400 hover:bg-gray-light-300 active:bg-gray-dark-100">Agregar
            Jugador</button>
        </form>
        <!-- Lista de jugadores -->
        <ul class="flex flex-col w-5/12">
          <li v-for="(player, playerIndex) in team.team.players" :key="playerIndex"
            class="flex items-center justify-between gap-10 py-1 border-b">
            {{ player.username }}
            <button @click="removePlayer(index, playerIndex)"
              class="px-4 py-2 text-sm font-bold text-red-500 border border-red-500 rounded bg-gray-light-200 dark:bg-gray-dark-300 dark:hover:bg-gray-dark-200 dark:active:bg-gray-light-400 hover:bg-gray-light-300 active:bg-gray-dark-100">Eliminar</button>
          </li>
        </ul>
      </div>
      <!-- Botón para eliminar el equipo -->
      <button @click="removeTeam(index)"
        class="px-4 py-2 text-sm font-bold text-red-500 border border-red-500 rounded bg-gray-light-200 dark:bg-gray-dark-300 dark:hover:bg-gray-dark-200 dark:active:bg-gray-light-400 hover:bg-gray-light-300 active:bg-gray-dark-100">Eliminar
        Equipo</button>
    </div>

    <!-- Validación para asegurar que al menos un equipo y un jugador existan -->
    <div v-if="teams.length === 0" class="text-red-500">Debes agregar al menos un equipo.</div>
    <div v-if="teams.length > 0 && !teams.some(team => team.team.players.length > 0)" class="text-red-500">Cada equipo
      debe
      tener al menos un jugador.</div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { apiGetUsers } from '@/api/user/user';
import type { APIResponse } from '@/types/api';
import type { Socials, User } from '@/types/user';
import type { TeamDTO } from '@/types/team';

const router = useRouter()

const emit = defineEmits(['addTeams'])

const users = ref<User[]>([])

const teams = ref<{ team: TeamDTO, searchQueryPlayer: string, openUserList: boolean }[]>([]);
const newTeamName = ref('');
const newPlayerSocials = ref<Socials>({ id: "" })
const newPlayer = ref<User>({ id: "", name: "", socials: newPlayerSocials.value, username: "" });


const showUserSuggestionList = (teamIndex: number) => {
  if (teams.value[teamIndex].searchQueryPlayer.length > 0) {
    return true
  }
  return false
}

const filteredOptions = ((teamIndex: number) => {
  return users.value.filter(option =>
    option.username.toLowerCase().includes(teams.value[teamIndex].searchQueryPlayer.toLowerCase())
  );
});

// Maneja la selección de una opción
function selectOption(index: number, option: User) {
  newPlayer.value = option;
  teams.value[index].searchQueryPlayer = option.username;
  teams.value[index].openUserList = false
}

// Función para agregar un nuevo equipo
function addTeam() {
  if (newTeamName.value.trim()) {
    teams.value.push({ team: { name: newTeamName.value, players: [] }, searchQueryPlayer: "", openUserList: false });
    newTeamName.value = '';
  }
}

// Función para agregar un nuevo jugador a un equipo
function addPlayer(teamIndex: number) {
  if (newPlayer.value.username.trim()) {
    teams.value[teamIndex].team.players.push({ id: newPlayer.value.id, username: newPlayer.value.username });
    newPlayer.value = { id: "", name: "", socials: newPlayerSocials.value, username: "" };
    teams.value[teamIndex].searchQueryPlayer = ""
    teams.value[teamIndex].openUserList = false
  }
}

// Función para eliminar un jugador de un equipo
function removePlayer(teamIndex: number, playerIndex: number) {
  teams.value[teamIndex].team.players.splice(playerIndex, 1);
}

// Función para eliminar un equipo
function removeTeam(index: number) {
  teams.value.splice(index, 1);
}

const getUsers = async () => {
  try {
    const response: APIResponse<User[]> = await apiGetUsers()
    users.value = response.data

    console.log(users.value)
  } catch (error) {
    console.error("Failed to get users:", error);
    alert("There was an error getting users. Please try again.");
    router.push('/runs')
  }
}

const handleSaveTeams = () => {
  const newTeams: TeamDTO[] = teams.value.map(team => {
    return { name: team.team.name, players: team.team.players }
  })
  emit("addTeams", newTeams)
}

onMounted(() => {
  getUsers()
})
</script>

<style scoped>
/* Agrega estilos específicos aquí si es necesario */
</style>

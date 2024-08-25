<template>
  <div class="flex flex-row items-center w-4/5">
    <div class="flex flex-row items-center justify-between flex-grow w-1/3 text-xl">
      <div><RouterLink to="/">Home</RouterLink></div>
      <div><RouterLink to="/schedules">Schedules</RouterLink></div>
      <div><RouterLink to="/runs">Runs</RouterLink></div>
      <div><RouterLink to="/prizes">Prizes</RouterLink></div>
      <div><RouterLink to="/bids">Bids</RouterLink></div>
      <div><RouterLink to="/donations">Donations</RouterLink></div>
      <div><RouterLink to="/users">Users</RouterLink></div>
    </div>
    <div class="flex justify-end w-1/3">
      <div class="flex flex-row items-center justify-center">
        <ThemeToggle />
        <RouterLink to="/schedules">
          <button
            class="px-3 py-1.5 text-sm text-white border rounded  bg-violet-600 border-violet-600 hover:bg-violet-700 active:bg-violet-900"
          >
            Logout
          </button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ThemeToggle from './ThemeToggle.vue';
</script>
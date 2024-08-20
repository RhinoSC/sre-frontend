<template>
  <div class="flex flex-col items-center justify-center gap-16 mt-12">
    <div>
      <h1 class="text-4xl font-bold text-center text-violet-600">SpeedrunsEspañol X</h1>
    </div>
    <div class="flex flex-col items-center justify-center gap-4 text-xl">
      <RouterLink class="h-12 text-center w-96" to="/schedules">
        <div class="py-1 border dark:bg-gray-dark-300 bg-gray-light-200 rounded-2xl dark:border-violet-600 dark:hover:bg-gray-light-400 dark:active:bg-gray-dark-100 border-gray-dark-100 hover:bg-gray-light-300 active:bg-gray-dark-100">
          Schedules (100)
        </div>
      </RouterLink>
      <RouterLink class="h-12 text-center w-96"  to="/runs">
        <div class="py-1 border dark:bg-gray-dark-300 bg-gray-light-200 rounded-2xl dark:border-violet-600 dark:hover:bg-gray-light-400 dark:active:bg-gray-dark-100 border-gray-dark-100 hover:bg-gray-light-300 active:bg-gray-dark-100">
          Runs (100)
        </div>
      </RouterLink>
      <RouterLink class="h-12 text-center w-96"  to="/prizes">
        <div class="py-1 border dark:bg-gray-dark-300 bg-gray-light-200 rounded-2xl dark:border-violet-600 dark:hover:bg-gray-light-400 dark:active:bg-gray-dark-100 border-gray-dark-100 hover:bg-gray-light-300 active:bg-gray-dark-100">
          Prizes (100)
        </div>
      </RouterLink>
      <RouterLink class="h-12 text-center w-96"  to="/bids">
        <div class="py-1 border dark:bg-gray-dark-300 bg-gray-light-200 rounded-2xl dark:border-violet-600 dark:hover:bg-gray-light-400 dark:active:bg-gray-dark-100 border-gray-dark-100 hover:bg-gray-light-300 active:bg-gray-dark-100">
          Bids (100)
        </div>
      </RouterLink>
      <RouterLink class="h-12 text-center w-96"  to="/donations">
        <div class="py-1 border dark:bg-gray-dark-300 bg-gray-light-200 rounded-2xl dark:border-violet-600 dark:hover:bg-gray-light-400 dark:active:bg-gray-dark-100 border-gray-dark-100 hover:bg-gray-light-300 active:bg-gray-dark-100">
          Donations (100)
        </div>
      </RouterLink>
      <RouterLink class="h-12 text-center w-96"  to="/users">
        <div class="py-1 border dark:bg-gray-dark-300 bg-gray-light-200 rounded-2xl dark:border-violet-600 dark:hover:bg-gray-light-400 dark:active:bg-gray-dark-100 border-gray-dark-100 hover:bg-gray-light-300 active:bg-gray-dark-100">
          Users (100)
        </div>
      </RouterLink>
    </div>
  </div>


</template>

<script setup lang="ts">
</script>

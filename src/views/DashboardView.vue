<template>
  <div>
    <h2>Dashboard</h2>

    <!-- <button @click="logout">Logout</button> -->
    <Logout></Logout>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import Logout from '../components/auth/Logout.vue'
</script>

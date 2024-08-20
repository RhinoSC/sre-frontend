<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="username" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
      <button
        class="px-4 py-2 text-white rounded shadow bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
      >
        Botón Primario
      </button>
      <button
        class="px-4 py-2 text-white rounded shadow bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
      >
        Botón Primario
      </button>
      <button
        class="px-4 py-2 text-gray-900 bg-gray-300 rounded shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Botón Secundario
      </button>
      <button
        class="px-4 py-2 text-gray-100 bg-gray-700 rounded shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Botón Secundario
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../auth/useAuth'

const router = useRouter()

const { userLogin } = useAuth()
const username = ref('')
const password = ref('')

const handleLogin = async () => {
  await userLogin(username.value, password.value)
  // Redirect after login
  router.push('/')

  return { username, password, handleLogin }
}
</script>

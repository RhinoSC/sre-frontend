<template>
  <button>
    <a
      class="px-6 py-2 min-w-[120px] text-center text-violet-600 border border-violet-600 rounded hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring"
      @click="handleLogin"
    >
      Log out
    </a>
  </button>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../auth/useAuth'

const router = useRouter()
const { logout } = useAuth()

const handleLogin = async () => {
  logout()
  router.push('/login')
}
</script>

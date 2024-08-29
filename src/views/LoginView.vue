<template>
  <div class="flex flex-col items-center justify-center h-full">
    <div class="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg dark:bg-gray-dark-300">
      <h2 class="mb-6 text-2xl font-bold text-center text-violet-600 dark:text-violet-400">Login</h2>
      <VForm @submit="handleLogin" class="space-y-6" :validation-schema="schema">
        <Field v-model="username" name="username"
          class="block w-full px-4 py-3 mb-3 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-400 bg-gray-light-200 focus:outline-none focus:border-violet-600"
          type="text" placeholder="Username" />
        <ErrorMessage name="username" class="mt-1 text-xs text-red-500" />
        <Field v-model="password" name="password"
          class="block w-full px-4 py-3 mb-3 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-400 bg-gray-light-200 focus:outline-none focus:border-violet-600"
          type="password" placeholder="Password" />
        <ErrorMessage name="password" class="mt-1 text-xs text-red-500" />
        <button
          class="block w-full px-4 py-2 text-sm font-bold text-center text-white rounded-lg bg-violet-600 hover:bg-violet-700 active:bg-violet-900 focus:outline-none focus:bg-violet-700"
          type="submit">
          Login
        </button>
        <div v-if="loading" class="flex items-center justify-center mt-4">
          <svg class="w-6 h-6 animate-spin text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V4a10 10 0 00-10 10h2z"></path>
          </svg>
        </div>
      </VForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../auth/useAuth'
import { defineRule, Field, Form as VForm, ErrorMessage } from 'vee-validate';
import { required } from '@vee-validate/rules';
import * as yup from 'yup';
import { storeToRefs } from 'pinia';

defineRule('required', required);

const schema = yup.object().shape({
  username: yup.string().required("Name is required"),
  password: yup.string().required("Password is required"),
});

const router = useRouter()

const useAuth = useAuthStore()
const { loading } = storeToRefs(useAuth)
const username = ref('')
const password = ref('')

const handleLogin = async () => {
  await useAuth.userLogin(username.value, password.value)
  // Redirect after login
  router.push('/')
}
</script>

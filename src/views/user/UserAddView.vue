<template>
  <div class="flex flex-col items-center justify-center gap-6">
    <div class="">
      <div class="flex flex-col items-center justify-center gap-6">
        <h1 class="text-4xl font-bold text-center text-violet-600">Add new user</h1>
      </div>
    </div>
    <div class="w-full">
      <VForm @submit="handleCreateUser" class="flex flex-col items-center justify-center" :validation-schema="schema">
        <div class="max-w-3xl px-4 py-2 rounded-lg shadow-2xl">
          <div class="flex flex-wrap mb-6 -mx-3">
            <div class="w-1/2 px-3">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-name">
                Name
              </label>
              <Field name="name" v-model="newUser.name" as="input"
                class="block w-full px-4 py-3 mb-3 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
                id="name" type="text" placeholder="User name">
              </Field>
              <ErrorMessage name="name" class="mt-1 text-xs text-red-500" />
            </div>
            <div class="w-1/2 px-3">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-username">
                Username
              </label>
              <Field name="username" v-model="newUser.username" as="input"
                class="block w-full px-4 py-3 mb-3 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
                id="grid-username" type="text" placeholder="Username">
              </Field>
              <ErrorMessage name="username" class="mt-1 text-xs text-red-500" />
            </div>
          </div>
          <div class="flex flex-wrap mb-6 -mx-3">
            <div class="w-1/2 px-3">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-twitch">
                Twitch
              </label>
              <Field name="socials.twitch" v-model="newUser.socials.twitch" as="input"
                class="block w-full px-4 py-3 mb-3 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
                id="grid-twitch" type="url" placeholder="Twitch User">
              </Field>
              <ErrorMessage name="socials.twitch" class="mt-1 text-xs text-red-500" />
            </div>
            <div class="w-1/2 px-3">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-twitter">
                Twitter
              </label>
              <Field name="twitter" v-model="newUser.socials.twitter" as="input"
                class="block w-full px-4 py-3 mb-3 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
                id="grid-twitter" type="url" placeholder="Twitter User">
              </Field>
              <ErrorMessage name="twitter" class="mt-1 text-xs text-red-500" />
            </div>
          </div>
          <div class="flex flex-wrap mb-6 -mx-3">
            <div class="w-1/2 px-3">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-youtube">
                Youtube
              </label>
              <Field name="youtube" v-model="newUser.socials.youtube" as="input"
                class="block w-full px-4 py-3 mb-3 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
                id="grid-youtube" type="url" placeholder="Youtube User">
              </Field>
              <ErrorMessage name="youtube" class="mt-1 text-xs text-red-500" />
            </div>
            <div class="w-1/2 px-3">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-facebook">
                Facebook
              </label>
              <Field name="facebook" v-model="newUser.socials.facebook" as="input"
                class="block w-full px-4 py-3 mb-3 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600"
                id="grid-facebook" type="url" placeholder="Facebook User">
              </Field>
              <ErrorMessage name="facebook" class="mt-1 text-xs text-red-500" />
            </div>
          </div>
          <div class="flex flex-row items-center justify-end gap-2 font-bold">
            <RouterLink to="/users">
              <button
                class="px-4 py-2 text-sm border rounded text-gray-dark-400 bg-gray-light-200 dark:bg-gray-dark-300 dark:text-white-smoke dark:hover:bg-gray-dark-200 dark:active:bg-gray-light-400 border-violet-600 hover:bg-gray-light-300 active:bg-gray-dark-100">
                Cancel
              </button>
            </RouterLink>
            <button
              class="px-4 py-2 text-sm text-white border rounded bg-violet-600 border-violet-600 hover:bg-violet-700 active:bg-violet-900"
              type="submit">
              Create
            </button>
          </div>
        </div>
      </VForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineRule, Field, Form as VForm, ErrorMessage } from 'vee-validate';
import { required, url } from '@vee-validate/rules';
import * as yup from 'yup';
import { useRouter } from 'vue-router'
import { ref } from 'vue'

import type { APIResponse } from '@/types/api';
import type { Socials, User, UserDTO } from '@/types/user';

import { apiCreateUser } from '@/api/user/user';

defineRule('required', required);
defineRule('url', url);

const router = useRouter()

const newUser = ref<UserDTO>({
  name: "",
  username: "",
  socials: { twitch: "", twitter: "", youtube: "", facebook: "" } as Socials
});

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  username: yup.string().required("Username is required"),
  socials: yup.object({
    twitch: yup.string().required("Twitch is required"),
    twitter: yup.string().notRequired(),
    youtube: yup.string().notRequired(),
    facebook: yup.string().notRequired()
  })
});

const handleCreateUser = async () => {
  try {
    const response: APIResponse<User> = await apiCreateUser(newUser.value)
    console.log("User created:", response.data);
    router.push('/users')
  } catch (error) {
    console.error("Failed to create user:", error);
    alert("There was an error creating the user. Please try again.");
  }
};
</script>

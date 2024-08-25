<template>
  <div class="relative">
    <input v-model="searchQuery" @input="debouncedSearch" type="text" placeholder="Search a Category..."
      class="block w-full px-4 py-3 mb-3 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600" />
    <ul v-if="results.length > 0 && searchQuery"
      class="absolute left-0 z-10 w-full mt-1 overflow-y-auto border rounded-md shadow-lg dark:bg-gray-dark-300 bg-gray-light-200 max-h-60">
      <li v-for="result in results" :key="result.id" @click="selectResult(result)"
        class="p-2 cursor-pointer dark:hover:bg-gray-dark-400 hover:bg-gray-light-300">
        {{ result.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import _ from 'lodash';
import type { APIResponse } from '@/types/api';
import type { TwitchCategoriesResponse, TwitchCategory } from '@/types/run';
import { apiGetTwitchCategories, apiGetTwitchCategoryByID } from '@/api/run/run';

interface Props {
  category_id?: string
}

const props = defineProps<Props>()

const emit = defineEmits(['selectCategory'])


const selectedCategory = ref<TwitchCategory>();
const searchQuery = ref("");
const fromEdit = ref(false)
const results = ref<TwitchCategory[]>([]);

const fetchCategories = async (query: string) => {
  if (!fromEdit) return
  if (query.length < 2) return; // Limitar las búsquedas con al menos 2 caracteres

  try {
    const response: APIResponse<TwitchCategory[]> = await apiGetTwitchCategories(query)

    results.value = response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

const debouncedSearch = _.debounce(() => {
  fetchCategories(searchQuery.value)
}, 700);

const selectResult = (result: TwitchCategory) => {
  selectedCategory.value = { id: result.id, box_art_url: result.box_art_url, name: result.name };
  searchQuery.value = result.name
  emit('selectCategory', selectedCategory.value)
  results.value = []; // Limpiar resultados después de la selección
};

const getCategoryByID = async (id: string) => {
  fromEdit.value = true
  try {
    const response: APIResponse<TwitchCategory[]> = await apiGetTwitchCategoryByID(id)

    if (response.data.length > 0) {
      selectedCategory.value = response.data[0];
      searchQuery.value = selectedCategory.value.name
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
  fromEdit.value = false
}

onMounted(async () => {
  if (props.category_id) {
    await getCategoryByID(props.category_id)
  }
})
</script>
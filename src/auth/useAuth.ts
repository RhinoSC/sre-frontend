import { ref, computed } from 'vue';
import type { loginResponse } from '../types/api';
import { defineStore } from 'pinia';
import { login, setAuthToken } from '@/api/axios';


export const useAuthStore = defineStore('auth', () => {
  // Ref para almacenar el token
  const token = ref<string | null>(localStorage.getItem('token'));
  // Ref para manejar el estado de carga
  const loading = ref(false);

  // Verificación básica del estado de autenticación
  const isLoggedIn = ref(false)
  isLoggedIn.value = localStorage.getItem('token') !== null ? true : false

  const userLogin = async (username: string, password: string) => {
    loading.value = true; // Comienza a cargar
    try {
      const response = await login(username, password);
      if (response.status !== 201) throw new Error('Login failed');

      const data: loginResponse = await response.data;
      token.value = data.data.token;
      localStorage.setItem('token', token.value);
      isLoggedIn.value = true
      setAuthToken(token.value); // Actualiza el encabezado de autorización
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false; // Termina de cargar
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    isLoggedIn.value = false
  };

  return { token, isLoggedIn, loading, userLogin, logout };

})



import { ref, computed } from 'vue';
import type { loginResponse } from '../types/api';
import { login } from '../api/axios';

// Ref para almacenar el token
const token = ref<string | null>(localStorage.getItem('token'));
// Ref para manejar el estado de carga
const loading = ref(false);

// Verificación básica del estado de autenticación
const isLoggedIn = computed(() => token.value !== null);

export function useAuth() {
  const userLogin = async (username: string, password: string) => {
    loading.value = true; // Comienza a cargar
    try {
      const response = await login(username, password);
      if (response.status !== 201) throw new Error('Login failed');

      const data: loginResponse = await response.data;
      token.value = data.data.token;
      localStorage.setItem('token', token.value);
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false; // Termina de cargar
    }
  };

  const logout = () => {
    token.value = null;
    localStorage.removeItem('token');
  };

  return { token, isLoggedIn, loading, userLogin, logout };
}

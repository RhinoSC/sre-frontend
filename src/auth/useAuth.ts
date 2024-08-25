import { ref } from 'vue';
import type { loginResponse } from '../types/api'
import { login } from '../api/axios';

const token = ref<string | null>(localStorage.getItem('token'));

export function useAuth() {
  const userLogin = async (username: string, password: string) => {
    try {
      const response = await login(username, password)
      if (response.status != 201) throw new Error('Login failed');
      
      const data: loginResponse = await response.data;
      token.value = data.data.token;
      localStorage.setItem('token', token.value);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    token.value = null;
    localStorage.removeItem('token');
  };

  return { token, userLogin, logout };
}

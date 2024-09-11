// src/axios.ts
import { useAuthStore } from '@/auth/useAuth';
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BE_URL}`, // Cambia esto a la URL de tu backend
  headers: {
    'Content-Type': 'application/json'
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// // Interceptor para manejar respuestas de error
apiClient.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa, simplemente la retornamos
    return response;
  },
  (error) => {
    // const router = useRouter();
    const authStore = useAuthStore(); // Acceder al store de autenticación

    if (error.response && error.response.status === 401) {
      // El token ha expirado o es inválido
      authStore.logout(); // Limpia el estado de autenticación (token, user, etc.)
      // router.push('/login'); // Redirige al login
      window.location.href = '/login'; // Redirige al usuario a la página de login
    }
    return Promise.reject(error);
  }
);

// Función para actualizar el token en el encabezado
export const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers['Authorization'];
  }
  // console.log(apiClient.defaults.headers['Authorization'])
};

export const login = async (username: string, password: string) => {
  const response = await apiClient.post('/admins/login', { username, password }, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  return response;
};

// Exporta otros métodos según sea necesario

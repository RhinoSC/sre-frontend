// src/axios.ts
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

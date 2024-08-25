// src/axios.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // Cambia esto a la URL de tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (username: string, password: string) => {
  const response = await apiClient.post('/admins/login', { username, password }, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  console.log(response)
  return response
};

// Exporta otros métodos según sea necesario

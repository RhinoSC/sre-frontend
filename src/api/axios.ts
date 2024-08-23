// src/axios.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // Cambia esto a la URL de tu backend
  headers: {
    'Content-Type': 'application/json',
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjQ0NjI5NTEsInVzZXJfaWQiOiJhZG1pbjEifQ.aVSy_8IuCOj4Rgpm0Gj6k5UiX5DbnuJ9tR43g7CtkbU"
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

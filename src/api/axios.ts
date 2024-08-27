// src/axios.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // Cambia esto a la URL de tu backend
  headers: {
    'Content-Type': 'application/json',
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjQ3ODMzNzUsInVzZXJfaWQiOiJhZG1pbjEifQ.wo3vu4GSa3BB7x77bQsNhrwQ3w-oqoUNZmF46l25bQ4"
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

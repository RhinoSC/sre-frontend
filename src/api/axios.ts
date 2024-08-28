// src/axios.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // Cambia esto a la URL de tu backend
  headers: {
    'Content-Type': 'application/json',
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjQ4ODk0NTMsInVzZXJfaWQiOiJhZG1pbjEifQ.n7BHtYIxip1rNMA6IuyHk78lU3x8SUkGpCrthH0NAUA"
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

// src/axios.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // Cambia esto a la URL de tu backend
  headers: {
    'Content-Type': 'application/json',
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjQ2OTI1MDcsInVzZXJfaWQiOiJhZG1pbjEifQ.m0ADgX8_otC0Yu1kjiaF3qFSLNdlwRKaKvR5eqXd3rg"
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

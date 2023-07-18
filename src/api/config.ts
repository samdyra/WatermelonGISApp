import axios, { type AxiosInstance } from 'axios';

const apiConfig: AxiosInstance = axios.create({
  baseURL: 'http:///127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export default apiConfig;

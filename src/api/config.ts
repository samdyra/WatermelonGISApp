import axios, { type AxiosInstance } from 'axios';

const apiConfig: AxiosInstance = axios.create({
  baseURL: 'http://103.6.53.254:20280',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export default apiConfig;

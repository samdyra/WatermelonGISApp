import { type AxiosResponse } from 'axios';
import apiConfig from './config';

export const postData = async (endpoint: string, data: object) => {
  try {
    const response = await apiConfig.post(`/${endpoint}`, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getData = async (endpoint: string) => {
  try {
    const response = await apiConfig.get(`/${endpoint}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export async function axiosGet<T>(endpoint: string) {
  try {
    const response: AxiosResponse<T> = await apiConfig.get(`/${endpoint}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function axiosDelete<T>(endpoint: string, data: object, effects: () => void) {
  try {
    const response: AxiosResponse<T> = await apiConfig.delete(`/${endpoint}`, data);
    effects();
    return response;
  } catch (error) {
    console.error(error);
  }
}

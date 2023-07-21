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

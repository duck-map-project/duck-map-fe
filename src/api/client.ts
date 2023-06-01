import axios, { AxiosInstance } from 'axios';

const baseURL = process.env.BASE_URL;

export const client: AxiosInstance = axios.create({
  baseURL: baseURL,
});

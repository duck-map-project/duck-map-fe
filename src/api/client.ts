import axios from 'axios';
import qs from 'qs';

axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  },
});

export default client;

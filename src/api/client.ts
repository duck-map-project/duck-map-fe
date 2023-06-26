import axios from 'axios';
import qs from 'qs';

axios.defaults.withCredentials = true;

const client = axios.create({
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  },
});

export default client;

import { AxiosError, AxiosResponse } from 'axios';

import { AuthRequest, SignupRequest } from '../types/auth';

import client from './client';

export const signup = async ({ username, email, password }: SignupRequest) => {
  const requestData: SignupRequest = {
    username,
    email,
    password,
  };

  try {
    const res = await client.post('/members/join', requestData);
    if (res.request.status === 200) {
      return 'success';
    }
  } catch (error) {
    throw error;
  }
};

export const signin = async ({ email, password }: AuthRequest) => {
  const requestData: AuthRequest = {
    email,
    password,
  };

  try {
    const res = await client.post('/auth/login', requestData);
    if (res.request.status === 200) {
      onSigninSuccess(res);
      return 'success';
    }
  } catch (error) {
    throw error;
  }
};

export const signout = async () => {
  try {
    const res = await client.post('/auth/logout');
    if (res.request.status === 200) {
      return 'success';
    }
  } catch (error) {
    throw error;
  }
};

export const getNewToken = async () => {
  try {
    const res = await client.post('/auth/reissue', {});
    if (res.status === 200) {
      onSigninSuccess(res);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 401) {
      }
    }
  }
};

export const onSigninSuccess = (res: AxiosResponse) => {
  const JWT_EXPIRY_TIME = 30 * 60 * 1000;
  const accessToken = res.headers.authorization;
  client.defaults.headers.common['Authorization'] = accessToken;
  setTimeout(getNewToken, JWT_EXPIRY_TIME - 60000);
};

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
    const accessToken = res.headers.authorization;
    if (res.request.status === 200) {
      client.defaults.headers.common['Authorization'] = accessToken;
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

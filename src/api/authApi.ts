import { AuthRequest, SignupRequest } from '../types/auth';

import { client } from './client';

export const signup = async ({ username, email, password }: SignupRequest) => {
  const requestData: SignupRequest = {
    username,
    email,
    password,
    userType: 'USER',
  };

  try {
    const res = await client.post('/members/join', requestData);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const signin = async ({ email, password }: AuthRequest) => {
  const requestData: AuthRequest = {
    email,
    password,
  };

  try {
    const res = await client.post('/auth/login', requestData);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const signout = async () => {
  try {
    client.get('/auth/logout');
  } catch (error) {
    console.error(error);
  }
};

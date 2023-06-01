// import axios from 'axios';
import { client } from './client';

interface AuthRequest {
  email: string;
  password: string;
}

interface SignupRequest extends AuthRequest {
  username: string;
  userType?: string;
}

export const signup = async ({ username, email, password }: SignupRequest) => {
  const requestData: SignupRequest = {
    username,
    email,
    password,
    userType: 'USER',
  };

  try {
    const res = await client.post('/users', requestData);
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
    await client.get('/auth/logout');
  } catch (error) {
    console.error(error);
  }
};

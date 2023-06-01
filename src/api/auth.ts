import { client } from './client';

interface AuthRequest {
  username: string;
  password: string;
}

interface SignupRequest extends AuthRequest {
  email: string;
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
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const signin = async ({ username, password }: AuthRequest) => {
  const requestData: AuthRequest = {
    username,
    password,
  };

  try {
    const res = await client.post('auth/login', requestData);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const signout = async () => {
  try {
    await client.get('auth/logout');
  } catch (error) {
    console.error(error);
  }
};

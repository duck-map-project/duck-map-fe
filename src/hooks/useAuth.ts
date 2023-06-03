import { useState } from 'react';

import { signin, signout, signup } from '../api/authApi';
import { SignupRequest, AuthRequest } from '../types/auth';

interface User {
  id: number;
  username: string;
  image: string;
  lastSearchArtist: number;
  token: string;
}

export interface Auth {
  user: User | null;
  signIn: (data: AuthRequest) => Promise<void>;
  signUp: (data: SignupRequest) => Promise<void>;
  signOut: () => void;
}

export const useAuth = (): Auth => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (data: AuthRequest) => {
    try {
      const signinResult = await signin(data);
      setUser(signinResult);
      localStorage.setItem('token', signinResult.token);
    } catch (err) {
      console.error(err);
    }
  };

  const signUp = async (data: SignupRequest) => {
    try {
      signup(data);
    } catch (err) {
      console.error(err);
    }
  };

  const signOut = () => {
    signout();
    localStorage.removeItem('token');
  };

  return { user, signIn, signUp, signOut };
};

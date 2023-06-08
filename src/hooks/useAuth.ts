import { Dispatch, SetStateAction, useState } from 'react';

import { signin, signout, signup } from '../api/authApi';
import { SignupRequest, AuthRequest } from '../types/auth';

export interface Auth {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  signIn: (data: AuthRequest) => Promise<void>;
  signUp: (data: SignupRequest) => Promise<void>;
  signOut: () => void;
}

export const useAuth = (): Auth => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  console.log(isLogin);

  const signIn = async (data: AuthRequest) => {
    try {
      await signin(data);
      setIsLogin(true);
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

  const signOut = async () => {
    await signout();
  };

  return { isLogin, setIsLogin, signIn, signUp, signOut };
};

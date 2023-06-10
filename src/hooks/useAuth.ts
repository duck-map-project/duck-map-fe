import { AxiosError } from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { signin, signout, signup } from '../api/authApi';
import { SignupRequest, AuthRequest } from '../types/auth';

import { useRouter } from './useRouter';

export interface Auth {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  signIn: (data: AuthRequest) => Promise<void>;
  signUp: (data: SignupRequest) => Promise<void>;
  signOut: () => void;
  errorMessage: ErrorMessage;
}

interface ErrorMessage {
  signin?: string;
  signup?: string;
  signout?: string;
}

export const useAuth = (): Auth => {
  const isLoginStored = localStorage.getItem('isLogin') === 'true';
  const [isLogin, setIsLogin] = useState<boolean>(isLoginStored);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({});
  const { routeTo } = useRouter();

  useEffect(() => {
    // isLogin 값 바뀔 때
    localStorage.setItem('isLogin', String(isLogin));
    console.log('isLogin 값 바뀔 때' + isLogin);
    console.log(localStorage.getItem('isLogin'));
  }, [isLogin]);

  const signIn = async (data: AuthRequest) => {
    try {
      const res = await signin(data);
      if (res === 'success') {
        setIsLogin(true);
        routeTo('/');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data);
        console.error(error);

        if (error.response?.data.code === 'A003') {
          setErrorMessage({
            signin: '아이디 또는 비밀번호를 잘못 입력했습니다.',
          });
        } else {
          setErrorMessage({ signin: '로그인에 실패했습니다.' });
        }
      }
    }
  };

  const signUp = async (data: SignupRequest) => {
    try {
      const res = await signup(data);
      if (res === 'success') {
        routeTo('/signin');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const code = error.response?.data.code;
        if (code === 'M001' || code === 'M002') {
          setErrorMessage({ signup: error.response?.data.message });
        } else {
          setErrorMessage({ signup: '회원가입에 실패했습니다.' });
        }
      }
    }
  };

  const signOut = async () => {
    try {
      const res = await signout();
      if (res === 'success') {
        setIsLogin(false);
        routeTo('/signin');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);

        setErrorMessage({ signout: '로그아웃에 실패했습니다.' });
      }
    }
  };

  return { isLogin, setIsLogin, signIn, signUp, signOut, errorMessage };
};

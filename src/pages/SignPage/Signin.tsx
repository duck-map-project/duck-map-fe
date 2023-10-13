import { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from 'styled-components';

import kakaoIcon from '../../assets/kakao-icon.svg';
import naverIcon from '../../assets/naver-icon.svg';
import AuthInput from '../../components/AuthInput';
import ResetPasswordModal from '../../components/modals/ResetPasswordModal';
import useInput from '../../hooks/useInput';
import { useRouter } from '../../hooks/useRouter';
import {
  useFetchUserMutation,
  useLoginMutation,
} from '../../features/auth/authApiSlice';
import { setCredentials, setUser } from '../../features/auth/authSlice';

import {
  PageTitle,
  PageWrapper,
  Form,
  NaverLoginButton,
  KakaoLoginButton,
  CircleButton,
  ErrorMessage,
  SubmitButton,
  NaverIcon,
  KakaoIcon,
} from './SignStyle';

const FormWithMargin = styled(Form)<{ $emailError: string | undefined }>`
  margin-bottom: 55px;
  & > input:nth-child(3) {
    margin-bottom: ${(props) => (props.$emailError ? '0' : '16px')};
  }
`;

const Signin = () => {
  const { routeTo } = useRouter();
  const [passwordModal, setPasswordModal] = useState<boolean>(false);
  const email = useInput('');
  const password = useInput('');
  const [login, { error }] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState('');
  const [fetchUser] = useFetchUserMutation();
  const dispatch = useDispatch();

  const getUser = async () => {
    const userData = await fetchUser({});
    if (userData && !('error' in userData)) {
      return userData;
    }
    return;
  };

  const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.value && password.value) {
      try {
        const userData = await login({
          email: email.value,
          password: password.value,
        }).unwrap();

        dispatch(setCredentials(userData.authorizationHeader));

        const user = await getUser();
        dispatch(setUser(user?.data));

        routeTo('/');
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (error && 'status' in error) {
      const errorData = error.data as { message: string };
      setErrorMessage(errorData.message);
    }
  }, [error]);

  return (
    <PageWrapper>
      {passwordModal ? (
        <ResetPasswordModal onClickButton={() => setPasswordModal(false)} />
      ) : null}
      <FormWithMargin onSubmit={handleSignin} noValidate $emailError="">
        <PageTitle>로그인</PageTitle>
        <AuthInput
          name="email"
          title="이메일"
          type="email"
          value={email.value}
          onChange={email.onChange}
          autoComplete="email"
          placeholder="이메일 입력"
        />

        <AuthInput
          name="password"
          title="비밀번호"
          type="password"
          value={password.value}
          onChange={password.onChange}
          autoComplete="current-password"
          placeholder="비밀번호 입력"
        />
        <SubmitButton>로그인하기</SubmitButton>
      </FormWithMargin>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <div>
        <CircleButton
          onClick={() => {
            routeTo('/signup');
          }}
        >
          회원가입
        </CircleButton>
        <CircleButton onClick={() => setPasswordModal(true)}>
          비밀번호 찾기
        </CircleButton>
      </div>
      <NaverLoginButton>
        <NaverIcon src={naverIcon} />
        네이버로 간편로그인
      </NaverLoginButton>
      <KakaoLoginButton>
        <KakaoIcon src={kakaoIcon} />
        카카오톡으로 간편로그인
      </KakaoLoginButton>
    </PageWrapper>
  );
};

export default Signin;

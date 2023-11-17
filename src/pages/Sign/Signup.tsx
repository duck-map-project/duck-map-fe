import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

import kakaoIcon from '../../assets/kakao-icon.svg';
import naverIcon from '../../assets/naver-icon.svg';
import AuthInput from '../../components/AuthInput';
import { useSignUpMutation } from '../../features/auth/services/authApiSlice';
import useForm, { Errors } from '../../hooks/useForm';
import { useRouter } from '../../hooks/useRouter';
import media from '../../utils/mediaQuery';

import {
  PageWrapper,
  PageTitle,
  Form,
  ErrorMessage,
  CenterErrorMessage,
  SubmitButton,
  NaverLoginButton,
  KakaoLoginButton,
  NaverIcon,
  KakaoIcon,
} from './SignStyle';

const SignupForm = styled(Form)<{ errors: Errors }>`
  height: fit-content;
  margin-bottom: 60px;
  padding-bottom: 60px;
  &::after {
    height: 100%;
    top: 8px;
    left: 8px;
    ${media.mobile`
      top: 10px;
      left: 9px;
    `}
  }
  & > input {
    &[name='email'] {
      margin-bottom: ${(props) => (props.errors.email ? '0' : '16px')};
    }
    &[name='password'] {
      margin-bottom: ${(props) => (props.errors.password ? '0' : '16px')};
    }
    &[name='passwordCheck'] {
      margin-bottom: ${(props) => (props.errors.passwordCheck ? '0' : '16px')};
    }
    &[name='username'] {
      margin-bottom: 0;
    }
  }
  ${media.mobile`
    margin-top: 28px;
    margin-bottom: 55px;
    padding: 34px 22px 55px;
  `}
`;

const Signup = () => {
  const [signUp, { error }] = useSignUpMutation();
  const [errorMessage, setErrorMessage] = useState('');
  const { routeTo } = useRouter();

  const handleSignup = async () => {
    if (
      inputs.username &&
      inputs.email &&
      inputs.password &&
      inputs.passwordCheck
    ) {
      const reqData = {
        username: inputs.username,
        email: inputs.email,
        password: inputs.password,
      };
      try {
        await signUp(reqData).unwrap();
        alert('회원가입 성공!');
        routeTo('/signin');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const { handleChange, handleSubmit, inputs, errors } = useForm(
    { email: '', password: '', passwordCheck: '', username: '' },
    handleSignup
  );

  useEffect(() => {
    setErrorMessage('');
  }, [inputs]);

  useEffect(() => {
    if (error && 'status' in error) {
      const errorData = error.data as { message: string };
      setErrorMessage(errorData.message);
    }
  }, [error]);

  return (
    <PageWrapper>
      <SignupForm onSubmit={handleSubmit} noValidate errors={errors}>
        <PageTitle>회원가입</PageTitle>
        <AuthInput
          name="email"
          title="이메일을 입력해 주세요."
          type="email"
          value={inputs.email}
          onChange={handleChange}
          autoComplete="email"
          isInputValid={!errors.email}
          placeholder="이메일 입력"
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        <AuthInput
          name="password"
          title="비밀번호를 입력해 주세요."
          type="password"
          value={inputs.password}
          onChange={handleChange}
          autoComplete="current-password"
          isInputValid={!errors.password}
          placeholder="비밀번호 입력"
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

        <AuthInput
          name="passwordCheck"
          title="비밀번호를 다시 한번 입력해 주세요."
          type="password"
          value={inputs.passwordCheck}
          onChange={handleChange}
          autoComplete="new-password"
          isInputValid={!errors.passwordCheck}
          placeholder="비밀번호 입력"
        />
        {errors.passwordCheck && (
          <ErrorMessage>{errors.passwordCheck}</ErrorMessage>
        )}
        <AuthInput
          name="username"
          title="닉네임을 입력해 주세요."
          type="text"
          value={inputs.username}
          onChange={handleChange}
          autoComplete="nickname"
          isInputValid={!errors.username}
          placeholder="닉네임 입력"
        />
        {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
        <SubmitButton>가입하기</SubmitButton>
        {errorMessage && (
          <CenterErrorMessage>{errorMessage}</CenterErrorMessage>
        )}
      </SignupForm>
      <NaverLoginButton>
        <NaverIcon src={naverIcon} />
        네이버로 간편가입
      </NaverLoginButton>
      <KakaoLoginButton>
        <KakaoIcon src={kakaoIcon} />
        카카오톡으로 간편가입
      </KakaoLoginButton>
    </PageWrapper>
  );
};

export default Signup;

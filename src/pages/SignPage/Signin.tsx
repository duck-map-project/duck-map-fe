import { useState } from 'react';
import { styled } from 'styled-components';

import AuthInput from '../../components/AuthInput';
import ResetPasswordModal from '../../components/ResetPasswordModal';
import { useAuthContext } from '../../contexts/AuthContext';
import useForm from '../../hooks/useForm';
import { useRouter } from '../../hooks/useRouter';

import {
  PageTitle,
  PageWrapper,
  Form,
  NaverLoginButton,
  KakaoLoginButton,
  CircleButton,
  ErrorMessage,
  SubmitButton,
} from './SignStyle';

const FormWithMargin = styled(Form)<{ emailError: string | undefined }>`
  margin-bottom: 55px;
  & > input:nth-child(3) {
    margin-bottom: ${(props) => (props.emailError ? '0' : '16px')};
  }
`;

const Signin = () => {
  const auth = useAuthContext();
  const { routeTo } = useRouter();
  const [passwordModal, setPasswordModal] = useState<boolean>(false);

  const handleSignin = () => {
    auth?.signIn({
      email: inputs.email as string,
      password: inputs.password as string,
    });
  };

  const { handleChange, handleSubmit, inputs, errors } = useForm(
    { email: '', password: '' },
    handleSignin
  );

  return (
    <PageWrapper>
      {passwordModal ? (
        <ResetPasswordModal onClickButton={() => setPasswordModal(false)} />
      ) : null}
      <FormWithMargin
        onSubmit={handleSubmit}
        noValidate
        emailError={errors.email}
      >
        <PageTitle>로그인</PageTitle>
        <AuthInput
          name="email"
          title="이메일"
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
          title="비밀번호"
          type="password"
          value={inputs.password}
          onChange={handleChange}
          autoComplete="current-password"
          isInputValid={!errors.password}
          placeholder="비밀번호 입력"
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

        <SubmitButton>로그인하기</SubmitButton>
      </FormWithMargin>
      {auth?.errorMessage.signin && (
        <ErrorMessage>{auth?.errorMessage.signin}</ErrorMessage>
      )}
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
      <NaverLoginButton>네이버로 간편로그인</NaverLoginButton>
      <KakaoLoginButton>카카오톡으로 간편로그인</KakaoLoginButton>
    </PageWrapper>
  );
};

export default Signin;

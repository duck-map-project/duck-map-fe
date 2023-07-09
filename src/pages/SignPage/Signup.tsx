import { styled } from 'styled-components';

import kakaoIcon from '../../assets/kakao-icon.svg';
import naverIcon from '../../assets/naver-icon.svg';
import AuthInput from '../../components/AuthInput';
import { useAuthContext } from '../../contexts/AuthContext';
import useForm, { Errors } from '../../hooks/useForm';

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
  height: 490px;
  margin-bottom: 60px;
  &::after {
    height: 490px;
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
`;

const Signup = () => {
  const auth = useAuthContext();

  const handleSignup = async () => {
    await auth?.signUp({
      username: inputs.username as string,
      email: inputs.email as string,
      password: inputs.password as string,
    });
  };

  const { handleChange, handleSubmit, inputs, errors } = useForm(
    { email: '', password: '', passwordCheck: '', username: '' },
    handleSignup
  );
  console.log(errors);

  return (
    <PageWrapper>
      <SignupForm onSubmit={handleSubmit} noValidate errors={errors}>
        <PageTitle>회원가입</PageTitle>
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

        <AuthInput
          name="passwordCheck"
          title="비밀번호 확인"
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
          title="닉네임"
          type="text"
          value={inputs.username}
          onChange={handleChange}
          autoComplete="nickname"
          isInputValid={!errors.username}
          placeholder="닉네임 입력"
        />
        {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
        <SubmitButton>가입하기</SubmitButton>
        {auth?.errorMessage.signup && (
          <CenterErrorMessage>{auth?.errorMessage.signup}</CenterErrorMessage>
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

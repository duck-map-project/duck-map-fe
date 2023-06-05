import { FormEvent, useEffect, useState } from 'react';

import kakaotalk from '../../assets/kakaotalk.svg';
import twitter from '../../assets/twitter-circle.svg';
import AuthInput from '../../components/AuthInput';
import Button from '../../components/Button';
import { useAuthContext } from '../../contexts/AuthContext';
import useInput from '../../hooks/useInput';
import { useInputValidation } from '../../hooks/useInputValidation';
import { useRouter } from '../../hooks/useRouter';

import {
  PageWrapper,
  PageTitle,
  Form,
  SNSSignupText,
  SNSButtonWrapper,
  SNSSignupButton,
} from './SignStyle';

const Signup = () => {
  const auth = useAuthContext();
  const { routeTo } = useRouter();
  const email = useInput('');
  const password = useInput('');
  const passwordCheck = useInput('');
  const username = useInput('');
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);
  const [isFormFilled, setIsFormFilled] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(true);

  const validatePassword = () => {
    if (passwordCheck.value !== '') {
      if (password.value === passwordCheck.value) {
        setPasswordValid(true);
      } else {
        setPasswordValid(false);
      }
    }
  };

  const { isInputValid, handleInputValidation } = useInputValidation({
    email: email.value,
    password: password.value,
    username: username.value,
  });

  useEffect(() => {
    validatePassword();
  }, [passwordCheck.value, password.value]);

  useEffect(() => {
    if (
      email.value !== '' &&
      password.value !== '' &&
      username.value !== '' &&
      passwordCheck.value !== ''
    ) {
      setIsFormFilled(true);
    } else {
      setIsFormFilled(false);
    }
  }, [email.value, password.value, username.value, passwordCheck.value]);

  useEffect(() => {
    if (
      passwordValid &&
      isFormFilled &&
      isInputValid.email &&
      isInputValid.password &&
      isInputValid.username
    ) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [
    passwordValid,
    isFormFilled,
    isInputValid.email,
    isInputValid.password,
    isInputValid.username,
  ]);

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordValid) {
      await auth?.signUp({
        username: username.value,
        email: email.value,
        password: password.value,
      });
      routeTo('/siginin');
    }
  };

  useEffect(() => {
    handleInputValidation();
  }, [email.value, password.value, username.value]);

  return (
    <PageWrapper>
      <PageTitle>회원가입</PageTitle>
      <Form onSubmit={handleSignup}>
        <AuthInput
          name="email"
          title="이메일"
          type="email"
          value={email.value}
          onChange={email.onChange}
          isInputValid={isInputValid.email}
        />
        <AuthInput
          name="password"
          title="비밀번호"
          type="password"
          value={password.value}
          onChange={password.onChange}
          isInputValid={isInputValid.password}
        />
        <AuthInput
          name="password-check"
          title="비밀번호 확인"
          type="password"
          value={passwordCheck.value}
          onChange={passwordCheck.onChange}
          validate={passwordValid}
        />
        <AuthInput
          name="username"
          title="닉네임"
          type="text"
          value={username.value}
          onChange={username.onChange}
          isInputValid={isInputValid.username}
        />
        <Button color="purple" size="wideBig" disabled={isFormValid}>
          가입하기
        </Button>
      </Form>
      <SNSSignupText>간편 회원가입</SNSSignupText>
      <SNSButtonWrapper>
        <SNSSignupButton url={twitter} />
        <SNSSignupButton url={kakaotalk} />
      </SNSButtonWrapper>
    </PageWrapper>
  );
};

export default Signup;

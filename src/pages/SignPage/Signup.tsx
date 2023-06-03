import { FormEvent, useEffect, useState } from 'react';

import kakaotalk from '../../assets/kakaotalk.svg';
import twitter from '../../assets/twitter-circle.svg';
import AuthInput from '../../components/AuthInput';
import Button from '../../components/Button';
import { useAuthContext } from '../../contexts/AuthContext';
import useInput from '../../hooks/useInput';
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
  const email = useInput('');
  const password = useInput('');
  const passwordCheck = useInput('');
  const username = useInput('');
  const { routeTo } = useRouter();
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);

  const validatePassword = () => {
    if (passwordCheck.value !== '') {
      if (password.value === passwordCheck.value) {
        setPasswordValid(true);
      } else {
        setPasswordValid(false);
      }
    }
  };

  useEffect(() => {
    validatePassword();
  }, [passwordCheck.value]);

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
        />
        <AuthInput
          name="password"
          title="비밀번호"
          type="password"
          value={password.value}
          onChange={password.onChange}
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
        />
        <Button color="purple" size="wideBig">
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

import { FormEvent, useEffect, useState } from 'react';
import { styled } from 'styled-components';

import kakaotalk from '../../assets/kakaotalk.svg';
import twitter from '../../assets/twitter-circle.svg';
import AuthInput from '../../components/AuthInput';
import Button from '../../components/Button';
import { useAuthContext } from '../../contexts/AuthContext';
import useInput from '../../hooks/useInput';
import { useInputValidation } from '../../hooks/useInputValidation';
import { useRouter } from '../../hooks/useRouter';

import {
  PageTitle,
  PageWrapper,
  Form,
  SNSSignupButton,
  SNSButtonWrapper,
  SNSSignupText,
  LinkText,
} from './SignStyle';

const FormWithMargin = styled(Form)`
  margin-bottom: 16px;
  & > input:nth-child(4) {
    margin-bottom: 0;
  }
`;
const SnsTextWithMargin = styled(SNSSignupText)`
  margin-top: 16px;
`;

const Signin = () => {
  const auth = useAuthContext();
  const { routeTo } = useRouter();
  const email = useInput('');
  const password = useInput('');
  const [isFormFilled, setIsFormFilled] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(true);

  const { isInputValid, handleInputValidation } = useInputValidation({
    email: email.value,
    password: password.value,
  });

  useEffect(() => {
    if (email.value !== '' && password.value !== '') {
      setIsFormFilled(true);
    } else {
      setIsFormFilled(false);
    }
  }, [email.value, password.value]);

  useEffect(() => {
    if (isFormFilled && isInputValid.email && isInputValid.password) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [isFormFilled, isInputValid.email, isInputValid.password]);

  useEffect(() => {
    handleInputValidation();
  }, [email.value, password.value]);

  const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await auth?.signIn({ email: email.value, password: password.value });
    routeTo('/');
  };

  return (
    <PageWrapper>
      <PageTitle>로그인</PageTitle>
      <FormWithMargin onSubmit={handleSignin}>
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
        <Button color="purple" size="wideBig" disabled={isFormValid}>
          로그인
        </Button>
      </FormWithMargin>
      <div>
        <LinkText
          onClick={() => {
            routeTo('/signup');
          }}
        >
          회원가입
        </LinkText>
        <LinkText>비밀번호 찾기</LinkText>
      </div>
      <SnsTextWithMargin>간편 로그인</SnsTextWithMargin>
      <SNSButtonWrapper>
        <SNSSignupButton url={twitter} />
        <SNSSignupButton url={kakaotalk} />
      </SNSButtonWrapper>
    </PageWrapper>
  );
};

export default Signin;

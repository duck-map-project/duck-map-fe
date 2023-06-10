import { styled } from 'styled-components';

import kakaotalk from '../../assets/kakaotalk.svg';
import twitter from '../../assets/twitter-circle.svg';
import AuthInput from '../../components/AuthInput';
import Button from '../../components/Button';
import { useAuthContext } from '../../contexts/AuthContext';
import useForm from '../../hooks/useForm';
import { useRouter } from '../../hooks/useRouter';

import {
  PageTitle,
  PageWrapper,
  Form,
  SNSSignupButton,
  SNSButtonWrapper,
  SNSSignupText,
  LinkText,
  ErrorMessage,
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

  const handleSignin = () => {
    auth?.signIn({ email: inputs.email, password: inputs.password });
  };

  const { handleChange, handleSubmit, inputs, errors } = useForm(
    { email: '', password: '' },
    handleSignin
  );

  return (
    <PageWrapper>
      <PageTitle>로그인</PageTitle>
      <FormWithMargin onSubmit={handleSubmit} noValidate>
        <AuthInput
          name="email"
          title="이메일"
          type="email"
          value={inputs.email}
          onChange={handleChange}
          autoComplete="email"
          isInputValid={!errors.email}
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
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

        <Button color="purple" size="wideBig">
          로그인
        </Button>
      </FormWithMargin>
      {auth?.errorMessage.signin && (
        <ErrorMessage>{auth?.errorMessage.signin}</ErrorMessage>
      )}
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

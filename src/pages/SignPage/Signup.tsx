import kakaotalk from '../../assets/kakaotalk.svg';
import twitter from '../../assets/twitter-circle.svg';
import AuthInput from '../../components/AuthInput';
import Button from '../../components/Button';
import { useAuthContext } from '../../contexts/AuthContext';
import useForm from '../../hooks/useForm';
import { useRouter } from '../../hooks/useRouter';

import {
  PageWrapper,
  PageTitle,
  Form,
  SNSSignupText,
  SNSButtonWrapper,
  SNSSignupButton,
  ErrorMessage,
} from './SignStyle';

const Signup = () => {
  const auth = useAuthContext();
  const { routeTo } = useRouter();

  const handleSignup = async () => {
    await auth?.signUp({
      username: inputs.username as string,
      email: inputs.email,
      password: inputs.password,
    });
    routeTo('/siginin');
  };

  const { handleChange, handleSubmit, inputs, errors } = useForm(
    { email: '', password: '', passwordCheck: '', username: '' },
    handleSignup
  );

  return (
    <PageWrapper>
      <PageTitle>회원가입</PageTitle>
      <Form onSubmit={handleSubmit}>
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

        <AuthInput
          name="passwordCheck"
          title="비밀번호 확인"
          type="password"
          value={inputs.passwordCheck}
          onChange={handleChange}
          autoComplete="new-password"
          isInputValid={!errors.passwordCheck}
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
        />
        {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
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

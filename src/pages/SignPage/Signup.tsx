import kakaotalk from '../../assets/kakaotalk.svg';
import twitter from '../../assets/twitter-circle.svg';
import AuthInput from '../../components/AuthInput';
import Button from '../../components/Button';

import {
  PageWrapper,
  PageTitle,
  Form,
  SNSSignupText,
  SNSButtonWrapper,
  SNSSignupButton,
} from './SignStyle';

const Signup = () => {
  return (
    <PageWrapper>
      <PageTitle>회원가입</PageTitle>
      <Form>
        <AuthInput name="email" title="이메일" type="email" />
        <AuthInput name="password" title="비밀번호" type="password" />
        <AuthInput
          name="password-check"
          title="비밀번호 확인"
          type="password"
        />
        <AuthInput name="nickname" title="닉네임" type="text" />
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

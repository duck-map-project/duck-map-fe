import { styled } from 'styled-components';

import kakaotalk from '../../assets/kakaotalk.svg';
import twitter from '../../assets/twitter-circle.svg';
import AuthInput from '../../components/AuthInput';
import Button from '../../components/Button';

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
  return (
    <PageWrapper>
      <PageTitle>로그인</PageTitle>
      <FormWithMargin>
        <AuthInput name="email" title="이메일" type="email" />
        <AuthInput name="password" title="비밀번호" type="password" />
        <Button color="purple" size="wideBig">
          로그인
        </Button>
      </FormWithMargin>
      <div>
        <LinkText>회원가입</LinkText>
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

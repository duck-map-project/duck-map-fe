import { styled } from 'styled-components';

import AuthInput from '../../components/AuthInput';
import Button from '../../components/Button';

const PageWrapper = styled.section`
  width: 100%;
  padding-top: 351px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 75px;
`;

const Form = styled.form`
  width: 100%;
  max-width: 385px;
  & > input:nth-child(2) {
    margin-bottom: 13px;
  }
  & > input:nth-child(4) {
    margin-bottom: 30px;
  }
`;

const ResetPassword = () => {
  return (
    <PageWrapper>
      <Title>비밀번호 재설정</Title>
      <Form>
        <AuthInput name="password" title="비밀번호" />
        <AuthInput name="password" title="비밀번호 확인" />
        <Button size="wideBig" color="purple">
          재설정
        </Button>
      </Form>
    </PageWrapper>
  );
};

export default ResetPassword;

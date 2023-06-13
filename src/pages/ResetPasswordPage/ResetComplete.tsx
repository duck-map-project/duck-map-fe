import { styled } from 'styled-components';

import Button from '../../components/Button';

const PageWrapper = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Message = styled.p`
  font-size: 2.4rem;
  margin-bottom: 41px;
`;

const ResetComplete = () => {
  return (
    <PageWrapper>
      <div>
        <Message>비밀번호 재설정이 완료되었습니다.</Message>
        <Button size="wideBig" color="purple">
          로그인하러 가기
        </Button>
      </div>
    </PageWrapper>
  );
};

export default ResetComplete;

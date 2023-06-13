import { MouseEventHandler } from 'react';
import { styled } from 'styled-components';

import closeIcon from '../assets/close.svg';

import { Input } from './AuthInput';
import Button from './Button';

const PageWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: var(--background-disabled);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
`;

const Modal = styled.article`
  width: 575px;
  padding: 82px 72px 44px;
  text-align: center;
  background-color: var(--white);
  border: 2px solid var(--blue-purple);
  border-radius: 5px;
  position: relative;
`;

const Text = styled.p`
  font-size: 1.4rem;
  margin-bottom: 50px;
`;

const InputWithMargin = styled(Input)`
  margin-bottom: 16px;
`;

const CloseButton = styled.button`
  width: 20px;
  height: 20px;
  background-image: url(${closeIcon});
  position: absolute;
  top: 22px;
  right: 26px;
`;

interface Props {
  onClickButton: MouseEventHandler<HTMLButtonElement>;
}

const ResetPasswordModal = ({ onClickButton }: Props) => {
  return (
    <PageWrapper>
      <Modal>
        <Text>
          가입했던 이메일을 입력해주세요. <br />
          비밀번호 재설정 메일을 보내드립니다.
        </Text>
        <InputWithMargin id="reset-password" />
        <Button size="wideBig" color="purple">
          비밀번호 재설정하기
        </Button>
        <CloseButton onClick={onClickButton} />
      </Modal>
    </PageWrapper>
  );
};

export default ResetPasswordModal;

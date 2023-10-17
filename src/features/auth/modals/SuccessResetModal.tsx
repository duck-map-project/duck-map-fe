import { MouseEventHandler } from 'react';
import { styled } from 'styled-components';

import {
  CloseButton,
  Modal,
  ModalWrapper,
  PageWrapper,
  Text,
} from '../../../components/modal/ModalStyle';
import { useRouter } from '../../../hooks/useRouter';
import { SubmitButton } from '../../../pages/SignPage/SignStyle';

const SuccessModal = styled(Modal)`
  padding: 43px 0 62px;
`;

interface Props {
  onClickButton: MouseEventHandler<HTMLButtonElement>;
}

const SuccessResetModal = ({ onClickButton }: Props) => {
  const { routeTo } = useRouter();
  return (
    <PageWrapper>
      <ModalWrapper>
        <SuccessModal>
          <Text>비밀번호 재설정이 완료되었습니다.</Text>
          <SubmitButton onClick={() => routeTo('/signin')}>
            로그인하러 가기
          </SubmitButton>
        </SuccessModal>
        <CloseButton onClick={onClickButton} />
      </ModalWrapper>
    </PageWrapper>
  );
};

export default SuccessResetModal;

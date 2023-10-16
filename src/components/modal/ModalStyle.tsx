import { styled } from 'styled-components';

import closeIcon from '../../assets/close.svg';
import { ErrorMessage, SubmitButton } from '../../pages/SignPage/SignStyle';

export const PageWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
`;

export const ModalWrapper = styled.section`
  width: 694px;
  padding-top: 36px;
  background-color: var(--white);
  border: 2px solid #1e232c;
  border-radius: 20px;
  background-color: #ffd0ec;
  position: relative;
`;

export const Modal = styled.form`
  background-color: #fffbe3fa;
  border-top: 2px solid #1e232c;
  border-radius: 0 0 20px 20px;
  padding: 0 154px;
`;

export const EmailSubmitModal = styled(Modal)`
  padding-bottom: 62px;
`;

export const Text = styled.p`
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.248;
  text-align: center;
`;

export const SuccessText = styled(Text)`
  padding-top: 62px;
`;

export const EmailSubmitText = styled(Text)`
  margin: 28px 0 14px 0;
`;

export const CloseButton = styled.button`
  width: 14px;
  height: 14px;
  background-image: url(${closeIcon});
  position: absolute;
  top: 12px;
  right: 20px;
`;

export const ErrorMessageWithAlign = styled(ErrorMessage)`
  text-align: left;
`;

export const EmailSubmitButton = styled(SubmitButton)`
  width: 215px;
`;

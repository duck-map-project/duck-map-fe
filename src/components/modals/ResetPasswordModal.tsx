import { MouseEventHandler, useState } from 'react';

import { sendRsetPassword } from '../../api/authApi';
import useForm from '../../hooks/useForm';
import AuthInput from '../AuthInput';

import {
  CloseButton,
  EmailSubmitButton,
  EmailSubmitModal,
  EmailSubmitText,
  ErrorMessageWithAlign,
  ModalWrapper,
  PageWrapper,
  SuccessText,
} from './ModalStyle';

interface Props {
  onClickButton: MouseEventHandler<HTMLButtonElement>;
}

const ResetPasswordModal = ({ onClickButton }: Props) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const onEmailSubmit = async () => {
    try {
      const res = await sendRsetPassword(inputs.email as string);
      if (res === 'success') {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { handleChange, handleSubmit, inputs, errors } = useForm(
    { email: '' },
    onEmailSubmit
  );

  return (
    <PageWrapper>
      <ModalWrapper>
        <EmailSubmitModal onSubmit={handleSubmit}>
          {!isSuccess ? (
            <>
              <EmailSubmitText>
                가입했던 이메일을 입력해주세요. <br />
                비밀번호 재설정 메일을 보내드립니다.
              </EmailSubmitText>
              <AuthInput
                title="이메일"
                id="reset-password"
                name="email"
                onChange={handleChange}
              />
              {errors.email && (
                <ErrorMessageWithAlign>{errors.email}</ErrorMessageWithAlign>
              )}
              <EmailSubmitButton>이메일 전송하기</EmailSubmitButton>
            </>
          ) : (
            <SuccessText>이메일이 전송되었습니다.</SuccessText>
          )}
        </EmailSubmitModal>
        <CloseButton onClick={onClickButton} />
      </ModalWrapper>
    </PageWrapper>
  );
};

export default ResetPasswordModal;

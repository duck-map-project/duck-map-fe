import { MouseEventHandler, useEffect, useState } from 'react';

import AuthInput from '../../../components/AuthInput';
import {
  CloseButton,
  EmailSubmitButton,
  EmailSubmitModal,
  EmailSubmitText,
  ErrorMessageWithAlign,
  ModalWrapper,
  PageWrapper,
  SuccessText,
} from '../../../components/modal/ModalStyle';
import useForm from '../../../hooks/useForm';
import { useSendPasswordEmailMutation } from '../services/authApiSlice';

interface Props {
  onClickButton: MouseEventHandler<HTMLButtonElement>;
}

const ResetPasswordModal = ({ onClickButton }: Props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [sendPasswordEmail, { error, isSuccess }] =
    useSendPasswordEmailMutation();

  useEffect(() => {
    if (error && 'status' in error) {
      const errorData = error.data as { message: string };
      setErrorMessage(errorData.message);
    }
  }, [error]);

  const onEmailSubmit = async () => {
    if (inputs.email) {
      sendPasswordEmail(inputs.email);
    }
  };

  const { handleChange, handleSubmit, inputs, errors } = useForm(
    { email: '' },
    onEmailSubmit
  );

  let content;

  if (!isSuccess) {
    content = (
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
        {errors.email ? (
          <ErrorMessageWithAlign>{errors.email}</ErrorMessageWithAlign>
        ) : errorMessage ? (
          <ErrorMessageWithAlign>{errorMessage}</ErrorMessageWithAlign>
        ) : null}
        <EmailSubmitButton>이메일 전송하기</EmailSubmitButton>
      </>
    );
  } else {
    content = <SuccessText>이메일이 전송되었습니다.</SuccessText>;
  }

  return (
    <PageWrapper>
      <ModalWrapper>
        <EmailSubmitModal onSubmit={handleSubmit}>{content}</EmailSubmitModal>
        <CloseButton onClick={onClickButton} />
      </ModalWrapper>
    </PageWrapper>
  );
};

export default ResetPasswordModal;

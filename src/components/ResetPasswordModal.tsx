import { MouseEventHandler, useState } from 'react';
import { styled } from 'styled-components';

import { sendRsetPassword } from '../api/authApi';
import closeIcon from '../assets/close.svg';
import useForm from '../hooks/useForm';
import { ErrorMessage } from '../pages/SignPage/SignStyle';

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

const Modal = styled.form`
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
      <Modal onSubmit={handleSubmit}>
        {!isSuccess ? (
          <>
            <Text>
              가입했던 이메일을 입력해주세요. <br />
              비밀번호 재설정 메일을 보내드립니다.
            </Text>
            <InputWithMargin
              id="reset-password"
              name="email"
              onChange={handleChange}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            <Button size="wideBig" color="purple">
              비밀번호 재설정하기
            </Button>
          </>
        ) : (
          <Text>이메일이 전송되었습니다.</Text>
        )}
        <CloseButton onClick={onClickButton} />
      </Modal>
    </PageWrapper>
  );
};

export default ResetPasswordModal;

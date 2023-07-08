import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import { resetPassword } from '../../api/authApi';
import AuthInput from '../../components/AuthInput';
import SuccessResetModal from '../../components/modals/SuccessResetModal';
import useForm from '../../hooks/useForm';
import { ErrorMessage } from '../SignPage/SignStyle';
import { PageTitle, Form, SubmitButton } from '../SignPage/SignStyle';

const PageWrapper = styled.section`
  width: 100%;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResetPasswordForm = styled(Form)`
  margin-top: 159px;
  & > input[name='password'] {
    margin-bottom: 16px;
  }
`;

const ResetPassword = () => {
  const { id } = useParams();
  const [successModal, setSuccessModal] = useState(false);

  const onResetPasswordSubmit = async () => {
    try {
      if (inputs.password === inputs.passwordCheck && id) {
        const res = await resetPassword(id, inputs.password as string);
        if (res === 'success') {
          setSuccessModal(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { handleChange, handleSubmit, inputs, errors } = useForm(
    {
      password: '',
      passwordCheck: '',
    },
    onResetPasswordSubmit
  );

  const onModalClsoeButton = () => {
    setSuccessModal(false);
  };

  return (
    <PageWrapper>
      <ResetPasswordForm onSubmit={handleSubmit}>
        <PageTitle>비밀번호 재설정</PageTitle>
        <AuthInput
          type="password"
          name="password"
          title="비밀번호"
          onChange={handleChange}
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        <AuthInput
          type="password"
          name="passwordCheck"
          title="비밀번호 확인"
          onChange={handleChange}
        />
        {errors.passwordCheck && (
          <ErrorMessage>{errors.passwordCheck}</ErrorMessage>
        )}
        <SubmitButton>확인</SubmitButton>
      </ResetPasswordForm>
      {successModal ? (
        <SuccessResetModal onClickButton={onModalClsoeButton} />
      ) : null}
    </PageWrapper>
  );
};

export default ResetPassword;

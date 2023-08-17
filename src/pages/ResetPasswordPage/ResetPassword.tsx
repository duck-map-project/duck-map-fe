import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import AuthInput from '../../components/AuthInput';
import SuccessResetModal from '../../components/modals/SuccessResetModal';
import useForm from '../../hooks/useForm';
import { useResetPasswordMutation } from '../../redux/auth/authApiSlice';
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
  padding-bottom: 62px;
  & > input[name='password'] {
    margin-bottom: 16px;
  }
`;

const ResetPassword = () => {
  const { id } = useParams();
  const [successModal, setSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resetPassword, { isError, error }] = useResetPasswordMutation();

  const onResetPasswordSubmit = async () => {
    if (
      inputs.password &&
      inputs.passwordCheck &&
      id &&
      !errors.password &&
      !errors.passwordCheck
    ) {
      await resetPassword({ id, newPassword: inputs.password });
      if (!isError) setSuccessModal(true);
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

  useEffect(() => {
    if (error && 'status' in error) {
      const errorData = error.data as { message: string };
      setErrorMessage(errorData.message);
    }
  }, [error]);

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
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <SubmitButton>확인</SubmitButton>
      </ResetPasswordForm>
      {successModal ? (
        <SuccessResetModal onClickButton={onModalClsoeButton} />
      ) : null}
    </PageWrapper>
  );
};

export default ResetPassword;

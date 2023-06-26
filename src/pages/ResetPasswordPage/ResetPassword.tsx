import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import { resetPassword } from '../../api/authApi';
import AuthInput from '../../components/AuthInput';
import Button from '../../components/Button';
import useForm from '../../hooks/useForm';
import { useRouter } from '../../hooks/useRouter';
import { ErrorMessage } from '../SignPage/SignStyle';

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
  const { id } = useParams();
  const { routeTo } = useRouter();

  const onResetPasswordSubmit = async () => {
    try {
      if (inputs.password === inputs.passwordCheck && id) {
        const res = await resetPassword(id, inputs.password as string);
        if (res === 'success') {
          routeTo('/signin');
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

  return (
    <PageWrapper>
      <Title>비밀번호 재설정</Title>
      <Form onSubmit={handleSubmit}>
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
        <Button size="wideBig" color="purple">
          재설정
        </Button>
      </Form>
    </PageWrapper>
  );
};

export default ResetPassword;

import {
  ChangePasswordForm,
  UserInfoWrapper,
  StyledLabel,
  PasswordInput,
  EditSubmitBtn,
} from './ChangePasswordStyle';

const ChangePassword = () => {
  return (
    <ChangePasswordForm>
      <UserInfoWrapper>
        <StyledLabel htmlFor="email">현재 비밀번호</StyledLabel>
        <PasswordInput type="password" id="email" placeholder="비밀번호 입력" />
      </UserInfoWrapper>
      <UserInfoWrapper>
        <StyledLabel htmlFor="username">새 비밀번호</StyledLabel>
        <PasswordInput
          type="password"
          id="username"
          placeholder="비밀번호 입력"
        />
      </UserInfoWrapper>
      <EditSubmitBtn type="button">변경</EditSubmitBtn>
    </ChangePasswordForm>
  );
};

export default ChangePassword;

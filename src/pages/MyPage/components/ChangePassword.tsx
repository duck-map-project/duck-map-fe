import { useState } from 'react';

import { useEditPasswordMutation } from '../../../redux/auth/authApiSlice';

import {
  ChangePasswordForm,
  UserInfoWrapper,
  StyledLabel,
  PasswordInput,
  EditSubmitBtn,
} from './ChangePasswordStyle';

const ChangePassword = () => {
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');

  const [editPassword] = useEditPasswordMutation();

  const onChangeCurrentPw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPw(e.target.value);
  };

  const onChangeNewPw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPw(e.target.value);
  };

  const onClickSubmitBtn = async () => {
    const data = {
      currentPassword: currentPw,
      newPassword: newPw,
    };

    await editPassword(data);
    setCurrentPw('');
    setNewPw('');
  };
  return (
    <ChangePasswordForm>
      <UserInfoWrapper>
        <StyledLabel htmlFor="email">현재 비밀번호</StyledLabel>
        <PasswordInput
          type="password"
          id="email"
          placeholder="비밀번호 입력"
          value={currentPw}
          onChange={onChangeCurrentPw}
        />
      </UserInfoWrapper>
      <UserInfoWrapper>
        <StyledLabel htmlFor="username">새 비밀번호</StyledLabel>
        <PasswordInput
          type="password"
          id="username"
          placeholder="비밀번호 입력"
          value={newPw}
          onChange={onChangeNewPw}
        />
      </UserInfoWrapper>
      <EditSubmitBtn type="button" onClick={onClickSubmitBtn}>
        변경
      </EditSubmitBtn>
    </ChangePasswordForm>
  );
};

export default ChangePassword;

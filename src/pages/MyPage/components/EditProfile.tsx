import { useEffect, useState } from 'react';

import {
  UserProfileEditForm,
  ImagePreview,
  HiddenInput,
  UserInfoWrapper,
  StyledLabel,
  EmailInput,
  UsernameInput,
  BtnWrapper,
  UnregisterBtn,
  EditSubmitBtn,
} from './EditProfileStyle';

const testImg =
  'https://images.unsplash.com/photo-1567880905822-56f8e06fe630?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80';

const EditProfile = () => {
  //여기서 profile 정보 받아오기

  const [userImage, setUserImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>('');

  //test용 코드
  useEffect(() => {
    setPreviewImage(testImg);
  }, []);
  userImage;

  const onChangeUserImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imgFile = e.target.files[0];
      //파일 size 확인
      if (imgFile.size > 1024 ** 2) {
        alert('앗! 이미지가 너무 커요. 1MB 이하의 사진만 업로드 가능합니다.');
        return;
      }
      setUserImage(imgFile);
      setPreviewImage(URL.createObjectURL(imgFile));
    }
  };

  return (
    <UserProfileEditForm>
      <ImagePreview
        htmlFor="artistImage"
        previewimage={previewImage}
      ></ImagePreview>
      <HiddenInput
        type="file"
        id="artistImage"
        accept="image/png, image/jpeg"
        onChange={onChangeUserImage}
      />
      <UserInfoWrapper>
        <StyledLabel htmlFor="email">이메일</StyledLabel>
        <EmailInput type="text" id="email" value="kkk111@naver.com" disabled />
      </UserInfoWrapper>
      <UserInfoWrapper>
        <StyledLabel htmlFor="username">닉네임</StyledLabel>
        <UsernameInput type="text" id="username" placeholder="닉네임 입력" />
      </UserInfoWrapper>
      <BtnWrapper>
        <UnregisterBtn type="button">회원탈퇴</UnregisterBtn>
        <EditSubmitBtn type="button">완료</EditSubmitBtn>
      </BtnWrapper>
    </UserProfileEditForm>
  );
};

export default EditProfile;

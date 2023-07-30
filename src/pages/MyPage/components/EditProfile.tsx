import { useEffect, useState } from 'react';

import {
  useGetUserInfoQuery,
  useEditUserInfoMutation,
  useUnregisterMutation,
} from '../../../redux/auth/authApiSlice';
import { useAddImageMutation } from '../../../redux/imageSlice';

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

const EditProfile = () => {
  const [userImage, setUserImage] = useState<File>(); //File 자체
  const [previewImage, setPreviewImage] = useState<string>(''); //프리뷰 이미지용 blob
  const [savedImagefile, setSavedImagefile] = useState<string | null>(''); // 저장된 이미지의 filename
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const { data: userInfo } = useGetUserInfoQuery();
  const [editUserInfo] = useEditUserInfoMutation();
  const [addNewImage] = useAddImageMutation();
  const [unregister] = useUnregisterMutation();

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo.username);
      setEmail(userInfo.email);
      setSavedImagefile(userInfo.userProfile.slice(8)); //image filename string 값 저장
    }
  }, [userInfo]);

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

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onClickSubmitBtn = async () => {
    if (userImage) {
      const formData = new FormData();
      if (userImage instanceof File) {
        formData.append('file', userImage);
        try {
          const response = await addNewImage({
            imageFile: formData,
          });
          if ('error' in response) {
            return;
          }
          const filename = response.data.filename;
          sendEditUser(filename);
        } catch (error) {
          console.error(error);
        }
        return;
      }
    }
    if (savedImagefile) {
      sendEditUser(savedImagefile);
    }
  };

  const sendEditUser = async (filename: string) => {
    const userInfo = {
      username,
      image: filename,
    };

    await editUserInfo(userInfo);
  };

  const onClickUnregisterBtn = async () => {
    if (!window.confirm('작성하신 글은 자동으로 삭제되지 않습니다.')) {
      return;
    }
    const proptValue = window.prompt('비밀번호를 입력해주세요');
    if (proptValue) {
      const password = { password: proptValue };
      await unregister(password);
    }
  };

  return (
    <UserProfileEditForm>
      <ImagePreview
        htmlFor="artistImage"
        previewimage={
          previewImage
            ? previewImage
            : savedImagefile
            ? process.env.REACT_APP_BASE_URL + '/images/' + savedImagefile
            : ''
        }
      ></ImagePreview>

      <HiddenInput
        type="file"
        id="artistImage"
        accept="image/png, image/jpeg"
        onChange={onChangeUserImage}
      />
      <UserInfoWrapper>
        <StyledLabel htmlFor="email">이메일</StyledLabel>
        <EmailInput type="text" id="email" value={email} disabled />
      </UserInfoWrapper>
      <UserInfoWrapper>
        <StyledLabel htmlFor="username">닉네임</StyledLabel>
        <UsernameInput
          type="text"
          id="username"
          placeholder="닉네임 입력"
          value={username}
          onChange={onChangeUsername}
        />
      </UserInfoWrapper>
      <BtnWrapper>
        <UnregisterBtn type="button" onClick={onClickUnregisterBtn}>
          회원탈퇴
        </UnregisterBtn>
        <EditSubmitBtn type="button" onClick={onClickSubmitBtn}>
          완료
        </EditSubmitBtn>
      </BtnWrapper>
    </UserProfileEditForm>
  );
};

export default EditProfile;

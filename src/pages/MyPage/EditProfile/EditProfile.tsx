import { useEffect, useState } from 'react';

import defaultImage from '../../../assets/user-profile.svg';
import Loading from '../../../components/Loading';
import {
  useEditUserInfoMutation,
  useUnregisterMutation,
  useGetUserInfoQuery,
} from '../../../features/auth/services/authApiSlice';
import { useLogoutMutation } from '../../../features/auth/services/authApiSlice';
import useImageProcessing from '../../../hooks/useImageProcessing';
import { useRouter } from '../../../hooks/useRouter';
import { performApiAction } from '../../../utils/apiHelpers';

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
  const { routeTo } = useRouter();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [userImage, setUserImage] = useState<File | undefined>(undefined); //File 자체
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    undefined
  ); //프리뷰 이미지용 blob
  const [savedImagefile, setSavedImagefile] = useState<string | undefined>(
    undefined
  ); // 저장된 이미지의 filename
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);
  const { data: userData } = useGetUserInfoQuery();
  const [editUserInfo] = useEditUserInfoMutation();
  const [unregister] = useUnregisterMutation();
  const [logout] = useLogoutMutation();
  const { ImageProcessing } = useImageProcessing();

  useEffect(() => {
    if (userData) {
      setUsername(userData.username);
      setEmail(userData.email);
      setSavedImagefile(userData.userProfile.slice(8));
      if (userData.userProfile === '/images/null') {
        setPreviewImage(defaultImage);
        return;
      }
      setPreviewImage(baseUrl + userData.userProfile);
    }
  }, [userData]);

  const onChangeUserImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imgFile = e.target.files[0];
      setUserImage(imgFile);
      setPreviewImage(URL.createObjectURL(imgFile));
    }
  };

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onClickSaveBtnHandler = async () => {
    try {
      setIsRequesting(true);
      if (username === undefined) {
        setIsRequesting(false);
        alert('닉네임을 입력해주세요.');
        throw new Error('Invalid username');
      }

      if (userImage === undefined && savedImagefile === undefined) {
        alert('프로필 사진을 업로드 해주세요.');
        setIsRequesting(false);
        throw new Error('Invalid profile picture');
      }

      const filename = await ImageProcessing({
        newImage: userImage,
        savedImage: savedImagefile,
      });

      filename && (await onSaveUserInfoHandler(filename));
    } catch (error) {
      console.error(error);
    } finally {
      setIsRequesting(false);
    }
  };

  const onSaveUserInfoHandler = async (filename: string) => {
    const userInfo = {
      username,
      image: filename,
    };
    try {
      await performApiAction(userInfo, editUserInfo);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickUnregisterBtn = async () => {
    if (!window.confirm('작성하신 글은 자동으로 삭제되지 않습니다.')) {
      return;
    }

    const promptValue = window.prompt('비밀번호를 입력해주세요');
    if (promptValue) {
      const password = { password: promptValue };
      const res = await unregister(password);
      if ('data' in res) {
        alert('탈퇴되었습니다.');
        await logout({});
        routeTo('/');
      } else if ('error' in res) {
        alert('잠시 후 다시 시도해주세요.');
      }
    }
  };

  return (
    <UserProfileEditForm>
      {isRequesting && (
        <Loading text="프로필을 수정 중입니다. 잠시만 기다려주세요." />
      )}
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
        <EditSubmitBtn type="button" onClick={onClickSaveBtnHandler}>
          완료
        </EditSubmitBtn>
      </BtnWrapper>
    </UserProfileEditForm>
  );
};

export default EditProfile;

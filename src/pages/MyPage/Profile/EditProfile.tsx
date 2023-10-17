import imageCompression from 'browser-image-compression';
import { useEffect, useState } from 'react';

import defaultImage from '../../../assets/user-profile.svg';
import Loading from '../../../components/Loading';
import {
  useEditUserInfoMutation,
  useUnregisterMutation,
  useGetUserInfoQuery,
} from '../../../features/auth/services/authApiSlice';
import { useLogoutMutation } from '../../../features/auth/services/authApiSlice';
import { useAddImageMutation } from '../../../features/images/imageSlice';
import { useRouter } from '../../../hooks/useRouter';

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
  const [userImage, setUserImage] = useState<File>(); //File 자체
  const [previewImage, setPreviewImage] = useState<string>(''); //프리뷰 이미지용 blob
  const [savedImagefile, setSavedImagefile] = useState<string>(''); // 저장된 이미지의 filename
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);
  const { data: userData } = useGetUserInfoQuery();
  const [editUserInfo] = useEditUserInfoMutation();
  const [addNewImage] = useAddImageMutation();
  const [unregister] = useUnregisterMutation();
  const [logout] = useLogoutMutation();

  useEffect(() => {
    if (userData) {
      setUsername(userData.username);
      setEmail(userData.email);
      setSavedImagefile(userData.userProfile.slice(8)); //image filename string 값 저장
      if (userData.userProfile === '/images/null') {
        setPreviewImage(defaultImage);
        return;
      }
      const url = baseUrl + userData.userProfile;
      setPreviewImage(url);
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

  const onClickSubmitBtn = async () => {
    setIsRequesting(true);
    //추가된 이미지가 있을 경우
    let compressedFile;
    if (userImage) {
      try {
        compressedFile = await imageCompression(userImage, {
          maxSizeMB: 0.2,
          maxIteration: 30,
        });
      } catch (error) {
        console.error(error);
        setIsRequesting(false);
        return;
      }

      const formData = new FormData();
      compressedFile && formData.append('file', compressedFile);
      try {
        const response = await addNewImage({
          imageFile: formData,
        });
        if ('error' in response) {
          alert('잠시 후 다시 시도해주세요.');
          return;
        }
        const filename = response.data.filename;
        sendEditUser(filename);
      } catch (error) {
        console.error(error);
      }
      setIsRequesting(false);
      return;
    }
    //기존 이미지 그대로 저장
    if (savedImagefile) {
      sendEditUser(savedImagefile);
      setIsRequesting(false);
    }
  };

  const sendEditUser = async (filename: string) => {
    if (username === undefined) {
      alert('닉네임은 필수값입니다.');
      return;
    }
    const userInfo = {
      username,
      image: filename,
    };
    try {
      const res = await editUserInfo(userInfo);
      if ('data' in res) {
        alert('정상적으로 수정되었습니다');
      } else if ('error' in res) {
        const error = res.error;
        if ('data' in error) {
          const data = error.data;
          if (data !== null && typeof data === 'object' && 'message' in data) {
            const errorMessage = data.message;
            alert(errorMessage);
            return;
          }
        }
        alert('잠시 후에 다시 시도해주세요.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onClickUnregisterBtn = async () => {
    if (!window.confirm('작성하신 글은 자동으로 삭제되지 않습니다.')) {
      return;
    }
    const proptValue = window.prompt('비밀번호를 입력해주세요');
    if (proptValue) {
      const password = { password: proptValue };
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
        <EditSubmitBtn type="button" onClick={onClickSubmitBtn}>
          완료
        </EditSubmitBtn>
      </BtnWrapper>
    </UserProfileEditForm>
  );
};

export default EditProfile;

import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from 'styled-components';

// import client from '../../api/client';
import kakaoIcon from '../../assets/kakao-icon.svg';
import naverIcon from '../../assets/naver-icon.svg';
import AuthInput from '../../components/AuthInput';
import ResetPasswordModal from '../../components/modals/ResetPasswordModal';
import { useAuthContext } from '../../contexts/AuthContext';
import useInput from '../../hooks/useInput';
import { useRouter } from '../../hooks/useRouter';
import {
  useFetchUserMutation,
  useLoginMutation,
} from '../../redux/auth/authApiSlice';
import { setCredentials } from '../../redux/auth/authSlice';

import {
  PageTitle,
  PageWrapper,
  Form,
  NaverLoginButton,
  KakaoLoginButton,
  CircleButton,
  ErrorMessage,
  SubmitButton,
  NaverIcon,
  KakaoIcon,
} from './SignStyle';

const FormWithMargin = styled(Form)<{ emailError: string | undefined }>`
  margin-bottom: 55px;
  & > input:nth-child(3) {
    margin-bottom: ${(props) => (props.emailError ? '0' : '16px')};
  }
`;

const Signin = () => {
  const auth = useAuthContext();
  const { routeTo } = useRouter();
  const [passwordModal, setPasswordModal] = useState<boolean>(false);
  const email = useInput('');
  const password = useInput('');
  const [login] = useLoginMutation();
  const [fetchUser] = useFetchUserMutation();
  const dispatch = useDispatch();

  // const getImage = async () => {
  //   try {
  //     const imageRes = await client.get(
  //       '/images/0b4ca0d6-89e6-4094-a170-59fcd5fcfbf3.jpg'
  //     );
  //     const imageData = imageRes.data;
  //     console.log(imageData);

  //     return imageData;
  //   } catch (error) {
  //     console.error('Error fetching image data:', error);
  //     return null;
  //   }
  // };

  const getUser = async () => {
    try {
      const res = await fetchUser({});
      if ('userProfile' in res) {
        // TODO: 이미지 값 받아오기
        // const userProfile = await getImage();
        // if (userProfile !== null) {
        //   const updatedRes = {
        //     ...res,
        //     userProfile: userProfile,
        //   };
        //   console.log(updatedRes.userProfile); // 이미지 데이터 확인
        //   return updatedRes;
        // }
      }
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.value && password.value) {
      try {
        const userData = await login({
          email: email.value,
          password: password.value,
        }).unwrap();

        dispatch(
          setCredentials({
            accessToken: userData.authorizationHeader,
            user: null,
          })
        );

        const user = await getUser();
        dispatch(
          setCredentials({
            accessToken: userData.authorizationHeader,
            user: user,
          })
        );

        routeTo('/');
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <PageWrapper>
      {passwordModal ? (
        <ResetPasswordModal onClickButton={() => setPasswordModal(false)} />
      ) : null}
      <FormWithMargin onSubmit={handleSignin} noValidate emailError="">
        <PageTitle>로그인</PageTitle>
        <AuthInput
          name="email"
          title="이메일"
          type="email"
          value={email.value}
          onChange={email.onChange}
          autoComplete="email"
          placeholder="이메일 입력"
        />

        <AuthInput
          name="password"
          title="비밀번호"
          type="password"
          value={password.value}
          onChange={password.onChange}
          autoComplete="current-password"
          placeholder="비밀번호 입력"
        />

        <SubmitButton>로그인하기</SubmitButton>
      </FormWithMargin>
      {/* TODO: 에러메세지 가져오는 방식 변경 */}
      {auth?.errorMessage.signin && (
        <ErrorMessage>{auth?.errorMessage.signin}</ErrorMessage>
      )}
      <div>
        <CircleButton
          onClick={() => {
            routeTo('/signup');
          }}
        >
          회원가입
        </CircleButton>
        <CircleButton onClick={() => setPasswordModal(true)}>
          비밀번호 찾기
        </CircleButton>
      </div>
      <NaverLoginButton>
        <NaverIcon src={naverIcon} />
        네이버로 간편로그인
      </NaverLoginButton>
      <KakaoLoginButton>
        <KakaoIcon src={kakaoIcon} />
        카카오톡으로 간편로그인
      </KakaoLoginButton>
    </PageWrapper>
  );
};

export default Signin;

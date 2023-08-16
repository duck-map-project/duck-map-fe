import { styled } from 'styled-components';

export const PageWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
`;

export const PageTitle = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1.247916666666667;
  width: fit-content;
  margin: 0 auto 24px auto;
  border: 2px solid #1e232c;
  border-radius: 50px;
  background-color: #fcf9a4;
  padding: 7px 38px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 568px;
  background-color: #fffbe3fa;
  border: 2px solid #1e232c;
  border-radius: 20px;
  margin-top: 77px;
  margin-bottom: 24px;
  padding: 27px 91px 72px;
  position: relative;
  & > button {
    margin-top: 50px;
  }
  &::after {
    content: '';
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: #fcf3befa;
    border: 2px solid #1e232c;
    border-radius: 20px;
    position: absolute;
    top: 6px;
    left: 8px;
    z-index: -9;
  }
`;

export const SubmitButton = styled.button`
  width: 233px;
  height: 64px;
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1.247916666666667;
  background-color: #defcf9;
  border: 2px solid #1e232c;
  border-radius: 50px;
  box-shadow: 3px 3px 0px 0px #00000040;
  position: absolute;
  bottom: -24px;
  left: 50%;
  transform: translateX(-50%);
`;

export const CircleButton = styled.button`
  width: 274px;
  height: 50px;
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1.247916666666667;
  border: 2px solid #1e232c;
  border-radius: 50px;
  box-shadow: 3px 3px 0px 0px #00000040;
  margin-bottom: 18px;
  &:first-child {
    margin-right: 20px;
  }
`;

export const SNSButtonWrapper = styled.section``;

const SNSLoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 568px;
  height: 64px;
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1.247916666666667;
  border: 2px solid #000000;
  border-radius: 50px;
  position: relative;
  &::after {
    content: '';
    box-sizing: border-box;
    width: 100%;
    max-width: 568px;
    height: 64px;
    border: 2px solid #000000;
    border-radius: 50px;
    position: absolute;
    top: 4px;
    left: 7px;
    z-index: -9;
  }
`;

export const NaverLoginButton = styled(SNSLoginButton)`
  background-color: #03cf5d;
  background-image: url();
  margin-bottom: 18px;
  &::after {
    background-color: #65a0c3;
  }
`;

export const KakaoLoginButton = styled(SNSLoginButton)`
  background-color: #fef073;
  &::after {
    background-color: #cec35d;
  }
`;

export const NaverIcon = styled.img`
  width: 24px;
  margin-right: 10px;
`;

export const KakaoIcon = styled.img`
  width: 32px;
  margin-right: 10px;
`;

export const ErrorMessage = styled.p`
  font-size: 12px;
  color: var(--red);
  margin-top: 1px;
  margin-bottom: 1px;
`;

export const CenterErrorMessage = styled(ErrorMessage)`
  text-align: center;
`;

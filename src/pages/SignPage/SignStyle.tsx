import { styled } from 'styled-components';

export const PageWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
`;

export const PageTitle = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 75px;
`;

export const Form = styled.form`
  width: 385px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 29px;
  & > button {
    margin-top: 35px;
  }
`;

export const SNSSignupText = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 23px;
  position: relative;
  &::before {
    width: 120px;
    height: 1px;
    content: '';
    display: block;
    background-color: var(--purple);
    position: absolute;
    left: -150px;
    top: 50%;
  }
  &::after {
    width: 120px;
    height: 1px;
    content: '';
    display: block;
    background-color: var(--purple);
    position: absolute;
    right: -150px;
    top: 50%;
  }
`;

export const SNSButtonWrapper = styled.section`
  display: flex;
  gap: 62px;
`;

export const SNSSignupButton = styled.button<{ url: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  background-image: url(${(props) => props.url});
`;

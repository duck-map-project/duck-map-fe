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
  width: 100%;
  max-width: 385px;
  display: flex;
  flex-direction: column;
  margin-bottom: 29px;
  & > input {
    margin-bottom: 15px;
  }
  & > button {
    margin-top: 50px;
  }
`;

export const LinkText = styled.a`
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  &:first-child::after {
    content: '|';
    margin: 0 4px;
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

export const ErrorMessage = styled.p`
  color: var(--red);
`;

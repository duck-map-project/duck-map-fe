import styled from 'styled-components';

import timer from '../assets/icons/timer.svg';

const Loading = ({ text }: { text: string }) => {
  const texts = text.split('. ');
  const content = texts.map((text) => (
    <>
      <span key={Math.random()}>{text}</span>
      <br />
    </>
  ));

  return <LoadingWrapper>{content}</LoadingWrapper>;
};

export default Loading;

export const LoadingWrapper = styled.article`
  position: absolute;
  width: 462px;
  padding: 61px 24px 24px 24px;
  background-color: #faf4f9;
  border: 2px solid var(--line-black);
  border-radius: 20px;
  z-index: 9;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    content: '';
    width: 100%;
    height: 37px;
    background-color: #ffdcf1;
    border-radius: 20px 20px 0 0;
    border-bottom: 2px solid var(--line-black);
  }
  &::after {
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    content: '';
    width: 58px;
    height: 58px;
    background-image: url(${timer});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 58px 58px;
    z-index: 999;
  }
`;

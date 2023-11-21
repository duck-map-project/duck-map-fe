import styled from 'styled-components';

import timer from '../assets/timer.svg';
import media from '../utils/mediaQuery';

interface LoadingProps {
  text?: string;
}

const Loading = (props: LoadingProps) => {
  const defaultText = '저장중입니다. 잠시만 기다려주세요.';
  const { text = defaultText } = props;
  const texts = text.split('.');
  const content = texts.map(
    (text, idx) =>
      text && (
        <p key={idx}>
          <span key={Math.random()}>{text}</span>
          <br />
        </p>
      )
  );

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
  top: 30%;
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
    ${media.mobile`
      height: 30px;
    `}
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
    ${media.mobile`
      top: -30px;
    `}
  }
  ${media.mobile`
    width: 100%;
    font-size: 16px;
    padding-top: 50px;
  `}
`;

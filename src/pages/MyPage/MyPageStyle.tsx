import styled from 'styled-components';

import media from '../../utils/mediaQuery';
import px2vw from '../../utils/px2vw';

export const Main = styled.main`
  display: flex;
  justify-content: center;
  gap: 32px;
  width: 100%;
  padding: 0 ${px2vw(142)};
  margin: 0 auto;
  ${media.mobile`
    flex-direction: column;
    align-items: center;
    padding: 0 ${px2vw(27)};
  `}
`;

export const SideSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  ${media.mobile`
    width: 90%;
    margin: 0 27px;
  `}
`;

export const ProfileWrapper = styled.article`
  margin-bottom: 34px;
  text-align: center;
  ${media.mobile`
    display: none;
  `}
`;

export const ProfileImg = styled.img`
  width: 161px;
  height: 161px;
  margin-bottom: 10px;
  border: 2px solid var(--line-black);
  border-radius: 50%;
  object-fit: cover;
`;

export const Username = styled.span`
  display: block;
  font-size: 24px;
  font-weight: 700;
`;

export const ContentSection = styled.section`
  position: relative;
  width: 908px;
  height: 695px;
  padding: 24px 28px 24px 10px;
  background-color: #f6edb2;
  border: 2px solid var(--line-black);
  border-radius: 20px;
  z-index: 0;
  &::after {
    position: absolute;
    display: block;
    content: '';
    width: 100%;
    height: 100%;
    top: -10px;
    right: 10px;
    border: 2px solid var(--line-black);
    border-radius: 20px;
    background-color: #fffbe2;
    z-index: -9;
  }
  ${media.mobile`
    width: 90%;
  height: 578px;
    right: -10px;
    padding: 10px 20px 0 0;
    margin: 0 20px;
  `}
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 4px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 20px;
    ${media.mobile`
      width: 8px;
    `}
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 17px;
    border: 2px solid var(--line-black);
    background-color: #8f9ef2;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    border: 5px solid transparent;
    background-clip: content-box;
    background-color: rgba(176, 180, 204, 0.5);
  }
  ${media.mobile`
    height: 96%;
  `}
`;

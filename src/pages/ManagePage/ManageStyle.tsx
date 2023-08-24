import { styled } from 'styled-components';

import media from '../../utils/mediaQuery';

type tabProps = {
  selected: boolean;
};

export const ManageInfoSection = styled.section`
  display: flex;
  justify-content: space-around;
  gap: 60px;
  padding: 60px;
  border-top: 2px solid var(--line-black);
  border-bottom: 2px solid var(--line-black);
  margin-bottom: 100px;
  background-color: #fffdf6;
  ${media.mobile`
  justify-content: start;
  width: 100%;
  padding: 23px;
  margin-bottom: 20px;
  `}
`;

export const ManageTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  & > h2 {
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 16px;
  }
  & > p {
    font-size: 16px;
  }
  ${media.mobile`
    & > h2 {
      font-size: 24px;
    }
    & > p {
      font-size: 12px;
    }
  `}
`;

export const ManageInfoImage = styled.img`
  width: 520px;
  ${media.mobile`
    display: none;
  `}
`;

export const List = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 1156px;
  height: 900px;
  margin: 0 auto 170px;
  padding: 28px 30px 88px;
  background-color: #fffbe2;
  border: 2px solid var(--line-black);
  border-radius: 17.7px;
  &::before {
    display: block;
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    top: 14px;
    right: -18px;
    border: 2px solid var(--line-black);
    border-radius: 17.7px;
    background-color: #fffbe2;
    z-index: -100;
  }
  ${media.mobile`
    width: 85%;
    padding: 16px 14px;
    margin-bottom: 0px;
    &::before{
      display: none;
    }
  `}
`;

export const TabWrapper = styled.article`
  display: flex;
  align-items: center;
  gap: 9.2px;
  position: absolute;
  top: -67px;
  right: -55%;
  transform: translateX(-100%);
  /* z-index: -9; */
  ${media.mobile`
    display: none;
  `}
`;

export const Tab = styled.label<tabProps>`
  top: 0;
  display: flex;
  align-items: center;
  padding: 10px 14px 10px;
  background-color: #fff3ac;
  font-size: 24px;
  font-weight: 700;
  line-height: normal;
  border-radius: 20px 20px 0 0;
  border: 2px solid var(--line-black);
  cursor: pointer;
  ${(props) =>
    props.selected
      ? `
  position:relative;
  padding-bottom: 34px;
  top: -12px;
  `
      : ``}
`;

export const ListTitleText = styled.span`
  display: block;
  position: relative;
  padding: 13px 40px;
  margin-bottom: 26px;
  font-size: 3.2rem;
  font-weight: 700;
  text-align: center;
  border: 2px solid var(--line-black);
  border-radius: 50px;
  background-color: #defcf9;
  ${media.mobile`
    padding: 6px 20px;
    margin-bottom: 12px;
    font-size: 16px;
  `}
`;

export const ListTitleIcon = styled.div`
  position: relative;
  width: 44px;
  height: 44px;
  right: -10px;
  padding: 10px;
  border: 2px solid var(--line-black);
  border-radius: 50px;
  background-color: #fffdc7;
  text-align: center;
  vertical-align: bottom;
  > img {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
export const ArtistListSection = styled.section`
  display: grid;
  position: relative;
  grid-template-columns: repeat(4, 214px);
  max-height: 100%;
  grid-column-gap: 18px;
  grid-row-gap: 20px;
  padding: 0 72px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 20px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    border: 5px solid transparent;
    background-clip: content-box;
    background-color: rgba(176, 180, 204, 0.5);
  }

  &::-webkit-scrollbar-thumb {
    position: relative;
    background-color: #8f9ef2;
    border: 2px solid var(--line-black);
    border-radius: 17.7px;
  }

  ${media.mobile`
    width: 100%;
    padding: 0 14px 0 0;
    grid-template-columns: repeat(1, 1fr);
    &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    border: 2px solid transparent;
    background-clip: content-box;
    background-color: rgba(176, 180, 204, 0.5);
  }
  `}
`;

import styled from 'styled-components';

import memobackmobile from '../../assets/icons/memo-back-mobile.svg';
import memoback from '../../assets/icons/memo-back.svg';
import memofrontmobile from '../../assets/icons/memo-front-mobile.svg';
import memofront from '../../assets/icons/memo-front.svg';
import media from '../../utils/mediaQuery';

// BookmarkEventItem styling
export const ItemWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 142px;
  gap: 10px;
  ${media.mobile`
    max-width: 104px;
  `}
`;

export const EventImg = styled.img`
  width: 132px;
  height: 109px;
  border: 2px solid var(--line-black);
  border-radius: 20px;
  object-fit: cover;
  ${media.mobile`
    width: 100%;
    height: 93px;
  `}
`;

export const EventName = styled.span`
  width: 132px;
  padding: 5px 6px;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  border: 2px solid #4e5761;
  border-radius: 20px;
  background-color: #f8f8fa;
  //말줄임
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${media.mobile`
  width: 100%;
  padding: 2px;
  font-size: 10px;
  `}
`;

// BookmarkShare styling
export const StyledMain = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  ${media.mobile`
    width: 90%;
    height: 100vh;
    min-height: 930px;
    margin: 0px 5px 0 13px;
  align-items: flex-start;
  `}
`;

export const StyledMemo = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 874px;
  height: 812px;
  padding: 0 90px;
  margin: 56px auto;
  background-image: url(${memofront});
  background-repeat: no-repeat;
  background-position: center center;
  &::before {
    position: absolute;
    display: block;
    content: '';
    width: 100%;
    height: 100%;
    top: -16px;
    right: -16px;
    background-image: url(${memoback});
    background-repeat: no-repeat;
    background-position: center center;
    z-index: -9;
  }
  &::after {
    position: absolute;
    display: block;
    content: '';
    width: 100%;
    height: 100%;
    top: -32px;
    right: -32px;
    background-image: url(${memoback});
    background-repeat: no-repeat;
    background-position: center center;
    z-index: -19;
  }
  ${media.mobile`
    height: 100%;
    padding: 0;
    margin: 0;
    background-image: url(${memofrontmobile});
    background-size: 336px 930px;
    &::before{
    background-image: url(${memobackmobile});
    background-size: 336px 930px;
    top: -8px;
    right: -8px;
    }
    &::after {
      background-image: url(${memobackmobile});
      background-size: 336px 830px;
      top: -16px;
      right: -16px;
    }
  `}
`;

export const Logo = styled.h4`
  position: relative;
  padding: 7px 51px;
  margin-top: 34px;
  border: 2px solid var(--line-black);
  border-radius: 80px;
  background-color: #f8f8fa;
  ${media.mobile`
    padding: 5px 31px;
    margin-top: 77px;
    &>img {
      width: 172px;
    }
  `}
`;

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 75%;
  margin-top: 26px;
  padding: 16px;
  border: 2px solid var(--line-black);
  background-color: #fbf8fa;
  ${media.mobile`
    width: 85%;
    height: 630px;
  `}
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Username = styled.span`
  font-size: 20px;
  font-weight: 700;
  line-height: normal;
  ${media.mobile`
    font-size: 18px;
  `}
`;

export const Foldername = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  margin-top: 14px;
  font-size: 20px;
  font-weight: 700;
  line-height: normal;
  ${media.mobile`
    margin-top: 13px;
    font-size: 16px;
    & > img {
      width: 16px;
      height: 16px;
    }
  `}
`;

export const EventWrapper = styled.article`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 12px;
  width: 474px;
  padding: 16px;
  border-top: 2px solid var(--line-black);
  overflow-y: scroll;
  ${media.mobile`
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 12px;
  row-gap: 8px;
  `}
`;

export const NoticeNoEvents = styled.section`
  width: 474px;
  min-height: 380px;
  padding: 16px;
  border-top: 2px solid var(--line-black);
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  ${media.mobile`
    width: 100%;
    font-size: 16px;
  `}
`;

export const MainPageBtn = styled.button`
  padding: 14px 60px;
  margin-top: 16px;
  font-size: 24px;
  font-weight: 700;
  line-height: normal;
  border: 2px solid var(--line-black);
  border-radius: 50px;
  background-color: #defcf9;
  ${media.mobile`
    width: 219px;
    padding: 12px 30px;
    margin-top: 29px;
    font-size: 20px;
  `}
`;

import styled from 'styled-components';

import memoback from '../../assets/icons/memo-back.svg';
import memofront from '../../assets/icons/memo-front.svg';

export const ItemWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 142px;
  gap: 10px;
`;

export const EventImg = styled.img`
  width: 132px;
  height: 109px;
  border: 2px solid var(--line-black);
  border-radius: 20px;
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
`;

export const StyledMain = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledMemo = styled.article`
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
`;

export const Logo = styled.h4`
  padding: 7px 51px;
  margin-top: 34px;
  border: 2px solid var(--line-black);
  border-radius: 80px;
  background-color: #f8f8fa;
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
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

// export const ProfileImg = styled.img`
//   width: 70px;
//   height: 70px;
//   border: 2px solid var(--line-black);
//   border-radius: 50%;
//   object-fit: cover;
// `;

export const Username = styled.span`
  font-size: 20px;
  font-weight: 700;
  line-height: normal;
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
`;

export const EventWrapper = styled.article`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 12px;
  width: 474px;
  padding: 16px;
  border-top: 2px solid var(--line-black);
  overflow-y: scroll;
`;

export const NoticeNoEvents = styled.section`
  width: 474px;
  min-height: 380px;
  padding: 16px;
  border-top: 2px solid var(--line-black);
  font-size: 20px;
  font-weight: 700;
  text-align: center;
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
`;

import styled, { keyframes } from 'styled-components';

import bookmarkicon from '../../../assets/bookmark.svg';
import media from '../../../utils/mediaQuery';

import { SettingIconsWrapper } from './BookmarkFolderItemStyle';

// BookmarkEventItem styling

type EventItemProps = {
  bookmarkicon: string;
};

const shaking = keyframes`
  from {
    transform: rotate(5deg);
  }
  to{
    transform: rotate(-5deg);
  }
`;

export const ItemWrapper = styled.div<EventItemProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 142px;
  gap: 10px;
  cursor: pointer;
  &::after {
    position: absolute;
    display: block;
    content: url(${bookmarkicon});
    width: 25px;
    height: 34px;
    top: -4px;
    left: 19px;
  }
  ${media.mobile`
  width: 50%;
  gap: 9px;
  margin-bottom: 12px;
  `}
`;

export const EventImg = styled.img`
  width: 141px;
  height: 119px;
  border: 2px solid var(--line-black);
  border-radius: 20px;
  object-fit: cover;
  ${media.mobile`
    width: 95%;
  `}
`;

export const EventName = styled.span`
  width: 142px;
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
  width: 95%;
  /* width: 134px; */
  height: 24px;
  padding: 2px 6px;
  `}
`;

export const SettingIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 5px;
  border: 2px solid var(--line-black);
  border-radius: 40px;
  background-color: #f8f8fa;
  box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.25);
  animation: ${shaking} 0.15s infinite linear alternate;
  will-change: transform;
  cursor: pointer;
`;

export const EventSettingIconsWrapper = styled(SettingIconsWrapper)`
  top: -6%;
  right: -5%;
  ${media.mobile`
    right: 0;
  `}
`;

import styled from 'styled-components';

import bookmarkIcon from '../../../assets/icons/bookmark.svg';

type EventItemProps = {
  bookmarkIcon: string;
};

export const FloderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 142px;
`;

export const FolderNameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: 142px;
  margin: 0 auto;
`;

export const NameIcon = styled.button`
  position: relative;
  display: inline-block;
  width: 26px;
  height: 26px;
  padding: 8px 10px;
  border: 2px solid var(--line-black);
  border-radius: 50%;
  align-items: center;
  text-align: center;
  & > img {
    position: absolute;
    display: block;
    width: 12px;
    height: 12px;
    top: 0;
    left: 0;
    transform: translate(40%, 40%);
  }
`;

export const FolderName = styled.span`
  width: 112px;
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

export const ItemWrapper = styled.div<EventItemProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 142px;
  gap: 10px;
  &::after {
    position: absolute;
    display: block;
    content: url(${bookmarkIcon});
    width: 25px;
    height: 34px;
    top: -4px;
    left: 19px;
  }
`;

export const EventImg = styled.img`
  width: 141px;
  height: 119px;
  border: 2px solid var(--line-black);
  border-radius: 20px;
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
`;

import styled, { keyframes } from 'styled-components';

import bookmarkicon from '../../../assets/icons/bookmark.svg';

//types
type EmojiPreviewType = {
  img: string;
};

type EventItemProps = {
  bookmarkicon: string;
};

type EditBtnProps = {
  editmode: string | undefined;
};

// BookmarkFolderItem styling

const shaking = keyframes`
  from {
    transform: rotate(5deg);
  }
  to{
    transform: rotate(-5deg);
  }
`;

export const FolderWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 142px;
`;

export const EmojiPreview = styled.span<EmojiPreviewType>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 40%;
  left: 15px;
  transform: translate(50%, -50%);
  width: 54px;
  height: 54px;
  border: 2px solid var(--line-black);
  border-radius: 50%;
  background-color: white;
  & > img {
    width: 30px;
    height: 30px;
  }
`;

export const FolderNameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: 142px;
  margin: 0 auto;
`;

export const SettingIconsWrapper = styled.div`
  position: absolute;
  display: flex;
  gap: 2px;
  top: 3px;
  right: 0;
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

// BookmarkEventItem styling
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
    content: url(${bookmarkicon});
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

// BookmarkFolders styling
export const FoldersHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 41px;
  &::after {
    position: absolute;
    display: block;
    content: '';
    top: 150%;
    width: 100%;
    height: 8px;
    border: 2px solid var(--line-black);
    border-radius: 20px;
    background-color: #f9eca3;
    box-sizing: border-box;
  }
`;

export const Path = styled.div`
  display: flex;
  align-items: center;
  & > img {
    margin-right: 10px;
  }
  & > span {
    margin-right: 10px;
    font-size: 20px;
    font-weight: 700;
    line-height: normal;
  }
`;

export const GoBookmarkFolders = styled.span`
  cursor: pointer;
`;

export const SettingBtnWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

export const SettingBtn = styled.button`
  display: flex;
  align-items: center;
  padding: 4px 12px;
  font-size: 14px;
  font-weight: 700;
  line-height: normal;
  border: 2px solid var(--line-black);
  border-radius: 20px;
  background-color: #defcf9;
  box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  & > img {
    margin-right: 10px;
  }
`;

export const GoEditBtn = styled(SettingBtn)<EditBtnProps>`
  ${(props) =>
    props.editmode &&
    `
  background-color: #B7EDE8;
`}
`;

export const FoldersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

//Events styling
export const EventsHeader = styled(FoldersHeader)``;
export const EventsContainer = styled(FoldersContainer)``;
export const EventSettingIconsWrapper = styled(SettingIconsWrapper)`
  top: -6%;
  right: -5%;
`;
// Bookmark styling
export const BookmarkWrapper = styled.section`
  width: 100%;
  padding-right: 30px;
`;

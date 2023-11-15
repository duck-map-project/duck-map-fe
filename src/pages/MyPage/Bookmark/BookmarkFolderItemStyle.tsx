import styled, { keyframes } from 'styled-components';

import { ReactComponent as Bookmarkfoldericon } from '../../../assets/bookmark-folder.svg';
import media from '../../../utils/mediaQuery';

// type EmojiPreviewType = {
//   img: string;
// };

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
  cursor: pointer;
  ${media.mobile`
  width: 50%;
  gap: 0px;
  `}
`;

export const StyledFolderIcon = styled(Bookmarkfoldericon)`
  width: 90%;
  max-width: 135px;
`;

export const EmojiPreview = styled.span`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -75%);
  min-width: 54px;
  min-height: 54px;
  border: 2px solid var(--line-black);
  border-radius: 100%;
  background-color: white;
  & > img {
    max-width: 30px;
    max-height: 30px;
  }
  ${media.mobile`
    top: 55%;
  `}
`;

export const SettingIconsWrapper = styled.div`
  position: absolute;
  display: flex;
  gap: 2px;
  top: 3px;
  right: 0;
  ${media.mobile`
    top: 12px;
    right: 5px;
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
  ${media.mobile`
    width: 22.5px;
    height: 22.5px;
    &>img{
      width: 12px;
      height: 12px;
    }
  `}
`;

export const FolderNameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: 100%;
  margin: 0 auto;
  ${media.mobile`
    width: 95%;
    gap: 3px;
  `}
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
  color: #4e5761;
  border: 2px solid #4e5761;
  border-radius: 20px;
  background-color: #f8f8fa;
  //말줄임
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${media.mobile`
  width: 80%;
  height: 24px;
  padding: 3px 6px;
  `}
`;

import styled from 'styled-components';

import media from '../../utils/mediaQuery';

//BookmarkFolderItem styling
export const EmojiBox = styled.div`
  width: 56px;
  height: 56px;
  padding: 13px;
  border: 1.4px solid var(--line-black);
  border-radius: 10px;
  background-color: #f8f8fa;
  ${media.mobile`
    width: 42px;
    height: 42px;
    padding: 10px;
  `}
`;

export const EmojiWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 29px;
  height: 29px;
  border: 1.4px solid var(--line-black);
  border-radius: 50%;
  background-color: #f9fffe;
  ${media.mobile`
    width: 21px;
    height: 21px;
  `}
`;

export const Emoji = styled.img`
  height: 16px;
  width: 16px;
  ${media.mobile`
    width: 12px;
    height: 12px;
  `}
`;

export const FolderItemWrapper = styled.article<{ $isSelected: boolean }>`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding: 7px 10px;
  cursor: pointer;
  ${(props) =>
    props.$isSelected &&
    `
    background-color: rgba(255, 255, 255, 0.7);
  `};
`;

export const Foldername = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

//BookmarkModal styling
export const ModalTitle = styled.h4`
  padding: 13px 58px;
  margin: 24px 0 22px;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  border: 2.937px solid var(--line-black);
  border-radius: 73px;
  background-color: #fcf9a4;
  ${media.mobile`
    width: 80%;
    font-size: 20px;
    padding: 8px 20px;
  `}
`;

export const FoldersContainer = styled.div`
  position: relative;
  width: 350px;
  padding: 20px 0px 22px 0;
  border: 2px solid var(--line-black);
  border-radius: 20px;
  background-color: #e6f8fe;
  margin-bottom: 30px;
  &::before {
    position: absolute;
    display: block;
    content: '';
    top: -2px;
    left: -2px;
    width: 100%;
    height: 32px;
    border: 2px solid var(--line-black);
    border-radius: 20px 20px 0 0;
    background-color: #ffd0ec;
  }
  &::after {
    position: absolute;
    display: block;
    content: '';
    bottom: -2px;
    left: -2px;
    width: 100%;
    height: 32px;
    border: 2px solid var(--line-black);
    border-radius: 0 0 20px 20px;
    background-color: #ffd0ec;
  }
  ${media.mobile`
    width: 100%;
    margin-bottom: 16px;
  `}
`;

export const FoldersLists = styled.div`
  display: flex;
  flex-direction: column;
  height: 370px;
  padding: 6px 6px;
  margin: 14px 0px 10px 0;
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 18px;
    background-color: #fff4fb;
    ${media.mobile`
      width: 12px;
    `}
  }
  &::-webkit-scrollbar-thumb {
    position: relative;
    border: 2px solid var(--line-black);
    border-radius: 10px;
    background-color: #ffd0ec;
    background-clip: padding-box;
  }
  &::after {
    position: absolute;
    display: block;
    content: '';
    top: 32px;
    right: 12px;
    width: 2px;
    height: 390px;
    background-color: var(--line-black);
  }
`;

export const SubmitButton = styled.button`
  width: 232px;
  padding: 16px;
  border: 3px solid var(--line-black);
  border-radius: 73px;
  background-color: #defcf9;
  font-size: 35px;
  font-weight: 700;
  box-shadow: 6px 4px 0px 0px rgb(0, 0, 0, 0.3);
  ${media.mobile`
    width: 135px;
    padding: 12px;
    font-size: 20px;
  `}
`;

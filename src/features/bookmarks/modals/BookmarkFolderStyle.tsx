import styled from 'styled-components';

import { ReactComponent as BookmarkFolder } from '../../../assets/bookmark-folder.svg';
import checkicon from '../../../assets/check.svg';
import media from '../../../utils/mediaQuery';

type EmojiPreviewType = {
  img: string;
};

type EmojiLabelType = {
  selected: boolean;
};

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-height: 80vh;
  overflow-y: scroll;
`;

export const ModalTitle = styled.h4`
  width: 300px;
  height: 60px;
  padding: 12px 0px;
  margin: 24px 0 22px;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  line-height: normal;
  border: 2.937px solid var(--line-black);
  border-radius: 73px;
  background-color: #fcf9a4;
  ${media.mobile`
    width: 80%;
    padding: 8px 20px;
    font-size: 20px;
  `}
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 17px;
  ${media.mobile`
  top: 11px;
  right: 14px;
  & > img{
    width: 17px;
    height: 17px;
  }
  `}
`;

export const FoldernameSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 60%;
  margin-bottom: 22px;
  ${media.mobile`
  width: 100%;
  align-items: center;
  `}
`;

export const FoldernameLabel = styled.label`
  margin-left: 20px;
  font-size: 24px;
  font-weight: 700;
  ${media.mobile`
    font-size: 16px;
  `}
`;

export const FoldernameInput = styled.input`
  width: 503px;
  height: 58px;
  padding: 20px;
  font-size: 20px;
  border: 1.4px solid var(--line-black);
  border-radius: 40px;
  background-color: #f8f8fa;
  box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 0.25);
  ${media.mobile`
    width: 90%;
    height: 36px;
    padding: 12px 20px;
    font-size: 14px;
  `}
`;

export const FoldernameDeleteBtn = styled.span`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 55px;
  right: 0px;
  width: 30px;
  height: 30px;
  color: #8b8e97;
  border: 1.4px solid #8b8e97;
  border-radius: 50%;
  background-color: #ededed;
  cursor: pointer;
  ${media.mobile`
    width: 14px;
    height: 14px;
    top: 41px;
    right: 25px;
    & > img {
      width: 8px;
      height: 8px;
    }
  `}
`;

export const FoldericonSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 60%;
  margin-bottom: 22px;
  ${media.mobile`
    width: 100%;
    align-items: center;
  `}
`;

export const IconSectionTitle = styled.span`
  margin-left: 20px;
  font-size: 24px;
  font-weight: 700;
  ${media.mobile`
    font-size: 16px;
  `}
`;

export const IconSelectSection = styled.div`
  display: flex;
  align-items: center;
  gap: 37px;
  ${media.mobile`
    flex-direction: column;
    gap: 8px;
  `}
`;

export const EmojiBox = styled.div`
  position: relative;
  width: 350px;
  padding: 22px 2px 22px 0;
  border: 2px solid var(--line-black);
  border-radius: 20px;
  background-color: #fff0fd;
  &::before {
    position: absolute;
    display: block;
    content: '';
    top: -2px;
    left: -2px;
    width: 100%;
    height: 16px;
    border: 2px solid var(--line-black);
    border-radius: 20px 20px 0 0;
    background-color: #e1edfe;
  }
  &::after {
    position: absolute;
    display: block;
    content: '';
    bottom: -2px;
    left: -2px;
    width: 100%;
    height: 16px;
    border: 2px solid var(--line-black);
    border-radius: 0 0 20px 20px;
    background-color: #e1edfe;
  }
  ${media.mobile`
    width: 100%;
    padding: 18px 2px 18px 0;
  `}
`;

export const EmojiLists = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 40px);
  column-gap: 9.6px;
  row-gap: 16px;
  height: 126px;
  padding: 20px 30px 20px 10px;
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 14px;
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
    top: 18px;
    right: 18px;
    width: 2px;
    height: 140px;
    background-color: var(--line-black);
    ${media.mobile`
      height: 90px;
    `}
  }
  ${media.mobile`
  height: 81px;
  padding: 12px 30px 12px 18px;
  grid-template-columns: repeat(4, 40px);
  `}
`;

export const EmojiPreviewFolderWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 9px;
`;

export const StyledBookmarkFolder = styled(BookmarkFolder)`
  ${media.mobile`
    width: 105px;
    height: 72px;
  `}
`;
export const EmojiPreview = styled.span<EmojiPreviewType>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 45%;
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
  ${media.mobile`
    width: 40px;
    height: 40px;
    top: 36%;
    left: 12px;
    & > img{
      width: 19px;
      height: 19px;
    }
  `}
`;

export const EmojiLabel = styled.label<EmojiLabelType>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 54px;
  &::after {
    position: absolute;
    ${(props) =>
      props.selected
        ? `
    display: block;
    `
        : `
    display: none;
    `}
    content: '';
    top: 0;
    width: 26px;
    height: 26px;
    border: 1.4px solid var(--line-black);
    border-radius: 50%;
    background-color: #f8f8fa;
    background-image: url(${checkicon});
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.25);
    ${media.mobile`
      width: 20px;
      height: 20px;
      top: 6px;
    `}
  }
`;

export const Previewtext = styled.span`
  width: 116px;
  height: 28px;
  padding: 0 14px;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  line-height: normal;
  border: 2px solid var(--line-black);
  border-radius: 73.419px;
  background: #f8f8fa;
  box-shadow: 4.4px 4.4px 0px 0px rgba(0, 0, 0, 0.25);
  ${media.mobile`
    width: 87px;
    font-size: 12px;
    padding: 4px;
  `}
`;

export const FolderColorSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 60%;
  margin-bottom: 24px;
  ${media.mobile`
    width: 100%;
    align-items: center;
    gap: 5px;
  `}
`;

export const ColorSectionTitle = styled.span`
  margin-left: 20px;
  font-size: 24px;
  font-weight: 700;
  ${media.mobile`
    font-size: 16px;
  `}
`;

export const ColorSelectSection = styled.div`
  display: flex;
  align-items: center;
  gap: 37px;
  ${media.mobile`
    flex-direction: column;
    gap: 8px;
  `}
`;

export const ColorBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 350px;
  padding: 34px 2px 34px 0;
  border: 2px solid var(--line-black);
  border-radius: 20px;
  background-color: #fff0fd;
  &::before {
    position: absolute;
    display: block;
    content: '';
    top: -2px;
    left: -2px;
    width: 100%;
    height: 16px;
    border: 2px solid var(--line-black);
    border-radius: 20px 20px 0 0;
    background-color: #e1edfe;
  }
  &::after {
    position: absolute;
    display: block;
    content: '';
    left: -2px;
    bottom: -2px;
    width: 100%;
    height: 16px;
    border: 2px solid var(--line-black);
    border-radius: 0 0 20px 20px;
    background-color: #e1edfe;
  }
  ${media.mobile`
    width: 100%;
    min-width: 0;
    padding: 30px;
  `}
`;

export const ColorPreviewFolderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
`;

export const AddNewFolderBtn = styled.button`
  width: 232px;
  height: 64px;
  padding: 8px 14px;
  margin: 0 auto 10px;
  font-size: 35px;
  font-weight: 700;
  line-height: normal;
  border: 3px solid var(--line-black);
  border-radius: 73.4px;
  background-color: #defcf9;
  box-shadow: 4.4px 4.4px 0px 0px rgba(0, 0, 0, 0.25);
  ${media.mobile`
    width: 160px;
    padding: 10px;
    font-size: 24px;
  `}
`;

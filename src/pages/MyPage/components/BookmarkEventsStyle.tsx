import styled from 'styled-components';

import { SettingIconsWrapper } from './BookmarkFolderItemStyle';
import { FoldersHeader, FoldersContainer } from './BookmarkFoldersStyle';

type EditBtnProps = {
  editmode: string | undefined;
};

export const GoBookmarkFolders = styled.span`
  cursor: pointer;
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

export const EventsHeader = styled(FoldersHeader)``;

export const EventsContainer = styled(FoldersContainer)``;

export const EventSettingIconsWrapper = styled(SettingIconsWrapper)`
  top: -6%;
  right: -5%;
`;

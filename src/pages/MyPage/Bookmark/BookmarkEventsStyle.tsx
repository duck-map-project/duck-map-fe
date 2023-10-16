import styled from 'styled-components';

import media from '../../../utils/mediaQuery';

import { SettingIconsWrapper } from './BookmarkFolderItemStyle';
import { FoldersHeader, FoldersContainer } from './BookmarkFoldersStyle';

export const Arrow = styled.img`
  margin-right: 10px;
  ${media.mobile`
    margin-right: 6px;
  
`}
`;
export const EventsHeader = styled(FoldersHeader)``;

export const EventsContainer = styled(FoldersContainer)``;

export const EventSettingIconsWrapper = styled(SettingIconsWrapper)`
  top: -6%;
  right: -5%;
`;

import { styled } from 'styled-components';

import media from '../../utils/mediaQuery';

import {
  AritstSelectSection,
  ArtistListSection,
  selectedListStyle,
} from './ArtistSelectModalStyle';
import { ModalTitle } from './GroupModalStyle';


export const CategoryModalTitle = styled(ModalTitle)`
  ${media.mobile`
  padding: 8px 20px;
    
  `}
`;
export const CategorySelectSection = styled(AritstSelectSection)`
  padding: 32px 0;
`;

export const CategoryListSection = styled(ArtistListSection)`
  height: 178px;
`;

export const CategoryItem = styled.li<{
  selectedIds: number[];
  currentId: number;
}>`
  width: 102px;
  padding: 15px 0;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.248125;
  text-align: center;
  background-color: #eff2f3;
  border: 1.4px solid #1e232c;
  border-radius: 30px;
  ${(props) =>
    props.selectedIds.includes(props.currentId) ? selectedListStyle : null}
`;

import styled from 'styled-components';

import SortDropdown from '../../../components/SortButton';
import media from '../../../utils/mediaQuery';

import {
  ModalTitle,
  ModalCloseButton,
  ImageNameWrapper,
  ImagePreview,
  NameInput,
  SubmitButton,
} from './GroupModalStyle';

export const ArtistModalTitle = styled(ModalTitle)``;

export const ArtistModalCloseButton = styled(ModalCloseButton)``;

export const ArtistImageNameWrapper = styled(ImageNameWrapper)``;

export const TypeTitle = styled.span`
  position: relative;
  font-size: 24px;
  font-weight: 700;
  ${media.mobile`
    font-size: 18px;
    top: 175px;
  `}
`;

export const TypeWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  width: 70%;
  margin: 10px 0 32px;
  ${media.mobile`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
  top: 175px;
  `}
`;

export const ArtistImagePreview = styled(ImagePreview)`
  ${media.mobile`
    top: -130px;
  `}
`;

export const ArtistInfoWrapper = styled.div`
  ${media.mobile`
  display: flex;
  flex-direction: column;
  align-items: center;
`}
`;

export const GroupSortDropdown = styled(SortDropdown)`
  position: relative;
  right: 0;
  ${media.mobile`
    top: -5px;
  `}
`;

export const StyledInput = styled.input`
  position: absolute;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
`;

export const NameLabel = styled.label`
  position: relative;
  display: block;
  font-size: 24px;
  font-weight: 700;
  margin: 10px 20px;
  ${media.mobile`
    font-size: 18px;
  `}
`;

export const ArtistNameInput = styled(NameInput)``;

export const ArtistSubmitButton = styled(SubmitButton)``;

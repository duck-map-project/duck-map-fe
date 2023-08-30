import styled from 'styled-components';

import media from '../../utils/mediaQuery';
import SortDropdown from '../SortButton';

import {
  ModalTitle,
  ModalCloseButton,
  ImageNameWrapper,
} from './GroupModalStyle';

type imageType = {
  previewimage: string | undefined;
};

export const ArtistModalTitle = styled(ModalTitle)``;

export const ArtistModalCloseButton = styled(ModalCloseButton)``;

export const ArtistImageNameWrapper = styled(ImageNameWrapper)``;

export const TypeTitle = styled.span`
  font-size: 24px;
  font-weight: 700;
  ${media.mobile`
    font-size: 18px;
  `}
`;

export const TypeWrapper = styled.div`
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
  `}
`;

export const ImagePreview = styled.label<imageType>`
  display: block;
  position: relative;
  width: 232px;
  height: 232px;
  border: 2px solid var(--line-black);
  border-radius: 30px;
  text-align: center;
  cursor: pointer;
  ${(props) =>
    props.previewimage
      ? `
      background-image: url(${props.previewimage});
      background-size: cover;
      background-position: center center;
      `
      : `
      background-color: var(--line-grey2);
      `}
  & > img {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const GroupSortDropdown = styled(SortDropdown)`
  position: relative;
  right: 0;
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
  display: block;
  font-size: 24px;
  font-weight: 700;
  margin: 10px 20px;
`;

export const NameInput = styled.input`
  width: 360px;
  height: 58px;
  padding: 20px;
  font-size: 20px;
  font-weight: 400;
  background-color: #f8f8fa;
  border: 1.4px solid var(--font-black);
  border-radius: 30px;
  box-shadow: 7px 5px 0px 0px rgb(0, 0, 0, 0.3);
  &::placeholder {
    font-size: 20px;
    color: #8f9196;
  }
`;

export const SubmitButton = styled.button`
  width: 202px;
  font-size: 35px;
  font-weight: 700;
  padding: 16px;
  border: 3px solid var(--line-black);
  border-radius: 73px;
  background-color: #defcf9;
  box-shadow: 6px 4px 0px 0px rgb(0, 0, 0, 0.3);
`;

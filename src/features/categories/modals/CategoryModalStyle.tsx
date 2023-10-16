import styled from 'styled-components';

import media from '../../../utils/mediaQuery';
import {
  ModalTitle,
  ModalCloseButton,
  NameLabel,
  SubmitButton,
  NameInput,
} from '../../artists/modals/GroupModalStyle';

export const CategoryModalTitle = styled(ModalTitle)``;

export const CategoryModalCloseButton = styled(ModalCloseButton)``;

export const TypeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 70%;
  margin: 10px 0 14px;
  ${media.mobile`
    width: 80%;
    gap: 4px;
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

export const ImageNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 26px;
`;

export const CategoryNameLabel = styled(NameLabel)`
  ${media.mobile`
  margin-bottom: 0;
`}
`;

export const CategoryInput = styled(NameInput)`
  width: 70%;
  margin-bottom: 20px;
  ${media.mobile`
  width: 90%;
`}
`;

export const CategorySubmitButton = styled(SubmitButton)``;

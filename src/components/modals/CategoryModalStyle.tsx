import styled from 'styled-components';

import media from '../../utils/mediaQuery';

import {
  ModalTitle,
  ModalCloseButton,
  NameLabel,
  SubmitButton,
} from './GroupModalStyle';

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

export const CategoryNameLabel = styled(NameLabel)``;

export const CategoryInput = styled.input`
  width: 70%;
  /* height: 58px; */
  padding: 20px;
  margin-bottom: 31px;
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
  ${media.mobile`
    width: 90%;
    padding: 13px;
    font-size: 13px;
    border-radius: 20px;
    &::placeholder {
      font-size: 13px;
    }
  `}
`;

export const CategorySubmitButton = styled(SubmitButton)``;

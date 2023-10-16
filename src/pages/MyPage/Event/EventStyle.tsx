import styled from 'styled-components';

import deleteicon from '../../../assets/icons/delete.svg';
import editicon from '../../../assets/icons/edit.svg';
import usericon from '../../../assets/icons/mypage.svg';
import media from '../../../utils/mediaQuery';
import { LikeWrapper } from '../Like/LikeStyle';

export const EventWrapper = styled(LikeWrapper)`
  &::after {
    background-image: url(${usericon});
  }
`;

export const EventControlsWrapper = styled.div`
  position: absolute;
  display: flex;
  gap: 10px;
  top: -28px;
  right: 24px;
`;

const StyledBtn = styled.button`
  position: relative;
  width: 102px;
  height: 28px;
  padding: 4px 12px 4px 32px;
  text-align: center;
  border: 2px solid var(--line-black);
  border-radius: 20px 20px 0 0;
  background-color: #fff3ac;
  ${media.mobile`
    width: 28px;
    padding: 0;
    z-index: -1;
  `}
`;

export const EditBtn = styled(StyledBtn)`
  &::before {
    position: absolute;
    display: block;
    content: '';
    width: 20px;
    height: 20px;
    top: 3px;
    left: 12px;
    background-image: url(${editicon});
    background-repeat: no-repeat;
    background-position: center;
    ${media.mobile`
    width: 14px;
    top: 3px;
      left: 5px;
    `}
  }
`;

export const DeleteBtn = styled(StyledBtn)`
  &::before {
    position: absolute;
    display: block;
    content: '';
    width: 20px;
    height: 24px;
    top: 0;
    left: 12px;
    background-image: url(${deleteicon});
    background-repeat: no-repeat;
    background-position: center;
    ${media.mobile`
    width: 15px;
    top: 1px;
    left: 5px;
    `}
  }
`;

export const BtnText = styled.span`
  font-size: 14px;
  font-weight: 700;
  line-height: normal;
  ${media.mobile`
    display: none;
  `}
`;
export const EventContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

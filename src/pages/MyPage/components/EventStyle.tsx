import styled from 'styled-components';

import deleteicon from '../../../assets/icons/delete.svg';
import editicon from '../../../assets/icons/edit.svg';
import usericon from '../../../assets/icons/mypage.svg';

type EventWrapperProps = {
  icon: string;
};

export const EventWrapper = styled.article<EventWrapperProps>`
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 14px;
  width: 100%;
  height: 154px;
  padding: 11px 20px;
  margin-top: 22px;
  margin-right: 34px;
  border: 2px solid var(--line-black);
  border-radius: 20px;
  background-color: #f8f8fa;
  &::after {
    position: absolute;
    display: block;
    content: '';
    width: 28px;
    height: 22px;
    top: -27px;
    padding: 12px;
    border: 2px solid var(--line-black);
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    background-color: #d7f5ff;
    background-image: url(${usericon});
    background-repeat: no-repeat;
    background-position: center;
    box-sizing: border-box;
    z-index: -1;
  }
`;

export const EventImg = styled.img`
  width: 124px;
  height: 124px;
  border: 2px solid var(--line-black);
  border-radius: 20px;
  object-fit: cover;
`;

export const ArtistInfo = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 7.6px;
`;

export const GroupName = styled.span`
  font-size: 16px;
  font-weight: 700;
`;

export const ArtistName = styled.span`
  font-size: 16px;
  font-weight: 700;
  margin-right: 5px;
`;

export const EventTypeWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
`;

export const TypeInfoBtn = styled.span`
  min-width: 68px;
  padding: 5px 20px;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  line-height: normal;
  border: 2px solid #a0a0a0;
  border-radius: 30px;
  background-color: #f5edff;
`;

export const StoreName = styled.span`
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
`;

export const Adress = styled.span`
  display: block;
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
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
  min-width: 102px;
  height: 28px;
  padding: 4px 12px 4px 32px;
  font-size: 14px;
  font-weight: 700;
  line-height: normal;
  text-align: center;
  border: 2px solid var(--line-black);
  border-radius: 20px 20px 0 0;
  background-color: #fff3ac;
`;

export const EditEventBtn = styled(StyledBtn)`
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
  }
`;

export const DeleteEventBtn = styled(StyledBtn)`
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
  }
`;

export const EventContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

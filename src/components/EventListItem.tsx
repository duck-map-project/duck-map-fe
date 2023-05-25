import { styled } from 'styled-components';

import Tag from './Tag';

export const EventListItemBox = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid var(--blue-purple);
  padding: 14px 0 14px 15px;
  background-color: var(--white);
`;

const EventImage = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 11px;
`;

const NameSection = styled.div`
  display: flex;
  margin-bottom: 9px;
`;

const StrongTxt = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
`;

const GroupName = styled(StrongTxt)`
  margin-right: 9px;
`;

const RegularTxt = styled.span`
  display: block;
  font-size: 1.6rem;
`;

const EventListItem = () => {
  return (
    // FIXME: 동적으로 데이터 받아오기
    <EventListItemBox>
      <EventImage />
      <div>
        <NameSection>
          <GroupName>그룹명</GroupName>
          <RegularTxt>멤버 이름</RegularTxt>
        </NameSection>
        <Tag marginB="16px" />
        <RegularTxt> 주소 </RegularTxt>
      </div>
    </EventListItemBox>
  );
};

export default EventListItem;

import { styled } from 'styled-components';

import Button from './Button';
import Tag from './Tag';

const EventListItemBox = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid var(--blue-purple);
  padding: 17px 0 17px 25px;
`;

const EventImage = styled.img`
  width: 212px;
  height: 256px;
  margin-right: 24px;
`;

const NameSection = styled.div`
  display: flex;
  margin-bottom: 25px;
`;

const StrongTxt = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
`;

const GroupName = styled(StrongTxt)`
  margin-right: 18px;
`;

const RegularTxt = styled.span`
  display: block;
  font-size: 1.8rem;
`;

const AdressTxt = styled(RegularTxt)`
  margin-bottom: 56px;
`;

const EventListItemDetail = () => {
  return (
    // FIXME: 동적으로 데이터 받아오기
    <EventListItemBox>
      <EventImage />
      <div>
        <NameSection>
          <GroupName>그룹명</GroupName>
          <RegularTxt>멤버 이름</RegularTxt>
        </NameSection>
        <Tag marginB="32px" />
        <AdressTxt> 주소 </AdressTxt>
        <Button size="big" color="primary">
          자세히 보기
        </Button>
      </div>
    </EventListItemBox>
  );
};

export default EventListItemDetail;

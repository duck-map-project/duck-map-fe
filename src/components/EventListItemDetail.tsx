import { styled } from 'styled-components';

// import { useRouter } from '../hooks/useRouter';
// import { EventData } from '../types/eventService';

import Tag from './Tag';

const EventListItemBox = styled.li`
  display: flex;
  width: 100%;
  background-color: #e6f8fe;
  border: 2px solid #1e232c;
  border-radius: 10px;
  border-radius: 20px;
  padding: 16px 0 16px 20px;
  cursor: pointer;
`;

const EventImage = styled.img`
  width: 246px;
  height: 246px;
  margin: auto 24px auto 0;
  border: 2px solid #1e232c;
  border-radius: 20px;
`;

const EventTextSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const NameSection = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 16px 0 15px;
`;

const StrongTxt = styled.p`
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1.247916666666667;
`;

const GroupName = styled(StrongTxt)`
  margin-right: 12px;
`;

const RegularTxt = styled.span`
  display: block;
  font-size: 1.6rem;
`;

const MemberName = styled(RegularTxt)`
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.248;
`;

const StoreName = styled(StrongTxt)`
  margin-bottom: 12px;
`;

// FIXME: event 타입 변경
interface EventListItemDetailProps {
  event: any;
  onEventListClick: (eventId: number) => void;
}

const EventListItemDetail = ({
  event,
  onEventListClick,
}: EventListItemDetailProps) => {
  // const { routeTo } = useRouter();
  return (
    <EventListItemBox
      onClick={() => {
        onEventListClick(event.id);
      }}
    >
      <EventImage src={event.image} />
      <EventTextSection>
        <NameSection>
          <GroupName>{event.artists[0].groupName}</GroupName>
          <MemberName>{event.artists[0].name}</MemberName>
        </NameSection>
        <Tag categories={event.categories} type="detail" marginB="45px" />
        <StoreName>{event.storeName}</StoreName>
        <StrongTxt> {event.address} </StrongTxt>
      </EventTextSection>
    </EventListItemBox>
  );
};

export default EventListItemDetail;

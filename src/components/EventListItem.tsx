import { styled } from 'styled-components';

// import { EventData } from '../types/eventService';

import Tag from './Tag';

export const EventListItemBox = styled.li`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  background-color: #e6f8fe;
  border: 2px solid #1e232c;
  border-radius: 10px;
  padding: 18.6px 0 11.4px 20px;
  background-color: #e6f8fe;
  cursor: pointer;
`;

const EventInfoBox = styled.div`
  display: flex;
`;

const EventImage = styled.img`
  width: 124px;
  height: 124px;
  border: 2px solid #1e232c;
  border-radius: 20px;
  margin-right: 10px;
`;

const EventTextSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const NameSection = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 7.6px;
`;

const StrongTxt = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.248125;
`;

const GroupName = styled(StrongTxt)`
  margin-right: 12px;
`;

const StoreName = styled(StrongTxt)`
  margin-bottom: 8px;
`;

const RegularTxt = styled.span`
  display: block;
  font-size: 1.4rem;
  line-height: 1.247857142857143;
`;

// FIXME: event 타입 변경
interface EventListItemProps {
  event: any;
  onEventListClick?: (eventId: number) => void;
}

const EventListItem = ({ event, onEventListClick }: EventListItemProps) => {
  const handleEventClick = () => {
    if (onEventListClick) {
      onEventListClick(event.id);
    }
  };
  return (
    <EventListItemBox onClick={handleEventClick}>
      <EventInfoBox>
        <EventImage src={event.image} />
        <EventTextSection>
          <NameSection>
            <GroupName>{event.artists[0].groupName}</GroupName>
            <RegularTxt>{event.artists[0].name}</RegularTxt>
          </NameSection>
          <Tag categories={event.categories} marginB="16px" />
          <StoreName>{event.storeName}</StoreName>
          <StrongTxt> {event.address} </StrongTxt>
        </EventTextSection>
      </EventInfoBox>
    </EventListItemBox>
  );
};

export default EventListItem;

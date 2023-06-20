import { styled } from 'styled-components';

import editIcon from '../assets/icon-edit.svg';
import { EventData } from '../types/eventService';

import Tag from './Tag';

export const EventListItemBox = styled.li`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  padding: 10px !important;
  border: 1px solid var(--blue-purple);
  border-radius: 10px;
  padding: 14px 0 14px 15px;
  background-color: var(--white);
  margin-bottom: 10px;
  cursor: pointer;
`;

const EventInfoBox = styled.div`
  display: flex;
`;

const EventImage = styled.img`
  width: 100px;
  margin-right: 10px;
`;

const EventTextSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const NameSection = styled.div`
  display: flex;
`;

const StrongTxt = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
`;

const GroupName = styled(StrongTxt)`
  margin-right: 10px;
`;

const RegularTxt = styled.span`
  display: block;
  font-size: 1.6rem;
`;

const EditIcon = styled.img`
  width: 20px;
`;

interface EventListItemProps {
  event: EventData;
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
        <EventImage src={event.image.fileUrl} />
        <EventTextSection>
          <NameSection>
            <GroupName>{event.artists[0].groupName}</GroupName>
            <RegularTxt>{event.artists[0].name}</RegularTxt>
          </NameSection>
          <Tag categories={event.categories} />
          <RegularTxt> {event.address} </RegularTxt>
        </EventTextSection>
      </EventInfoBox>
      <EditIcon src={editIcon} alt="edit" />
    </EventListItemBox>
  );
};

export default EventListItem;

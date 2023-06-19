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
`;

const EventInfoBox = styled.div`
  display: flex;
`;

const EventImage = styled.img`
  width: 150px;
  height: auto;
  margin-right: 10px;
`;

const NameSection = styled.div`
  display: flex;
  margin: 10px 0 20px 0;
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
}

const EventListItem = ({ event }: EventListItemProps) => {
  return (
    // FIXME: 동적으로 데이터 받아오기
    <EventListItemBox>
      <EventInfoBox>
        <EventImage src={event.image.fileUrl} />
        <div>
          <NameSection>
            <GroupName>{event.artists[0].groupName}</GroupName>
            <RegularTxt>{event.artists[0].name}</RegularTxt>
          </NameSection>
          <Tag marginB="20px" categories={event.categories} />
          <RegularTxt> {event.address} </RegularTxt>
        </div>
      </EventInfoBox>
      <EditIcon src={editIcon} alt="edit" />
    </EventListItemBox>
  );
};

export default EventListItem;

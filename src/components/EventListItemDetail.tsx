import { styled } from 'styled-components';

import { useRouter } from '../hooks/useRouter';
import { EventData } from '../types/eventService';

import Button from './Button';
import Tag from './Tag';

const EventListItemBox = styled.li`
  display: flex;
  width: 100%;
  background-color: var(--white);
  border: 1px solid var(--blue-purple);
  border-radius: 10px;
  padding: 17px 0 17px 25px;
  cursor: pointer;
`;

const EventImage = styled.img`
  width: 190px;
  margin: auto 24px auto 0;
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
  font-size: 1.8rem;
  font-weight: 700;
`;

const GroupName = styled(StrongTxt)`
  margin-right: 18px;
`;

const RegularTxt = styled.span`
  display: block;
  font-size: 1.6rem;
`;

const MemberName = styled(RegularTxt)`
  font-size: 1.8rem;
`;

interface EventListItemDetailProps {
  event: EventData;
  onEventListClick: (eventId: number) => void;
}

const EventListItemDetail = ({
  event,
  onEventListClick,
}: EventListItemDetailProps) => {
  const { routeTo } = useRouter();
  return (
    <EventListItemBox
      onClick={() => {
        onEventListClick(event.id);
      }}
    >
      <EventImage src={event.image.fileUrl} />
      <EventTextSection>
        <NameSection>
          <GroupName>{event.artists[0].groupName}</GroupName>
          <MemberName>{event.artists[0].name}</MemberName>
        </NameSection>
        <Tag categories={event.categories} />
        <RegularTxt> {event.address} </RegularTxt>
        <Button
          size="big"
          color="primary"
          onClick={() => {
            routeTo(`/event/${event.id}`);
          }}
        >
          자세히 보기
        </Button>
      </EventTextSection>
    </EventListItemBox>
  );
};

export default EventListItemDetail;

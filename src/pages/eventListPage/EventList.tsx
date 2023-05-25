import ChoiceStarBar from '../../components/ChoiceStarBar';
import EventListItem from '../../components/EventListItem';

import {
  ListContentsSection,
  MapSection,
  PageWrapper,
  EventAddButton,
  EventTitle,
  Ul,
} from './EventListStyle';

const EventList = () => {
  return (
    <PageWrapper>
      <ChoiceStarBar />
      <ListContentsSection>
        <MapSection>
          <EventAddButton type="button" />
        </MapSection>
        {/* TODO: 클릭한 연예인 이름 가져오기 */}
        <EventTitle>(이름) 이벤트</EventTitle>
        <Ul>
          <EventListItem />
          <EventListItem />
          <EventListItem />
        </Ul>
      </ListContentsSection>
    </PageWrapper>
  );
};

export default EventList;

import ChoiceStarBar from '../../components/ChoiceStarBar';
import EventListItem from '../../components/EventListItem';
import feedData from '../MyPage/feedData.json'

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
          {feedData.map( (feed, key) => (<EventListItem key={key} groupName={feed.groupName} member={feed.member} address={feed.address} eventImg={feed.eventImg} />))}
          {/* <EventListItem /> */}
          {/* <EventListItem /> */}
          {/* <EventListItem /> */}
        </Ul>
      </ListContentsSection>
    </PageWrapper>
  );
};

export default EventList;

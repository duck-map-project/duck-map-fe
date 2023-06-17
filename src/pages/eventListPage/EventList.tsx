import { useEffect, useState } from 'react';

import { eventsApi } from '../../api/event';
import ChoiceStarBar from '../../components/ChoiceStarBar';
import EventListItem from '../../components/EventListItem';
import { EventData, getEventParams } from '../../types/eventService';

import {
  ListContentsSection,
  MapSection,
  PageWrapper,
  EventAddButton,
  EventTitle,
  Ul,
} from './EventListStyle';

const EventList = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLast, setIsLast] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollHeight - scrollTop === clientHeight && !isFetching && !isLast) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchEvents = async () => {
    try {
      setIsFetching(true);
      const eventParams: getEventParams = {
        artistId: 0,
        inProgress: true,
        page: page,
        size: 2,
        sort: ['sorted'],
      };
      const res = await eventsApi.get(eventParams);
      setIsFetching(false);
      setIsLast(res.last);
      setEvents((prevEvents) => [...prevEvents, ...res.content]);
    } catch (error) {
      console.error(error);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (page >= 0 && !isLast) {
      fetchEvents();
    }
  }, [page]);

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
          {events &&
            events.map((event) => (
              <EventListItem event={event} key={event.id} />
            ))}
        </Ul>
      </ListContentsSection>
    </PageWrapper>
  );
};

export default EventList;

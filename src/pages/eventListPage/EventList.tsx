import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import ChoiceArtistBar from '../../components/ChoiceArtistBar';
import EventListItem from '../../components/EventListItem';
import KakaoMap from '../../components/KakaoMap';
import AddEventModal from '../../components/modals/AddEventModal';
import { useGetEventQuery } from '../../redux/eventApiSlice';
import { setPlace } from '../../redux/eventPlaceSlice';
import { EventListData } from '../../types/eventService';

import {
  ListContentsSection,
  MapSection,
  PageWrapper,
  EventAddButton,
  ItemListSection,
  MapSectionTitle,
  DotWrapper,
  Ul,
  SectionTitle,
} from './EventListStyle';

const EventList = () => {
  const [addEventModal, setAddEventModal] = useState(false);
  const [page, setPage] = useState(0);
  const [events, setEvents] = useState<EventListData[]>([]);
  const {
    data: eventData,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetEventQuery({ pageNumber: page.toString() });
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const scrollArea = scrollAreaRef.current;
  const dispatch = useDispatch();

  const isLast = eventData?.isLast ?? true;

  useEffect(() => {
    if (eventData) {
      if (page === 0) {
        setEvents(eventData.content);
      } else {
        setEvents((prev) => [...prev, ...eventData.content]);
      }
    }
  }, [eventData]);

  useEffect(() => {
    if (events.length > 0) {
      const processedPlace = events.map((event) => ({
        id: event.id,
        address: [event.address],
        storeName: [event.storeName],
      }));
      console.log(processedPlace);

      dispatch(setPlace(processedPlace));
    }
  }, [events]);

  useEffect(() => {
    if (scrollArea) {
      const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = scrollArea;
        const isScrolledToEnd = scrollTop + clientHeight >= scrollHeight;

        if (isScrolledToEnd && !isFetching && !isLast) {
          setPage((prev) => prev + 1);
        }
      };

      scrollArea.addEventListener('scroll', handleScroll);

      return () => {
        scrollArea.removeEventListener('scroll', handleScroll);
      };
    }
  }, [page, isFetching, scrollArea, scrollAreaRef]);

  const handleAddEventButton = () => {
    setAddEventModal(true);
  };

  const handleModalCloseButton = () => {
    setAddEventModal(false);
  };

  let content;

  if (events) {
    content =
      events &&
      events.map((event) => <EventListItem event={event} key={event.id} />);
  } else if (isLoading) {
    content = <div>이벤트 목록을 불러오는 중입니다</div>;
  } else if (isError) {
    <div>{error.toString()}</div>;
  } else {
    <div>이벤트가 없습니다</div>;
  }

  return (
    <PageWrapper>
      <ChoiceArtistBar />
      <ListContentsSection>
        <MapSection>
          <MapSectionTitle>지도</MapSectionTitle>
          <EventAddButton type="button" onClick={handleAddEventButton}>
            이벤트 추가
          </EventAddButton>
          <KakaoMap size="eventList" />
        </MapSection>
        <ItemListSection ref={scrollAreaRef}>
          <DotWrapper>
            <SectionTitle>지금 하고 있는 이벤트는?</SectionTitle>
            <Ul>{content}</Ul>
          </DotWrapper>
        </ItemListSection>
      </ListContentsSection>
      {addEventModal && <AddEventModal handleClose={handleModalCloseButton} />}
    </PageWrapper>
  );
};

export default EventList;

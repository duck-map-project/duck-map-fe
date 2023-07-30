import { useState } from 'react';

// import { eventsApi } from '../../api/event';
import ChoiceArtistBar from '../../components/ChoiceArtistBar';
import EventListItem from '../../components/EventListItem';
import EventListItemDetail from '../../components/EventListItemDetail';
import KakaoMap from '../../components/KakaoMap';
import AddEventModal from '../../components/modals/AddEventModal';
// import { EventData, getEventParams } from '../../types/eventService';

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
  // const [events, setEvents] = useState<EventData[]>([]);
  // const [page, setPage] = useState<number>(0);
  // const [isLast, setIsLast] = useState<boolean>(false);
  // const [isFetching, setIsFetching] = useState<boolean>(false);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [addEventModal, setAddEventModal] = useState(false);

  // TODO: 테스트용 배열 / 나중에 지우기
  const testEvent = [
    {
      id: 0,
      storeName: 'string',
      inProgress: true,
      address: 'string',
      artists: [
        {
          id: 0,
          groupId: 0,
          groupName: 'string',
          name: 'string',
          image: 'string',
          artistType: {
            id: 0,
            type: 'string',
          },
        },
      ],
      categories: [
        {
          id: 0,
          category: 'string',
        },
      ],
      image: 'string',
      likeId: 0,
      bookmarkId: 0,
    },
    {
      id: 1,
      storeName: 'string',
      inProgress: true,
      address: 'string',
      artists: [
        {
          id: 0,
          groupId: 0,
          groupName: 'string',
          name: 'string',
          image: 'string',
          artistType: {
            id: 0,
            type: 'string',
          },
        },
      ],
      categories: [
        {
          id: 0,
          category: 'string',
        },
      ],
      image: 'string',
      likeId: 0,
      bookmarkId: 0,
    },
    {
      id: 2,
      storeName: 'string',
      inProgress: true,
      address: 'string',
      artists: [
        {
          id: 0,
          groupId: 0,
          groupName: 'string',
          name: 'string',
          image: 'string',
          artistType: {
            id: 0,
            type: 'string',
          },
        },
      ],
      categories: [
        {
          id: 0,
          category: 'string',
        },
        {
          id: 1,
          category: '식당',
        },
      ],
      image: 'string',
      likeId: 0,
      bookmarkId: 0,
    },
    {
      id: 3,
      storeName: 'string',
      inProgress: true,
      address: 'string',
      artists: [
        {
          id: 0,
          groupId: 0,
          groupName: 'string',
          name: 'string',
          image: 'string',
          artistType: {
            id: 0,
            type: 'string',
          },
        },
      ],
      categories: [
        {
          id: 0,
          category: 'string',
        },
      ],
      image: 'string',
      likeId: 0,
      bookmarkId: 0,
    },
    {
      id: 4,
      storeName: 'string',
      inProgress: true,
      address: 'string',
      artists: [
        {
          id: 0,
          groupId: 0,
          groupName: 'string',
          name: 'string',
          image: 'string',
          artistType: {
            id: 0,
            type: 'string',
          },
        },
      ],
      categories: [
        {
          id: 0,
          category: 'string',
        },
      ],
      image: 'string',
      likeId: 0,
      bookmarkId: 0,
    },
    {
      id: 5,
      storeName: 'string',
      inProgress: true,
      address: 'string',
      artists: [
        {
          id: 0,
          groupId: 0,
          groupName: 'string',
          name: 'string',
          image: 'string',
          artistType: {
            id: 0,
            type: 'string',
          },
        },
      ],
      categories: [
        {
          id: 0,
          category: 'string',
        },
      ],
      image: 'string',
      likeId: 0,
      bookmarkId: 0,
    },
  ];

  // const handleScroll = () => {
  //   const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

  //   if (scrollHeight - scrollTop === clientHeight && !isFetching && !isLast) {
  //     setPage((prevPage) => prevPage + 1);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  // const fetchEvents = async () => {
  //   try {
  //     setIsFetching(true);
  //     const eventParams: getEventParams = {
  //       page: 0,
  //       size: 1,
  //       sort: ['sorted', 'unsorted'],
  //       artistId: 0,
  //       onlyInProgress: false,
  //     };
  //     const res = await eventsApi.get(eventParams);
  //     setIsFetching(false);
  //     setIsLast(res.last);
  //     setEvents((prevEvents) => [...prevEvents, ...res.content]);
  //   } catch (error) {
  //     console.error(error);
  //     setIsFetching(false);
  //   }
  // };

  // useEffect(() => {
  //   if (page >= 0 && !isLast) {
  //     fetchEvents();
  //   }
  // }, [page]);

  const handleEventItemClick = (eventId: number) => {
    if (selectedEventId === eventId) {
      setSelectedEventId(null);
    } else {
      setSelectedEventId(eventId);
    }
  };

  const handleAddEventButton = () => {
    setAddEventModal(true);
  };

  const handleModalCloseButton = () => {
    setAddEventModal(false);
  };

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
        <ItemListSection>
          <DotWrapper>
            <SectionTitle>지금 하고 있는 이벤트는?</SectionTitle>
            <Ul>
              {testEvent &&
                testEvent.map((event) =>
                  selectedEventId === event.id ? (
                    <EventListItemDetail
                      event={event}
                      key={event.id}
                      onEventListClick={handleEventItemClick}
                    />
                  ) : (
                    <EventListItem
                      event={event}
                      key={event.id}
                      onEventListClick={handleEventItemClick}
                    />
                  )
                )}
            </Ul>
          </DotWrapper>
        </ItemListSection>
      </ListContentsSection>
      {addEventModal && <AddEventModal handleClose={handleModalCloseButton} />}
    </PageWrapper>
  );
};

export default EventList;

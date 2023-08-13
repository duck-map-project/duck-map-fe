import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import ChoiceArtistBar from '../../components/ChoiceArtistBar';
import EventListItem, {
  HandleLikeClickProps,
} from '../../components/EventListItem';
import KakaoMap from '../../components/KakaoMap';
import { useRouter } from '../../hooks/useRouter';
import { selectCurrentUser } from '../../redux/auth/authSlice';
import {
  useAddLikeMutation,
  useDeleteLikeMutation,
  useGetEventQuery,
} from '../../redux/eventApiSlice';
import { setPlace } from '../../redux/eventPlaceSlice';
import {
  selectEventArtist,
  selectEventGroup,
} from '../../redux/setEventArtistSlice';
import { setArtist } from '../../redux/setEventElemetsSlice';
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
  const [page, setPage] = useState(0);
  const [events, setEvents] = useState<EventListData[]>([]);
  const selectedArtist = useSelector(selectEventArtist);
  const selectedGroup = useSelector(selectEventGroup);
  const user = useSelector(selectCurrentUser);

  const {
    data: eventData,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetEventQuery({
    pageNumber: page.toString(),
    ...(selectedArtist && { artistId: selectedArtist.id.toString() }),
    ...(selectedGroup &&
      !selectedArtist && { artistId: selectedGroup.id.toString() }),
  });
  const [addLike] = useAddLikeMutation();
  const [deleteLike] = useDeleteLikeMutation();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const scrollArea = scrollAreaRef.current;
  const dispatch = useDispatch();
  const { routeTo } = useRouter();

  const isLast = eventData?.isLast ?? true;

  useEffect(() => {
    setPage(0);
    setArtist([]);
  }, [selectedArtist, selectedGroup]);

  useEffect(() => {
    if (eventData) {
      if (page === 0) {
        setEvents(eventData.content);
      } else {
        setEvents((prev) => [...prev, ...eventData.content]);
      }
    }
  }, [eventData, selectedArtist, selectedGroup]);

  useEffect(() => {
    if (events.length > 0) {
      const processedPlace = events.map((event) => ({
        id: event.id,
        address: [event.address],
        storeName: [event.storeName],
      }));

      dispatch(setPlace(processedPlace));
    }
    return () => {
      dispatch(setPlace([]));
    };
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
    routeTo('/event/edit');
  };

  const handleLikeClick = async ({ eventId, likeId }: HandleLikeClickProps) => {
    if (likeId) {
      try {
        await deleteLike(likeId).unwrap();
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await addLike(eventId.toString());
      } catch (error) {
        console.error(error);
      }
    }
  };

  let content;

  if (events) {
    content = events.map((event) => (
      <EventListItem
        event={event}
        key={event.id}
        handleLikeClick={handleLikeClick}
      />
    ));
  } else if (isLoading) {
    content = <div>이벤트 목록을 불러오는 중입니다</div>;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  } else {
    content = <div>이벤트가 없습니다</div>;
  }
  return (
    <PageWrapper>
      <ChoiceArtistBar />
      <ListContentsSection>
        <MapSection>
          <MapSectionTitle>지도</MapSectionTitle>
          {user && (
            <EventAddButton type="button" onClick={handleAddEventButton}>
              이벤트 추가
            </EventAddButton>
          )}
          <KakaoMap size="eventList" />
        </MapSection>
        <ItemListSection ref={scrollAreaRef}>
          <DotWrapper>
            <SectionTitle>지금 하고 있는 이벤트는?</SectionTitle>
            <Ul>{content}</Ul>
          </DotWrapper>
        </ItemListSection>
      </ListContentsSection>
    </PageWrapper>
  );
};

export default EventList;

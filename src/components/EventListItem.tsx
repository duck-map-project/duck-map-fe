import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from '../hooks/useRouter';
import { addBookmarkInfo, selectAddBookmarkInfo } from '../redux/addBookmark';
import { toggleAddBookmark } from '../redux/manageModalSlice';
import { EventListData } from '../types/eventService';

import * as S from './EventListItemStyle';
import Tag from './Tag';
export interface HandleLikeClickProps {
  eventId: number;
  likeId: number | null;
}
interface EventListItemProps {
  event: EventListData;
  onEventListClick?: (eventId: number) => void;
  handleLikeClick: ({ eventId, likeId }: HandleLikeClickProps) => Promise<void>;
}

const EventListItem = ({
  event,
  onEventListClick,
  handleLikeClick,
}: EventListItemProps) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const dispatch = useDispatch();
  const { routeTo } = useRouter();
  const [isLike, setIsLike] = useState(!!event.likeId);
  const [isBookmark, setIsBookmark] = useState(!!event.bookmarkId);
  const bookmarkInfoState = useSelector(selectAddBookmarkInfo);

  const handleEventClick = () => {
    if (onEventListClick) {
      onEventListClick(event.id);
    }
  };

  const handleLikeButton = async () => {
    await handleLikeClick({ eventId: event.id, likeId: event.likeId });
    setIsLike((prev) => !prev);
  };

  const handleBookmarkButton = () => {
    if (isBookmark) {
      //이떄는 북마크 삭제 요청
      return;
    }
    dispatch(addBookmarkInfo({ eventId: event.id }));
    dispatch(toggleAddBookmark());
  };

  useEffect(() => {
    if (
      bookmarkInfoState.eventId === event.id &&
      bookmarkInfoState.isBookmark === true
    ) {
      setIsBookmark(true);
      dispatch(addBookmarkInfo({ eventId: null, isBookmark: false }));
      return;
    }
  }, [bookmarkInfoState]);

  return (
    <S.EventListItemBox onClick={handleEventClick}>
      <S.EventInfoBox>
        <S.EventImage src={baseUrl + event.image} />
        <S.EventTextSection>
          <S.NameSection>
            <S.GroupName>{event.artists[0].groupName}</S.GroupName>
            <S.RegularTxt>{event.artists[0].name}</S.RegularTxt>
          </S.NameSection>
          <Tag categories={event.categories} marginB="16px" />
          <S.StoreName>{event.storeName}</S.StoreName>
          <S.StrongTxt> {event.address} </S.StrongTxt>
        </S.EventTextSection>

        <S.LikeButton
          $isLike={isLike}
          type="button"
          onClick={handleLikeButton}
        />
        <S.BookmarkButton
          $isBookmarked={isBookmark}
          type="button"
          onClick={handleBookmarkButton}
        />
        <S.SeeMoreButton
          type="button"
          onClick={() => routeTo(`/event/${event.id}`)}
        >
          자세히 보기
        </S.SeeMoreButton>
      </S.EventInfoBox>
    </S.EventListItemBox>
  );
};

export default EventListItem;

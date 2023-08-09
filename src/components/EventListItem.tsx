import { useState } from 'react';

import { useRouter } from '../hooks/useRouter';
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
  const { routeTo } = useRouter();
  const [isLike, setIsLike] = useState(!!event.likeId);

  const handleEventClick = () => {
    if (onEventListClick) {
      onEventListClick(event.id);
    }
  };

  const handleLikeButton = async () => {
    await handleLikeClick({ eventId: event.id, likeId: event.likeId });
    setIsLike(!isLike);
  };

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
        <S.BookmarkButton $isBookmarked={true} type="button" />
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

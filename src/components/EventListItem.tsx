import { useRouter } from '../hooks/useRouter';
import { EventListData } from '../types/eventService';

import * as S from './EventListItemStyle';
import Tag from './Tag';
interface EventListItemProps {
  event: EventListData;
  onEventListClick?: (eventId: number) => void;
}

const EventListItem = ({ event, onEventListClick }: EventListItemProps) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { routeTo } = useRouter();

  const handleEventClick = () => {
    if (onEventListClick) {
      onEventListClick(event.id);
    }
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

        <S.LikeButton $isLike={true} type="button" />
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

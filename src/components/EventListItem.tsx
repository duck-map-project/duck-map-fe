import * as S from './EventListItemStyle';
import Tag from './Tag';

// FIXME: event 타입 변경
interface EventListItemProps {
  event: any;
  onEventListClick?: (eventId: number) => void;
}

const EventListItem = ({ event, onEventListClick }: EventListItemProps) => {
  const handleEventClick = () => {
    if (onEventListClick) {
      onEventListClick(event.id);
    }
  };
  return (
    <S.EventListItemBox onClick={handleEventClick}>
      <S.EventInfoBox>
        <S.EventImage src={event.image} />
        <S.EventTextSection>
          <S.NameSection>
            <S.GroupName>{event.artists[0].groupName}</S.GroupName>
            <S.RegularTxt>{event.artists[0].name}</S.RegularTxt>
          </S.NameSection>
          <Tag categories={event.categories} marginB="16px" />
          <S.StoreName>{event.storeName}</S.StoreName>
          <S.StrongTxt> {event.address} </S.StrongTxt>
        </S.EventTextSection>

        <S.LikeButton isLike={true} type="button" />
        <S.BookmarkButton isBookmarked={true} type="button" />
        <S.SeeMoreButton type="button">자세히 보기</S.SeeMoreButton>
      </S.EventInfoBox>
    </S.EventListItemBox>
  );
};

export default EventListItem;

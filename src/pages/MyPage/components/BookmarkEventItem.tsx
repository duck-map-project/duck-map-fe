import bookmarkicon from '../../../assets/icons/bookmark.svg';
import deleteicon from '../../../assets/icons/crosspink.svg';
import { useDeleteBookmarkEventMutation } from '../../../redux/bookmarkEventSlice';

import {
  ItemWrapper,
  EventImg,
  EventName,
  EventSettingIconsWrapper,
  SettingIcon,
} from './BookmarkEventItemStyle';

type EventItemProps = {
  image: string;
  storeName: string;
  eventId: number;
  isEditmode: boolean;
};
const BookmarkEventItem = ({
  image,
  storeName,
  eventId,
  isEditmode,
}: EventItemProps) => {
  const [deleteEventFromFolder] = useDeleteBookmarkEventMutation();
  const onClickEvent = () => {
    eventId;
    alert('이벤트 상세페이지로 이동');
  };

  const onClickDeleteBtn = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('해당 이벤트의 북마크를 취소하시겠습니까?')) {
      try {
        const res = await deleteEventFromFolder({ id: eventId });
        if ('error' in res) {
          alert('잠시 후에 다시 시도해주세요');
        }
      } catch (error) {
        console.error(error);
      }
      alert('이벤트삭제');
    }
  };

  return (
    <ItemWrapper bookmarkicon={bookmarkicon} onClick={onClickEvent}>
      <EventImg src={image} />
      <EventName>{storeName}</EventName>
      {isEditmode && (
        <EventSettingIconsWrapper>
          <SettingIcon onClick={onClickDeleteBtn}>
            <img src={deleteicon} />
          </SettingIcon>
        </EventSettingIconsWrapper>
      )}
    </ItemWrapper>
  );
};

export default BookmarkEventItem;

import { useDispatch } from 'react-redux';

import bookmarkicon from '../../../assets/bookmark.svg';
import deleteicon from '../../../assets/crosspink.svg';
import pencilicon from '../../../assets/editpencilbig.svg';
import { useDeleteBookmarkEventMutation } from '../../../features/bookmarks/services/bookmarkEventApiSlice';
import { addBookmarkInfo } from '../../../features/bookmarks/services/setBookmark';
import { modals } from '../../../features/modal/ReduxModalRoot';
import useModal from '../../../hooks/useModal';
import { useRouter } from '../../../hooks/useRouter';

import {
  ItemWrapper,
  EventImg,
  EventName,
  EventSettingIconsWrapper,
} from './BookmarkEventItemStyle';
import { SettingIcon } from './BookmarkFolderItemStyle';

type EventItemProps = {
  image: string;
  storeName: string;
  eventId: number;
  isEditmode: boolean;
  folderId: string | null;
};
const BookmarkEventItem = ({
  image,
  storeName,
  eventId,
  isEditmode,
  folderId,
}: EventItemProps) => {
  const dispatch = useDispatch();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const imgURL = baseUrl + image;
  const { routeTo } = useRouter();
  const [deleteEventFromFolder] = useDeleteBookmarkEventMutation();
  const { openModal } = useModal();

  const onClickEvent = () => {
    routeTo(`/event/${eventId}`);
  };

  const onClickEditBtn = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addBookmarkInfo({ eventId, folderId }));
    openModal({ Component: modals.bookmarkModal, props: { type: 'edit' } });
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
      <EventImg src={imgURL} />
      <EventName>{storeName}</EventName>
      {isEditmode && (
        <EventSettingIconsWrapper>
          <SettingIcon onClick={onClickEditBtn}>
            <img src={pencilicon} />
          </SettingIcon>
          <SettingIcon onClick={onClickDeleteBtn}>
            <img src={deleteicon} />
          </SettingIcon>
        </EventSettingIconsWrapper>
      )}
    </ItemWrapper>
  );
};

export default BookmarkEventItem;

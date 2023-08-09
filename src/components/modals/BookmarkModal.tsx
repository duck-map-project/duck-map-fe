import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import closeIcon from '../../assets/icons/close.svg';
import useScroll from '../../hooks/useScroll';
import {
  selectAddBookmarkInfo,
  addBookmarkInfo,
} from '../../redux/addBookmark';
import { useAddBookmarkEventMutation } from '../../redux/bookmarkEventSlice';
import { useGetBookmarkFoldersQuery } from '../../redux/bookmarkFolderSlice';
import { toggleAddBookmark } from '../../redux/manageModalSlice';
import { BookmarkFolderType } from '../../types/bookmarkFolderType';

import * as S from './BookmarkModalStyle';
import CommonModal, { ModalPortal } from './CommonModal';
import { emojiArray } from './EmojiArray';

type BookmarkFolderProps = {
  folderId: number;
  foldername: string;
  image: string;
  selectedFolder: number | null;
  setSelectFolder: React.Dispatch<React.SetStateAction<number | null>>;
};

const BookmarkFolderItem = ({
  folderId,
  foldername,
  image,
  selectedFolder,
  setSelectFolder,
}: BookmarkFolderProps) => {
  const folderImage = image.slice(8);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const isSelected = folderId === selectedFolder;
    setIsSelected(isSelected);
  }, [selectedFolder]);

  const onClickItem = () => {
    setSelectFolder(folderId);
  };

  return (
    <S.FolderItemWrapper onClick={onClickItem} $isSelected={isSelected}>
      <S.EmojiBox>
        <S.EmojiWrapper>
          <S.Emoji
            src={emojiArray.find((emoji) => emoji.value === folderImage)?.img}
          />
        </S.EmojiWrapper>
      </S.EmojiBox>
      <S.Foldername>{foldername}</S.Foldername>
    </S.FolderItemWrapper>
  );
};
const BookmarkModal = () => {
  const dispatch = useDispatch();
  const targetRef = useRef<HTMLDivElement>(null);
  const bookmarkEventInfo = useSelector(selectAddBookmarkInfo);
  const [eventId, setEventId] = useState<number | null>(null);
  const [bookmarkFoldersPage, setBookmarkFoldersPage] = useState(0);
  const [selectedFolder, setSelectedFolder] = useState<number | null>(null);
  const [bookmarkFolders, setBookmarkFolders] = useState<BookmarkFolderType[]>(
    []
  );
  const [addBookmark] = useAddBookmarkEventMutation();
  selectedFolder;
  useEffect(() => {
    setEventId(bookmarkEventInfo.eventId);
  }, [bookmarkEventInfo]);

  const {
    data: BookmarkFolderData,
    isSuccess,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetBookmarkFoldersQuery({});

  useEffect(() => {
    const bookmarkfolders = BookmarkFolderData?.content;
    bookmarkfolders && setBookmarkFolders(bookmarkfolders);
  }, [BookmarkFolderData]);

  const isLast = BookmarkFolderData?.isLast ?? true;
  const numberOfFolders = BookmarkFolderData?.numberOfElements;

  let foldersContent;
  if (isSuccess) {
    foldersContent = bookmarkFolders.map((folder) => (
      <BookmarkFolderItem
        key={folder.id}
        folderId={folder.id}
        foldername={folder.name}
        image={folder.image}
        selectedFolder={selectedFolder}
        setSelectFolder={setSelectedFolder}
      />
    ));
  } else if (isLoading) {
    foldersContent = <div> 북마크 폴더를 불러오는 중입니다. </div>;
  } else if (isError) {
    foldersContent = <div> {error.toString()}</div>;
  }

  //무한스크롤
  useScroll({
    targetRef,
    isFetching,
    isLast,
    page: bookmarkFoldersPage,
    setPage: setBookmarkFoldersPage,
  });

  const onHideModal = () => {
    dispatch(toggleAddBookmark());
  };
  const onClickSubmit = async () => {
    if (selectedFolder === null) {
      alert('북마크 폴더를 선택해주세요.');
      return;
    }
    const res = await addBookmark({ id: eventId, folderId: selectedFolder });

    if ('data' in res) {
      dispatch(addBookmarkInfo({ eventId, isBookmark: true }));
      onHideModal();
    } else if ('error' in res) {
      const error = res.error;
      if ('data' in error) {
        const data = error.data;
        if (data !== null && typeof data === 'object' && 'message' in data) {
          const errorMessage = data.message;
          alert(errorMessage);
          return;
        }
      }
      alert('잠시 후에 다시 시도해주세요.');
    }
  };

  return (
    <ModalPortal>
      <CommonModal width="490" onClick={onHideModal}>
        <S.ModalTitle>북마크 추가하기</S.ModalTitle>
        <S.ModalCloseButton type="button" onClick={onHideModal}>
          <img src={closeIcon} />
        </S.ModalCloseButton>
        <S.FoldersContainer>
          <S.FoldersLists ref={targetRef}>
            {numberOfFolders ? (
              foldersContent
            ) : (
              <div>북마크 폴더가 없습니다.</div>
            )}
          </S.FoldersLists>
        </S.FoldersContainer>
        <S.SubmitButton type="button" onClick={onClickSubmit}>
          완료
        </S.SubmitButton>
      </CommonModal>
    </ModalPortal>
  );
};

export default BookmarkModal;

import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import closeIcon from '../../../assets/close.svg';
import Loading from '../../../components/Loading';
import CommonModal from '../../../components/modal/CommonModal';
import useScroll from '../../../hooks/useScroll';
import { BookmarkFolderType } from '../../../types/bookmarkFolderType';
import { emojiArray } from '../../../utils/EmojiArray';
import handleErrorResponse from '../../../utils/handleErrorResponse';
import { ModalProps } from '../../modal/modalsSlice';
import {
  useAddBookmarkEventMutation,
  useEditBookmarkEventFolderMutation,
} from '../services/bookmarkEventApiSlice';
import { useGetBookmarkFoldersQuery } from '../services/bookmarkFolderApiSlice';
import {
  selectAddBookmarkInfo,
  addBookmarkInfo,
} from '../services/setBookmark';

import { ModalCloseButton } from './BookmarkFolderStyle';
import * as S from './BookmarkModalStyle';

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

const BookmarkModal = ({ type, onClose }: ModalProps) => {
  const dispatch = useDispatch();
  const targetRef = useRef<HTMLDivElement>(null);
  const bookmarkEventInfo = useSelector(selectAddBookmarkInfo);
  const [eventId, setEventId] = useState<number | null>(null);
  const [bookmarkFoldersPage, setBookmarkFoldersPage] = useState(0);
  const [selectedFolder, setSelectedFolder] = useState<number | null>(null);
  const [bookmarkFolders, setBookmarkFolders] = useState<BookmarkFolderType[]>(
    []
  );
  const [isRequesting, setIsRequesting] = useState(false);
  const [addBookmark] = useAddBookmarkEventMutation();
  const [editBookmarkFolder] = useEditBookmarkEventFolderMutation();

  useEffect(() => {
    setEventId(bookmarkEventInfo.eventId);
    if (type === 'edit') {
      setSelectedFolder(bookmarkEventInfo.folderId);
    }
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

  const onClickSaveBtn = async () => {
    try {
      setIsRequesting(true);

      if (!selectedFolder) {
        alert('북마크 폴더를 선택해주세요.');
        throw new Error('Invalid Bookmark Folder');
      }
      if (type === 'add') {
        await onSaveBookmarkHandler();
      } else if (type === 'edit') {
        await onEditBookmarkHandler();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsRequesting(false);
    }
  };

  const onSaveBookmarkHandler = async () => {
    try {
      const data = { id: eventId, folderId: selectedFolder };
      const res = await addBookmark(data);

      if ('data' in res) {
        dispatch(addBookmarkInfo({ eventId, isBookmark: true })); //북마크 정보 즉각 업뎃하기 위해서
        onClose();
      } else if ('error' in res) {
        handleErrorResponse(res.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onEditBookmarkHandler = async () => {
    const data = {
      id: eventId,
      folderId: selectedFolder,
    };
    try {
      const res = await editBookmarkFolder(data);
      if ('data' in res) {
        dispatch(addBookmarkInfo({ eventId, isBookmark: true }));
        onClose();
      } else if ('error' in res) {
        handleErrorResponse(res.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CommonModal width="490" onClick={onClose}>
      {isRequesting && <Loading />}
      <S.ModalTitle>
        {type === 'add' ? '북마크 추가하기' : '북마크 폴더 변경하기'}
      </S.ModalTitle>
      <ModalCloseButton type="button" onClick={onClose}>
        <img src={closeIcon} />
      </ModalCloseButton>
      <S.FoldersContainer>
        <S.FoldersLists ref={targetRef}>
          {numberOfFolders ? (
            foldersContent
          ) : (
            <div>북마크 폴더가 없습니다.</div>
          )}
        </S.FoldersLists>
      </S.FoldersContainer>
      <S.SubmitButton type="button" onClick={onClickSaveBtn}>
        완료
      </S.SubmitButton>
    </CommonModal>
  );
};

export default BookmarkModal;

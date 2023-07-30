import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import arrowicon from '../../../assets/icons/arrowright.svg';
import { ReactComponent as Bookmarkfoldericon } from '../../../assets/icons/bookmark-folder.svg';
import bookmarkicon from '../../../assets/icons/bookmark.svg';
import plusicon from '../../../assets/icons/cross.svg';
import deleteicon from '../../../assets/icons/crosspink.svg';
import editicon from '../../../assets/icons/editpencil.svg';
import pencilicon from '../../../assets/icons/editpencilbig.svg';
import starticon from '../../../assets/icons/starIcon.svg';
import { emojiArray } from '../../../components/modals/EmojiArray';
import { useGetBookmarkEventsQuery } from '../../../redux/bookmarkEventSlice';
import {
  useGetBookmarkFoldersQuery,
  useDeleteBookmarkFolderMutation,
} from '../../../redux/bookmarkFolderSlice';
import { toggleBookmarkFolder } from '../../../redux/manageModalSlice';
import { BookmarkEventType } from '../../../types/bookmarkEventType';
import { BookmarkFolderType } from '../../../types/bookmarkFolderType';

import {
  FolderWrapper,
  EmojiPreview,
  FolderNameWrapper,
  SettingIconsWrapper,
  SettingIcon,
  NameIcon,
  FolderName,
  ItemWrapper,
  EventImg,
  EventName,
  FoldersHeader,
  Path,
  EventsHeader,
  EventsContainer,
  EventSettingIconsWrapper,
  GoBookmarkFolders,
  SettingBtnWrapper,
  SettingBtn,
  GoEditBtn,
  FoldersContainer,
  BookmarkWrapper,
} from './BookmarkStyle';

type FolderItemProps = {
  folderId: number;
  foldername: string;
  isEditmode: boolean;
  image: string;
  color: string;
  setSelectedFoldername: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedFolderId: React.Dispatch<React.SetStateAction<number | null>>;
};

type EventItemProps = {
  image: string;
  storeName: string;
  eventId: number;
  isEditmode: boolean;
};

type FolderProps = {
  setSelectedFoldername: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedFolderId: React.Dispatch<React.SetStateAction<number | null>>;
};

type EventsProps = {
  foldername: string;
  folderId: number;
  setSelectedFoldername: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedFolderId: React.Dispatch<React.SetStateAction<number | null>>;
};

const BookmarkFolderItem = ({
  folderId,
  foldername,
  image,
  color,
  isEditmode,
  setSelectedFoldername,
  setSelectedFolderId,
}: FolderItemProps) => {
  const folderEmoji = image.slice(8);
  const [deleteFolder] = useDeleteBookmarkFolderMutation();

  const onClickFolder = () => {
    setSelectedFoldername(foldername);
    setSelectedFolderId(folderId);
  };
  const onClickEditBtn = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert('폴더수정모달');
  };

  const onClickDeleteBtn = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (
      !window.confirm(
        '폴더 삭제 시, 저장된 이벤트도 함께 사라지게 됩니다. 그래도 삭제하시겠습니까? '
      )
    ) {
      return;
    }

    const res = await deleteFolder(folderId);
    console.log(res);
    if ('error' in res) {
      const errorData = res;
      const error = errorData.error;
      if ('data' in error) {
        const { status } = error;
        alert(`에러가 발생하였습니다. Error Code: ${status}`);
      }
    } else {
      alert('성공적으로 삭제되었습니다.');
    }
  };
  return (
    <FolderWrapper onClick={onClickFolder}>
      <Bookmarkfoldericon fill={color} />
      <EmojiPreview img={folderEmoji}>
        <img
          src={emojiArray.find((emoji) => emoji.value === folderEmoji)?.img}
        />
      </EmojiPreview>
      {isEditmode && (
        <SettingIconsWrapper>
          <SettingIcon onClick={onClickEditBtn}>
            <img src={pencilicon} />
          </SettingIcon>
          <SettingIcon onClick={onClickDeleteBtn}>
            <img src={deleteicon} />
          </SettingIcon>
        </SettingIconsWrapper>
      )}
      <FolderNameWrapper>
        <NameIcon>
          <img src={pencilicon} />
        </NameIcon>
        <FolderName>{foldername}</FolderName>
      </FolderNameWrapper>
    </FolderWrapper>
  );
};

const BookmarkEventItem = ({
  image,
  storeName,
  eventId,
  isEditmode,
}: EventItemProps) => {
  const onClickEvent = () => {
    eventId
    alert('이벤트 상세페이지로 이동');
  };
  const onClickEditBtn = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert('이벤트수정모달');
  };

  const onClickDeleteBtn = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert('이벤트삭제');
  };

  return (
    <ItemWrapper bookmarkicon={bookmarkicon} onClick={onClickEvent}>
      <EventImg src={image} />
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

const BookmarkFolders = ({
  setSelectedFoldername,
  setSelectedFolderId,
}: FolderProps) => {
  const dispatch = useDispatch();
  const [isEditmode, setIsEditmode] = useState(false);
  const [bookmarkFoldersArray, setBookmarkFoldersArray] = useState<
    BookmarkFolderType[]
  >([]);

  const {
    data: bookmarkFoldersData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetBookmarkFoldersQuery({});

  useEffect(() => {
    if (bookmarkFoldersData) {
      setBookmarkFoldersArray(bookmarkFoldersData?.content);
    }
  }, [bookmarkFoldersData]);

  const onClickAddNewFolder = () => {
    dispatch(toggleBookmarkFolder());
  };

  const onClickToggleEditmode = () => {
    setIsEditmode((prev) => !prev);
  };

  const onClickNoEditmode = () => {
    setIsEditmode(false);
  };

  let content;
  if (isLoading) {
    content = <div>북마크 폴더를 불러오는 중입니다.</div>;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  } else if (isSuccess) {
    content = bookmarkFoldersArray.map((folder) => (
      <BookmarkFolderItem
        key={folder.id}
        folderId={folder.id}
        foldername={folder.name}
        image={folder.image}
        color={folder.color}
        isEditmode={isEditmode}
        setSelectedFoldername={setSelectedFoldername}
        setSelectedFolderId={setSelectedFolderId}
      />
    ));
  }
  return (
    <>
      <FoldersHeader>
        <Path>
          <img src={starticon} />
          <span>북마크</span>
        </Path>
        <SettingBtnWrapper>
          <SettingBtn onClick={onClickAddNewFolder}>
            <img src={plusicon} />
            북마크 폴더 추가하기
          </SettingBtn>
          <GoEditBtn
            onClick={onClickToggleEditmode}
            editmode={isEditmode ? isEditmode.toString() : undefined}
          >
            <img src={editicon} />
            북마크 편집하기
          </GoEditBtn>
        </SettingBtnWrapper>
      </FoldersHeader>
      <FoldersContainer onClick={onClickNoEditmode}>{content}</FoldersContainer>
    </>
  );
};

const Events = ({
  foldername,
  folderId,
  setSelectedFoldername,
  setSelectedFolderId,
}: EventsProps) => {
  const [isEditmode, setIsEditmode] = useState(false);
  const [eventsArray, setEventsArray] = useState<BookmarkEventType[]>([]);
  const [hasEvents, setHasEvents] = useState(false);
  
  const {
    data: EventsData,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetBookmarkEventsQuery({ folderId });

  useEffect(() => {
    if (EventsData) {
      setEventsArray(EventsData.content);
      const numberofelement = EventsData.numberOfElements;
      setHasEvents(Boolean(numberofelement));
    }
  }, [EventsData]);

  const onClickGoBookmarkFolders = () => {
    setSelectedFoldername(null);
    setSelectedFolderId(null);
  };

  const onClickToggleEditmode = () => {
    setIsEditmode((prev) => !prev);
  };

  const onClickNoEditmode = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditmode(false);
  };

  let content;
  if (isLoading) {
    content = <div>이벤트를 불러오는 중입니다. </div>;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  } else if (isSuccess) {
    content = eventsArray.map((event) => (
      <BookmarkEventItem
        key={event.id}
        eventId={event.eventId}
        storeName={event.storeName}
        image={event.image}
        isEditmode={isEditmode}
      />
    ));
  }

  return (
    <>
      <EventsHeader>
        <Path>
          <img src={starticon} />
          <GoBookmarkFolders onClick={onClickGoBookmarkFolders}>
            북마크
          </GoBookmarkFolders>
          <img src={arrowicon} />
          <span>{foldername}</span>
        </Path>
        <GoEditBtn
          onClick={onClickToggleEditmode}
          editmode={isEditmode ? isEditmode.toString() : undefined}
        >
          <img src={editicon} />
          북마크 편집하기
        </GoEditBtn>
      </EventsHeader>
      <EventsContainer onClick={onClickNoEditmode}>
        {hasEvents ? content : <div>북마크된 이벤트가 없습니다.</div>}
      </EventsContainer>
    </>
  );
};

const Bookmark = () => {
  const [selectedFoldername, setSelectedFoldername] = useState<string | null>(
    null
  );
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  return (
    <BookmarkWrapper>
      {selectedFoldername && selectedFolderId ? (
        <Events
          foldername={selectedFoldername}
          folderId={selectedFolderId}
          setSelectedFoldername={setSelectedFoldername}
          setSelectedFolderId={setSelectedFolderId}
        />
      ) : (
        <BookmarkFolders
          setSelectedFoldername={setSelectedFoldername}
          setSelectedFolderId={setSelectedFolderId}
        />
      )}
    </BookmarkWrapper>
  );
};

export default Bookmark;

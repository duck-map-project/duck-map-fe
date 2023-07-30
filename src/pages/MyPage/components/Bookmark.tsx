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
import { useGetBookmarkFoldersQuery } from '../../../redux/bookmarkFolderSlice';
import { toggleBookmarkFolder } from '../../../redux/manageModalSlice';
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

const testImg =
  'https://images.unsplash.com/photo-1567880905822-56f8e06fe630?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80';

type FolderItemProps = {
  foldername: string;
  isEditmode: boolean;
  image: string;
  color: string;
  setFolderSelected: React.Dispatch<React.SetStateAction<string | null>>;
};

type FolderProps = {
  setFolderSelected: React.Dispatch<React.SetStateAction<string | null>>;
};

type EventsProps = {
  foldername: string;
  setFolderSelected: React.Dispatch<React.SetStateAction<string | null>>;
};

const BookmarkFolderItem = ({
  foldername,
  image,
  color,
  isEditmode,
  setFolderSelected,
}: FolderItemProps) => {
  const folderEmoji = image.slice(8);

  const onClickFolder = () => {
    setFolderSelected(foldername);
  };
  const onClickEditBtn = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert('폴더수정모달');
  };

  const onClickDeleteBtn = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert('폴더삭제');
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

type EventItemProps = {
  isEditmode: boolean;
};

const BookmarkEventItem = ({ isEditmode }: EventItemProps) => {
  const onClickEditBtn = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert('이벤트수정모달');
  };

  const onClickDeleteBtn = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert('이벤트삭제');
  };

  return (
    <ItemWrapper bookmarkicon={bookmarkicon}>
      <EventImg src={testImg} />
      <EventName>북마크된 이벤트 명</EventName>
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

const BookmarkFolders = ({ setFolderSelected }: FolderProps) => {
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
        foldername={folder.name}
        image={folder.image}
        color={folder.color}
        isEditmode={isEditmode}
        setFolderSelected={setFolderSelected}
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
      <FoldersContainer onClick={onClickNoEditmode}>
        {content}
      </FoldersContainer>
    </>
  );
};

const Events = ({ foldername, setFolderSelected }: EventsProps) => {
  //여기서 event data 불러오기
  const [isEditmode, setIsEditmode] = useState(false);
  const onClickGoBookmarkFolders = () => {
    setFolderSelected(null);
  };
  const onClickToggleEditmode = () => {
    setIsEditmode((prev) => !prev);
  };
  const onClickNoEditmode = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditmode(false);
  };
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
        <BookmarkEventItem isEditmode={isEditmode} />
        <BookmarkEventItem isEditmode={isEditmode} />
        <BookmarkEventItem isEditmode={isEditmode} />
        <BookmarkEventItem isEditmode={isEditmode} />
      </EventsContainer>
    </>
  );
};

const Bookmark = () => {
  const [folderSelected, setFolderSelected] = useState<string | null>(null);
  return (
    <BookmarkWrapper>
      {folderSelected ? (
        <Events
          foldername={folderSelected}
          setFolderSelected={setFolderSelected}
        />
      ) : (
        <BookmarkFolders setFolderSelected={setFolderSelected} />
      )}
    </BookmarkWrapper>
  );
};

export default Bookmark;

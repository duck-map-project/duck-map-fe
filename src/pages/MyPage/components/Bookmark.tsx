import { useState } from 'react';
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
import { toggleBookmarkFolder } from '../../../redux/manageModalSlice';

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
  isEditmode,
  setFolderSelected,
}: FolderItemProps) => {
  //color props로 받아오기
  //임시로 만들어둔 state, 나중에 props로 받아올 값
  const [selectEmoji, setSelectEmoji] = useState('heartred');
  setSelectEmoji;

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
      {/* fill 속성에 pick 된 color 집어 넣기. => color를 나중에 props로 받아와야 한다.*/}
      <Bookmarkfoldericon fill="white" />
      <EmojiPreview img={selectEmoji}>
        <img
          src={emojiArray.find((emoji) => emoji.value === selectEmoji)?.img}
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
  //이 컴포넌트에서 bookmark data 가져오기 ... 여기서 bookmark folder를 불러오고,,
  const dispatch = useDispatch();

  const [foldername, _] = useState('폴더이름예시');

  const [isEditmode, setIsEditmode] = useState(false);

  const onClickAddNewFolder = () => {
    dispatch(toggleBookmarkFolder());
  };

  const onClickToggleEditmode = () => {
    setIsEditmode((prev) => !prev);
  };

  const onClickNoEditmode = () => {
    setIsEditmode(false);
  };

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
            editmode={isEditmode.toString()}
          >
            <img src={editicon} />
            북마크 편집하기
          </GoEditBtn>
        </SettingBtnWrapper>
      </FoldersHeader>
      <FoldersContainer onClick={onClickNoEditmode}>
        <BookmarkFolderItem
          foldername={foldername}
          isEditmode={isEditmode}
          setFolderSelected={setFolderSelected}
        />
        <BookmarkFolderItem
          foldername={foldername}
          isEditmode={isEditmode}
          setFolderSelected={setFolderSelected}
        />
        <BookmarkFolderItem
          foldername={foldername}
          isEditmode={isEditmode}
          setFolderSelected={setFolderSelected}
        />
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
          editmode={isEditmode.toString()}
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
  //폴더 클릭 유무를 나타냄
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

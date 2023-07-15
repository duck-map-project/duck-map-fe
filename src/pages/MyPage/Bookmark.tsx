import bookmarkIcon from '../../assets/icons/bookmark.svg';
import bookmarkFolderIcon from '../../assets/icons/bookmarkFolder.svg';
import pencilIcon from '../../assets/icons/pencil.svg';

import {
  FloderWrapper,
  FolderNameWrapper,
  NameIcon,
  FolderName,
  ItemWrapper,
  EventImg,
  EventName,
} from './BookmarkStyle';

const testImg =
  'https://images.unsplash.com/photo-1567880905822-56f8e06fe630?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80';

const BookmarkFolder = () => {
  return (
    <FloderWrapper>
      <img src={bookmarkFolderIcon} alt="북마크 폴더" />
      <FolderNameWrapper>
        <NameIcon>
          <img src={pencilIcon} />
        </NameIcon>
        <FolderName>북마크 폴더 이름</FolderName>
      </FolderNameWrapper>
    </FloderWrapper>
  );
};

const BookmarkItem = () => {
  return (
    <ItemWrapper bookmarkIcon={bookmarkIcon}>
      <EventImg src={testImg} />
      <EventName>북마크된 이벤트 명</EventName>
    </ItemWrapper>
  );
};

const Bookmark = () => {
  //이 컴포넌트에서 bookmark data 가져오기
  return (
    <>
      <BookmarkFolder />
      <BookmarkItem />
    </>
  );
};

export default Bookmark;

import { useDispatch } from 'react-redux';

import { ReactComponent as Bookmarkfoldericon } from '../../../assets/icons/bookmark-folder.svg';
import bookmarkicon from '../../../assets/icons/bookmark.svg';
import pencilIcon from '../../../assets/icons/pencil.svg';
import { toggleBookmarkFolder } from '../../../redux/manageModalSlice';

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
  const dispatch = useDispatch();

  const onClickBtn = () => {
    dispatch(toggleBookmarkFolder());
  };
  return (
    <FloderWrapper>
      <button
        style={{ width: '100px', backgroundColor: 'red' }}
        onClick={onClickBtn}
      >
        임시 추가 버튼
      </button>
      {/* fill 속성에 pick 된 color 집어 넣기. => color를 나중에 props로 받아와야 한다.*/}
      <Bookmarkfoldericon fill="white" />
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
    <ItemWrapper bookmarkicon={bookmarkicon}>
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

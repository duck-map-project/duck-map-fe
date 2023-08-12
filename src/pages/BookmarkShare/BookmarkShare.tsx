import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import logo from '../../assets/icons/logo.svg';
import staricon from '../../assets/icons/starIcon.svg';
import { useRouter } from '../../hooks/useRouter';
import { useGetShareBookmarkFolderQuery } from '../../redux/bookmarkFolderSlice';
import { shareFolderEventsType } from '../../types/bookmarkFolderType';

import {
  ItemWrapper,
  EventImg,
  StyledMain,
  StyledMemo,
  Logo,
  Content,
  UserProfile,
  Username,
  Foldername,
  EventName,
  EventWrapper,
  NoticeNoEvents,
  MainPageBtn,
} from './BookmarkShareStyle';

type EventItemProps = {
  image: string;
  storeName: string;
};

const BookmarkEventItem = ({ image, storeName }: EventItemProps) => {
  return (
    <ItemWrapper>
      <EventImg src={image} />
      <EventName>{storeName}</EventName>
    </ItemWrapper>
  );
};

const BookmarkShare = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { routeTo } = useRouter();
  const { id } = useParams();
  const [folderId, setFolderId] = useState<number>(0);
  const [eventsArray, setEventsArray] = useState<shareFolderEventsType[]>([]);
  const [hasEvents, setHasEvents] = useState(false);
  const [foldername, setFoldername] = useState('');
  const [username, setUsername] = useState('');
  const [skip, setSkip] = useState(true);
  useEffect(() => {
    if (id) {
      setFolderId(parseInt(id));
      setSkip(false);
    }
  }, []);

  const {
    data: BookmarkFolderData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetShareBookmarkFolderQuery(
    {
      id: folderId,
    },
    { skip }
  );
  useEffect(() => {
    if (BookmarkFolderData) {
      setEventsArray(BookmarkFolderData.content);
      setUsername(BookmarkFolderData.username);
      setFoldername(BookmarkFolderData.name);
      const numberofelement = BookmarkFolderData.numberOfElements;
      setHasEvents(Boolean(numberofelement));
    }
  }, [BookmarkFolderData]);

  const onClickGoMainBtn = () => {
    routeTo('/');
  };

  let content;
  if (isLoading) {
    content = <div>이벤트를 불러오는 중입니다.</div>;
  } else if (isSuccess) {
    content = eventsArray.map((event) => (
      <BookmarkEventItem
        key={event.id}
        image={baseUrl + event.image}
        storeName={event.storeName}
      />
    ));
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <StyledMain>
      <StyledMemo>
        <Logo>
          <img alt="대동덕지도" src={logo} />
        </Logo>
        <Content>
          <UserProfile>
            <Username>{username} 님의 북마크</Username>
          </UserProfile>
          <Foldername>
            <img src={staricon} />
            <span>{foldername}</span>
          </Foldername>
          {hasEvents ? (
            <EventWrapper>{content}</EventWrapper>
          ) : (
            <NoticeNoEvents>북마크된 이벤트가 없습니다.</NoticeNoEvents>
          )}
          <MainPageBtn type="button" onClick={onClickGoMainBtn}>
            메인 페이지로 이동
          </MainPageBtn>
        </Content>
      </StyledMemo>
    </StyledMain>
  );
};

export default BookmarkShare;

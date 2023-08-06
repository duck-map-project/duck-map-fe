import { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import arrowicon from '../../../assets/icons/arrowright.svg';
import plusicon from '../../../assets/icons/cross.svg';
import editicon from '../../../assets/icons/editpencil.svg';
import starticon from '../../../assets/icons/starIcon.svg';
import { useGetBookmarkEventsQuery } from '../../../redux/bookmarkEventSlice';
import { BookmarkEventType } from '../../../types/bookmarkEventType';

import BookmarkEventItem from './BookmarkEventItem';
import * as S from './BookmarkEventsStyle';

type EventsProps = {
  foldername: string;
  folderId: number;
  setSelectedFoldername: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedFolderId: React.Dispatch<React.SetStateAction<number | null>>;
};

const BookmarkEvents = ({
  foldername,
  folderId,
  setSelectedFoldername,
  setSelectedFolderId,
}: EventsProps) => {
  const originPath = window.location.origin;
  const folderPath = `/bookmark-share/${folderId}`;
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

  const onCopyURL = () => {
    alert(
      '북마크 폴더 공유 주소가 복사되었습니다. 원하는 곳에 붙여넣어 보세요.'
    );
  };
  return (
    <>
      <S.EventsHeader>
        <S.Path>
          <img src={starticon} />
          <S.GoBookmarkFolders onClick={onClickGoBookmarkFolders}>
            북마크
          </S.GoBookmarkFolders>
          <img src={arrowicon} />
          <span>{foldername}</span>
        </S.Path>
        <S.SettingBtnWrapper>
          <CopyToClipboard text={originPath + folderPath} onCopy={onCopyURL}>
            <S.SettingBtn>
              <img src={plusicon} />
              폴더 공유하기
            </S.SettingBtn>
          </CopyToClipboard>
          <S.GoEditBtn
            onClick={onClickToggleEditmode}
            editmode={isEditmode ? isEditmode.toString() : undefined}
          >
            <img src={editicon} />
            북마크 편집하기
          </S.GoEditBtn>
        </S.SettingBtnWrapper>
      </S.EventsHeader>
      <S.EventsContainer onClick={onClickNoEditmode}>
        {hasEvents ? content : <div>북마크된 이벤트가 없습니다.</div>}
      </S.EventsContainer>
    </>
  );
};

export default BookmarkEvents;
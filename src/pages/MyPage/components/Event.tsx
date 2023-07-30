import { useState, useEffect } from 'react';

import usericon from '../../../assets/icons/mypage.svg';
import { useGetMyeventQuery } from '../../../redux/mypageSlice';
import { myevetType } from '../../../types/mypageType';

import {
  TypeInfoBtn,
  EventWrapper,
  EventImg,
  ArtistInfo,
  EventTypeWrapper,
  StoreName,
  Adress,
  EventControlsWrapper,
  EditEventBtn,
  DeleteEventBtn,
} from './EventStyle';

type LikeItemProps = {
  artists: [
    {
      id: number;
      groupId: number;
      groupName: string;
      name: string;
      image: string;
      artistType: {
        id: number;
        type: string;
      };
    }
  ];
  categories: [
    {
      id: number;
      category: string;
    }
  ];
  address: string;
  storeName: string;
  image: string;
  eventId: number;
};

const TypeInfo = ({ text }: { text: string }) => {
  return <TypeInfoBtn>{text}</TypeInfoBtn>;
};

const EventItem = ({
  artists,
  categories,
  address,
  storeName,
  image,
  eventId,
}: LikeItemProps) => {
  const onClickEventItem = () => {
    eventId;
    alert('이벤트 상세 페이지 이동');
  };

  return (
    <EventWrapper icon={usericon} onClick={onClickEventItem}>
      <EventImg src={image} />
      <section>
        <ArtistInfo>
          <span>{artists.map((artist) => artist.groupName)}</span>
          <span>{artists.map((artist) => artist.name)}</span>
        </ArtistInfo>
        <EventTypeWrapper>
          {categories.map((type, index) => (
            <TypeInfo key={index} text={type.category} />
          ))}
        </EventTypeWrapper>
        <StoreName>{storeName}</StoreName>
        <Adress>{address}</Adress>
        <EventControlsWrapper>
          <EditEventBtn type="button">수정하기</EditEventBtn>
          <DeleteEventBtn type="button">삭제하기</DeleteEventBtn>
        </EventControlsWrapper>
      </section>
    </EventWrapper>
  );
};

const Event = () => {
  const [numberOfMyevent, setNumberOfMyevent] = useState(0);
  const [myeventArray, setMyeventArray] = useState<myevetType[]>([]);
  const [isLast, setIsLast] = useState(true);

  //무한스크롤 상태
  isLast;
  const {
    data: myeventData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMyeventQuery({});

  useEffect(() => {
    if (myeventData) {
      const contentArray = myeventData.content;
      const numberofdata = myeventData.numberOfElements;
      const isLast = myeventData.isLast;
      setMyeventArray(contentArray);
      setNumberOfMyevent(numberofdata);
      setIsLast(isLast);
    }
  }, [myeventData]);

  let content;
  if (isLoading) {
    content = <div>나의 좋아요 이벤트를 불러오는 중입니다.</div>;
  } else if (isSuccess) {
    content = myeventArray.map((event) => (
      <EventItem
        key={event.id}
        eventId={event.id}
        artists={event.artists}
        categories={event.categories}
        address={event.address}
        storeName={event.storeName}
        image={event.image}
      />
    ));
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }
  return (
    <>{numberOfMyevent ? content : <div>내가 작성한 이벤트가 없습니다.</div>}</>
  );
};

export default Event;

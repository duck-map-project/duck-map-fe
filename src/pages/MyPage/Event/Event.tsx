import { useState, useEffect } from 'react';

import usericon from '../../../assets/mypage.svg';
import {
  useGetMyeventQuery,
  useDeleteEventMutation,
} from '../../../features/mypageSlice';
import { useRouter } from '../../../hooks/useRouter';
import { myevetType } from '../../../types/mypageType';
import {
  InfoSection,
  ArtistInfo,
  ArtistName,
  EventTypeWrapper,
  TypeInfoBtn,
  StoreName,
  Adress,
  EventImg,
} from '../Like/LikeStyle';

import {
  EventWrapper,
  EventControlsWrapper,
  EditBtn,
  DeleteBtn,
  EventContainer,
  BtnText,
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
  const imagePath = process.env.REACT_APP_BASE_URL + image;
  const [deleteEvent] = useDeleteEventMutation();
  const { routeTo } = useRouter();

  const onClickEventItem = () => {
    routeTo(`/event/${eventId}`);
  };

  const onClickEditBtn = (event: React.MouseEvent) => {
    event.stopPropagation();
    routeTo(`/event/edit/${eventId}`);
  };

  const onClickDeleteBtn = async (event: React.MouseEvent) => {
    event.stopPropagation();
    if (window.confirm('해당 이벤트를 삭제하시겠습니까?')) {
      try {
        const res = await deleteEvent({ id: eventId });
        if ('error' in res) {
          alert('잠시 후 다시 시도해주세요.');
          return;
        }
        alert('삭제되었습니다.');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <EventWrapper icon={usericon} onClick={onClickEventItem}>
      <EventImg src={imagePath} />
      <InfoSection>
        <ArtistInfo>
          {artists.map((artist) => (
            <ArtistName key={artist.id}>{artist.name}</ArtistName>
          ))}
        </ArtistInfo>
        <EventTypeWrapper>
          {categories.map((type, index) => (
            <TypeInfo key={index} text={type.category} />
          ))}
        </EventTypeWrapper>
        <StoreName>{storeName}</StoreName>
        <Adress>{address}</Adress>
        <EventControlsWrapper>
          <EditBtn type="button" onClick={onClickEditBtn}>
            <BtnText>수정하기</BtnText>
          </EditBtn>
          <DeleteBtn type="button" onClick={onClickDeleteBtn}>
            <BtnText>삭제하기</BtnText>
          </DeleteBtn>
        </EventControlsWrapper>
      </InfoSection>
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
    content = <div>나의 이벤트를 불러오는 중입니다.</div>;
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
    <EventContainer>
      {numberOfMyevent ? content : <div>내가 작성한 이벤트가 없습니다.</div>}
    </EventContainer>
  );
};

export default Event;

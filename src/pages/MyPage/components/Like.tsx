import { useEffect, useState } from 'react';

import hearticon from '../../../assets/icons/heart-big.svg';
import { useGetMylikeQuery } from '../../../redux/mypageSlice';
import { mylikeType } from '../../../types/mypageType';

import {
  TypeInfoBtn,
  LikeWrapper,
  EventImg,
  ArtistInfo,
  ArtistName,
  EventTypeWrapper,
  StoreName,
  Adress,
} from './LikeStyle';

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
  category: [
    {
      id: number;
      category: string;
    }
  ];
  address: number;
  storeName: string;
  image: string;
  eventId: number;
};

const TypeInfo = ({ text }: { text: string }) => {
  return <TypeInfoBtn>{text}</TypeInfoBtn>;
};

const LikeItem = ({
  category,
  artists,
  address,
  storeName,
  image,
  eventId,
}: LikeItemProps) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const imgURL = baseUrl + image;
  const onClickMyLike = () => {
    eventId;
    //이벤트 상세 페이지로 이동
  };
  console.log(artists);
  return (
    <LikeWrapper icon={hearticon} onClick={onClickMyLike}>
      <EventImg src={imgURL} />
      <section>
        <ArtistInfo>
          {artists.map((artist) => (
            <ArtistName key={artist.id}>{artist.name}</ArtistName>
          ))}
        </ArtistInfo>
        <EventTypeWrapper>
          {category.map((type) => (
            <TypeInfo key={type.id} text={type.category} />
          ))}
        </EventTypeWrapper>
        <StoreName>{storeName}</StoreName>
        <Adress>{address}</Adress>
      </section>
    </LikeWrapper>
  );
};

const Like = () => {
  const [numberOfMylike, setNumberOfMylike] = useState(0);
  const [mylikeArray, setMylikeArray] = useState<mylikeType[]>([]);
  const [isLast, setIsLast] = useState(true);
  //무한스크롤 상태
  isLast;

  const {
    data: mylikeData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMylikeQuery({});

  useEffect(() => {
    if (mylikeData) {
      const contentArray = mylikeData.content;
      const numberofdata = mylikeData.numberOfElements;
      const isLast = mylikeData.isLast;
      setMylikeArray(contentArray);
      setNumberOfMylike(numberofdata);
      setIsLast(isLast);
    }
  }, [mylikeData]);

  let content;
  if (isLoading) {
    content = <div>나의 좋아요 이벤트를 불러오는 중입니다.</div>;
  } else if (isSuccess) {
    content = mylikeArray.map((event) => (
      <LikeItem
        key={event.id}
        eventId={event.id}
        artists={event.artists}
        category={event.categories}
        address={event.address}
        storeName={event.storeName}
        image={event.image}
      />
    ));
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }
  return (
    <>
      {numberOfMylike ? (
        <div>{content}</div>
      ) : (
        <div>좋아요 이벤트가 없습니다.</div>
      )}
    </>
  );
};

export default Like;

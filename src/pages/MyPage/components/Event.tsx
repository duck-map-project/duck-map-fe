import usericon from '../../../assets/icons/mypage.svg';

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

const testImg =
  'https://images.unsplash.com/photo-1567880905822-56f8e06fe630?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80';

const TypeInfo = ({ text }: { text: string }) => {
  return <TypeInfoBtn>{text}</TypeInfoBtn>;
};

const EventItem = () => {
  //Event로부터 넘겨줄 값
  const eventInfoArray = ['카페', '식당', '전시', '광고'];

  return (
    <EventWrapper icon={usericon}>
      <EventImg src={testImg} />
      <section>
        <ArtistInfo>
          <span>그룹명(그룹명이 있을 경우)</span>
          <span>멤버 이름</span>
        </ArtistInfo>
        <EventTypeWrapper>
          {eventInfoArray.map((type, index) => (
            <TypeInfo key={index} text={type} />
          ))}
        </EventTypeWrapper>
        <StoreName>카페이름</StoreName>
        <Adress>서울 동교동</Adress>
        <EventControlsWrapper>
          <EditEventBtn type="button">수정하기</EditEventBtn>
          <DeleteEventBtn type="button">삭제하기</DeleteEventBtn>
        </EventControlsWrapper>
      </section>
    </EventWrapper>
  );
};

const Event = () => {
  // 여기서 event data 불러오기
  return (
    <>
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
    </>
  );
};

export default Event;

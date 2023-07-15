import locationIcon from '../../../assets/icons/location.svg';

import {
  ReviewItemWrapper,
  ReviewTitle,
  EventName,
  ReviewContent,
  ReviewImg,
} from './ReviewStyle';

const testImg =
  'https://images.unsplash.com/photo-1567880905822-56f8e06fe630?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80';

const ReviewItem = () => {
  return (
    <ReviewItemWrapper>
      <ReviewTitle>
        <img src={locationIcon} />
        <div>
          <EventName>이벤트 이름</EventName>
          <span>별점 컴포넌트</span>
        </div>
      </ReviewTitle>
      <ReviewContent>
        {' '}
        헌법재판소 재판관의 임기는 6년으로 하며, 법률이 정하는 바에 의하여
        연임할 수 있다. 대통령은 법률에서 구체적으로 범위를 정하여 위임받은
        사항과 법률을 집행하기 위하여 필요한 사항에 관하여 대통령령을 발할 수
        있다. 계엄을 선포한 때에는 대통령은 지체없이 국회에 통고하여야 한다.
        대법원장과 대법관이 아닌 법관은 대법관회의의 동의를 얻어 대법원장이
        임명한다.{' '}
      </ReviewContent>
      <ReviewImg src={testImg} />
    </ReviewItemWrapper>
  );
};

const Review = () => {
  //여기서 review data 받아오기
  return (
    <>
      <ReviewItem />
      <ReviewItem />
      <ReviewItem />
      <ReviewItem />
    </>
  );
};

export default Review;

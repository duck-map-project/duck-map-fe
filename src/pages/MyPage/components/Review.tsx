import { useState, useEffect } from 'react';

import locationIcon from '../../../assets/icons/location.svg';
import { useGetMyreviewQuery } from '../../../redux/mypageSlice';
import { myreviewType } from '../../../types/mypageType';

import {
  ReviewItemWrapper,
  ReviewTitle,
  EventName,
  ReviewContent,
  ReviewImg,
} from './ReviewStyle';

type ReviewItemProps = {
  id: number;
  eventStoreName: string;
  score: number;
  reviewImage: string;
  content: string;
};
const ReviewItem = ({
  id,
  eventStoreName,
  score,
  reviewImage,
  content,
}: ReviewItemProps) => {
  const onClickReviewItem = () => {
    id;
    alert('상세리뷰로 이동!');
  };

  return (
    <ReviewItemWrapper onClick={onClickReviewItem}>
      <ReviewTitle>
        <img src={locationIcon} />
        <div>
          <EventName>{eventStoreName}</EventName>
          <span>{score}</span>
        </div>
      </ReviewTitle>
      <ReviewContent> {content} </ReviewContent>
      <ReviewImg src={reviewImage} />
    </ReviewItemWrapper>
  );
};

const Review = () => {
  const [numberOfMyreview, setNumberOfMyreview] = useState(0);
  const [myreviewArray, setMyreviewArray] = useState<myreviewType[]>([]);
  const [isLast, setIsLast] = useState(true);
  //무한스크롤 상태
  isLast;
  const {
    data: myreviewData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMyreviewQuery({});

  useEffect(() => {
    if (myreviewData) {
      const contentArray = myreviewData.content;
      const numberofdata = myreviewData.numberOfElements;
      const isLast = myreviewData.isLast;
      setMyreviewArray(contentArray);
      setNumberOfMyreview(numberofdata);
      setIsLast(isLast);
    }
  }, [myreviewData]);

  let content;
  if (isLoading) {
    content = <div>나의 리뷰를 불러오는 중입니다. </div>;
  } else if (isSuccess) {
    content = myreviewArray.map((review) => (
      <ReviewItem
        key={review.id}
        id={review.id}
        score={review.score}
        reviewImage={review.reviewImage}
        content={review.content}
        eventStoreName={review.eventStoreName}
      />
    ));
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <>
      {numberOfMyreview ? (
        <div>{content}</div>
      ) : (
        <div>작성한 리뷰가 없습니다.</div>
      )}
    </>
  );
};

export default Review;

import { useState, useEffect } from 'react';

import locationIcon from '../../../assets/location.svg';
import FixedRating from '../../../components/FixedRating';
import { useGetMyreviewQuery } from '../../../features/reviews/services/reviewApiSlice';
import { useDeleteReviewMutation } from '../../../features/reviews/services/reviewApiSlice';
import { useRouter } from '../../../hooks/useRouter';
import { myreviewType } from '../../../types/mypageType';

import {
  ReviewItemWrapper,
  ReviewTitle,
  EventName,
  ReviewContent,
  ReviewImg,
  ReviewsWrapper,
  ButtonWrapper,
  EditButton,
  DeleteButton,
  ButtonText,
} from './ReviewStyle';

type ReviewItemProps = {
  id: number;
  eventStoreName: string;
  score: number;
  reviewImage: string;
  content: string;
  refetch: () => void;
};
const ReviewItem = ({
  id,
  eventStoreName,
  score,
  reviewImage,
  content,
  refetch,
}: ReviewItemProps) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [deleteReview] = useDeleteReviewMutation();
  const onClickReviewItem = () => {
    routeTo(`/review/${id}`);
  };

  const { routeTo } = useRouter();

  const onEditButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    routeTo(`/review/modify/${id}`);
  };

  const onDeleteButtonClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    await deleteReview(id);
    refetch();
  };

  return (
    <ReviewItemWrapper onClick={onClickReviewItem}>
      <ReviewTitle>
        <img src={locationIcon} />
        <div>
          <EventName>{eventStoreName}</EventName>
          <FixedRating
            score={score}
            size="reviewItem"
            className="myReviewItem"
          />
        </div>
      </ReviewTitle>
      <ReviewContent> {content} </ReviewContent>
      <ReviewImg src={baseUrl + reviewImage} />
      <ButtonWrapper>
        <EditButton onClick={onEditButtonClick}>
          <ButtonText>수정하기</ButtonText>
        </EditButton>
        <DeleteButton onClick={onDeleteButtonClick}>
          <ButtonText>삭제하기</ButtonText>
        </DeleteButton>
      </ButtonWrapper>
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
    refetch,
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
        refetch={refetch}
      />
    ));
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <>
      {numberOfMyreview ? (
        <ReviewsWrapper>{content}</ReviewsWrapper>
      ) : (
        <div>작성한 리뷰가 없습니다.</div>
      )}
    </>
  );
};

export default Review;

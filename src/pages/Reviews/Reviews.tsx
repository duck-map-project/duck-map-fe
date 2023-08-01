import { useEffect, useState } from 'react';

import { ReactComponent as Checkicon } from '../../assets/icons/checkicon.svg';
import locationIcon from '../../assets/icons/location.svg';
import ChoiceArtistBar from '../../components/ChoiceArtistBar';
import FixedRating from '../../components/FixedRating';
import { useGetReviewsQuery } from '../../redux/reviewSlice';
import { reviewType } from '../../types/reviewType';

import {
  ReviewItemWrapper,
  ReviewTitle,
  ReviewContent,
  EventName,
  ArtistName,
  Categories,
  ReviewImg,
  MainContent,
  ReviewWrapper,
  ScrollWrapper,
  Rating,
  Tab,
  TabWrapper,
  NoticeNoReview,
} from './ReviewStyle';

type ReviewItemProps = {
  id: number;
  eventStoreName: string;
  artistName: string;
  score: number;
  reviewImage: string;
  content: string;
};

const testText =
  '대통령으로 선거될 수 있는 자는 국회의원의 피선거권이 있고 선거일 현재 40세에 달하여야 한다. 정기회의 회기는 100일을, 임시회의 회기는 30일을 초과할 수 없다.이 헌법은 1988년 2월 25일부터 시행한다. 다만, 이 헌법을 시행하기 위하여 필요한 법률의 제정·개정과 이 헌법에 의한 대통령 및 국회의원의 선거 기타 이 헌법시행에 관한 준비는 이 헌법시행 전에 할 수 있다.';

const tabArray = [
  {
    id: 1,
    value: 'current',
    group: 'tab',
    text: '현재 진행중',
  },
  {
    id: 2,
    value: 'all',
    group: 'tab',
    text: '모두 보기',
  },
];

const ReviewItem = ({
  id,
  eventStoreName,
  artistName,
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
          <ArtistName>{artistName}</ArtistName>
        </div>
      </ReviewTitle>
      <ReviewContent> {content} </ReviewContent>
      <Categories> #카테고리들 </Categories>
      <ReviewImg src={reviewImage} />
      <Rating>
        <FixedRating score={score} size="reviewItem" className="리뷰아이템" />
      </Rating>
    </ReviewItemWrapper>
  );
};

const Reviews = () => {
  const [selectedTab, setSelectedTab] = useState('current');
  const [allReviewsArray, setAllReviewsArray] = useState<reviewType[]>([]);
  const [currentReviewArray, setCurrentReviewArray] = useState<reviewType[]>(
    []
  );
  const [hasReview, setHasReview] = useState(false);

  const {
    data: ReviewsData,
    isLoading,
    isSuccess,
    isError,
  } = useGetReviewsQuery({});

  useEffect(() => {
    if (ReviewsData) {
      setAllReviewsArray(ReviewsData.content);

      const numberofelement = ReviewsData.numberOfElements;
      setHasReview(Boolean(numberofelement));

      const currentReviews = allReviewsArray.filter(
        (review) => review.inProgress === true
      );
      setCurrentReviewArray(currentReviews);
    }
  }, [ReviewsData]);

  const onClickTab = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTab(e.target.value);
  };

  const tabContent = tabArray.map((data) => (
    <div key={data.id}>
      <Tab htmlFor={data.value} selected={data.value === selectedTab}>
        <Checkicon fill={data.value === selectedTab ? '#C3BEF0' : '#D2D2D2'} />
        {data.text}
      </Tab>
      <input
        type="radio"
        id={data.value}
        value={data.value}
        name={data.group}
        onChange={onClickTab}
        className="sr-only"
      ></input>
    </div>
  ));

  let reviewContent;
  if (isLoading) {
    reviewContent = <div> 리뷰를 불러오는 중입니다. </div>;
  } else if (isSuccess) {
    if (selectedTab === 'current') {
      reviewContent = currentReviewArray.map((review) => (
        <ReviewItem
          key={review.id}
          id={review.id}
          eventStoreName={'이벤트 이름'}
          artistName={'아티스트 이름'}
          score={4.5}
          reviewImage={review.image}
          content={testText}
        />
      ));
    } else if (selectedTab === 'all') {
      reviewContent = allReviewsArray.map((review) => (
        <ReviewItem
          key={review.id}
          id={review.id}
          eventStoreName={'이벤트 이름'}
          artistName={'아티스트 이름'}
          score={4.5}
          reviewImage={review.image}
          content={testText}
        />
      ));
    } else if (isError) {
      reviewContent = <div>{'리뷰를 불러오지 못하였습니다. '}</div>;
    }
  }

  return (
    <>
      <ChoiceArtistBar />
      <MainContent>
        <TabWrapper>{tabContent}</TabWrapper>
        <ReviewWrapper>
          <ScrollWrapper>
            {hasReview ? (
              reviewContent
            ) : (
              <NoticeNoReview> 작성된 리뷰가 없습니다. </NoticeNoReview>
            )}
          </ScrollWrapper>
        </ReviewWrapper>
      </MainContent>
    </>
  );
};

export default Reviews;

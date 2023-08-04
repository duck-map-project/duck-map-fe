import { useEffect, useState } from 'react';

import { ReactComponent as Checkicon } from '../../assets/icons/checkicon.svg';
import ChoiceArtistBar from '../../components/ChoiceArtistBar';
import ReviewRating from '../../components/ReviewRating';
import { useGetAllReviewsQuery } from '../../redux/reviewSlice';
import { reviewType } from '../../types/reviewType';

import {
  ReviewItemWrapper,
  ArtistsWrapper,
  ArtistName,
  NumberOfAritsts,
  CategoryWrapper,
  Category,
  ReviewImgWrapper,
  ReviewImg,
  MainContent,
  ReviewWrapper,
  ScrollWrapper,
  RatingWrapper,
  Tab,
  TabWrapper,
  NoticeNoReview,
} from './ReviewStyle';

type ReviewItemProps = {
  id: number;
  artistName: string[];
  score: number;
  reviewImage: string;
  categories: string[];
};

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
  artistName,
  score,
  reviewImage,
  categories,
}: ReviewItemProps) => {
  const onClickReviewItem = () => {
    id;
    alert('상세리뷰로 이동!');
  };

  score;

  const categoryContent = categories.map((category) => (
    <Category key={Math.random()}>#{category}</Category>
  ));

  const isAlone = artistName.length > 1 ? false : true;

  return (
    <ReviewItemWrapper onClick={onClickReviewItem}>
      <ReviewImgWrapper>
        <ReviewImg src={reviewImage} />
      </ReviewImgWrapper>
      <ArtistsWrapper>
        <ArtistName>{artistName[0]}</ArtistName>
        <NumberOfAritsts>
          {isAlone ? '' : `외 ${artistName.length}명`}
        </NumberOfAritsts>
      </ArtistsWrapper>
      <CategoryWrapper>{categoryContent}</CategoryWrapper>
      <RatingWrapper>
        <ReviewRating score={score} className="reviewScore" />
      </RatingWrapper>
    </ReviewItemWrapper>
  );
};

const Reviews = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;
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
  } = useGetAllReviewsQuery({});

  useEffect(() => {
    console.log(ReviewsData);
    if (ReviewsData) {
      setAllReviewsArray(ReviewsData.content);

      const numberofelement = ReviewsData.numberOfElements;
      setHasReview(Boolean(numberofelement));

      const currentReviews = ReviewsData.content.filter(
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
          artistName={review.artists}
          score={review.score}
          reviewImage={baseURL + review.image}
          categories={review.categories}
        />
      ));
    } else if (selectedTab === 'all') {
      reviewContent = allReviewsArray.map((review) => (
        <ReviewItem
          key={review.id}
          id={review.id}
          artistName={review.artists}
          score={review.score}
          reviewImage={baseURL + review.image}
          categories={review.categories}
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
          {/* TODO: 무한스크롤 */}
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

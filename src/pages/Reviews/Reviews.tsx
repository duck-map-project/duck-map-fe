import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import { ReactComponent as Checkicon } from '../../assets/icons/checkicon.svg';
import ChoiceArtistBar from '../../components/ChoiceArtistBar';
import { useGetAllReviewsQuery } from '../../redux/reviewSlice';
import {
  selectEventArtist,
  selectEventGroup,
} from '../../redux/setEventArtistSlice';
import { reviewType } from '../../types/reviewType';

import ReviewItem from './ReviewItem';
import {
  PageWrapper,
  MainContent,
  ReviewWrapper,
  ScrollWrapper,
  Tab,
  TabWrapper,
  NoticeNoReview,
} from './ReviewStyle';

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

const Reviews = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const [selectedTab, setSelectedTab] = useState('current');
  const [reviewsArray, setReviewsArray] = useState<reviewType[]>([]);
  const [hasReview, setHasReview] = useState(false);
  const [reviewlistPage, setReviewListPage] = useState(0);
  const [reviewOnlyInprogress, setReviewOnlyInprogress] = useState(true);
  const selectedArtist = useSelector(selectEventArtist);
  const selectedGroup = useSelector(selectEventGroup);
  const {
    data: ReviewsData,
    isLoading,
    isFetching,
    isSuccess,
    isError,
  } = useGetAllReviewsQuery({
    pageNumber: reviewlistPage.toString(),
    onlyInProgress: reviewOnlyInprogress.toString(),
    ...(selectedArtist && { artistId: selectedArtist.id.toString() }),
    ...(selectedGroup &&
      !selectedArtist && { artistId: selectedGroup.id.toString() }),
  });

  useEffect(() => {
    if (ReviewsData) {
      setReviewsArray(ReviewsData.content);
      const numberofelement = ReviewsData.numberOfElements;
      setHasReview(Boolean(numberofelement));
    }
  }, [ReviewsData]);

  const onClickTab = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTab(e.target.value);
    if (e.target.value === 'current') {
      setReviewOnlyInprogress(true);
    } else if (e.target.value === 'all') {
      setReviewOnlyInprogress(false);
    }
  };

  //무한 스크롤
  const reviewsListRef = useRef<HTMLDivElement>(null);
  const listElement = reviewsListRef.current;

  const isLast = ReviewsData?.isLast ?? true;

  useEffect(() => {
    if (listElement) {
      const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = listElement;
        const isScrolledToEnd = scrollTop + clientHeight >= scrollHeight;

        if (isScrolledToEnd && !isFetching && !isLast) {
          setReviewListPage((prev) => prev + 1);
        }
      };

      listElement.addEventListener('scroll', handleScroll);

      return () => {
        listElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, [reviewlistPage, isFetching, listElement, reviewsListRef]);

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
    reviewContent = reviewsArray.map((review) => (
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

  return (
    <PageWrapper>
      <ChoiceArtistBar />
      <MainContent>
        <TabWrapper>{tabContent}</TabWrapper>
        <ReviewWrapper>
          <ScrollWrapper ref={reviewsListRef}>
            {hasReview ? (
              reviewContent
            ) : (
              <NoticeNoReview> 작성된 리뷰가 없습니다. </NoticeNoReview>
            )}
          </ScrollWrapper>
        </ReviewWrapper>
      </MainContent>
    </PageWrapper>
  );
};

export default Reviews;

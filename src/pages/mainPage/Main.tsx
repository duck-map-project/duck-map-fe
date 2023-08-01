import { useState, useEffect, useRef } from 'react';

import sortIcon from '../../assets/sort-book.svg';
import KakaoMap from '../../components/KakaoMap';
import { useGetMainReviewQuery } from '../../redux/reviewApiSlice';
import { MainReview } from '../../types/reviewServie';

import {
  MainSection,
  ViewReviews,
  MoreButton,
  Reviews,
  MapSortDrop,
  MapFrame,
  MapTitle,
  ViewReviewsTitle,
} from './MainStyle';
import ReviewItem from './ReviewItem';

interface Reviews {
  eventId: number;
  imageFilenames: string[];
}

const Main = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const sortButtonRef = useRef<HTMLButtonElement>(null);
  const [SortModal, setSortModal] = useState(false);
  const {
    data: mainReviewData,
    isLoading,
    isError,
  } = useGetMainReviewQuery({});
  const sortOption = [
    { id: 1, sort: '인기순' },
    { id: 2, sort: '리뷰순' },
  ];
  const [SelectedText, setSelectedText] = useState<string | null>('Event List');
  const [_, setSelectedId] = useState<number | null>(null);
  const [reviewImages, setReviewImages] = useState<MainReview[]>([]);

  useEffect(() => {
    if (mainReviewData) {
      setReviewImages(mainReviewData.content);
    }
  }, [mainReviewData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortButtonRef.current &&
        !sortButtonRef.current.contains(event.target as Node)
      ) {
        setSortModal(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  let content;

  if (reviewImages) {
    content = reviewImages?.map((review) => (
      <ReviewItem key={review.id} image={baseUrl + review.image} />
    ));
  } else if (isLoading) {
    content = <div>리뷰 이미지를 불러오는 중입니다.</div>;
  } else if (isError) {
    content = <div>앗, 이미지를 불러오지 못했어요.</div>;
  } else {
    content = <div>등록된 리뷰가 없습니다.</div>;
  }

  return (
    <>
      <MainSection>
        <MapFrame>
          <MapSortDrop
            className="mainSortdrop"
            sortButtonRef={sortButtonRef}
            clicked={SortModal}
            setClicked={setSortModal}
            sortOptions={sortOption}
            selectedText={SelectedText}
            setSelectedText={setSelectedText}
            setId={setSelectedId}
            icon={sortIcon}
          />
          <MapTitle>지도</MapTitle>
          <KakaoMap size="main" />
        </MapFrame>
        <ViewReviews>
          <ViewReviewsTitle>리뷰 미리보기</ViewReviewsTitle>
          <MoreButton>더보기</MoreButton>
          <Reviews>{content}</Reviews>
        </ViewReviews>
      </MainSection>
    </>
  );
};

export default Main;

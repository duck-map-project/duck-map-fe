import { useState, useEffect, useRef } from 'react';

// import { reveiws } from '../../api/event';
import SortDropdown from '../../components/SortButton';

import {
  MainSection,
  MapSection,
  ViewReviews,
  MoreButton,
  Reviews,
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
  const sortButtonRef = useRef<HTMLButtonElement>(null);
  const [SortModal, setSortModal] = useState(false);
  // TODO: 추가된 API로 수정해서 리뷰 이미지 목록 불러오기
  // const [reviewImages, setReviewImages] = useState<Reviews[]>([]);

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

  // const FetchReview = async () => {
  //   try {
  //     const res = await reveiws();
  //     setReviewImages(res);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   FetchReview();
  // }, []);

  return (
    <>
      <MainSection>
        <MapFrame>
          <SortDropdown
            sortButtonRef={sortButtonRef}
            clicked={SortModal}
            setClicked={setSortModal}
          />
          <MapTitle>지도</MapTitle>
          <MapSection />
        </MapFrame>
        <ViewReviews>
          <ViewReviewsTitle>리뷰 미리보기</ViewReviewsTitle>
          <MoreButton>더보기</MoreButton>
          <Reviews>
            <ReviewItem />
            <ReviewItem />

            {/* {reviewImages?.map((image, index) => (
              <ReviewsItem key={index} image={image.imageFilenames[0]} />
            ))} */}
          </Reviews>
        </ViewReviews>
      </MainSection>
    </>
  );
};

export default Main;

import { useState, useEffect, useRef } from 'react';

import { reveiws } from '../../api/event';
import SortDropdown from '../../components/SortButton';

import {
  MainSection,
  MapSection,
  ViewReviews,
  MoreButton,
  Reviews,
  ReviewsItem,
} from './MainStyle';

interface Reviews {
  eventId: number;
  imageFilenames: string[];
}

const Main = () => {
  const sortButtonRef = useRef<HTMLButtonElement>(null);
  const [SortModal, setSortModal] = useState(false);
  const [reviewImages, setReviewImages] = useState<Reviews[]>([]);

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

  const FetchReview = async () => {
    try {
      const res = await reveiws();
      setReviewImages(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    FetchReview();
  }, []);

  return (
    <>
      <MainSection>
        <SortDropdown
          sortButtonRef={sortButtonRef}
          clicked={SortModal}
          setClicked={setSortModal}
        />
        <MapSection />
      </MainSection>
      <ViewReviews>
        <MoreButton>더보기</MoreButton>
        <Reviews>
          {reviewImages.map((image, index) => (
            <ReviewsItem key={index} image={image.imageFilenames[0]} />
          ))}
        </Reviews>
      </ViewReviews>
    </>
  );
};

export default Main;

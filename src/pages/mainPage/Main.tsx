import { useState, useEffect, useRef } from 'react';

import SortDropdown from '../../components/SortButton';

import {
  MainSection,
  MapSection,
  ViewReviews,
  MoreButton,
  Reviews,
  ReviewsItem,
} from './MainStyle';

const Main = () => {
  const sortButtonRef = useRef<HTMLButtonElement>(null);
  const [SortModal, setSortModal] = useState(false);

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
          <ReviewsItem />
          <ReviewsItem />
          <ReviewsItem />
          <ReviewsItem />
          <ReviewsItem />
          <ReviewsItem />
          <ReviewsItem />
        </Reviews>
      </ViewReviews>
    </>
  );
};

export default Main;

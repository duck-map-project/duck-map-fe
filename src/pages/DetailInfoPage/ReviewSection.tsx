import { styled } from 'styled-components';

import ReviewItem from '../../components/ReviewItem';

const PageWrapper = styled.ul`
  padding-top: 143px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReviewSection = () => {
  return (
    <PageWrapper>
      <ReviewItem />
      <ReviewItem />
      <ReviewItem />
      <ReviewItem />
      <ReviewItem />
      <ReviewItem />
      <ReviewItem />
      <ReviewItem />
    </PageWrapper>
  );
};

export default ReviewSection;

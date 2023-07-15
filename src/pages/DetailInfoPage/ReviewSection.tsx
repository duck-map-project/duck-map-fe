import { styled } from 'styled-components';

import ReviewItem from '../../components/ReviewItem';
import px2vw from '../../utils/px2vw';

const TabWrapper = styled.section`
  width: 100%;
  padding: 28px 24px;
  background-color: #fcfefe;
  border-radius: 20px;
  border: 2px dashed #1e232c33;
  & > button {
    margin-right: ${px2vw(48)};
  }
`;

const ReviewWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 19px;
  text-align: start;
`;

const ReviewSection = () => {
  return (
    <TabWrapper>
      <ReviewWrapper>
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
      </ReviewWrapper>
    </TabWrapper>
  );
};

export default ReviewSection;

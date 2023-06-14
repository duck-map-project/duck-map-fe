import { styled } from 'styled-components';

import Button from '../../components/Button';
import ReviewItem from '../../components/ReviewItem';
import px2vw from '../../utils/px2vw';

const TabWrapper = styled.section`
  width: 100%;
  padding-top: 39px;
  text-align: right;
  & > button {
    margin-right: ${px2vw(48)};
  }
`;

const ReviewWrapper = styled.ul`
  padding-top: 143px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: start;
`;

const ReviewSection = () => {
  return (
    <TabWrapper>
      <Button size="mid" color="primary">
        리뷰 작성
      </Button>
      <ReviewWrapper>
        <ReviewItem
          profileImage={''}
          score={0}
          userName={''}
          reviewDate={''}
          ReviewContents={''}
          reviewPhoto={''} withAuth={false}        />
      </ReviewWrapper>
    </TabWrapper>
  );
};

export default ReviewSection;

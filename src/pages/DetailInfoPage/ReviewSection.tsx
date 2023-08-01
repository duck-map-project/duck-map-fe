import { styled } from 'styled-components';

import ReviewItem from '../../components/ReviewItem';
import px2vw from '../../utils/px2vw';
const Wrapper = styled.div`
  width: 100%;
  overflow-y: scroll;
  padding-right: 26px;
  &::-webkit-scrollbar {
    width: 20px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 17px;
    border: 2px solid var(--line-black);
    background-color: #8f9ef2;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    border: 5px solid transparent;
    background-clip: content-box;
    background-color: rgba(176, 180, 204, 0.5);
  }
`;

const TabWrapper = styled.section`
  width: 100%;
  height: 1330px;
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
    <Wrapper>
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
    </Wrapper>
  );
};

export default ReviewSection;

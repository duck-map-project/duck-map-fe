import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import ReviewItem from '../../components/ReviewItem';
import { useGetReviewsQuery } from '../../redux/reviewApiSlice';
import { Review } from '../../types/eventService';
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
  max-height: 1330px;
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
  const { id } = useParams<{ id: string }>();
  const {
    data: ReveiwData,
    isLoading,
    isError,
    // error,
  } = useGetReviewsQuery({
    eventId: parseInt(id as string) as number,
    pageNumber: 0,
    pageSize: 10,
  });
  const [reviewInfo, setReviewInfo] = useState<Review[]>([]);

  useEffect(() => {
    if (ReveiwData) {
      setReviewInfo(ReveiwData.content);
    }
  }, [ReveiwData]);

  let content;

  if (reviewInfo.length !== 0) {
    content = reviewInfo.map((review) => (
      <ReviewItem key={review.id} review={review} />
    ));
  } else if (isLoading) {
    content = <div>리뷰 목록을 불러오는 중 입니다.</div>;
  } else if (isError) {
    content = <div>데이터를 불러오는데 실패했습니다.</div>;
  }

  return (
    <Wrapper>
      <TabWrapper>
        <ReviewWrapper>{content}</ReviewWrapper>
      </TabWrapper>
    </Wrapper>
  );
};

export default ReviewSection;

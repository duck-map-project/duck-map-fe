import { styled } from 'styled-components';

import { Review } from '../types/eventService';

import FixedRating from './FixedRating';

const ReviewWrapper = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 2px solid #1e232c;
  border-radius: 20px;
  background-color: #e6f8fe;
  padding: 22px 20px 18px 20px;
`;
const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border: 1.4px solid #1e232c;
  border-radius: 50%;
  margin-right: 14px;
  flex-shrink: 0;
`;

const TopSection = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  & > :last-child {
    margin-left: auto;
  }
`;

const MiddleSection = styled.section`
  display: flex;
  gap: 13px;
`;

const ReviewInfoText = styled.span`
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.248;
  padding: 8px 16.5px;
  border: 1.4px solid #1e232c;
  border-radius: 20px;
  background-color: var(--bg2);
`;

const ReviewContentSection = styled.section`
  width: 100%;
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 1.277777777777778;
  border: 1.4px solid #1e232c;
  border-radius: 20px;
  background-color: #fafdf6;
  padding: 41.5px 13px;
`;

const ReviewContext = styled.p`
  width: 100%;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
`;

const ReviewPhoto = styled.img`
  width: 313px;
  height: 292px;
  border: 1.4px solid #1e232c;
  border-radius: 20px;
`;
interface ReviewItemProps {
  review: Review;
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  return (
    <ReviewWrapper>
      <TopSection>
        <ProfileImg alt="사용자 프로필" src={baseUrl + review.userProfile} />
        <ReviewInfoText>{review.username}</ReviewInfoText>
        <FixedRating
          score={review.score}
          size="reviewItem"
          className="reviewitem"
        />
      </TopSection>
      <MiddleSection>
        <ReviewContentSection>
          <ReviewContext>{review.content}</ReviewContext>
        </ReviewContentSection>
        <ReviewPhoto src={baseUrl + review.reviewImage} alt="카페 리뷰 사진" />
      </MiddleSection>
    </ReviewWrapper>
  );
};

export default ReviewItem;

import { styled } from 'styled-components';

import FixedRating from './FixedRating';

const ReviewWrapper = styled.li`
  width: 100%;
  max-width: 1042px;
  height: 204px;
  display: flex;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
`;
const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 20px;
  flex-shrink: 0;
`;

const MiddleSection = styled.section``;

const ReviewInfoText = styled.span`
  font-size: 1.4rem;
  &:nth-child(2) {
    margin-right: 58px;
  }
`;

const ReviewContents = styled.p`
  width: 100%;
  max-width: 721px;
  font-size: 1.4rem;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  margin-top: 5px;
  margin-right: 49px;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
`;

const ReviewPhoto = styled.img`
  width: 200px;
  height: 200px;
`;

interface MyReviewProps {
  profileImage: string;
  score: number;
  userName: string;
  reviewDate: string;
  ReviewContents: string;
  reviewPhoto: string;
  withAuth: boolean;
}

const ReviewItem = (item: MyReviewProps) => {
  return (
    <ReviewWrapper>
      <ProfileImg alt="사용자 프로필" src={item.profileImage} />
      <MiddleSection>
        <FixedRating score={item.score} />
        <ReviewInfoText>{item.userName}</ReviewInfoText>
        <ReviewInfoText>{item.reviewDate}</ReviewInfoText>
        <ReviewContents>{item.ReviewContents}</ReviewContents>
      </MiddleSection>
      <ReviewPhoto src={item.reviewPhoto} alt="카페 리뷰 사진" />
    </ReviewWrapper>
  );
};

export default ReviewItem;

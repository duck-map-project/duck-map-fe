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

const ReviewItem = () => {
  return (
    <ReviewWrapper>
      <ProfileImg
        alt="사용자 프로필"
        src="https://i.pinimg.com/736x/07/67/a9/0767a97903445549adcb066bb9ee74e3.jpg"
      />
      <MiddleSection>
        <FixedRating score={3.5} />
        <ReviewInfoText>username</ReviewInfoText>
        <ReviewInfoText>2023.05.25</ReviewInfoText>
        <ReviewContents>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of
          the printing and typesetting industry. Lorem Ipsum has been the
          industrys standard dummy text ever since the 1500s, when an unknown
          printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum
        </ReviewContents>
      </MiddleSection>
      <ReviewPhoto
        src="https://images.unsplash.com/photo-1481833761820-0509d3217039?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        alt="카페 리뷰 사진"
      />
    </ReviewWrapper>
  );
};

export default ReviewItem;

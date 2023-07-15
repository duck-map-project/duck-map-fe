import { styled } from 'styled-components';

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

const ReviewItem = () => {
  return (
    <ReviewWrapper>
      <TopSection>
        <ProfileImg
          alt="사용자 프로필"
          src="https://i.pinimg.com/736x/07/67/a9/0767a97903445549adcb066bb9ee74e3.jpg"
        />
        <ReviewInfoText>username</ReviewInfoText>
        <FixedRating score={3.5} size="reviewItem" />
      </TopSection>
      <MiddleSection>
        <ReviewContentSection>
          <ReviewContext>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industrys standard dummy text ever since the 1500s, when an
            unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum
          </ReviewContext>
        </ReviewContentSection>
        <ReviewPhoto
          src="https://images.unsplash.com/photo-1481833761820-0509d3217039?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          alt="카페 리뷰 사진"
        />
      </MiddleSection>
    </ReviewWrapper>
  );
};

export default ReviewItem;

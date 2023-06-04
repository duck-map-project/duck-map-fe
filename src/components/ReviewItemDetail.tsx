import { styled } from 'styled-components';

import FixedRating from './FixedRating';

interface ReviewItemDetailProps {
  image: string;
  username: string;
  reviewdate: string;
  reviewtext: string;
}

const ReviewItemDetail = styled.div`
  width: 100%;
  max-width: 1042px;
  display: flex;
  flex-direction: column;
`;

const UserSection = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const ImageBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
`;

const ProfileImage = styled.img`
  width: 100%;
  margin-right: 11px;
`;

const InfoBox = styled.div``;

const UserName = styled.p``;

const ReviewDate = styled.p``;

const ReviewSection = styled.section``;

const ReviewText = styled.p`
  width: 100%;
`;

const ReviewItem = ({
  image,
  username,
  reviewdate,
  reviewtext,
}: ReviewItemDetailProps) => {
  return (
    <ReviewItemDetail>
      <UserSection>
        <ImageBox>
          <ProfileImage src={image} alt="image" />
        </ImageBox>
        <InfoBox>
          <UserName>{username}</UserName>
          <ReviewDate>{reviewdate}</ReviewDate>
          <FixedRating score={3.5} />
        </InfoBox>
      </UserSection>
      <ReviewSection>
        <ReviewText>{reviewtext}</ReviewText>
      </ReviewSection>
    </ReviewItemDetail>
  );
};

export default ReviewItem;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import defaultImage from '../../assets/user-profile.svg';
import FixedRating from '../../components/FixedRating';
import SketchbookLayout from '../../components/SketchbookLayout';
import { useRouter } from '../../hooks/useRouter';
import { useGetReviewByIdQuery } from '../../redux/reviewApiSlice';
import { ReviewById } from '../../types/reviewServie';
import ImageSlider from '../DetailInfoPage/ImageSlider';

import * as S from './ReviewDetailStyle';

function ReviewDetail() {
  const { id } = useParams<{ id: string }>();
  const { routeTo } = useRouter();
  const [review, setReview] = useState<ReviewById | null>(null);
  const { data: reviewData } = useGetReviewByIdQuery(id as string);
  const baseUrl = process.env.REACT_APP_BASE_URL || '';
  const hashTags = review?.hashtag.split(' ');
  const images = review?.photos.map((photo) => baseUrl + photo);
  console.log(images);

  useEffect(() => {
    if (reviewData) {
      setReview(reviewData);
    }
  }, [reviewData]);

  if (review && images && hashTags) {
    return (
      <SketchbookLayout flex="row">
        <S.LeftSection>
          <S.ImageSection>
            <ImageSlider images={images} type="review" />
            <FixedRating score={review.score} className="reveiw-detail" />
          </S.ImageSection>
          <S.GoToEventButton
            type="button"
            onClick={() => routeTo(`/event/${review?.eventId}`)}
          >
            <S.ButtonContent>이벤트 바로가기</S.ButtonContent>
          </S.GoToEventButton>
        </S.LeftSection>
        <S.RightSection>
          <S.InfoSection>
            <S.UserProfile src={baseUrl + review.userProfile || defaultImage} />
            <S.UserText>{review.username}</S.UserText>
            <S.StoreName>{review.eventStoreName}</S.StoreName>
          </S.InfoSection>
          <S.HashTagSection>
            {hashTags.map((hasTag, i) => (
              <S.HashTag key={i}>{hasTag}</S.HashTag>
            ))}
          </S.HashTagSection>
          <S.ReviewText>{review.content}</S.ReviewText>
        </S.RightSection>
      </SketchbookLayout>
    );
  } else {
    return (
      <SketchbookLayout flex="row">
        <div> 이런! 리뷰를 불러오는데 실패했습니다...</div>
      </SketchbookLayout>
    );
  }
}

export default ReviewDetail;

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import defaultImage from '../../assets/user-profile.svg';
import FixedRating from '../../components/FixedRating';
import SketchbookLayout from '../../components/SketchbookLayout';
import { useGetReviewByIdQuery } from '../../features/reviews/services/reviewApiSlice';
import useCalcItemWidth from '../../hooks/useCalcItemWidth';
import { useRouter } from '../../hooks/useRouter';
import { ReviewById } from '../../types/reviewServie';
import ImageSlider from '../DetailInfo/ImageSlider';

import HashTagLIst from './HashTagLIst';
import * as S from './ReviewDetailStyle';
import WriterInfo from './WriterInfo';

function ReviewDetail() {
  const { id } = useParams<{ id: string }>();
  const { routeTo } = useRouter();
  const [review, setReview] = useState<ReviewById | null>(null);
  const { data: reviewData } = useGetReviewByIdQuery(id as string);
  const baseUrl = process.env.REACT_APP_BASE_URL || '';
  const hashTags = review?.hashtag.split(' ');
  const images = review?.photos.map((photo) => baseUrl + photo);
  const primaryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reviewData) {
      setReview(reviewData);
    }
  }, [reviewData]);

  const itemWidth = useCalcItemWidth(primaryRef);
  const pageWidth = useCalcItemWidth(containerRef);

  if (review && images && hashTags) {
    return (
      <SketchbookLayout flex="row" containerRef={containerRef}>
        <S.LeftSection>
          {pageWidth <= 430 && (
            <>
              <WriterInfo
                src={baseUrl + review.userProfile || defaultImage}
                userName={review.username}
                eventStoreName={review.eventStoreName}
              />
              <HashTagLIst hashTags={hashTags} />
            </>
          )}
          <S.ImageSection>
            <ImageSlider
              images={images}
              type="review"
              itemWidth={itemWidth}
              primaryRef={primaryRef}
            />
            {/* ?? 클래스 네임 왜 있는거임? */}
            <FixedRating score={review.score} className="reveiw-detail" />
            <S.LeftHeart />
            <S.RightHeart />
            <S.CircleSticker />
          </S.ImageSection>
          {pageWidth > 430 && (
            <S.GoToEventButton
              type="button"
              onClick={() => routeTo(`/event/${review?.eventId}`)}
            >
              <S.ButtonContent>이벤트 바로가기</S.ButtonContent>
            </S.GoToEventButton>
          )}
        </S.LeftSection>
        <S.RightSection>
          {pageWidth > 430 && (
            <>
              <WriterInfo
                src={baseUrl + review.userProfile || defaultImage}
                userName={review.username}
                eventStoreName={review.eventStoreName}
              />
              <HashTagLIst hashTags={hashTags} />
            </>
          )}
          <S.ReviewSection>
            <S.ReviewText>{review.content}</S.ReviewText>
          </S.ReviewSection>
          {pageWidth <= 430 && (
            <S.GoToEventButton
              type="button"
              onClick={() => routeTo(`/event/${review?.eventId}`)}
            >
              <S.ButtonContent>이벤트 바로가기</S.ButtonContent>
            </S.GoToEventButton>
          )}
        </S.RightSection>
      </SketchbookLayout>
    );
  } else {
    return (
      <SketchbookLayout flex="row" containerRef={containerRef}>
        <div> 이런! 리뷰를 불러오는데 실패했습니다...</div>
      </SketchbookLayout>
    );
  }
}

export default ReviewDetail;

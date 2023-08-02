import { useState, useEffect } from 'react';

import Rating from '../../components/Rating';

import * as S from './EditReviewStyle';

const EditReview = () => {
  const [rating, setRating] = useState<number>(0);
  const [numRings, setNumRings] = useState<number>(0);

  useEffect(() => {
    const calculateNumRings = () => {
      const contentBoxWidth =
        document.querySelector('#content-box')?.clientWidth || 0;
      const ringsWidth = 79;
      const ringsSpacing = 70;
      const maxNumRings = 7;
      const calculatedNumRings = Math.floor(
        (contentBoxWidth - ringsSpacing) / (ringsWidth + ringsSpacing)
      );
      setNumRings(Math.min(maxNumRings, calculatedNumRings));
    };

    calculateNumRings();

    window.addEventListener('resize', calculateNumRings);

    return () => {
      window.removeEventListener('resize', calculateNumRings);
    };
  }, []);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const ringsArray = new Array(numRings).fill(0);

  return (
    <S.PageWrapper>
      <S.RingsWrapper>
        {ringsArray.map((_, index) => (
          <S.Rings key={index} />
        ))}
      </S.RingsWrapper>
      <S.ContentBox id="content-box">
        <S.TopSection>
          <S.AddImageSection>
            <S.CurrentPreview currentImage={null} />
            <S.ImageInputLabel>사진 추가</S.ImageInputLabel>
          </S.AddImageSection>
          <S.PreviewImageBox>
            <S.PreviewImageSection>
              <S.SelectedImage selectedImage="" />
            </S.PreviewImageSection>
            <S.ButtonWraaper>
              <S.SmallButton>평점 주기</S.SmallButton>
              <Rating initialRating={rating} onChange={handleRatingChange} />
            </S.ButtonWraaper>
          </S.PreviewImageBox>
        </S.TopSection>
        <S.TextSection />
        <div>
          <S.SubmitButton>작성 완료</S.SubmitButton>
          <S.CancelButton>취소</S.CancelButton>
        </div>
      </S.ContentBox>
    </S.PageWrapper>
  );
};

export default EditReview;

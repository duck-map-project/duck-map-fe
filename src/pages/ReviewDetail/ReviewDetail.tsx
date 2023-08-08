import FixedRating from '../../components/FixedRating';
import SketchbookLayout from '../../components/SketchbookLayout';
import ImageSlider from '../DetailInfoPage/ImageSlider';

import * as S from './ReviewDetailStyle';

function ReviewDetail() {
  return (
    <SketchbookLayout flex="row">
      <S.LeftSection>
        <S.ImageSection>
          <ImageSlider images={['a', 'b', 'c']} type="review" />
          <FixedRating score={5} className="reveiw-detail" />
        </S.ImageSection>
        <S.GoToEventButton>
          <S.ButtonContent>이벤트 바로가기</S.ButtonContent>
        </S.GoToEventButton>
      </S.LeftSection>
      <S.RightSection>
        <S.InfoSection>
          <S.UserProfile />
          <S.UserText>사용자 이름 </S.UserText>
          <S.StoreName>상호명</S.StoreName>
        </S.InfoSection>
        <S.HashTagSection>
          <S.HashTag>해시태그</S.HashTag>
        </S.HashTagSection>
        <S.ReviewText>
          리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰
          내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰
          내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰
          내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰
          내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰
          내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰
          내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰
          내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰
          내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰
          내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용
        </S.ReviewText>
      </S.RightSection>
    </SketchbookLayout>
  );
}

export default ReviewDetail;

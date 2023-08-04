import ReviewRating from '../../components/ReviewRating';

import {
  Category,
  ReviewImgWrapper,
  ReviewItemWrapper,
  ReviewImg,
  ArtistsWrapper,
  ArtistName,
  NumberOfAritsts,
  CategoryWrapper,
  RatingWrapper,

} from './ReviewItemStyle';

type ReviewItemProps = {
  id: number;
  artistName: string[];
  score: number;
  reviewImage: string;
  categories: string[];
};

const ReviewItem = ({
  id,
  artistName,
  score,
  reviewImage,
  categories,
}: ReviewItemProps) => {
  // const { routeTo } = useRouter();

  const onClickReviewItem = () => {
    // routeTo(`/reviews/${id}`);
    alert(`${id}상세 리뷰 이동`);
  };

  const categoryContent = categories.map((category) => (
    <Category key={Math.random()}>#{category}</Category>
  ));

  const isAlone = artistName.length > 1 ? false : true;

  return (
    <ReviewItemWrapper onClick={onClickReviewItem}>
      <ReviewImgWrapper>
        <ReviewImg src={reviewImage} />
      </ReviewImgWrapper>
      <ArtistsWrapper>
        <ArtistName>{artistName[0]}</ArtistName>
        <NumberOfAritsts>
          {isAlone ? '' : `외 ${artistName.length}명`}
        </NumberOfAritsts>
      </ArtistsWrapper>
      <CategoryWrapper>{categoryContent}</CategoryWrapper>
      <RatingWrapper>
        <ReviewRating score={score} className="reviewScore" />
      </RatingWrapper>
    </ReviewItemWrapper>
  );
};

export default ReviewItem;

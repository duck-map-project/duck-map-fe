import { styled } from 'styled-components';

import emptyStar from '../assets/star-empty.svg';
import filledStar from '../assets/star-filled.svg';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FixedRatingStyle = styled.div<{
  score: number;
  $size?: 'primary' | 'reviewItem';
}>`
  background-image: url(${emptyStar});
  background-repeat: repeat-x;
  position: relative;
  width: 125px;
  height: 23px;
  background-size: 25px 23px;

  &::before {
    display: block;
    content: '';
    background-image: url(${filledStar});
    background-repeat: repeat-x;
    width: 125px;
    height: 23px;
    background-size: 25px 23px;
    width: ${({ score }) => `${(score / 5) * 100}%`};
    position: absolute;
  }
`;

interface FixedRatingProps {
  score: number;
  marginB?: string;
  size?: 'primary' | 'reviewItem';
  className: string;
}

const ReviewRating = ({ score, size, className }: FixedRatingProps) => {
  return (
    <Wrapper className={className}>
      <FixedRatingStyle score={score} $size={size} />
    </Wrapper>
  );
};

export default ReviewRating;

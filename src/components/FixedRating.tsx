import { styled } from 'styled-components';

import emptyStar from '../assets/all-empty-star.svg';
import filledStar from '../assets/all-filled-star.svg';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const FixedRatingStyle = styled.div<{ score: number }>`
  width: 196px;
  height: 36px;
  background-image: url(${emptyStar});
  background-repeat: no-repeat;
  margin-right: 10px;
  &::before {
    display: block;
    content: '';
    background-image: url(${filledStar});
    background-repeat: no-repeat;

    width: ${({ score }) => `${(score / 5) * 100}%`};
    height: 36px;
  }
`;

const RatingNum = styled.span`
  font-size: 1.4rem;
`;

const FixedRating = ({ score }: { score: number }) => {
  return (
    <Wrapper>
      <FixedRatingStyle score={score} />
      <RatingNum>{score}</RatingNum>
    </Wrapper>
  );
};

export default FixedRating;

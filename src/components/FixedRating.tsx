import { css, styled } from 'styled-components';

import emptyStar from '../assets/star-empty.svg';
import filledStar from '../assets/star-filled.svg';
import media from '../utils/mediaQuery';

const Wrapper = styled.div<{
  $marginB?: string;
  $size?: 'primary' | 'reviewItem' | 'reviewItemMobile';
}>`
  display: flex;
  align-items: center;
  ${(props) =>
    props.$size === 'reviewItem' ? reviewItemWrapper : primaryWrapper}
  margin-bottom: ${(props) => (props.$marginB ? props.$marginB : '')};
`;

const primaryWrapper = css`
  padding: 7.5px 27px;
  background-color: #ffebf4;
  border: 2px solid #1e232c;
  border-radius: 30px;
`;

const reviewItemWrapper = css`
  width: 138px;
  padding: 4px 11.5px;
  background-color: #fffcedfa;
  border: 2px solid #1e232c;
  border-radius: 20px;
  ${media.mobile`
    width: 92px;
    padding: 0 8.2px;
  `}
`;

const primaryRatingStyle = css`
  width: 125px;
  height: 23px;
  background-size: 25px 23px;
`;

const reviewItemRatingStyle = css`
  width: 110px;
  height: 22px;
  background-size: 22px 22px;
  ${media.mobile`
  background-size: 14.5px 20px;
  `}
`;

const FixedRatingStyle = styled.div<{
  score: number;
  $size?: 'primary' | 'reviewItem';
}>`
  background-image: url(${emptyStar});
  background-repeat: repeat-x;
  position: relative;
  ${(props) =>
    props.$size === 'reviewItem' ? reviewItemRatingStyle : primaryRatingStyle}

  &::before {
    display: block;
    content: '';
    background-image: url(${filledStar});
    background-repeat: repeat-x;
    ${(props) =>
      props.$size === 'reviewItem' ? reviewItemRatingStyle : primaryRatingStyle}
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

const FixedRating = ({ score, marginB, size, className }: FixedRatingProps) => {
  return (
    <Wrapper $marginB={marginB} $size={size} className={className}>
      <FixedRatingStyle score={score} $size={size} />
    </Wrapper>
  );
};

export default FixedRating;

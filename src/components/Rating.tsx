import React, { useState } from 'react';
import { styled } from 'styled-components';

import emptyStar from '../assets/star-empty.svg';
import filledStar from '../assets/star-filled.svg';

interface RatingProps {
  initialRating: number;
  onChange: (newRating: number) => void;
}

const RatingBox = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  width: 174px;
  height: 40px;
  text-align: center;
  background-color: #ffebf4;
  border: 2px solid #1e232c;
  border-radius: 30px;
`;

const Star = styled.div<{ starUrl: string }>`
  width: 25px;
  height: 23px;
  background-image: url(${(props) => props.starUrl});
  background-size: cover;
  background-position: center;
`;

const Rating: React.FC<RatingProps> = ({ initialRating, onChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleStarClick = (clickedRating: number) => {
    if (onChange) {
      onChange(clickedRating);
    }
    setRating(clickedRating);
  };

  const handleMouseEnter = (index: number) => {
    setRating(index);
  };

  const handleMouseLeave = () => {
    setRating(initialRating);
  };

  return (
    <RatingBox>
      {[1, 2, 3, 4, 5].map((index) => (
        <Star
          key={index}
          starUrl={rating >= index ? filledStar : emptyStar}
          onClick={() => handleStarClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave()}
        />
      ))}
    </RatingBox>
  );
};

export default Rating;

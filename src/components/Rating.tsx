import { useState } from 'react';
import { styled } from 'styled-components';

import lightStar from '../assets/light-star.svg';
import emptyStar from '../assets/star-empty.svg';
import star from '../assets/star-filled.svg';

const Wrapper = styled.fieldset`
  float: left;
  & > input:checked ~ label,
  &:not(:checked) > label:hover,
  &:not(:checked) > label:hover ~ label {
    background-image: url(${star});
  }
  & > input:checked ~ label:hover ~ label {
    background-image: url(${lightStar});
  }
`;

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  width: 15px;
  height: 28.5px;
  float: right;
  background-image: url(${emptyStar});
  background-size: cover;
  background-position: right 0;
`;

const HalfLabel = styled.label`
  width: 15px;
  height: 28.5px;
  float: right;
  background-image: url(${emptyStar});
  background-size: cover;
`;

const Rating = () => {
  const [score, setScore] = useState('0');

  const handleClickStar: React.MouseEventHandler<HTMLFieldSetElement> = (e) => {
    const currentValue = (e.target as HTMLInputElement).value;
    setScore(currentValue);
    return score;
  };

  return (
    <Wrapper onClick={handleClickStar}>
      <Input type="radio" id="star5" name="rating" value="5" />
      <Label htmlFor="star5" />
      <Input type="radio" id="star4half" name="rating" value="4.5" />
      <HalfLabel htmlFor="star4half" />
      <Input type="radio" id="star4" name="rating" value="4" />
      <Label htmlFor="star4" />
      <Input type="radio" id="star3half" name="rating" value="3.5" />
      <HalfLabel htmlFor="star3half" />
      <Input type="radio" id="star3" name="rating" value="3" />
      <Label htmlFor="star3" />
      <Input type="radio" id="star2half" name="rating" value="2.5" />
      <HalfLabel htmlFor="star2half" />
      <Input type="radio" id="star2" name="rating" value="2" />
      <Label htmlFor="star2" />
      <Input type="radio" id="star1half" name="rating" value="1.5" />
      <HalfLabel htmlFor="star1half" />
      <Input type="radio" id="star1" name="rating" value="1" />
      <Label htmlFor="star1" />
      <Input type="radio" id="starhalf" name="rating" value="0.5" />
      <HalfLabel htmlFor="starhalf" />
    </Wrapper>
  );
};

export default Rating;

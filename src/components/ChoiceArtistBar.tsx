import { styled } from 'styled-components';

import artistArrow from '../assets/artist-arrow.svg';
import artistHeart from '../assets/artist-heart.svg';
import tongs from '../assets/tongs.svg';

const Bar = styled.section`
  width: 100%;
  height: 138px;
  display: flex;
  align-items: center;
  background-color: #ffe7f4;
  border: 2px solid #1e232c;
  border-radius: 225px;
  box-shadow: 6px 6px 0px 0px #00000040;
  padding-left: 22px;
  position: relative;
  &::after {
    content: '';
    width: 50px;
    height: 43px;
    background-image: url(${tongs});
    position: absolute;
    top: -26px;
    left: 48.44%;
  }
`;

const OpenModalButton = styled.button`
  width: 98px;
  height: 98px;
  border: 2px solid #1e232c;
  border-radius: 50%;
  background-color: var(--white);
  background-image: url(${artistHeart});
  background-size: 50px;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  margin-right: 25px;
  flex-shrink: 0;
`;

const StarList = styled.ul`
  width: 100%;
  height: 100%;
  background-color: #fffbe2;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  padding: 0 35px;
  gap: 12px;
  &::before {
    content: '';
    display: block;
    width: 7px;
    height: 134px;
    background-color: #ffa9dd;
    border: 2px solid #1e232c;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const StarItem = styled.li`
  width: 76px;
  height: 76px;
  border-radius: 50%;
  border: 2px solid #1e232c;
  background-color: var(--white);
  flex-shrink: 0;
`;

const NextSection = styled.section`
  width: 63px;
  height: 100%;
  flex-shrink: 0;
  border-left: 2px solid #1e232c;
  position: relative;
`;

const NextButton = styled.button`
  width: 16px;
  height: 28px;
  background-image: url(${artistArrow});
  position: absolute;
  top: 50%;
  left: 26px;
  transform: translateY(-50%);
`;

const ChoiceArtistBar = () => {
  return (
    <Bar>
      <OpenModalButton type="button" />
      <StarList>
        <StarItem />
        <StarItem />
        <StarItem />
        <StarItem />
        <StarItem />
      </StarList>
      <NextSection>
        <NextButton />
      </NextSection>
    </Bar>
  );
};

export default ChoiceArtistBar;

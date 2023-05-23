import { useState } from 'react';
import { styled } from 'styled-components';

import arrowDown from '../assets/dropdown-arrow-down.svg';
import arrowUp from '../assets/dropdown-arrow-up.svg';

import Dropdown from './Dropdown';

const Wrapper = styled.div`
  position: relative;
  margin-right: 10px;
`;

const Select = styled.button<{ clicked: boolean }>`
  width: 180px;
  height: 50px;
  font-size: 1.6rem;
  border: 1px solid var(--purple);
  border-radius: 5px;
  background-image: ${({ clicked }) =>
    clicked ? `url(${arrowUp})` : `url(${arrowDown})`};
  background-repeat: no-repeat;
  background-position: right 30px center;
`;

const SortDropdown = () => {
  const [clicked, setClicked] = useState(false);
  const sortOption = ['인기순', '리뷰많은순'];
  const [SelectedText, setSelectedText] = useState(sortOption[0]);

  const handleClick = () => {
    if (clicked) {
      setClicked(false);
    } else {
      setClicked(true);
    }
  };
  return (
    <Wrapper>
      <Select clicked={clicked} onClick={handleClick}>
        {SelectedText}
      </Select>
      {clicked ? (
        <Dropdown
          lists={sortOption}
          setSelectedText={setSelectedText}
          setClicked={setClicked}
        />
      ) : null}
    </Wrapper>
  );
};

export default SortDropdown;

import React, { useState } from 'react';
import { styled } from 'styled-components';

import arrow from '../assets/sort-arrow.svg';
import sortIcon from '../assets/sort-book.svg';

import Dropdown from './Dropdown';

const Wrapper = styled.div`
  position: absolute;
  margin-right: 10px;
  top: 42px;
  right: 39px;
`;

const Select = styled.button<{ $clicked: boolean }>`
  width: 157px;
  height: 36px;
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.247777777777778;
  border: 2px solid #1e232c;
  border-radius: 20px;
  background-color: var(--yellow);
  background-image: url(${sortIcon});
  background-repeat: no-repeat;
  background-position: 14.5px center;
  padding-left: 6px;
  position: relative;
  &::after {
    content: '';
    background-image: url(${arrow});
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    width: 8px;
    height: 100%;
    top: 0;
    right: 13.5px;
    transform: scaleY(${(props) => (props.$clicked ? -1 : 1)});
  }
`;

interface SortDropdownProps {
  clicked: boolean;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  sortButtonRef: React.RefObject<HTMLButtonElement>;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  clicked,
  setClicked,
  sortButtonRef,
}) => {
  const sortOption = ['인기순', '리뷰순'];
  const [SelectedText, setSelectedText] = useState('Event List');

  const handleClick = () => {
    if (clicked) {
      setClicked(false);
    } else {
      setClicked(true);
    }
  };
  return (
    <Wrapper>
      <Select $clicked={clicked} onClick={handleClick} ref={sortButtonRef}>
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

import React from 'react';
import { styled } from 'styled-components';

import arrow from '../assets/sort-arrow.svg';
import sortIcon from '../assets/sort-book.svg';

import Dropdown from './Dropdown';

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

export interface SortDropdownProps {
  className: string;
  clicked: boolean;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  sortButtonRef: React.RefObject<HTMLButtonElement>;
  sortOption: string[];
  selectedText: string;
  setSelectedText: React.Dispatch<React.SetStateAction<string>>;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  className,
  clicked,
  setClicked,
  sortButtonRef,
  sortOption,
  selectedText,
  setSelectedText,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (clicked) {
      setClicked(false);
    } else {
      setClicked(true);
    }
  };
  return (
    <div className={className}>
      <Select $clicked={clicked} onClick={handleClick} ref={sortButtonRef}>
        {selectedText}
      </Select>
      {clicked ? (
        <Dropdown
          lists={sortOption}
          setSelectedText={setSelectedText}
          setClicked={setClicked}
        />
      ) : null}
    </div>
  );
};

export default SortDropdown;

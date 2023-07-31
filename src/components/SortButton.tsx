import React from 'react';
import { styled } from 'styled-components';

import arrow from '../assets/sort-arrow.svg';

import Dropdown from './Dropdown';
import { sortOptionsType } from './modals/ArtistModal';

const Select = styled.button<{ $clicked: boolean; icon?: string }>`
  position: relative;
  min-width: 131px;
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.247777777777778;
  border: 2px solid #1e232c;
  border-radius: 30px;
  background-color: var(--yellow);
  text-align: center;
  ${(props) =>
    props.icon
      ? `
    min-width: 160px;
    padding: 10px 30px 10px 40px;
    background-image: url(${props.icon});
    background-repeat: no-repeat;
    background-position: 14.5px 10px;
  `
      : `
      padding: 10px 20px 10px 10px;
      `}
  &::after {
    content: '';
    background-image: url(${arrow});
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    width: 10px;
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
  sortOptions: sortOptionsType[];
  selectedText: string | null;
  setSelectedText: React.Dispatch<React.SetStateAction<string | null>>;
  setId: React.Dispatch<React.SetStateAction<number | null>>;
  icon?: string;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  className,
  clicked,
  setClicked,
  sortButtonRef,
  sortOptions,
  selectedText,
  setSelectedText,
  setId,
  icon,
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
      <Select
        $clicked={clicked}
        onClick={handleClick}
        icon={icon}
        ref={sortButtonRef}
      >
        {selectedText}
      </Select>
      {clicked ? (
        <Dropdown
          lists={sortOptions}
          setSelectedText={setSelectedText}
          setClicked={setClicked}
          setId={setId}
          icon={icon}
        />
      ) : null}
    </div>
  );
};

export default SortDropdown;

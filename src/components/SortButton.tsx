import React from 'react';
import { styled } from 'styled-components';

import arrow from '../assets/sort-arrow.svg';
import media from '../utils/mediaQuery';

import Dropdown from './Dropdown';
import { sortOptionsType } from './modals/ArtistModal';

const SelectWrapper = styled.div`
  position: relative;
`;

const Select = styled.button<{
  $clicked: boolean;
  icon?: string;
  size?: 'manage';
}>`
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

  ${(props) =>
    props.icon &&
    props.size === 'manage' &&
    media.mobile`
    min-width: 40px;
    top: -2px;
    border: 1.4px solid #1e232c;
    background-position: 11px 0px;
    background-size : 17px 20px;
    padding: 10px;
    box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.25);
    &::after{
      background-image: none;
    }
  `}
`;

export interface SortDropdownProps {
  className: string;
  clicked: boolean;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  sortButtonRef: React.RefObject<HTMLButtonElement>;
  sortOptions: sortOptionsType[];
  selectedText?: string | null;
  setSelectedText?: React.Dispatch<React.SetStateAction<string | null>>;
  setId: React.Dispatch<React.SetStateAction<number | null>>;
  icon?: string;
  size?: 'manage';
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
  size,
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
    <SelectWrapper className={className}>
      <Select
        $clicked={clicked}
        onClick={handleClick}
        icon={icon}
        size={size}
        ref={sortButtonRef}
      >
        {selectedText && selectedText}
      </Select>
      {clicked ? (
        <Dropdown
          lists={sortOptions}
          setSelectedText={setSelectedText}
          setClicked={setClicked}
          setId={setId}
          icon={icon}
          size={size}
        />
      ) : null}
    </SelectWrapper>
  );
};

export default SortDropdown;

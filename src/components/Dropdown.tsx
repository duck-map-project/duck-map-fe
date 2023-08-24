import { styled } from 'styled-components';

import media from '../utils/mediaQuery';

import { sortOptionsType } from './modals/ArtistModal';

type dropdowonProps = {
  icon?: string | undefined;
  size?: 'manage';
};
const Wrapper = styled.ul<dropdowonProps>`
  position: absolute;
  top: 120%;
  min-width: 104px;
  max-height: 180px;
  border-radius: 20px;
  border: 2px solid #1e232c;
  background-color: var(--yellow);
  z-index: 999;
  overflow-y: scroll;
  text-align: center;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    position: relative;
    background-color: #8f9ef2;
    border: 2px solid var(--line-black);
    border-radius: 17.7px;
  }
  ${(props) =>
    props.icon
      ? `
  min-width: 160px;
  padding-left: 10px;
  `
      : ``}
  ${(props) =>
    props.size === 'manage' &&
    media.mobile`
    left: -50%;
    transform: translateX(-25%);
    border: 1.4px solid #1e232c;
  `}
`;

const Item = styled.li`
  position: relative;
  min-width: 104px;
  width: 100%;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.247777777777778;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    &::after {
      display: block;
      content: '';
      width: 40px;
      height: 7px;
      background-color: #f5f18e;
      opacity: 0.5;
      position: absolute;
      top: 24px;
      left: 50px;
      border-radius: 10px;
    }
  }
  ${media.mobile`
    font-size: 14px;
    padding: 5px 10px;
    &:hover {
      &::after{
      width: 50px;
      background-color: #FFD0EC;
      top: 15px;
      left:45%;
      opacity: 0.6;
      }
    }
  `}
`;

interface DropdownProps {
  lists: sortOptionsType[];
  setSelectedText?: React.Dispatch<React.SetStateAction<string | null>>;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number | null>>;
  icon: string | undefined;
  size?: 'manage';
}

const Dropdown: React.FC<DropdownProps> = ({
  lists,
  setSelectedText,
  setClicked,
  setId,
  icon,
  size,
}) => {
  const handleListClick = (list: string, id: number) => {
    setSelectedText && setSelectedText(list);
    setClicked(false);
    setId(id);
  };

  return (
    <Wrapper icon={icon} size={size}>
      {lists.map((list, i) => (
        <Item
          key={i}
          value={list.id}
          onClick={() => {
            handleListClick(list.sort, list.id);
          }}
        >
          {list.sort}
        </Item>
      ))}
    </Wrapper>
  );
};

export default Dropdown;

import { styled } from 'styled-components';

import media from '../utils/mediaQuery';

import { sortOptionsType } from './modals/ArtistModal';

type dropdowonProps = {
  icon?: string | undefined;
  size?: 'manage';
};

const StyledDiv = styled.div<dropdowonProps>`
  position: absolute;
  top: 120%;
  left: 0;
  min-width: 104px;
  max-width: 141px;
  padding: 10px;
  border-radius: 20px;
  border: 2px solid #1e232c;
  background-color: var(--yellow);
  z-index: 999;
  ${(props) =>
    props.icon
      ? `
    min-width: 160px;
    padding-left: 10px;
  `
      : ``}
  ${media.mobile`
    max-width: 111px;
    padding: 10px 5px;
    left: 50%;
    transform: translate(-50%,0);
  `}
`;

const Wrapper = styled.ul<dropdowonProps>`
  position: relative;
  min-width: 104px;
  width: 100%;
  max-height: 180px;
  background-color: var(--yellow);
  z-index: 999;
  overflow-y: scroll;
  text-align: center;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    position: relative;
    background-color: rgba(248, 248, 250, 0.4);
    border: 2px solid var(--line-black);
    border-radius: 17.7px;
  }

  ${media.mobile`
  min-width: 80px;
  &::-webkit-scrollbar {
    width: 5px;
  }
  `}
  ${(props) =>
    props.size === 'manage' &&
    media.mobile`
  `}
`;

const Item = styled.li`
  position: relative;
  width: 100%;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.247777777777778;
  padding: 8px;
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
  const handleListClick = (list: string, id: number, handler?: () => void) => {
    setSelectedText && setSelectedText(list);
    setClicked(false);
    setId(id);
    handler && handler();
  };

  return (
    <StyledDiv icon={icon}>
      <Wrapper icon={icon} size={size}>
        {lists.map((list, i) => (
          <Item
            key={i}
            value={list.id}
            onClick={() => {
              handleListClick(list.sort, list.id, list.handler);
            }}
          >
            {list.sort}
          </Item>
        ))}
      </Wrapper>
    </StyledDiv>
  );
};

export default Dropdown;

import { styled } from 'styled-components';

import { useAuthContext } from '../contexts/AuthContext';
import { useRouter } from '../hooks/useRouter';

import { sortOptionsType } from './modals/ArtistModal';

type dropdowonProps = {
  icon?: string | undefined;
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
`;

interface DropdownProps {
  lists: sortOptionsType[];
  setSelectedText?: React.Dispatch<React.SetStateAction<string | null>>;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number | null>>;
  icon: string | undefined;
}

const Dropdown: React.FC<DropdownProps> = ({
  lists,
  setSelectedText,
  setClicked,
  setId,
  icon,
}) => {
  const auth = useAuthContext();
  const { routeTo } = useRouter();

  const handleListClick = (list: string, id: number) => {
    switch (list) {
      case '로그아웃':
        auth?.signOut();
        setClicked(false);

        break;

      case '마이페이지':
        routeTo('/mypage');
        setClicked(false);

        break;
      default:
        setSelectedText && setSelectedText(list);
        setClicked(false);
        setId(id);
        break;
    }
  };

  return (
    <Wrapper icon={icon}>
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

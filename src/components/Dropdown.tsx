import { styled } from 'styled-components';

import { useAuthContext } from '../contexts/AuthContext';
import { useRouter } from '../hooks/useRouter';

const Wrapper = styled.ul`
  width: 178px;
  padding: 12px 0;
  border-radius: 5px;
  border: 1px solid var(--purple);
  position: absolute;
  top: 55px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--white);
  z-index: 999;
`;

const Item = styled.li`
  width: 100%;
  padding: 16px 0;
  text-align: center;
  &:hover {
    background-color: var(--purple);
  }
`;

interface DropdownProps {
  lists: string[];
  setSelectedText?: React.Dispatch<React.SetStateAction<string>>;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dropdown: React.FC<DropdownProps> = ({
  lists,
  setSelectedText,
  setClicked,
}) => {
  const auth = useAuthContext();
  const { routeTo } = useRouter();

  const handleListClick = (list: string) => {
    switch (list) {
      case '로그아웃':
        auth?.signOut();
        setClicked(false);

        break;

      case '마이페이지':
        routeTo('/mypage/bookmark');
        setClicked(false);

        break;
      default:
        setSelectedText && setSelectedText(list);
        setClicked(false);
        break;
    }
  };
  return (
    <Wrapper>
      {lists.map((list, i) => (
        <Item
          key={i}
          onClick={() => {
            handleListClick(list);
          }}
        >
          {list}
        </Item>
      ))}
    </Wrapper>
  );
};

export default Dropdown;

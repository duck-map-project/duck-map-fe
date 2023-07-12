import { styled } from 'styled-components';

import { useAuthContext } from '../contexts/AuthContext';
import { useRouter } from '../hooks/useRouter';

const Wrapper = styled.ul`
  position: absolute;
  top: 120%;
  width: 157px;
  border-radius: 20px;
  border: 2px solid #1e232c;
  background-color: var(--yellow);
  z-index: 999;
`;

const Item = styled.li`
  position: relative;
  width: 100%;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.247777777777778;
  padding: 10px;
  cursor: pointer;
  &:hover {
    &::after {
      display: block;
      content: '';
      width: 44px;
      height: 7px;
      background-color: #d1cf78;
      opacity: 0.5;
      position: absolute;
      top: 24px;
      left: 65px;
    }
  }
  &:not(:last-of-type) {
    &::before {
      content: '';
      width: 129px;
      height: 1px;
      background-color: #000;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%);
    }
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
        routeTo('/mypage');
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

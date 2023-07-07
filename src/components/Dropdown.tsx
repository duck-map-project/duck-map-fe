import { styled } from 'styled-components';

import { useAuthContext } from '../contexts/AuthContext';
import { useRouter } from '../hooks/useRouter';

const Wrapper = styled.ul`
  width: 157px;
  padding: 16px 0;
  border-radius: 20px;
  border: 2px solid #1e232c;
  position: absolute;
  top: 55px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--yellow);
  z-index: 999;
  &::after {
    content: '';
    width: 129px;
    height: 1px;
    background-color: #000;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
  }
`;

const Item = styled.li`
  width: 100%;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.247777777777778;
  padding-bottom: 10px;
  position: relative;
  cursor: pointer;
  &:last-child {
    padding-top: 16px;
    padding-bottom: 0;
    &:hover {
      &::after {
        content: '';
        width: 44px;
        height: 7px;
        background-color: #d1cf78;
        position: absolute;
        top: 32px;
        left: 65px;
        z-index: -10;
      }
    }
  }
  &:hover {
    &::after {
      content: '';
      width: 44px;
      height: 7px;
      background-color: #d1cf78;
      position: absolute;
      top: 16px;
      left: 65px;
      z-index: -10;
      &:last-child {
        top: 26px;
      }
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

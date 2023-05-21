import { styled } from 'styled-components';

const Wrapper = styled.ul`
  width: 178px;
  padding: 12px 0;
  border-radius: 5px;
  border: 1px solid var(--purple);
  position: absolute;
  top: 55px;
  left: 0;
  background-color: var(--white);
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
  return (
    <Wrapper>
      {lists.map((list, i) => (
        <Item
          key={i}
          onClick={() => {
            setSelectedText && setSelectedText(list);
            setClicked(false);
          }}
        >
          {list}
        </Item>
      ))}
    </Wrapper>
  );
};

export default Dropdown;

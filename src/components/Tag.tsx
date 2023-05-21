import { styled } from 'styled-components';

interface PropsType {
  marginB?: string;
}

const TagWrapper = styled.ul<PropsType>`
  display: flex;
  margin-bottom: ${(props) => (props.marginB ? props.marginB : '')};
`;

const TagItem = styled.li`
  padding: 5px 18px;
  background-color: var(--blue-purple);
  border-radius: 40px;
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
`;

const Tag: React.FC<PropsType> = ({ marginB }) => {
  return (
    <TagWrapper marginB={marginB}>
      {/* FIXME: 나중에 동적으로 TagItem 받아오기 */}
      <TagItem>광고</TagItem>
      <TagItem>전시</TagItem>
    </TagWrapper>
  );
};

export default Tag;

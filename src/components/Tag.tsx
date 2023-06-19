import { styled } from 'styled-components';

interface Categories {
  id: number;
  category: string;
}
interface PropsType {
  marginB?: string;
  categories: Categories[];
}

const TagWrapper = styled.ul<{ $marginB?: string }>`
  display: flex;
  margin-bottom: ${(props) => (props.$marginB ? props.$marginB : '')};
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

const Tag: React.FC<PropsType> = ({ marginB, categories }) => {
  return (
    <TagWrapper $marginB={marginB}>
      {categories.map((category) => (
        <TagItem key={category.id}>{category.category}</TagItem>
      ))}
    </TagWrapper>
  );
};

export default Tag;

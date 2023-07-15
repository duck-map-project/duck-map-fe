import { css, styled } from 'styled-components';

interface Categories {
  id: number;
  category: string;
}
interface PropsType {
  marginB?: string;
  categories: Categories[];
  type?: 'primary' | 'detail';
}

const TagWrapper = styled.ul<{ $marginB?: string }>`
  display: flex;
  margin-bottom: ${(props) => (props.$marginB ? props.$marginB : '')};
  gap: 10px;
`;

const TagItem = styled.li<{ type?: 'primary' | 'detail' }>`
  color: #1e232c;
  background-color: #edf7ff;
  border: 1.4px solid #92cbdb;
  border-radius: 30px;
  font-weight: 400;
  ${(props) => (props.type === 'detail' ? detail : primary)}
  &:last-child {
    margin-right: 0;
  }
`;

const primary = css`
  padding: 5.5px 20px;
  font-size: 1.4rem;
  line-height: 1.247857142857143;
`;

const detail = css`
  padding: 5.5px 22px;
  font-size: 2rem;
  line-height: 1.248;
`;

const Tag: React.FC<PropsType> = ({ marginB, categories, type }) => {
  return (
    <TagWrapper $marginB={marginB}>
      {categories.map((category) => (
        <TagItem key={category.id} type={type}>
          {category.category}
        </TagItem>
      ))}
    </TagWrapper>
  );
};

export default Tag;

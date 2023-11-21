import { css, styled } from 'styled-components';

import media from '../utils/mediaQuery';

interface Categories {
  id: number;
  category: string;
}
interface PropsType {
  categories: Categories[];
  type?: 'primary' | 'detail';
}

const TagWrapper = styled.ul`
  display: flex;
  margin-bottom: 13px;
  gap: 10px;
  ${media.mobile`
    margin-bottom: 26.5px;
  `}
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
  ${media.mobile`
    border: 1.2px solid #92CBDB;
  `}
`;

const primary = css`
  padding: 5.5px 20px;
  font-size: 1.4rem;
  line-height: 1.247857142857143;
  ${media.mobile`
    padding: 3px 11.5px;
    font-size: 1rem;
    font-weight: 700;
  `}
`;

const detail = css`
  padding: 5.5px 22px;
  font-size: 2rem;
  line-height: 1.248;
`;

const Tag: React.FC<PropsType> = ({ categories, type }) => {
  return (
    <TagWrapper>
      {categories.map((category) => (
        <TagItem key={category.id} type={type}>
          {category.category}
        </TagItem>
      ))}
    </TagWrapper>
  );
};

export default Tag;

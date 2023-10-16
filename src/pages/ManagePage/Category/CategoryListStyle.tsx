import styled from 'styled-components';

import media from '../../../utils/mediaQuery';

export const CategoryListSection = styled.section`
  display: grid;
  position: relative;
  grid-template-columns: repeat(3, 1fr);
  max-height: 100%;
  grid-column-gap: 18px;
  grid-row-gap: 20px;
  padding: 0 72px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 20px;
  }
  &::-webkit-scrollbar-thumb {
    position: relative;
    background-color: #8f9ef2;
    border: 2px solid var(--line-black);
    border-radius: 17.7px;
  }
  ${media.mobile`
    width: 100%;
    
    padding: 0 4px 0 0;
    grid-template-columns: repeat(1, 1fr);
    &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    border: 2px solid transparent;
    background-clip: content-box;
    background-color: rgba(176, 180, 204, 0.5);
  }
  `}
`;

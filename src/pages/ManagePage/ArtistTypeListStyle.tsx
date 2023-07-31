import styled from 'styled-components';

export const ArtistTypeListSection = styled.section`
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
`;

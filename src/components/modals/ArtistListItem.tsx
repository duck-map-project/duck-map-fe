import { css, styled } from 'styled-components';

import artistDefaultImage from '../../assets/artist-default-image.svg';

const ArtistListItemBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ArtistImg = styled.li<{
  image: string;
  selectedIds: number[];
  currentId: number;
}>`
  width: 118px;
  height: 118px;
  border: 3.37px solid #1e232c;
  background-color: #f8f8fa;
  background-repeat: no-repeat;
  cursor: pointer;
  ${(props) =>
    props.image === '/images/null' ? primaryBackground : isImageBackground}
  border-radius: 50%;
  ${(props) =>
    props.selectedIds.includes(props.currentId) ? selectedListStyle : null}
`;

const ArtistName = styled.span`
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.248333333333333;
  text-align: center;
`;

const primaryBackground = css`
  background-image: url(${artistDefaultImage});
  background-position: center;
`;

const isImageBackground = css<{ image: string }>`
  background-image: ${(props) => `url(${props.image})`};
  background-size: cover;
`;

const selectedListStyle = css`
  position: relative;
  box-shadow: 0px 0px 0px 4px #ffd0ec;
`;

interface ArtistListPorps {
  image: string;
  selectedIds: number[];
  currentId: number;
}

const ArtistListItem = ({ image, selectedIds, currentId }: ArtistListPorps) => {
  return (
    <ArtistListItemBox>
      <ArtistImg
        image={image}
        selectedIds={selectedIds}
        currentId={currentId}
      />
      <ArtistName>name</ArtistName>
    </ArtistListItemBox>
  );
};

export default ArtistListItem;

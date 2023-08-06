import { css, styled } from 'styled-components';

import artistDefaultImage from '../../assets/artist-default-image.svg';
import { Artist } from '../../types/eventService';

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
  groupData: Artist;
  currentArtist: Artist | null;
  currentId: number;
  setCurrentArtist: React.Dispatch<React.SetStateAction<Artist | null>>;
}

const ArtistListItem = ({
  groupData,
  currentArtist,
  currentId,
  setCurrentArtist,
}: ArtistListPorps) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const image =
    groupData.image === '/images/null'
      ? '/images/null'
      : baseUrl + groupData.image;
  return (
    <ArtistListItemBox
      onClick={() => {
        setCurrentArtist(groupData);
      }}
    >
      <ArtistImg
        image={image}
        selectedIds={(currentArtist && [currentArtist.id]) || []}
        currentId={currentId}
      />
      <ArtistName>{groupData.name}</ArtistName>
    </ArtistListItemBox>
  );
};

export default ArtistListItem;

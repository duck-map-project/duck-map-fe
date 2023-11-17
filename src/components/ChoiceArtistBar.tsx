import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { styled } from 'styled-components';

import artistArrow from '../assets/artist-arrow.svg';
import artistHeart from '../assets/artist-heart.svg';
import tongs from '../assets/tongs.svg';
import { useGetArtistOfGroupQuery } from '../features/artists/services/artistsApiSlice';
import {
  selectEventArtist,
  selectEventGroup,
  setEventArtist,
} from '../features/events/services/setEventArtistSlice';
import { modals } from '../features/modal/ReduxModalRoot';
import useModal from '../hooks/useModal';
import { Artist } from '../types/eventService';

import { selectedListStyle } from './ArtistListItem';

const Bar = styled.section`
  width: 100%;
  height: 138px;
  display: flex;
  align-items: center;
  background-color: #ffe7f4;
  border: 2px solid #1e232c;
  border-radius: 225px;
  box-shadow: 6px 6px 0px 0px #00000040;
  padding-left: 22px;
  position: relative;
  &::after {
    content: '';
    width: 50px;
    height: 43px;
    background-image: url(${tongs});
    position: absolute;
    top: -26px;
    left: 48.44%;
  }
`;

const OpenModalButton = styled.button<{ image: string | null }>`
  width: 98px;
  height: 98px;
  border: 2px solid #1e232c;
  border-radius: 50%;
  background-color: var(--white);
  background-image: ${(props) =>
    props.image ? `url(${props.image})` : `url(${artistHeart})`};
  background-size: ${(props) => (props.image ? 'cover' : '50px')};
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  margin-right: 25px;
  flex-shrink: 0;
`;

const StarList = styled.ul`
  width: 100%;
  height: 100%;
  background-color: #fffbe2;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  padding: 0 35px;
  gap: 12px;
  &::before {
    content: '';
    display: block;
    width: 7px;
    height: 134px;
    background-color: #ffa9dd;
    border: 2px solid #1e232c;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const StarItem = styled.li<{
  image: string | null;
  currentId: number;
  selectedId: number;
}>`
  width: 76px;
  height: 76px;
  border-radius: 50%;
  border: 2px solid #1e232c;
  background-color: var(--white);
  flex-shrink: 0;
  background-image: url(${(props) => (props.image ? props.image : '')});
  background-size: cover;
  ${(props) =>
    props.selectedId === props.currentId ? selectedListStyle : null}
`;

const NextSection = styled.section`
  width: 63px;
  height: 100%;
  flex-shrink: 0;
  border-left: 2px solid #1e232c;
  position: relative;
`;

const NextButton = styled.button`
  width: 16px;
  height: 28px;
  background-image: url(${artistArrow});
  position: absolute;
  top: 50%;
  left: 26px;
  transform: translateY(-50%);
`;

const ChoiceArtistBar = () => {
  const dispatch = useDispatch();
  const [artists, setArtists] = useState<Artist[]>([]);
  const selectedArtist = useSelector(selectEventArtist);
  const selectedGroup = useSelector(selectEventGroup);
  const [isGroupId, setIsGroupId] = useState<boolean>(true);
  const [currentArtist, setCurrentArtist] = useState<Artist | null>(
    selectedArtist
  );
  const { openModal } = useModal();

  useEffect(() => {
    if (selectedGroup && selectedGroup.id) {
      setIsGroupId(false);
    }
  }, [selectedGroup]);

  const { data: artistData } = useGetArtistOfGroupQuery(
    selectedGroup?.id as number,
    {
      skip: isGroupId,
    }
  );

  useEffect(() => {
    if (artistData) {
      setArtists(artistData);
    }
  }, [artistData, isGroupId]);

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const groupImage = selectedGroup && baseUrl + selectedGroup.image;

  const artistImage = selectedArtist && baseUrl + selectedArtist.image;

  const handleArtistBarButton = () => {
    openModal({ Component: modals.eventArtistModal });
  };

  const onClickStarItem = (artist: Artist) => {
    setCurrentArtist(artist);
    dispatch(setEventArtist({ artist: artist, group: selectedGroup }));
  };

  return (
    <Bar>
      <OpenModalButton
        type="button"
        onClick={handleArtistBarButton}
        image={groupImage || artistImage}
      />
      <StarList>
        {artists &&
          artists.map((artist) => (
            <StarItem
              key={artist.id}
              image={
                artist.image !== '/images/null' ? baseUrl + artist.image : null
              }
              currentId={artist.id}
              selectedId={currentArtist?.id as number}
              onClick={() => onClickStarItem(artist)}
            />
          ))}
      </StarList>
      <NextSection>
        <NextButton />
      </NextSection>
    </Bar>
  );
};

export default ChoiceArtistBar;

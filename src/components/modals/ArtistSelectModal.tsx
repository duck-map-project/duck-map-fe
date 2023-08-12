import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { useGetArtistsQuery } from '../../redux/artistsSlice';
import { toggleEventArtist } from '../../redux/manageModalSlice';
import { setArtist } from '../../redux/setEventElemetsSlice';
import { Artist, selectSelectedArtist } from '../../redux/setEventElemetsSlice';
import { ArtistContent } from '../../types/artistsType';

import { ModalTitle } from './AddEventCategoryModalStyle';
import {
  AritstSelectSection,
  ArtistListItem,
  ArtistListSection,
  ArtistSearchInput,
  DoneButton,
  ModalCloseButton,
} from './ArtistSelectModalStyle';
import CommonModal, { ModalPortal } from './CommonModal';

const loadedData = new Map();

const ArtistSelectModal = () => {
  const dispatch = useDispatch();
  const [artists, setArtists] = useState<ArtistContent[]>([]);
  const [page, setPage] = useState(0);
  const selectedArtists = useSelector(selectSelectedArtist);
  const [artistIds, setArtistIds] = useState<Artist[]>(selectedArtists);

  const {
    data: artistsData,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetArtistsQuery({
    pageNumber: page.toString(),
    pageSize: '18',
  });

  const onArtistClick = (artistId: number, name: string) => {
    const existingArtist = artistIds.find((artist) => artist.id === artistId);

    if (existingArtist) {
      const updatedArtistIds = artistIds.filter(
        (artist) => artist.id !== artistId
      );
      setArtistIds(updatedArtistIds);
    } else {
      setArtistIds((prev) => [...prev, { id: artistId, name }]);
    }
  };

  const SaveArtistIds = () => {
    if (artistIds.length !== 0) {
      dispatch(setArtist(artistIds));
      onHideModal();
    }
  };

  useEffect(() => {
    if (artistsData) {
      artistsData.content.forEach((item) => {
        const uniqueId = item.id;

        if (!loadedData.has(uniqueId)) {
          loadedData.set(uniqueId, item);
        }
      });
      const filteredArtistData = Array.from(loadedData.values());
      setArtists(filteredArtistData);
    }
  }, [artistsData]);

  const isLast = artistsData?.isLast ?? true;

  let content;

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const ulRef = useRef<HTMLUListElement>(null);

  if (artists) {
    content = artists.map((artist) => (
      <ArtistListItem
        key={artist.id}
        image={
          artist.image === '/images/null'
            ? artist.image
            : baseUrl + artist.image
        }
        selectedIds={artistIds.map((artist) => artist.id)}
        currentId={artist.id}
        onClick={() => {
          onArtistClick(artist.id, artist.name);
        }}
      />
    ));
  } else if (isLoading) {
    content = <div>아티스트 목록을 불러오는 중입니다</div>;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  const ulelement = ulRef.current;

  useEffect(() => {
    if (ulelement) {
      const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = ulelement;
        const isScrolledToEnd = scrollTop + clientHeight >= scrollHeight;

        if (isScrolledToEnd && !isFetching && !isLast) {
          setPage((prev) => prev + 1);
        }
      };

      ulelement.addEventListener('scroll', handleScroll);

      return () => {
        ulelement.removeEventListener('scroll', handleScroll);
      };
    }
  }, [page, isFetching, ulelement, ulRef]);

  const onHideModal = () => {
    dispatch(toggleEventArtist());
  };
  return (
    <ModalPortal>
      <CommonModal width="1046" onClick={onHideModal}>
        <ModalCloseButton onClick={onHideModal} />
        <ModalTitle>아티스트 선택하기</ModalTitle>
        <AritstSelectSection>
          <ArtistSearchInput />
          <ArtistListSection ref={ulRef}>{content}</ArtistListSection>
        </AritstSelectSection>
        <DoneButton type="button" onClick={SaveArtistIds}>
          완료
        </DoneButton>
      </CommonModal>
    </ModalPortal>
  );
};

export default ArtistSelectModal;

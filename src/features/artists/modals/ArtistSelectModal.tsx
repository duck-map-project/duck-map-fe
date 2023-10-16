import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import CommonModal, {
  ModalPortal,
} from '../../../components/modal/CommonModal';
import useDebounce from '../../../hooks/useDebounce';
import useInput from '../../../hooks/useInput';
import useScroll from '../../../hooks/useScroll';
import { ArtistContent } from '../../../types/artistsType';
import scrollToTop from '../../../utils/scrollToTop';
import { toggleEventArtist } from '../../manageModalSlice';
import { setArtist } from '../../setEventElemetsSlice';
import { Artist, selectSelectedArtist } from '../../setEventElemetsSlice';
import { useGetArtistsQuery } from '../api/artistsSlice';

import {
  AritstSelectSection,
  ArtistListItem,
  ArtistListSection,
  ArtistSearchInput,
  DoneButton,
  ModalCloseButton,
} from './ArtistSelectModalStyle';
import { ModalTitle } from './GroupModalStyle';

const ArtistSelectModal = () => {
  const dispatch = useDispatch();
  const [artists, setArtists] = useState<ArtistContent[]>([]);
  const [page, setPage] = useState(0);
  const selectedArtists = useSelector(selectSelectedArtist);
  const [artistIds, setArtistIds] = useState<Artist[]>(selectedArtists);
  const search = useInput('');
  const debouncedSearchInput = useDebounce(search.value, 600);
  const ulRef = useRef<HTMLUListElement>(null);

  const {
    data: artistsData,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetArtistsQuery({
    pageNumber: page.toString(),
    pageSize: '18',
    ...(debouncedSearchInput && { artistName: debouncedSearchInput }),
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
      if (page === 0) {
        scrollToTop({ targetRef: ulRef });
        setArtists(artistsData.content);
      } else {
        setArtists((prev) => [...prev, ...artistsData.content]);
      }
    }
  }, [artistsData, debouncedSearchInput]);

  const isLast = artistsData?.isLast ?? true;

  let content;

  const baseUrl = process.env.REACT_APP_BASE_URL;

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

  useScroll({
    targetRef: ulRef,
    isFetching,
    isLast,
    page,
    setPage,
  });

  const onHideModal = () => {
    dispatch(toggleEventArtist());
  };

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    search.onChange(e);
    setPage(0);
  };

  const onSearchInputReset = () => {
    search.setValue('');
    setPage(0);
  };

  return (
    <ModalPortal>
      <CommonModal width="1046" onClick={onHideModal}>
        <ModalCloseButton onClick={onHideModal} />
        <ModalTitle>아티스트 선택하기</ModalTitle>
        <AritstSelectSection>
          <ArtistSearchInput
            onChange={onSearchInputChange}
            value={search.value}
            onReset={onSearchInputReset}
          />
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

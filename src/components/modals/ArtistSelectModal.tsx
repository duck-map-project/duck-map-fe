import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useGetArtistsQuery } from '../../redux/artistsSlice';
import { toggleEventArtist } from '../../redux/manageModalSlice';
import { ArtistContent } from '../../types/artistsType';

import { ModalTitle } from './AddEventCategoryModalStyle';
import { ModalCloseButton } from './AddEventModalStyle';
import {
  AritstSelectSection,
  ArtistListItem,
  ArtistListSection,
  ArtistSearchInput,
  DoneButton,
} from './ArtistSelectModalStyle';
import CommonModal, { ModalPortal } from './CommonModal';

const ArtistSelectModal = () => {
  const dispatch = useDispatch();
  const [artists, setArtists] = useState<ArtistContent[]>([]);
  const [page, setPage] = useState(0);

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

  const loadedData = new Map();

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
        <DoneButton>완료</DoneButton>
      </CommonModal>
    </ModalPortal>
  );
};

export default ArtistSelectModal;

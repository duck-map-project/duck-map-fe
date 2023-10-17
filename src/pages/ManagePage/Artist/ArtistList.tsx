import React from 'react';
import { useRef, useEffect, useState } from 'react';

import { useGetArtistsQuery } from '../../../features/artists/services/artistsSlice';
import { ArtistContent } from '../../../types/artistsType';
import { ArtistListSection } from '../style';

import ArtistListItem from './ArtistListItem';

const loadedData = new Map();

const ArtistList = () => {
  const [artistsArray, setArtistsArray] = useState<ArtistContent[]>([]);
  const [artistType, _] = useState('');
  const [artistlistPage, setArtistListPage] = useState(0);
  const [pageSize] = useState(20);

  const {
    data: artistData,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetArtistsQuery({
    artistTypeId: artistType,
    pageNumber: artistlistPage.toString(),
    pageSize: pageSize.toString(),
  });

  useEffect(() => {
    if (artistData) {
      artistData.content.forEach((item) => {
        const uniqueId = item.id;

        if (!loadedData.has(uniqueId)) {
          loadedData.set(uniqueId, item);
        }
      });
      const filteredArtistData = Array.from(loadedData.values());
      setArtistsArray(filteredArtistData);
    }
  }, [artistData]);

  let content;

  if (artistsArray) {
    content = artistsArray.map((data) => (
      <ArtistListItem key={data.id} data={data} />
    ));
  } else if (isLoading) {
    content = <div>아티스트 목록을 불러오는 중입니다</div>;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  //무한 스크롤
  const artistListRef = useRef<HTMLDivElement>(null);
  const listElement = artistListRef.current;

  useEffect(() => {
    if (listElement) {
      const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = listElement;
        const isScrolledToEnd = scrollTop + clientHeight >= scrollHeight;

        if (isScrolledToEnd && !isFetching && !isLast) {
          setArtistListPage((prev) => prev + 1);
        }
      };

      listElement.addEventListener('scroll', handleScroll);

      return () => {
        listElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, [artistlistPage, isFetching, listElement, artistListRef]);

  const isLast = artistData?.isLast ?? true;

  return <ArtistListSection ref={artistListRef}>{content}</ArtistListSection>;
};

export default ArtistList;

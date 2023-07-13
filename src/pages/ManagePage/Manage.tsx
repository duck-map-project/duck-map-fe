import React from 'react';
import { useRef, useEffect, useState } from 'react';

import manageImage from '../../assets/icons/manageImage.svg';
import plusIcon from '../../assets/icons/plus.svg';
import { useGetArtistsQuery } from '../../redux/artistsSlice';
import { ArtistContent } from '../../types/artistsType';

import ArtistListItem from './ArtistListItem';
import {
  ManageInfoSection,
  ManageTitle,
  ManageInfoImage,
  ArtistList,
  ArtistListTitle,
  ListTitleText,
  ListTitleIcon,
  ArtistListSection,
} from './ManageStyle';

const loadedData = new Map();

const Manage = () => {
  const [artistsArray, setArtistsArray] = useState<ArtistContent[]>([]);
  const [artistlistPage, setArtistListPage] = useState(0);
  //아티스트 타입별로 조회 시 사용
  const [artistType, setArtistType] = useState('');
  //api에 디폴트값 생기면 삭제할 코드
  const [pageSize] = useState(20);
  //삭제 예정 코드
  useEffect(() => {
    setArtistType('');
  }, []);
  //아티스트 목록 fetch
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

  const isLast = artistData?.isLast ?? true;

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
  }, [artistlistPage, isFetching]);

  return (
    <>
      <ManageInfoSection>
        <ManageTitle>
          <h2>
            이곳은 <br />
            관리자 페이지입니다.
          </h2>
          <p>그룹을 등록하고, 아티스트, 카테고리를 등록할 수 있습니다.</p>
        </ManageTitle>
        <ManageInfoImage src={manageImage} />
      </ManageInfoSection>
      <ArtistList>
        <ArtistListTitle>
          <ListTitleText>아티스트 목록</ListTitleText>
          <ListTitleIcon>
            <img src={plusIcon}></img>
          </ListTitleIcon>
        </ArtistListTitle>
        <ArtistListSection ref={artistListRef}>{content}</ArtistListSection>
      </ArtistList>
    </>
  );
};

export default React.memo(Manage);

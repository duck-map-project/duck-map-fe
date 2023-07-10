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

const Manage = () => {
  const [artistlistPage, setArtistListPage] = useState(0);
  const [artistsArray, setArtistsArray] = useState<ArtistContent[]>([]);
  const {
    data: artistData,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetArtistsQuery({ page: artistlistPage.toString() });

  useEffect(() => {
    if (artistData) {
      setArtistsArray((prev) => [...prev, ...artistData.content]);
    }
  }, [artistData]);

  const isLast = artistData?.last ?? true;

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

  const artistListRef = useRef<HTMLDivElement>(null);
  const sectionElement = artistListRef.current;

  useEffect(() => {
    if (sectionElement) {
      const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = sectionElement;
        const isScrolledToEnd = scrollTop + clientHeight >= scrollHeight;

        if (isScrolledToEnd && !isFetching && !isLast) {
          setArtistListPage((prev) => prev + 1);
        }
      };

      sectionElement.addEventListener('scroll', handleScroll);

      return () => {
        sectionElement.removeEventListener('scroll', handleScroll);
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

export default Manage;

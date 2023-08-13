import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import useScroll from '../../hooks/useScroll';
import { useGetArtistsQuery } from '../../redux/artistsSlice';
import { useGetArtistsTypeQuery } from '../../redux/artistsTypeSlice';
import { toggleEventListArtist } from '../../redux/manageModalSlice';
import { setEventArtist } from '../../redux/setEventArtistSlice';
import { ArtistType } from '../../types/artistsType';
import { Artist } from '../../types/eventService';

import ArtistListItem from './ArtistListItem';
import { ModalCloseButton } from './ArtistSelectModalStyle';
import { ArtistSearchInput } from './ArtistSelectModalStyle';
import CommonModal, { ModalPortal } from './CommonModal';
import * as S from './EventArtistModalStyle';

const EventArtistModal = () => {
  const dispatch = useDispatch();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [types, setTypes] = useState<ArtistType[]>([]);
  const [page, setPage] = useState<number>(0);
  const [currentArtist, setCurrentArtist] = useState<Artist | null>(null);
  const [currentType, setCurrentType] = useState<number | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const {
    data: artistData,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetArtistsQuery({
    pageNumber: page.toString(),
    pageSize: '24',
    ...(currentType && { artistTypeId: currentType.toString() }),
  });
  const { data: typesData } = useGetArtistsTypeQuery();

  const isLast = artistData?.isLast ?? true;
  useEffect(() => {
    if (typesData) {
      setTypes(typesData);
    }
  }, [typesData]);

  useEffect(() => {
    if (artistData) {
      if (page === 0) {
        setArtists(artistData.content);
      } else {
        setArtists((prev) => [...prev, ...artistData.content]);
      }
    }
  }, [artistData, typesData]);

  let content;

  if (artists.length !== 0) {
    content =
      artists &&
      artists.map((artist) => (
        <ArtistListItem
          key={artist.id}
          groupData={artist}
          currentId={artist.id}
          setCurrentArtist={setCurrentArtist}
          currentArtist={currentArtist}
        />
      ));
  } else if (isLoading) {
    content = <div>아티스트 목록을 불러오는 중입니다</div>;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  } else {
    content = <div>아티스트가 없습니다</div>;
  }

  const handleCloseButton = () => {
    dispatch(toggleEventListArtist());
  };

  const handleTypeButton = (type: number | null) => {
    setPage(0);
    setCurrentType(type);
  };

  const handleOkButton = () => {
    if (currentArtist) {
      if (currentArtist.groupId) {
        dispatch(setEventArtist({ artist: currentArtist }));
      } else {
        dispatch(
          setEventArtist({
            group: currentArtist,
          })
        );
      }
      dispatch(toggleEventListArtist());
    }
  };

  useScroll({
    targetRef,
    isFetching,
    isLast,
    page,
    setPage,
  });

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const currentImage =
    currentArtist && currentArtist?.image !== '/images/null'
      ? baseUrl + currentArtist?.image
      : '';

  return (
    <ModalPortal>
      <CommonModal width="1156">
        <ModalCloseButton type="button" onClick={handleCloseButton} />
        <S.Wrapper>
          <S.LeftSection>
            <S.CurrentArtist src={currentImage} />
            <S.TextBox>검색된 최애 아티스트명</S.TextBox>
            <S.ArtistNameText>
              {currentArtist && currentArtist.name}
            </S.ArtistNameText>
            <S.ArtistTypeWrapper>
              {types &&
                types.map((type) => (
                  <S.ArtistTypeButton
                    type="button"
                    key={type.id}
                    onClick={() => handleTypeButton(type.id)}
                  >
                    {type.type}
                  </S.ArtistTypeButton>
                ))}
              <S.ArtistTypeButton
                type="button"
                onClick={() => handleTypeButton(null)}
              >
                reset
              </S.ArtistTypeButton>
            </S.ArtistTypeWrapper>
            <S.ButtonWrapper>
              <S.SubmitButton type="button" onClick={handleOkButton}>
                확인
              </S.SubmitButton>
            </S.ButtonWrapper>
          </S.LeftSection>
          <S.RightSection>
            <S.Title>아티스트 검색하기</S.Title>
            <S.GroupSelectSection>
              <ArtistSearchInput />
              <S.ArtistListWrapper ref={targetRef}>
                <S.ArtistListSection>{content}</S.ArtistListSection>
              </S.ArtistListWrapper>
            </S.GroupSelectSection>
          </S.RightSection>
        </S.Wrapper>
      </CommonModal>
    </ModalPortal>
  );
};

export default EventArtistModal;

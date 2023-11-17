import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import ArtistListItem from '../../../components/ArtistListItem';
import CommonModal, {
  ModalPortal,
} from '../../../components/modal/CommonModal';
import useDebounce from '../../../hooks/useDebounce';
import useInput from '../../../hooks/useInput';
import useScroll from '../../../hooks/useScroll';
import { ArtistType } from '../../../types/artistsType';
import { Artist } from '../../../types/eventService';
import scrollToTop from '../../../utils/scrollToTop';
import { setEventArtist } from '../../events/services/setEventArtistSlice';
import { ModalProps } from '../../modal/modalsSlice';
import { useGetArtistsQuery } from '../services/artistsApiSlice';
import { useGetArtistsTypeQuery } from '../services/artistsTypeApiSlice';

import { ModalCloseButton, ArtistSearchInput } from './ArtistSelectModalStyle';
import * as S from './EventArtistModalStyle';

const EventArtistModal = ({ onClose }: ModalProps) => {
  const dispatch = useDispatch();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [types, setTypes] = useState<ArtistType[]>([]);
  const [page, setPage] = useState<number>(0);
  const [currentArtist, setCurrentArtist] = useState<Artist | null>(null);
  const [currentType, setCurrentType] = useState<number | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const search = useInput('');
  const debouncedSearchInput = useDebounce(search.value, 600);

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
    ...(debouncedSearchInput && { artistName: debouncedSearchInput }),
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
        scrollToTop({ targetRef });
        setArtists(artistData.content);
      } else {
        setArtists((prev) => [...prev, ...artistData.content]);
      }
    }
  }, [artistData, typesData, debouncedSearchInput]);

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

  const handleTypeButton = (type: number | null) => {
    search.setValue('');
    setCurrentType(type);
    setPage(0);
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
      onClose();
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

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentType(null);
    search.onChange(e);
    setPage(0);
  };

  const onSearchInputReset = () => {
    search.setValue('');
    setPage(0);
  };

  return (
    <ModalPortal>
      <CommonModal width="1156" onClick={onClose}>
        <ModalCloseButton type="button" onClick={onClose} />
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
              <ArtistSearchInput
                value={search.value}
                onChange={onSearchInputChange}
                onReset={onSearchInputReset}
              />
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

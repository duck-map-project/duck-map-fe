import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import CommonModal from '../../../components/modal/CommonModal';
import useDebounce from '../../../hooks/useDebounce';
import useInput from '../../../hooks/useInput';
import useScroll from '../../../hooks/useScroll';
import { ArtistContent } from '../../../types/artistsType';
import { Artist as EventArtist } from '../../../types/eventService';
import scrollToTop from '../../../utils/scrollToTop';
import { setArtist } from '../../events/services/setEventElemetsSlice';
import {
  Artist,
  selectSelectedArtist,
} from '../../events/services/setEventElemetsSlice';
import { ModalProps } from '../../modal/modalsSlice';
import {
  useGetArtistOfGroupQuery,
  useGetArtistsQuery,
} from '../services/artistsApiSlice';

import {
  AritstSelectSection,
  ArtistLabel,
  ArtistListItem,
  ArtistListSection,
  ArtistSearchInput,
  DoneButton,
  ModalCloseButton,
} from './ArtistSelectModalStyle';
import { ModalTitle } from './GroupModalStyle';

const ArtistSelectModal = ({ onClose }: ModalProps) => {
  const dispatch = useDispatch();
  const [artists, setArtists] = useState<ArtistContent[]>([]);
  const [page, setPage] = useState(0);
  const selectedArtists = useSelector(selectSelectedArtist);
  const [artistIds, setArtistIds] = useState<Artist[]>(selectedArtists);
  const search = useInput('');
  const debouncedSearchInput = useDebounce(search.value, 600);
  const ulRef = useRef<HTMLUListElement>(null);
  const [isGroupMode, setIsGroupMode] = useState(false);
  const [groupId, setGroupId] = useState<number | null>(null);

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
  const { data: groupArtists = [], isLoading: isGroupLoading } =
    useGetArtistOfGroupQuery(groupId!, {
      skip: groupId === null,
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
      onClose();
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

  const handleArtistClick = (artist: EventArtist) => {
    onArtistClick(artist.id, artist.name);

    if (!artist.groupId) {
      setIsGroupMode(true);
      setGroupId(artist.id);
    }
  };

  const isLast = artistsData?.isLast ?? true;

  let content;

  const baseUrl = process.env.REACT_APP_BASE_URL;
  if (isGroupMode && groupArtists.length > 0) {
    content = (
      <>
        {groupArtists.map((artist) => (
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
              handleArtistClick(artist);
            }}
          >
            <ArtistLabel>{artist.name}</ArtistLabel>
          </ArtistListItem>
        ))}
      </>
    );
  } else if (artists) {
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
          handleArtistClick(artist);
        }}
      >
        <ArtistLabel>{artist.name}</ArtistLabel>
      </ArtistListItem>
    ));
  } else if (isLoading || isGroupLoading) {
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

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    search.onChange(e);
    setPage(0);
  };

  const onSearchInputReset = () => {
    search.setValue('');
    setPage(0);
  };

  return (
    <CommonModal width="1046" onClick={onClose}>
      <ModalCloseButton onClick={onClose} />
      <ModalTitle>아티스트 선택하기</ModalTitle>
      <AritstSelectSection>
        <ArtistSearchInput
          onChange={onSearchInputChange}
          value={search.value}
          onReset={onSearchInputReset}
        />
        <ArtistListSection ref={ulRef}>
          {content}
          {isGroupMode && groupArtists.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setIsGroupMode(false);
                setGroupId(null);
                setPage(0);
                if (groupId !== null) {
                  const groupLeader = artists.find((a) => a.id === groupId);
                  if (groupLeader) {
                    onArtistClick(groupLeader.id, groupLeader.name);
                  }
                }
              }}
            >
              ← 뒤로가기
            </button>
          )}
        </ArtistListSection>
      </AritstSelectSection>
      <DoneButton type="button" onClick={SaveArtistIds}>
        완료
      </DoneButton>
    </CommonModal>
  );
};

export default ArtistSelectModal;

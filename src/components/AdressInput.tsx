import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ArtistSearchInput } from '../features/artists/modals/ArtistSelectModalStyle';
import { setPlace } from '../features/eventPlaceSlice';
import useDebounce from '../hooks/useDebounce';
import useInput from '../hooks/useInput';

import {
  AddressItem,
  AddrestList,
  EventInputWrapper,
} from './AdressInputStyle';

export interface Place {
  place_name: string;
  address_name: string;
}

interface AddressInputProps {
  setCurrentPlace: React.Dispatch<React.SetStateAction<Place | null>>;
}

const AdressInput = ({ setCurrentPlace }: AddressInputProps) => {
  const search = useInput('');
  const debouncedSearchInput = useDebounce(search.value, 600);
  const [places, setPlaces] = useState<any[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setPlaces([]);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    search.onChange(e);
  };

  useEffect(() => {
    if (debouncedSearchInput.trim() !== '') {
      searchPlaces();
    } else {
      setPlaces([]);
    }
  }, [debouncedSearchInput]);

  const searchPlaces = () => {
    const ps = new (window as any).kakao.maps.services.Places();
    ps.keywordSearch(debouncedSearchInput, placesSearchCB);
  };

  const placesSearchCB = (data: any[], status: any) => {
    if (status === (window as any).kakao.maps.services.Status.OK) {
      setPlaces(data);
    } else if (
      status === (window as any).kakao.maps.services.Status.ZERO_RESULT
    ) {
      setPlaces([]);
    } else if (status === (window as any).kakao.maps.services.Status.ERROR) {
      // 오류 처리
    }
  };

  const handlePlaceSelect = (place: any) => {
    dispatch(
      setPlace([
        {
          address: [place.address_name],
          storeName: [place.place_name],
        },
      ])
    );
    setCurrentPlace({
      place_name: place.place_name,
      address_name: place.address_name,
    });
    search.setValue('');
    setPlaces([]);
  };

  const onSearchInputReset = () => {
    search.setValue('');
  };

  return (
    <EventInputWrapper ref={searchRef}>
      <ArtistSearchInput
        placeholder="주소 검색"
        onChange={handleInputChange}
        value={search.value}
        onReset={onSearchInputReset}
      />
      {places.length > 0 && (
        <AddrestList>
          {places.map((place, index) => (
            <AddressItem
              key={index}
              place={place}
              onClick={handlePlaceSelect}
            />
          ))}
        </AddrestList>
      )}
    </EventInputWrapper>
  );
};

export default AdressInput;

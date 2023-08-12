import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setPlace } from '../redux/eventPlaceSlice';

import {
  AddressItem,
  AddrestList,
  EventInputWrapper,
} from './AdressInputStyle';
import { ArtistSearchInput } from './modals/ArtistSelectModalStyle';

export interface Place {
  place_name: string;
  address_name: string;
}

interface AddressInputProps {
  setCurrentPlace: React.Dispatch<React.SetStateAction<Place | null>>;
}

const AdressInput = ({ setCurrentPlace }: AddressInputProps) => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  useEffect(() => {
    if (searchKeyword.trim() !== '') {
      searchPlaces();
    } else {
      setPlaces([]);
    }
  }, [searchKeyword]);

  const searchPlaces = () => {
    const ps = new (window as any).kakao.maps.services.Places();
    ps.keywordSearch(searchKeyword, placesSearchCB);
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
    setSearchKeyword('');
    setPlaces([]);
  };

  return (
    <EventInputWrapper ref={searchRef}>
      <ArtistSearchInput
        placeholder="주소 검색"
        onChange={handleInputChange}
        value={searchKeyword}
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

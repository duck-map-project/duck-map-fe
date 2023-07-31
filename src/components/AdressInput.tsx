import { useEffect, useRef, useState } from 'react';

import { AddrestList, EventInputWrapper } from './AdressInputStyle';
import { EventInput } from './modals/AddEventModalStyle';

interface AdressInputProps {
  onAddressChange: (adress: string) => void;
}

const AdressInput: React.FC<AdressInputProps> = ({ onAddressChange }) => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [places, setPlaces] = useState<any[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);

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
    setPlaces([]);

    // onAddressChange를 호출하여 선택한 주소를 외부로 전달
    onAddressChange(place.address_name);
  };

  return (
    <EventInputWrapper ref={searchRef}>
      <EventInput placeholder="주소 입력" onChange={handleInputChange} />
      {places.length > 0 && (
        <AddrestList>
          {places.map((place, index) => (
            <li key={index} onClick={() => handlePlaceSelect(place)}>
              {place.place_name}
            </li>
          ))}
        </AddrestList>
      )}
    </EventInputWrapper>
  );
};

export default AdressInput;

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setPlace } from '../../redux/eventPlaceSlice';
import { toggleAddressSearch } from '../../redux/manageModalSlice';
import AdressInput, { Place } from '../AdressInput';
import KakaoMap from '../KakaoMap';

import * as S from './AddressSearchModalStyle';
import { DoneButton, ModalCloseButton } from './ArtistSelectModalStyle';
import CommonModal, { ModalPortal } from './CommonModal';

const AddressSearchModal = () => {
  const [currentPlace, setCurrentPlace] = useState<Place | null>(null);
  const dispatch = useDispatch();

  const handleDoneButton = () => {
    if (currentPlace) {
      dispatch(
        setPlace([
          {
            address: [currentPlace.address_name],
            storeName: [currentPlace.place_name],
          },
        ])
      );
      dispatch(toggleAddressSearch());
    } else {
      alert('주소를 선택해주세요!');
    }
  };

  const onHideModal = () => {
    dispatch(setPlace([]));
    dispatch(toggleAddressSearch());
  };

  return (
    <ModalPortal>
      <CommonModal onClick={onHideModal}>
        <ModalCloseButton onClick={onHideModal} />
        <S.Title>주소 검색</S.Title>
        <S.ContentBox>
          <AdressInput setCurrentPlace={setCurrentPlace} />
          <KakaoMap size="address" />
        </S.ContentBox>
        <DoneButton type="button" onClick={handleDoneButton}>
          완료
        </DoneButton>
      </CommonModal>
    </ModalPortal>
  );
};

export default AddressSearchModal;

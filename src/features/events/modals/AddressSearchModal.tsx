import { useState } from 'react';
import { useDispatch } from 'react-redux';

import AdressInput, { Place } from '../../../components/AddressInput';
import KakaoMap from '../../../components/KakaoMap';
import CommonModal from '../../../components/modal/CommonModal';
import {
  DoneButton,
  ModalCloseButton,
} from '../../artists/modals/ArtistSelectModalStyle';
import { ModalProps } from '../../modal/modalsSlice';
import { setPlace } from '../services/eventPlaceSlice';

import * as S from './AddressSearchModalStyle';

const AddressSearchModal = ({ onClose }: ModalProps) => {
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
      // dispatch(toggleAddressSearch());
      onClose();
    } else {
      alert('주소를 선택해주세요!');
    }
  };

  const onHideModal = () => {
    dispatch(setPlace([]));
    onClose();
  };

  return (
    <CommonModal onClick={onHideModal}>
      <ModalCloseButton type="button" onClick={onHideModal} />
      <S.Title>주소 검색</S.Title>
      <S.ContentBox>
        <AdressInput setCurrentPlace={setCurrentPlace} />
        <KakaoMap size="address" />
      </S.ContentBox>
      <DoneButton type="button" onClick={handleDoneButton}>
        완료
      </DoneButton>
    </CommonModal>
  );
};

export default AddressSearchModal;

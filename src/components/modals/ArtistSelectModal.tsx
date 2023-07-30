import { useDispatch } from 'react-redux';

import { toggleEventArtist } from '../../redux/manageModalSlice';

import { ModalTitle } from './AddEventCategoryModalStyle';
import { ModalCloseButton } from './AddEventModalStyle';
import {
  AritstSelectSection,
  ArtistListItem,
  ArtistListSection,
  ArtistSearchInput,
  DoneButton,
} from './ArtistSelectModalStyle';
import CommonModal, { ModalPortal } from './CommonModal';

const ArtistSelectModal = () => {
  const dispatch = useDispatch();

  const onHideModal = () => {
    dispatch(toggleEventArtist());
  };
  return (
    <ModalPortal>
      <CommonModal width="1046px" onClick={onHideModal}>
        <ModalCloseButton onClick={onHideModal} />
        <ModalTitle>아티스트 선택하기</ModalTitle>
        <AritstSelectSection>
          <ArtistSearchInput />
          <ArtistListSection>
            <ArtistListItem />
            <ArtistListItem />
            <ArtistListItem />
            <ArtistListItem />
            <ArtistListItem />
            <ArtistListItem />
            <ArtistListItem />
            <ArtistListItem />
            <ArtistListItem />
            <ArtistListItem />
            <ArtistListItem />
            <ArtistListItem />
            <ArtistListItem />
            <ArtistListItem />
            <ArtistListItem />
            <ArtistListItem />
            <ArtistListItem />
            <ArtistListItem />
          </ArtistListSection>
        </AritstSelectSection>
        <DoneButton>완료</DoneButton>
      </CommonModal>
    </ModalPortal>
  );
};

export default ArtistSelectModal;

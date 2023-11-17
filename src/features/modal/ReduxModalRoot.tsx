import { useSelector } from 'react-redux';

import useModal from '../../hooks/useModal';
import ArtistModal from '../artists/modals/ArtistModal';
import ArtistSelectModal from '../artists/modals/ArtistSelectModal';
import ArtistTypeModal from '../artists/modals/ArtistTypeModal';
import EventArtistModal from '../artists/modals/EventArtistModal';
import GroupModal from '../artists/modals/GroupModal';
import BookmarkFolderModal from '../bookmarks/modals/BookmarkFolderModal';
import BookmarkModal from '../bookmarks/modals/BookmarkModal';
import CategoryModal from '../categories/modals/CategoryModal';
import CategorySelectModal from '../categories/modals/CategorySelectModal';
import AddressSearchModal from '../events/modals/AddressSearchModal';

export const modals = {
  artistModal: ArtistModal,
  artistTypeModal: ArtistTypeModal,
  artistSelectModal: ArtistSelectModal,
  eventArtistModal: EventArtistModal,
  groupModal: GroupModal,
  bookmarkFolderModal: BookmarkFolderModal,
  bookmarkModal: BookmarkModal,
  categoryModal: CategoryModal,
  categorySelectModal: CategorySelectModal,
  addressSearchModal: AddressSearchModal,
};

import { selectModalsSlice } from './modalsSlice';

const ReduxModalRoot = () => {
  const modals = useSelector(selectModalsSlice);

  const { closeModal } = useModal();
  return (
    <>
      {modals.map((modal, idx) => {
        const { Component, props } = modal;
        const onCloseHandler = () => {
          closeModal({ Component });
        };

        return <Component key={idx} onClose={onCloseHandler} {...props} />;
      })}
    </>
  );
};

export default ReduxModalRoot;

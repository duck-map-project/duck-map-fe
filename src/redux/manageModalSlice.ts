import { createSlice } from '@reduxjs/toolkit';

import { RootState } from './store';

export const manageModalSlice = createSlice({
  name: 'manageModal',
  initialState: {
    group: false,
    editGrop: false,
    artist: false,
    editArtist: false,
    artistType: false,
    editArtistType: false,
    category: false,
    editCategory: false,
    addBookmark: false,
    addBookmarkFolder: false,
    editBookmarkFolder: false,
    eventArtist: false,
    eventCategory: false,
    eventListArtist: false,
    addressSearch: false,
  },
  reducers: {
    toggleGroup: (state) => {
      state.group = !state.group;
    },
    toggleEditGroup: (state) => {
      state.editGrop = !state.editGrop;
    },
    toggleArtist: (state) => {
      state.artist = !state.artist;
    },
    toggleEditArtist: (state) => {
      state.editArtist = !state.editArtist;
    },
    toggleArtistType: (state) => {
      state.artistType = !state.artistType;
    },
    toggleEditArtistType: (state) => {
      state.editArtistType = !state.editArtistType;
    },
    toggleCategory: (state) => {
      state.category = !state.category;
    },
    toggleEditCategory: (state) => {
      state.editCategory = !state.editCategory;
    },
    toggleAddBookmark: (state) => {
      state.addBookmark = !state.addBookmark;
    },
    toggleAddBookmarkFolder: (state) => {
      state.addBookmarkFolder = !state.addBookmarkFolder;
    },
    toggleEditBookmarkFolder: (state) => {
      state.editBookmarkFolder = !state.editBookmarkFolder;
    },
    toggleEventArtist: (state) => {
      state.eventArtist = !state.eventArtist;
    },
    toggleEventCategory: (state) => {
      state.eventCategory = !state.eventCategory;
    },
    toggleEventListArtist: (state) => {
      state.eventListArtist = !state.eventListArtist;
    },
    toggleAddressSearch: (state) => {
      state.addressSearch = !state.addressSearch;
    },
  },
});

export const {
  toggleArtist,
  toggleEditArtist,
  toggleCategory,
  toggleEditCategory,
  toggleArtistType,
  toggleEditArtistType,
  toggleGroup,
  toggleEditGroup,
  toggleAddBookmark,
  toggleAddBookmarkFolder,
  toggleEditBookmarkFolder,
  toggleEventArtist,
  toggleEventCategory,
  toggleEventListArtist,
  toggleAddressSearch,
} = manageModalSlice.actions;

export default manageModalSlice.reducer;

export const selectGroupModalState = (state: RootState) =>
  state.manageModal.group;

export const selectEditGroupModalState = (state: RootState) =>
  state.manageModal.editGrop;

export const selectArtistModalState = (state: RootState) =>
  state.manageModal.artist;

export const selectEditArtistModalState = (state: RootState) =>
  state.manageModal.editArtist;

export const selectArtistTypeModalState = (state: RootState) =>
  state.manageModal.artistType;

export const selectEditArtistTypeModalState = (state: RootState) =>
  state.manageModal.editArtistType;

export const selectCategoryModalState = (state: RootState) =>
  state.manageModal.category;

export const selectEditCategoryModalState = (state: RootState) =>
  state.manageModal.editCategory;

export const selectAddBookmarkModalState = (state: RootState) =>
  state.manageModal.addBookmark;

export const selectAddBookmarkFolderModalState = (state: RootState) =>
  state.manageModal.addBookmarkFolder;

export const selectEditBookmarkFolderModalState = (state: RootState) =>
  state.manageModal.editBookmarkFolder;

export const selectEventArtistModalState = (state: RootState) =>
  state.manageModal.eventArtist;

export const selectEventCategoryModalState = (state: RootState) =>
  state.manageModal.eventCategory;

export const selectEventListArtistModalState = (state: RootState) =>
  state.manageModal.eventListArtist;
export const selectAddressSearchModalState = (state: RootState) =>
  state.manageModal.addressSearch;

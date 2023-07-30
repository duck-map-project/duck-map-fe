import { createSlice } from '@reduxjs/toolkit';

import { RootState } from './store';

export const manageModalSlice = createSlice({
  name: 'manageModal',
  initialState: {
    group: false,
    artist: false,
    artistType: false,
    category: false,
    addBookmarkFolder: false,
    editBookmarkFolder: false,
    eventArtist: false,
    eventCategory: false,
  },
  reducers: {
    toggleGroup: (state) => {
      state.group = !state.group;
    },
    toggleArtist: (state) => {
      state.artist = !state.artist;
    },
    toggleArtistType: (state) => {
      state.artistType = !state.artistType;
    },
    toggleCategory: (state) => {
      state.category = !state.category;
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
  },
});

export const {
  toggleArtist,
  toggleCategory,
  toggleArtistType,
  toggleGroup,
  toggleAddBookmarkFolder,
  toggleEditBookmarkFolder,
  toggleEventArtist,
  toggleEventCategory,
} = manageModalSlice.actions;

export default manageModalSlice.reducer;

export const selectGroupModalState = (state: RootState) =>
  state.manageModal.group;

export const selectArtistModalState = (state: RootState) =>
  state.manageModal.artist;

export const selectArtistTypeModalState = (state: RootState) =>
  state.manageModal.artistType;

export const selectCategoryModalState = (state: RootState) =>
  state.manageModal.category;

export const selectAddBookmarkFolderModalState = (state: RootState) =>
  state.manageModal.addBookmarkFolder;

export const selectEditBookmarkFolderModalState = (state: RootState) =>
  state.manageModal.editBookmarkFolder;

export const selectEventArtistModalState = (state: RootState) =>
  state.manageModal.eventArtist;

export const selectEventCategoryModalState = (state: RootState) =>
  state.manageModal.eventCategory;

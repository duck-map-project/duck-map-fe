import { createSlice } from '@reduxjs/toolkit';

import { RootState } from './store';

export const manageModalSlice = createSlice({
  name: 'manageModal',
  initialState: {
    group: false,
    artist: false,
    artistType: false,
    category: false,
    bookmarkFolder: false,
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
    toggleBookmarkFolder: (state) => {
      state.bookmarkFolder = !state.bookmarkFolder;
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
  toggleBookmarkFolder,
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

export const selectBookmarkFolderModalState = (state: RootState) =>
  state.manageModal.bookmarkFolder;
export const selectEventArtistModalState = (state: RootState) =>
  state.manageModal.eventArtist;

export const selectEventCategoryModalState = (state: RootState) =>
  state.manageModal.eventCategory;

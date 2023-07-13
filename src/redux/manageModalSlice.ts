import { createSlice } from '@reduxjs/toolkit';

import { RootState } from './store';

export const manageModalSlice = createSlice({
  name: 'manageModal',
  initialState: {
    group: false,
    artist: false,
    artistType: false,
    category: false,
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
  },
});

export const { toggleArtist, toggleCategory, toggleArtistType, toggleGroup } =
  manageModalSlice.actions;

export default manageModalSlice.reducer;

export const selectGroupModalState = (state: RootState) =>
  state.manageModal.group;

export const selectArtistModalState = (state: RootState) =>
  state.manageModal.artist;

export const selectArtistTypeModalState = (state: RootState) =>
  state.manageModal.artistType;

export const selectCategoryModalState = (state: RootState) =>
  state.manageModal.category;

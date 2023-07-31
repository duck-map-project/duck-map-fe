import { createSlice } from '@reduxjs/toolkit';

import { RootState } from './store';

export interface Artist {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  category: string;
}

export interface SetEventElementsState {
  selectedArtists: Artist[];
  selectedCategorys: Category[];
}

const initialState: SetEventElementsState = {
  selectedArtists: [],
  selectedCategorys: [],
};

const setEventElemetsSlice = createSlice({
  name: 'setEventElement',
  initialState,
  reducers: {
    setArtist: (state, action) => {
      state.selectedArtists = action.payload;
    },
    setCategory: (state, action) => {
      state.selectedCategorys = action.payload;
    },
    removeArtist: (state, action) => {
      const artistIdToRemove = action.payload;
      state.selectedArtists = state.selectedArtists.filter(
        (artist) => artist.id !== artistIdToRemove
      );
    },
    removeCategory: (state, action) => {
      const categoryIdToRemove = action.payload;
      state.selectedCategorys = state.selectedCategorys.filter(
        (category) => category.id !== categoryIdToRemove
      );
    },
  },
});

export const { setArtist, setCategory, removeArtist, removeCategory } =
  setEventElemetsSlice.actions;

export default setEventElemetsSlice.reducer;

export const selectSelectedArtist = (state: RootState) =>
  state.setEventElement.selectedArtists;
export const selectSelectedCategory = (state: RootState) =>
  state.setEventElement.selectedCategorys;

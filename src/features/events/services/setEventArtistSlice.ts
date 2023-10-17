import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../../app/api/store';
import { Artist } from '../../../types/eventService';

export interface SetEventArtistinitialState {
  artist: Artist | null;
  group: Artist | null;
}

const initialState: SetEventArtistinitialState = {
  artist: null,
  group: null,
};

const setEventArtistSlice = createSlice({
  name: 'setEventArtist',
  initialState,
  reducers: {
    setEventArtist: (state, action) => {
      const { artist, group } = action.payload;
      state.artist = artist;
      state.group = group;
    },
  },
});

export const { setEventArtist } = setEventArtistSlice.actions;
export const selectEventArtist = (state: RootState) =>
  state.setEventArtist.artist;
export const selectEventGroup = (state: RootState) =>
  state.setEventArtist.group;
export default setEventArtistSlice.reducer;

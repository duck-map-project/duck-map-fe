import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../app/api/store';

export const editArtistTypeSlice = createSlice({
  name: 'editArtistType',
  initialState: {
    id: 0,
    type: '',
  },
  reducers: {
    editArtistTypeInfo: (state, action) => {
      state.id = action.payload.id;
      state.type = action.payload.type;
    },
  },
});

export default editArtistTypeSlice.reducer;

export const { editArtistTypeInfo } = editArtistTypeSlice.actions;

export const selectEditArtistType = (state: RootState) => state.editArtistType;

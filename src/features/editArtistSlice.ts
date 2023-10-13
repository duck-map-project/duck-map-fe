import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../app/api/store';

export const editArtistSlice = createSlice({
  name: 'editArtist',
  initialState: {
    id: 0,
    groupId: null,
    groupName: '',
    name: '',
    image: '',
    artistTypeId: 0,
  },
  reducers: {
    editArtistInfo: (state, action) => {
      state.id = action.payload.id;
      state.groupId = action.payload.groupId;
      state.groupName = action.payload.groupName;
      state.name = action.payload.name;
      state.image = action.payload.image;
      state.artistTypeId = action.payload.artistTypeId;
    },
  },
});

export default editArtistSlice.reducer;

export const { editArtistInfo } = editArtistSlice.actions;

export const selectEditArtistSlice = (state: RootState) => state.editArtist;

import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../app/api/store';

export const editBookmarkFolderSlice = createSlice({
  name: 'editBookmarkFolder',
  initialState: {
    folderId: 0,
    name: '',
    image: '',
    color: '',
  },
  reducers: {
    editFolderInfo: (state, action) => {
      state.folderId = action.payload.folderId;
      state.name = action.payload.name;
      state.image = action.payload.image;
      state.color = action.payload.color;
    },
  },
});

export default editBookmarkFolderSlice.reducer;

export const { editFolderInfo } = editBookmarkFolderSlice.actions;

export const selectEditBookmarkFolder = (state: RootState) =>
  state.editBookmarkFolder;

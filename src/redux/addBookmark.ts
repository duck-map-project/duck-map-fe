import { createSlice } from '@reduxjs/toolkit';

import { RootState } from './store';

export const addBookmark = createSlice({
  name: 'addBookmark',
  initialState: {
    eventId: null,
    isBookmark: false,
  },
  reducers: {
    addBookmarkInfo: (state, action) => {
      state.eventId = action.payload.eventId;
      state.isBookmark = action.payload.isBookmark;
    },
  },
});

export default addBookmark.reducer;

export const { addBookmarkInfo } = addBookmark.actions;

export const selectAddBookmarkInfo = (state: RootState) => state.addBookmark;

export const selectIsBookmark = (state: RootState) =>
  state.addBookmark.isBookmark;

import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../app/api/store';

export const editCategorySlice = createSlice({
  name: 'editCategory',
  initialState: {
    id: 0,
    category: '',
  },
  reducers: {
    editCategoryInfo: (state, action) => {
      state.id = action.payload.id;
      state.category = action.payload.category;
    },
  },
});

export default editCategorySlice.reducer;

export const { editCategoryInfo } = editCategorySlice.actions;

export const selectEditCategorySlice = (state: RootState) => state.editCategory;

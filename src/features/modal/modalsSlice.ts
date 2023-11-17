import { createSlice } from '@reduxjs/toolkit';
import React from 'react';

import { RootState } from '../../app/api/store';

export type ModalProps = {
  onClose: () => void;
};

export type Modals = {
  Component: React.FC<ModalProps>;
  props?: any;
};

const initialState: Modals[] = [];

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    open: (state, action) => {
      state.push(action.payload);
    },
    close: (state, action) => {
      return (state = state.filter((modal) => {
        modal.Component !== action.payload.Component;
      }));
    },
  },
});

export default modalsSlice.reducer;

export const { open, close } = modalsSlice.actions;

export const selectModalsSlice = (state: RootState) => state.modals;

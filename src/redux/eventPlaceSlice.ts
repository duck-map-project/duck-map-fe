import { createSlice } from '@reduxjs/toolkit';

import { RootState } from './store';

export interface EventPlaceState {
  address: string[]; // Array of strings for addresses
  storeName: string[]; // Array of strings for store names
}

const initialState: EventPlaceState = {
  address: [],
  storeName: [],
};

const eventPlaceSlice = createSlice({
  name: 'eventPlace',
  initialState,
  reducers: {
    setPlace: (state, action) => {
      const { adress, storeName } = action.payload;
      state.address = adress;
      state.storeName = storeName;
    },
  },
});

export const { setPlace } = eventPlaceSlice.actions;

export default eventPlaceSlice.reducer;

export const selectAddress = (state: RootState) => state.eventPlace.address;
export const selectStoreName = (state: RootState) => state.eventPlace.storeName;

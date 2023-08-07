import { createSlice } from '@reduxjs/toolkit';

import { RootState } from './store';

interface EventPlaceState {
  id?: number;
  address: string[];
  storeName: string[];
}

export interface EventPlaceInitialState {
  places: EventPlaceState[];
}

const initialState: EventPlaceInitialState = {
  places: [],
};

const eventPlaceSlice = createSlice({
  name: 'eventPlace',
  initialState,
  reducers: {
    setPlace: (state, action) => {
      state.places = action.payload;
    },
  },
});

export const { setPlace } = eventPlaceSlice.actions;

export default eventPlaceSlice.reducer;

export const selectPlaces = (state: RootState) => state.eventPlace.places;

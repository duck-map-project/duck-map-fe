import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from './apiSlice';
import manageModalReducer from './manageModalSlice';

export const store = configureStore({
  reducer: {
    manageModal: manageModalReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

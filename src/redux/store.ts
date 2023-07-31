import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { apiSlice } from './apiSlice';
import authReducer, { AuthState } from './auth/authSlice';
import editArtistReducer from './editArtistSlice';
import editArtistTypeReducer from './editArtistTypeSlice';
import editBookmarkFolderReducer from './editBookmarkFolderSlice';
import editCategoryReducer from './editCategorySlice';
import manageModalReducer from './manageModalSlice';

const reducers = combineReducers({
  manageModal: manageModalReducer,
  editArtist: editArtistReducer,
  editArtistType: editArtistTypeReducer,
  editBookmarkFolder: editBookmarkFolderReducer,
  editCategory: editCategoryReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type { AuthState };

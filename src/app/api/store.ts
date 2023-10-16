import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import editArtistReducer from '../../features/artists/api/editArtistSlice';
import editArtistTypeReducer from '../../features/artists/api/editArtistTypeSlice';
import authReducer, { AuthState } from '../../features/auth/authSlice';
import addBookmarkReducer from '../../features/bookmarks/api/addBookmark';
import editBookmarkFolderReducer from '../../features/bookmarks/api/editBookmarkFolderSlice';
import editCategoryReducer from '../../features/categories/api/editCategorySlice';
import eventPlaceReducer, {
  EventPlaceInitialState,
} from '../../features/eventPlaceSlice';
import manageModalReducer from '../../features/manageModalSlice';
import setEventArtistReducer, {
  SetEventArtistinitialState,
} from '../../features/setEventArtistSlice';
import setEventElementReducer, {
  SetEventElementsState,
} from '../../features/setEventElemetsSlice';

import { apiSlice } from './apiSlice';

const reducers = combineReducers({
  manageModal: manageModalReducer,
  editArtist: editArtistReducer,
  editArtistType: editArtistTypeReducer,
  addBookmark: addBookmarkReducer,
  editBookmarkFolder: editBookmarkFolderReducer,
  editCategory: editCategoryReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  setEventElement: setEventElementReducer,
  eventPlace: eventPlaceReducer,
  setEventArtist: setEventArtistReducer,
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
export type { SetEventElementsState };
export type { EventPlaceInitialState };
export type { SetEventArtistinitialState };

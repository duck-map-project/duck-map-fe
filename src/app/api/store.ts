import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import editArtistReducer from '../../features/artists/services/editArtistSlice';
import editArtistTypeReducer from '../../features/artists/services/editArtistTypeSlice';
import authReducer, { AuthState } from '../../features/auth/services/authSlice';
import addBookmarkReducer from '../../features/bookmarks/services/addBookmark';
import editBookmarkFolderReducer from '../../features/bookmarks/services/editBookmarkFolderSlice';
import editCategoryReducer from '../../features/categories/services/editCategorySlice';
import eventPlaceReducer, {
  EventPlaceInitialState,
} from '../../features/events/services/eventPlaceSlice';
import setEventArtistReducer, {
  SetEventArtistinitialState,
} from '../../features/events/services/setEventArtistSlice';
import setEventElementReducer, {
  SetEventElementsState,
} from '../../features/events/services/setEventElemetsSlice';
import manageModalReducer from '../../features/modal/manageModalSlice';

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

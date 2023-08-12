import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import addBookmarkReducer from './addBookmark';
import { apiSlice } from './apiSlice';
import authReducer, { AuthState } from './auth/authSlice';
import editArtistReducer from './editArtistSlice';
import editArtistTypeReducer from './editArtistTypeSlice';
import editBookmarkFolderReducer from './editBookmarkFolderSlice';
import editCategoryReducer from './editCategorySlice';
import eventPlaceReducer, { EventPlaceInitialState } from './eventPlaceSlice';
import manageModalReducer from './manageModalSlice';
import setEventArtistReducer, {
  SetEventArtistinitialState,
} from './setEventArtistSlice';
import setEventElementReducer, {
  SetEventElementsState,
} from './setEventElemetsSlice';

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

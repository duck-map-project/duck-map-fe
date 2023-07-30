import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';

export interface UserState {
  id: number;
  username: string;
  email: string;
  userProfile: string;
  role: 'USER' | 'ADMIN';
  loginAt: string;
}

export interface AuthState {
  token: string | null;
  user: UserState | null;
}

const initialState = { user: null, token: null } as AuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const accessToken = action.payload;
      state.token = accessToken;
    },
    setUser: (state, action) => {
      const user = action.payload;
      state.user = user;
    },
    logOut: (state, _action) => {
      state.user = null;
      state.token = null;
    },
    FetchUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },
  },
});

export const { setCredentials, setUser, logOut, FetchUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;

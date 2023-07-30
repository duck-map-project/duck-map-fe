import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import { logOut, setCredentials } from './auth/authSlice';
import { RootState } from './store';

// const baseUrl = process.env.REACT_APP_BASE_URL;

const baseQuery = fetchBaseQuery({
  // baseUrl: baseUrl,
  credentials: 'include',
  mode: 'cors',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', token);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    const refreshResult = await baseQuery('/auth/reissue', api, extraOptions);

    if (refreshResult?.data) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut({}));
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'User',
    'ArtistType',
    'Artists',
    'Images',
    'EventCategory',
    'BookmarkFolders',
    'BookmarkEvents',
  ],
  endpoints: () => ({}),
});

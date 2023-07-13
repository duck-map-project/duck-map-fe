import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const baseUrl = process.env.REACT_APP_BASE_URL;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    //cors 에러 처리 후 proxy 삭제 시 활성화
    // baseUrl,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  }),
  tagTypes: ['ArtistType', 'Artists', 'Images', 'EventCategory'],
  endpoints: () => ({}),
});

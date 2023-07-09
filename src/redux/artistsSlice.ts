import { ArtistValue, ArtistsData } from '../types/artistsType';

import { apiSlice } from './apiSlice';

const accessToken = window.localStorage.getItem('admin');

export const artistsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArtists: builder.query<
      ArtistsData,
      {
        artistTypeId?: string | undefined;
        artistName?: string | undefined;
        page?: string | undefined;
        size?: string | undefined;
        sort?: string | undefined;
      }
    >({
      query: (params) => {
        const url = '/artists';
        const queryString = params
          ? new URLSearchParams(params).toString()
          : '';

        return {
          url: url + queryString,
          method: 'GET',
        };
      },
      providesTags: ['Artists'],
    }),
    getArtistOfGroup: builder.query({
      query: (gruopId: number) => `/artists/${gruopId}/artists`,
      providesTags: ['Artists'],
    }),
    addArtists: builder.mutation({
      query: (artistValue: ArtistValue) => ({
        url: '/artists',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: { artistValue },
      }),
      invalidatesTags: ['Artists'],
    }),
    editArtists: builder.mutation({
      query: ({
        artistId,
        artistValue,
      }: {
        artistId: number;
        artistValue: ArtistValue;
      }) => ({
        url: `/artists/${artistId}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: { artistValue },
      }),
      invalidatesTags: ['Artists'],
    }),
    deleteArtists: builder.mutation({
      query: (artistId) => ({
        url: `artists/${artistId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ['Artists'],
    }),
  }),
});

export const {
  useGetArtistsQuery,
  useGetArtistOfGroupQuery,
  useAddArtistsMutation,
  useEditArtistsMutation,
  useDeleteArtistsMutation,
} = artistsApiSlice;

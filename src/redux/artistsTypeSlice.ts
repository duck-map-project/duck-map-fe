import { artistType } from '../types/artistsType';

import { apiSlice } from './apiSlice';

const accessToken = window.localStorage.getItem('admin');

export const artistsTypeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArtistsType: builder.query<artistType[], void>({
      query: () => '/artists/types',
      providesTags: ['ArtistType'],
    }),
    addArtistsType: builder.mutation({
      query: (type: string) => ({
        url: '/artists/types',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: { type },
      }),
      invalidatesTags: ['ArtistType'],
    }),
    editArtistsType: builder.mutation({
      query: (arg: { typeId: number; type: string }) => ({
        url: `/artists/types/${arg.typeId}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: { type: arg.type },
      }),
      invalidatesTags: ['ArtistType'],
    }),
    deleteArtistsType: builder.mutation({
      query: (typeId: number) => ({
        url: `artists/types/${typeId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ['ArtistType'],
    }),
  }),
});

export const {
  useGetArtistsTypeQuery,
  useAddArtistsTypeMutation,
  useEditArtistsTypeMutation,
  useDeleteArtistsTypeMutation,
} = artistsTypeApiSlice;

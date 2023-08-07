import { ArtistType } from '../types/artistsType';

import { apiSlice } from './apiSlice';

export const artistsTypeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArtistsType: builder.query<ArtistType[], void>({
      query: () => '/artists/types',
      providesTags: ['ArtistType'],
    }),
    addArtistsType: builder.mutation({
      query: (type: string) => ({
        url: '/artists/types',
        method: 'POST',
        body: { type },
      }),
      invalidatesTags: ['ArtistType'],
    }),
    editArtistsType: builder.mutation<any, { id: number; type: string }>({
      query: ({ id, type }) => ({
        url: `/artists/types/${id}`,
        method: 'PUT',
        body: { type },
      }),
      invalidatesTags: ['ArtistType'],
    }),
    deleteArtistsType: builder.mutation<any, { id: number }>({
      query: ({ id }) => ({
        url: `/artists/types/${id}`,
        method: 'DELETE',
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

import { apiSlice } from '../../../app/api/apiSlice';
import {
  ArtisttypeType,
  AritsttypeAddType,
} from '../../../types/artisttypeType';

export const artistsTypeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArtistsType: builder.query<ArtisttypeType[], void>({
      query: () => '/artists/types',
      providesTags: ['ArtistType'],
    }),
    addArtistsType: builder.mutation<any, AritsttypeAddType>({
      query: ({ type }) => ({
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

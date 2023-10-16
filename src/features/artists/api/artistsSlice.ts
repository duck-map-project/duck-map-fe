import { apiSlice } from '../../../app/api/apiSlice';
import { ArtistValue, ArtistsData } from '../../../types/artistsType';
import { Artist } from '../../../types/eventService';

const accessToken = window.localStorage.getItem('admin');

export type transformedResponse = {
  isLast: boolean;
  content: [
    {
      id: number;
      groupId: number | null;
      groupName: string | null;
      name: string;
      image: string;
      artistType: {
        id: number;
        type: string;
      };
    }
  ];
};

export const artistsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArtists: builder.query<
      transformedResponse,
      {
        artistTypeId?: string;
        artistName?: string;
        pageNumber?: string;
        pageSize?: string;
      }
    >({
      query: (params) => {
        const url = '/artists';
        const queryString = params
          ? new URLSearchParams(params).toString()
          : '';

        return {
          url: url + '?' + queryString,
          method: 'GET',
        };
      },
      transformResponse: (response: ArtistsData) => {
        const content = response.content;
        const isLast = response.last;
        return { content, isLast };
      },
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        return (
          endpointName +
          queryArgs.artistTypeId +
          queryArgs.pageNumber +
          queryArgs.artistName
        );
      },
      providesTags: ['Artists'],
    }),
    getArtistOfGroup: builder.query<Artist[], number>({
      query: (gruopId) => `/artists/${gruopId}/artists`,
      providesTags: ['Artists'],
    }),
    addArtists: builder.mutation({
      query: (artistValue: ArtistValue) => ({
        url: '/artists',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: artistValue,
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
        body: artistValue,
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
      async onQueryStarted({ artistId }, { dispatch, queryFulfilled }) {
        // for (const { endpointName } of apiSlice.util.selectInvalidatedBy(
        //   getState(),
        //   [{ type: 'Artists', id: artistId }]
        // )) {
        //   if (endpointName !== 'getArtists') continue;
        //   dispatch(
        //     artistsApiSlice.util.updateQueryData('getArtists', {}, (draft) => {
        //       const deleteItemIndex = draft.content.findIndex(
        //         (data) => data.id === artistId
        //       );
        //       draft.content.splice(deleteItemIndex, 1);
        //     })
        //   );
        // }
        const patchResult = dispatch(
          artistsApiSlice.util.updateQueryData(
            'getArtists',
            { pageNumber: '2', pageSize: '20' },
            (draft) => {
              const deleteItemIndex = draft.content.findIndex(
                (data) => data.id === artistId
              );
              draft.content.splice(deleteItemIndex, 1);
            }
          )
        );
        try {
          const response = await queryFulfilled;
          console.log(response);
        } catch (error) {
          patchResult.undo();
        }
      },
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

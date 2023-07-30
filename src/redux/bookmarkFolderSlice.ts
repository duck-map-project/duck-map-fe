import { BookmarkFoldersData,transformedFoldersData } from '../types/bookmarkFolderType';

import { apiSlice } from './apiSlice';

type folderValueType = {
  name: string;
  image: string;
  color: string;
};

export const bookmarkFolderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookmarkFolders: builder.query<
      transformedFoldersData,
      {
        pageNumber?: string;
        pageSize?: string;
      }
    >({
      query: (params) => {
        const url = '/bookmark-folders';
        const queryString = params
          ? new URLSearchParams(params).toString()
          : '';

        return {
          url: url + '?' + queryString,
          method: 'GET',
        };
      },
      transformResponse: (response: BookmarkFoldersData) => {
        const content = response.content;
        const isLast = response.last;
        return { content, isLast };
      },
    }),
    addBookmarkFolder: builder.mutation({
      query: (folderValue: folderValueType) => ({
        url: '/bookmark-folders',
        method: 'POST',
        body: folderValue,
      }),
      invalidatesTags: ['BookmarkFolders'],
    }),
  }),
});

export const { useGetBookmarkFoldersQuery, useAddBookmarkFolderMutation } =
  bookmarkFolderApiSlice;

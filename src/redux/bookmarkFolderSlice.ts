import {
  BookmarkFoldersData,
  transformedFoldersData,
} from '../types/bookmarkFolderType';

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
        const numberOfElements = response.numberOfElements;
        const content = response.content;
        const isLast = response.last;
        return { numberOfElements, content, isLast };
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
    updateBookmarkFolder: builder.mutation<
      any,
      {
        folderId: number;
        folderValue: folderValueType;
      }
    >({
      query: ({ folderId, folderValue }) => ({
        url: `/bookmark-folders/${folderId}`,
        method: 'PUT',
        body: folderValue,
      }),
      invalidatesTags: ['BookmarkFolders'],
    }),
    deleteBookmarkFolder: builder.mutation({
      query: (folderId) => ({
        url: `/bookmark-folders/${folderId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['BookmarkFolders'],
    }),
  }),
});

export const {
  useGetBookmarkFoldersQuery,
  useAddBookmarkFolderMutation,
  useUpdateBookmarkFolderMutation,
  useDeleteBookmarkFolderMutation,
} = bookmarkFolderApiSlice;

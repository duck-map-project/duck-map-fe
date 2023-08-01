import {
  BookmarkFoldersData,
  transformedFoldersData,
  shareBookmarkFolderData,
  transformedShareFolderType,
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
    getShareBookmarkFolder: builder.query<
      transformedShareFolderType,
      { id: number }
    >({
      query: ({ id }) => ({
        url: `/bookmark-folders/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: shareBookmarkFolderData) => {
        const id = response.id;
        const name = response.name;
        const username = response.username;
        const memberId = response.memberId;
        const numberOfElements =
          response.bookmarkedEventResPage.numberOfElements;
        const isLast = response.bookmarkedEventResPage.last;
        const content = response.bookmarkedEventResPage.content;
        return {
          id,
          name,
          username,
          memberId,
          numberOfElements,
          isLast,
          content,
        };
      },
    }),
  }),
});

export const {
  useGetBookmarkFoldersQuery,
  useAddBookmarkFolderMutation,
  useUpdateBookmarkFolderMutation,
  useDeleteBookmarkFolderMutation,
  useGetShareBookmarkFolderQuery,
} = bookmarkFolderApiSlice;

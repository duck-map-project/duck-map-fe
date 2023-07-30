import { apiSlice } from './apiSlice';

type folderValueType = {
  name: string;
  image: string;
  color: string;
};
export const bookmarkFolderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookmarkFolders: builder.query({
      query: () => '/bookmark-folders',
      providesTags: ['BookmarkFolders'],
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

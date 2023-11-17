import { apiSlice } from '../../../app/api/apiSlice';
import {
  BookmarkEventsData,
  transformedEventsData,
} from '../../../types/bookmarkEventType';

type folderIdType = {
  folderId: string | null;
};
export const bookmarkEventApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookmarkEvents: builder.query<transformedEventsData, folderIdType>({
      query: ({ folderId }) => ({
        url: `/bookmark-folders/${folderId}/events`,
        method: 'GET',
      }),
      transformResponse: (response: BookmarkEventsData) => {
        const content = response.content;
        const isLast = response.last;
        const numberOfElements = response.numberOfElements;
        return { isLast, numberOfElements, content };
      },
      providesTags: ['BookmarkEvents'],
    }),
    addBookmarkEvent: builder.mutation({
      query: ({ id, folderId }) => ({
        url: `events/${id}/bookmarks`,
        method: 'POST',
        body: { bookmarkFolderId: folderId },
      }),
      invalidatesTags: ['BookmarkEvents'],
    }),
    editBookmarkEventFolder: builder.mutation({
      query: ({ id, folderId }) => ({
        url: `events/${id}/bookmarks`,
        method: 'PUT',
        body: { bookmarkFolderId: folderId },
      }),
      invalidatesTags: ['BookmarkEvents', 'BookmarkFolders'],
    }),
    deleteBookmarkEvent: builder.mutation<any, { id: number }>({
      query: ({ id }) => ({
        url: `events/${id}/bookmarks`,
        method: 'DELETE',
      }),
      invalidatesTags: ['BookmarkEvents'],
    }),
  }),
});

export const {
  useGetBookmarkEventsQuery,
  useAddBookmarkEventMutation,
  useDeleteBookmarkEventMutation,
  useEditBookmarkEventFolderMutation,
} = bookmarkEventApiSlice;

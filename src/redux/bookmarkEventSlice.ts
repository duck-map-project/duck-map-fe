import {
  BookmarkEventsData,
  transformedEventsData,
} from '../types/bookmarkEventType';

import { apiSlice } from './apiSlice';

type folderIdType = {
  folderId: number;
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
  }),
});

export const { useGetBookmarkEventsQuery } = bookmarkEventApiSlice;

import { apiSlice } from './apiSlice';

export type categoryType = {
  id: number;
  category: string;
};

const accessToken = window.localStorage.getItem('admin');

export const eventCategoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEventCategory: builder.query<categoryType[], void>({
      query: () => 'events/categories',
      providesTags: ['EventCategory'],
    }),
    addEventCategory: builder.mutation({
      query: (category: string) => ({
        url: 'events/categories',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: { category },
      }),
      invalidatesTags: ['EventCategory'],
    }),
  }),
});

export const { useGetEventCategoryQuery, useAddEventCategoryMutation } =
  eventCategoryApiSlice;

import { apiSlice } from '../../../app/api/apiSlice';
import { CategoryType } from '../../../types/categoryType';

const accessToken = window.localStorage.getItem('admin');

export const eventCategoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEventCategory: builder.query<CategoryType[], void>({
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
    editEventCategory: builder.mutation<any, { id: number; category: string }>({
      query: ({ id, category }) => ({
        url: `/events/categories/${id}`,
        method: 'PUT',
        body: { category },
      }),
      invalidatesTags: ['EventCategory'],
    }),
    deleteEventCategory: builder.mutation<any, { id: number }>({
      query: ({ id }) => ({
        url: `/events/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['EventCategory'],
    }),
  }),
});

export const {
  useGetEventCategoryQuery,
  useAddEventCategoryMutation,
  useEditEventCategoryMutation,
  useDeleteEventCategoryMutation,
} = eventCategoryApiSlice;

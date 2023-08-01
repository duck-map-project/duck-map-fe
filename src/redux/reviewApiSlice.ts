import { Review, ReviewResponse } from '../types/eventService';

import { apiSlice } from './apiSlice';

interface TransformedResponse {
  isLast: boolean;
  content: Review[];
}

const reviewApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query<
      TransformedResponse,
      { eventId: number; pageNumber?: number; pageSize?: number }
    >({
      query: ({ eventId, pageNumber = 0, pageSize = 10 }) => ({
        url: `/reviews/event/${eventId}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        method: 'GET',
      }),
      transformResponse: (response: ReviewResponse) => {
        const content = response.content;
        const isLast = response.last;
        return { content, isLast };
      },
    }),
  }),
});

export const { useGetReviewsQuery } = reviewApiSlice;

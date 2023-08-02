import { Review, ReviewResponse } from '../types/eventService';

import { apiSlice } from './apiSlice';

interface TransformedResponse {
  isLast: boolean;
  content: Review[];
}

interface ReviewData {
  eventId: number;
  score: number;
  content: string;
  imageFilenames: string[];
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
    addReview: builder.mutation({
      query: (requestData: ReviewData) => ({
        url: '/reviews',
        method: 'POST',
        body: { ...requestData },
      }),
    }),
  }),
});

export const { useGetReviewsQuery, useAddReviewMutation } = reviewApiSlice;

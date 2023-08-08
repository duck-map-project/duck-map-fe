import { Review, ReviewResponse } from '../types/eventService';
import {
  MainReview,
  MainReviewResponse,
  ReviewById,
} from '../types/reviewServie';

import { apiSlice } from './apiSlice';

interface GetReviewsTransformedResponse {
  isLast: boolean;
  content: Review[];
}

interface ReviewData {
  eventId: number;
  score: number;
  content: string;
  imageFilenames: string[];
}

interface GetMainReviewsTransformedResponse {
  content: MainReview[];
}

const reviewApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query<
      GetReviewsTransformedResponse,
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
    getMainReview: builder.query<
      GetMainReviewsTransformedResponse,
      { pageNumber?: number; pageSize?: number }
    >({
      query: ({ pageNumber = 0, pageSize = 5 }) => ({
        url: `/reviews/images?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        method: 'GET',
      }),
      transformResponse: (response: MainReviewResponse) => {
        const content = response.content;
        return { content };
      },
    }),
    getReviewById: builder.query<ReviewById, string>({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useAddReviewMutation,
  useGetMainReviewQuery,
  useGetReviewByIdQuery,
} = reviewApiSlice;

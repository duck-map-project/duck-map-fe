import { apiSlice } from '../../../app/api/apiSlice';
import {
  reviewDataType,
  transformedReviewDataType,
} from '../../../types/reviewType';

export const reviewSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query<
      transformedReviewDataType,
      {
        pageNumber?: string;
        pageSize?: string;
        artistId?: string;
        onlyInProgress?: string;
      }
    >({
      query: (params) => {
        const url = '/reviews';
        const queryString = params
          ? new URLSearchParams(params).toString()
          : '';

        return {
          url: url + '?' + queryString,
          method: 'GET',
        };
      },
      transformResponse: (response: reviewDataType) => {
        const content = response.content;
        const isLast = response.last;
        const numberOfElements = response.numberOfElements;
        return {
          content,
          isLast,
          numberOfElements,
        };
      },
      providesTags: ['Review'],
    }),
  }),
});

export const { useGetAllReviewsQuery } = reviewSlice;

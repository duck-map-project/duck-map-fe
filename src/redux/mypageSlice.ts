import {
  mylikeEventsType,
  transformedMylike,
  myreviewsType,
  transformedMyreview,
} from '../types/mypageType';

import { apiSlice } from './apiSlice';

//추후 각각 event slice, review slice 와 통합 예정
export const mypageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMylike: builder.query<
      transformedMylike,
      {
        pageNumber?: string;
        pageSize?: string;
      }
    >({
      query: (params) => {
        const url = '/events/mylike';
        const queryString = params
          ? new URLSearchParams(params).toString()
          : '';

        return {
          url: url + '?' + queryString,
          method: 'GET',
        };
      },
      transformResponse: (response: mylikeEventsType) => {
        const numberOfElements = response.numberOfElements;
        const content = response.content;
        const isLast = response.last;
        return { numberOfElements, content, isLast };
      },
    }),
    getMyreview: builder.query<
      transformedMyreview,
      {
        pageNumber?: string;
        pageSize?: string;
      }
    >({
      query: (params) => {
        const url = '/reviews/myreview';
        const queryString = params
          ? new URLSearchParams(params).toString()
          : '';

        return {
          url: url + '?' + queryString,
          method: 'GET',
        };
      },
      transformResponse: (response: myreviewsType) => {
        const numberOfElements = response.numberOfElements;
        const isLast = response.last;
        const content = response.content;
        return { numberOfElements, isLast, content };
      },
    }),
  }),
});

export const { useGetMylikeQuery, useGetMyreviewQuery } = mypageApiSlice;

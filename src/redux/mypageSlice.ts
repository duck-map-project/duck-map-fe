import { mylikeEventsType, transformedMylike } from '../types/mypageType';

import { apiSlice } from './apiSlice';

//추후 event slice 와 통합 예정
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
  }),
});

export const { useGetMylikeQuery } = mypageApiSlice;

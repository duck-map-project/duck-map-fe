import { EventData, MainEvent, MainEventResponse } from '../types/eventService';

import { apiSlice } from './apiSlice';

interface GetMainEventTransformedResponse {
  content: MainEvent[];
}

export const eventApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addEvent: builder.mutation({
      query: (EventData) => ({
        url: '/events',
        method: 'POST',
        body: EventData,
      }),
    }),
    getEventById: builder.query<EventData, string>({
      query: (id) => ({ url: '/events/' + id, method: 'GET' }),
    }),
    getMainEvent: builder.query<
      GetMainEventTransformedResponse,
      {
        page?: string;
        size?: string;
        direction?: 'DESC' | 'ASC';
        sortProperty: 'likeCount' | 'reviewCount';
      }
    >({
      query: (params) => {
        const defaultParams = {
          page: '0',
          size: '20',
          direction: 'DESC',
          ...params,
        };
        const url = '/events/map';
        const queryString = params
          ? new URLSearchParams(defaultParams).toString()
          : '';

        return {
          url: url + '?' + queryString,
          method: 'GET',
        };
      },
      transformResponse: (response: MainEventResponse) => {
        const content = response.content;
        return { content };
      },
    }),
  }),
});

export const {
  useAddEventMutation,
  useGetEventByIdQuery,
  useGetMainEventQuery,
} = eventApiSlice;

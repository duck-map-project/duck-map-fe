import { EventData } from '../types/eventService';

import { apiSlice } from './apiSlice';

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
  }),
});

export const { useAddEventMutation, useGetEventByIdQuery } = eventApiSlice;

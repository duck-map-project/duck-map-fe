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
  }),
});

export const { useAddEventMutation } = eventApiSlice;

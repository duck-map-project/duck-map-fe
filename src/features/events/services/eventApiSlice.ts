import { apiSlice } from '../../../app/api/apiSlice';
import {
  EventData,
  EventListData,
  EventResponse,
  MainEvent,
  MainEventResponse,
  TodayHashtagsResponse,
} from '../../../types/eventService';
import {
  mylikeEventsType,
  transformedMylike,
  myeventsType,
  transformedMyevents,
} from '../../../types/mypageType';

interface GetMainEventTransformedResponse {
  content: MainEvent[];
}

interface GetEventTransformedResponse {
  content: EventListData[];
  isLast: boolean;
}

export const eventApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addEvent: builder.mutation({
      query: (EventData) => ({
        url: '/events',
        method: 'POST',
        body: EventData,
      }),
      invalidatesTags: ['Event'],
    }),
    getEventById: builder.query<EventData, string>({
      query: (id) => ({ url: '/events/' + id, method: 'GET' }),
      providesTags: ['Event', 'BookmarkEvents', 'Like'],
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
      providesTags: ['Event', 'BookmarkEvents', 'Like'],
    }),
    getEvent: builder.query<
      GetEventTransformedResponse,
      {
        pageNumber: string;
        pageSize?: string;
        artistId?: string;
        onlyInProgress?: string;
      }
    >({
      query: (params) => {
        const defaultParams = {
          pageSize: '3',
          ...params,
        };
        const url = '/events';
        const queryString = params
          ? new URLSearchParams(defaultParams).toString()
          : '';

        return {
          url: url + '?' + queryString,
          method: 'GET',
        };
      },
      transformResponse: (response: EventResponse) => {
        const content = response.content;
        const isLast = response.last;
        return { content, isLast };
      },
      providesTags: ['Event', 'BookmarkEvents', 'Like'],
    }),
    getMyevent: builder.query<
      transformedMyevents,
      {
        pageNumber?: string;
        pageSize?: string;
      }
    >({
      query: (params) => {
        const url = '/events/myevent';
        const queryString = params
          ? new URLSearchParams(params).toString()
          : '';

        return {
          url: url + '?' + queryString,
          method: 'GET',
        };
      },
      transformResponse: (response: myeventsType) => {
        const numberOfElements = response.numberOfElements;
        const isLast = response.last;
        const content = response.content;
        return { numberOfElements, isLast, content };
      },
    }),
    editEvent: builder.mutation({
      query: ({ EventData, id }) => ({
        url: `events/${id}`,
        method: 'PUT',
        body: EventData,
      }),
      invalidatesTags: ['Event'],
    }),
    deleteEvent: builder.mutation<any, { id: number }>({
      query: ({ id }) => ({
        url: `/events/${id}`,
        method: 'DELETE',
      }),
    }),
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
      providesTags: ['Like'],
    }),
    addLike: builder.mutation<{ id: number }, string>({
      query: (id) => ({
        url: `/events/${id}/likes`,
        method: 'POST',
      }),
      invalidatesTags: ['Like'],
    }),
    deleteLike: builder.mutation<void, number>({
      query: (id) => ({
        url: `/events/${id}/likes`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Like'],
    }),
    getTodayHashtags: builder.query<TodayHashtagsResponse[], void>({
      query: () => ({
        url: '/events/hashtags/today',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useAddEventMutation,
  useGetEventByIdQuery,
  useGetMainEventQuery,
  useGetEventQuery,
  useGetMyeventQuery,
  useDeleteEventMutation,
  useGetMylikeQuery,
  useAddLikeMutation,
  useEditEventMutation,
  useDeleteLikeMutation,
  useGetTodayHashtagsQuery,
} = eventApiSlice;

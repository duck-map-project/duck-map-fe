import { apiSlice } from '../apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials },
      }),
      transformResponse: (response, meta) => {
        const authorizationHeader =
          meta?.response?.headers.get('Authorization');
        return { data: response, authorizationHeader };
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    fetchUser: builder.mutation({
      query: () => ({
        url: '/members/me',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useFetchUserMutation } =
  authApiSlice;

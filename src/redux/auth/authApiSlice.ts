import { UserInfoType } from '../../types/auth';
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
      invalidatesTags: ['User'],
    }),
    getUserInfo: builder.query<UserInfoType, void>({
      query: () => ({
        url: '/members/me',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    editUserInfo: builder.mutation<
      any,
      {
        username: string;
        image: string;
      }
    >({
      query: (userInfo) => ({
        url: '/members/me',
        method: 'PUT',
        body: userInfo,
      }),
      invalidatesTags: ['User'],
    }),
    editPassword: builder.mutation<
      any,
      {
        currentPassword: string;
        newPassword: string;
      }
    >({
      query: (data) => ({
        url: '/members/me/password',
        method: 'PATCH',
        body: data,
      }),
    }),
    unregister: builder.mutation<any, { password: string }>({
      query: (password) => ({
        url: '/memners/me',
        method: 'DELETE',
        body: password,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useFetchUserMutation,
  useGetUserInfoQuery,
  useEditUserInfoMutation,
  useEditPasswordMutation,
  useUnregisterMutation,
} = authApiSlice;

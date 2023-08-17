import { SignupRequest, UserInfoType } from '../../types/auth';
import { apiSlice } from '../apiSlice';

interface ResetPasswordRequest {
  newPassword: string;
  id: string;
}

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
    signUp: builder.mutation<void, SignupRequest>({
      query: (requestData) => ({
        url: '/members/join',
        method: 'POST',
        body: { ...requestData },
      }),
    }),
    sendPasswordEmail: builder.mutation<void, string>({
      query: (email) => ({
        url: '/auth/send-reset-password',
        method: 'POST',
        body: { email: email },
      }),
    }),
    resetPassword: builder.mutation<void, ResetPasswordRequest>({
      query: ({ newPassword, id }) => ({
        url: `/members/reset-password/${id}`,
        method: 'PATCH',
        body: { newPassword },
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
  useSignUpMutation,
  useSendPasswordEmailMutation,
  useResetPasswordMutation,
} = authApiSlice;

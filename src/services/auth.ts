import { baseApi } from './base'
import { LoginRequest, LoginResponse, LogoutResponse } from '@/types/auth'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({
        url: 'auth/login/',
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation<LogoutResponse, string>({
      query: (token) => ({
        url: 'auth/logout/',
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
    }),
  }),
  // overrideExisting: false,
})

export const { useLoginMutation, useLogoutMutation } = authApi

import { baseApi } from './base'
import {
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  SignUpRequest,
  SignUpResponse,
} from '@/types/auth'

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
    register: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (data) => ({
        url: 'auth/register/',
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: true,
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  authApi

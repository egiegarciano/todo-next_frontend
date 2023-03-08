import { baseApi } from './base'
import { LoginRequest, LoginResponse } from '@/types/auth'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({
        url: 'auth/login/',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useLoginMutation } = authApi

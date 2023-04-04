import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { RootState } from '@/redux/store'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
    prepareHeaders(headers, { getState }) {
      const token = (getState() as RootState).auth.token

      if (token) {
        headers.set('authorization', `Token ${token}`)
      }

      return headers
    },
  }),
  endpoints: () => ({}),
})

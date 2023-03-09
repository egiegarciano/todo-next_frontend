import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Token } from '@/types/auth'

const initialState: Token = {
  username: '',
  token: '',
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<Token>) => {
      state.username = payload.username
      state.token = payload.token
    },
  },
})

export const { setToken } = AuthSlice.actions

export default AuthSlice.reducer

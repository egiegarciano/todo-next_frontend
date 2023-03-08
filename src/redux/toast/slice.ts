import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ToastProp } from '@/types/toast'

const initialState: ToastProp = {
  isShow: false,
  icon: 'success',
  text: '',
  customStyle: '',
  duration: 3,
}

export const ToastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, { payload }: PayloadAction<ToastProp>) => {
      state.isShow = payload.isShow
      state.icon = payload.icon
      state.text = payload.text
      state.duration = payload.duration
      state.customStyle = payload.customStyle
    },
  },
})

export const { showToast } = ToastSlice.actions

export default ToastSlice.reducer

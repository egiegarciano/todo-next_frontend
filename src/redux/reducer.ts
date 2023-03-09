import { combineReducers } from '@reduxjs/toolkit'

import { baseApi } from '@/services/base'
import ToastReducer from './toast/slice'
import AuthReducer from './auth/slice'

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  toast: ToastReducer,
  auth: AuthReducer,
})

export default rootReducer

import { combineReducers } from '@reduxjs/toolkit'

import { baseApi } from '@/services/base'
import ToastReducer from './toast/slice'

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  toast: ToastReducer,
})

export default rootReducer

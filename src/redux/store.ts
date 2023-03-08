import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { createWrapper } from 'next-redux-wrapper'

import { baseApi } from '@/services/base'
import rootReducer from './reducer'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

const makeStore = () => store

export type AppStore = ReturnType<typeof makeStore>

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector

export const wrapper = createWrapper<AppStore>(makeStore)

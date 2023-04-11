import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { createWrapper } from 'next-redux-wrapper'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { baseApi } from '@/services/base'
import rootReducer from './reducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
}

//  note: you don't have to persist the auth slice since, the token was store in cookies
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const setupStore = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
})

const makeStore = () => setupStore

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<() => typeof setupStore>

export const useAppDispatch: () => typeof setupStore.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof setupStore.getState>
> = useSelector

export const wrapper = createWrapper<ReturnType<typeof makeStore>>(makeStore)
export const persistor = persistStore(setupStore)

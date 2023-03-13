import { baseApi } from './base'
import {
  CreateTodoRequest,
  CreateTodoResponse,
  CurrentTodosResponse,
  CurrentTodosRequest,
} from '@/types/todo'

export const todoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTodo: builder.mutation<CreateTodoResponse, CreateTodoRequest>({
      query: ({ token, ...rest }) => ({
        url: `todo/${token}/create-todo/`,
        method: 'POST',
        body: rest,
      }),
    }),
    currentTodos: builder.query<CurrentTodosResponse, CurrentTodosRequest>({
      query: ({ token, page }) => ({
        url: `todo/current-todos/${token}/?page=${page ?? 1}`,
        method: 'GET',
      }),
    }),
  }),
  // overrideExisting: false,
})

export const { useCreateTodoMutation, useCurrentTodosQuery } = todoApi

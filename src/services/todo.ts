import { baseApi } from './base'
import {
  CreateTodoRequest,
  CreateTodoResponse,
  CurrentTodosResponse,
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
    currentTodos: builder.query<CurrentTodosResponse, string>({
      query: (token) => ({
        url: `todo/current-todos/${token}/`,
        method: 'GET',
      }),
    }),
  }),
  // overrideExisting: false,
})

export const { useCreateTodoMutation, useCurrentTodosQuery } = todoApi

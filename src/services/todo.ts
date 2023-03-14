import { baseApi } from './base'
import {
  CreateTodoRequest,
  CurrentTodosResponse,
  CurrentTodosRequest,
  TodoDetailRequest,
  TodoResponse,
  UpdateTodoRequest,
  CompleteTodoRequest,
} from '@/types/todo'

export const todoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTodo: builder.mutation<TodoResponse, CreateTodoRequest>({
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
    todoDetail: builder.query<TodoResponse, TodoDetailRequest>({
      query: ({ token, id }) => ({
        url: `todo/${token}/todo-detail/${id}`,
        method: 'GET',
      }),
    }),
    updateTodo: builder.mutation<TodoResponse, UpdateTodoRequest>({
      query: ({ token, id, ...data }) => ({
        url: `todo/${token}/todo-detail/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    completeTodo: builder.mutation<TodoResponse, CompleteTodoRequest>({
      query: ({ token, id, ...data }) => ({
        url: `todo/${token}/todo-detail/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteTodo: builder.mutation<void, TodoDetailRequest>({
      query: ({ token, id }) => ({
        url: `todo/${token}/todo-detail/${id}`,
        method: 'DELETE',
      }),
    }),
  }),

  // overrideExisting: false,
})

export const {
  useCreateTodoMutation,
  useCurrentTodosQuery,
  useTodoDetailQuery,
  useUpdateTodoMutation,
  useCompleteTodoMutation,
  useDeleteTodoMutation,
} = todoApi

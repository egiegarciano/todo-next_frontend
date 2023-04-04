import { baseApi } from './base'
import {
  CreateTodoRequest,
  TodoListResponse,
  TodoResponse,
  UpdateTodoRequest,
  CompleteTodoRequest,
} from '@/types/todo'

export const todoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTodo: builder.mutation<TodoResponse, CreateTodoRequest>({
      query: (data) => ({
        url: `todo/create-todo/`,
        method: 'POST',
        body: data,
      }),
    }),
    currentTodos: builder.query<TodoListResponse, number>({
      query: (page) => ({
        url: `todo/current-todos/?page=${page ?? 1}`,
        method: 'GET',
      }),
    }),
    todoDetail: builder.query<TodoResponse, number>({
      query: (id) => ({
        url: `todo/todo-detail/${id}`,
        method: 'GET',
      }),
    }),
    updateTodo: builder.mutation<TodoResponse, UpdateTodoRequest>({
      query: ({ id, ...data }) => ({
        url: `todo/todo-detail/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    completeTodo: builder.mutation<TodoResponse, CompleteTodoRequest>({
      query: ({ id, ...data }) => ({
        url: `todo/todo-detail/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteTodo: builder.mutation<void, number>({
      query: (id) => ({
        url: `todo/todo-detail/${id}`,
        method: 'DELETE',
      }),
    }),
    completedTodos: builder.query<TodoListResponse, number>({
      query: (page) => ({
        url: `todo/completed-todos/?page=${page ?? 1}`,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: true,
})

export const {
  useCreateTodoMutation,
  useCurrentTodosQuery,
  useTodoDetailQuery,
  useUpdateTodoMutation,
  useCompleteTodoMutation,
  useDeleteTodoMutation,
  useCompletedTodosQuery,
} = todoApi

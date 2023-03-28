export type CreateTodoRequest = {
  token: string
  name: string
  memo: string
  is_important: boolean
}

export type TodoResponse = {
  id: number
  user: number
  name: string
  memo: string
  created_at: string
  completed_at: string | null
  is_important: boolean
}

export type TodoListResponse = {
  next: string | null
  previous: string | null
  total_items: number
  total_pages: number
  page: number
  results: TodoResponse[]
}

export type TodoListRequest = {
  token: string
  page?: number
}

export type TodoDetailRequest = {
  token: string
  id: number
}

export type UpdateTodoRequest = {
  id: number
} & CreateTodoRequest

export type CompleteTodoRequest = {
  completed_at: string
} & TodoDetailRequest

export type CreateTodoRequest = {
  token: string
  name: string
  memo: string
  is_important: boolean
}

export type CreateTodoResponse = {
  id: number
  user: number
  name: string
  memo: string
  created_at: string
  completed_at: string | null
  is_important: boolean
}

type ResultPaginate = {
  id: number
  user: number
  name: string
  memo: string
  created_at: string
  completed_at: string | null
  is_important: boolean
}

export type CurrentTodosResponse = {
  next: string | null
  user: string | null
  total_items: number
  total_pages: number
  page: number
  results: ResultPaginate[]
}

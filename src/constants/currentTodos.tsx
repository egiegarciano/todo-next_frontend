type CurrentTodo = {
  id: number
  title: string
  memo: string
  is_important: boolean
}

export const currentTodos: CurrentTodo[] = [
  {
    id: 1,
    title: 'Current',
    memo: '/current',
    is_important: true,
  },
  {
    id: 2,
    title: 'Create',
    memo: '/create-todo',
    is_important: false,
  },
  {
    id: 3,
    title: 'Completed',
    memo: '#home',
    is_important: true,
  },
]

type CurrentTodo = {
  title: string
  memo: string
  is_important: boolean
}

export const currentTodos: CurrentTodo[] = [
  {
    title: 'Current',
    memo: '/current',
    is_important: true,
  },
  {
    title: 'Create',
    memo: '/create-todo',
    is_important: false,
  },
  {
    title: 'Completed',
    memo: '#home',
    is_important: true,
  },
]

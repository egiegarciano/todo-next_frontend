type Link = {
  name: string
  href: string
  query?: { [key: string]: string }
}

export const verifiedLinks: Link[] = [
  {
    name: 'Current',
    href: '/current-todo',
    query: {
      page: '1',
    },
  },
  {
    name: 'Create',
    href: '/create-todo',
  },
  {
    name: 'Completed',
    href: '/completed-todo',
  },
]

export const unverifiedLinks: Link[] = [
  {
    name: 'Sign Up',
    href: '/signup',
  },
  {
    name: 'Login',
    href: '/login',
  },
]

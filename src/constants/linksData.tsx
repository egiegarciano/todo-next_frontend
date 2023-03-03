type Link = {
  name: string
  href: string
}

export const verifiedLinks: Link[] = [
  {
    name: 'Current',
    href: '/current',
  },
  {
    name: 'Create',
    href: '/create-todo',
  },
  {
    name: 'Completed',
    href: '#home',
  },
]

export const unverifiedLinks: Link[] = [
  {
    name: 'Sign Up',
    href: '/sign-up',
  },
  {
    name: 'Login',
    href: '/login',
  },
]

import 'whatwg-fetch'
import { render, screen, waitFor, cleanup } from '@testing-library/react'

import { setToken } from '@/redux/auth/slice'
import { setupStore } from '@/redux/store'
import NavBar from '../components/NavBar'
import { renderWithProviders } from '@/utils/redux-test-utils'
import Clipboard from '@/components/icons/Clipboard'

describe('NavBar Component', () => {
  beforeEach(() => renderWithProviders(<NavBar />))

  afterEach(() => cleanup())

  it('renders nav bar', () => {
    const navBar = screen.getByRole('navigation')
    expect(navBar).toBeInTheDocument()

    // const { container } = renderWithProviders(<NavBar />)
    // const clipboardSvg = container.querySelector(
    //   'nav > div:nth-child(1) > div:nth-child(1) > svg'
    // )
    // console.log(
    //   '🚀 ~ file: navbar.test.tsx:19 ~ it ~ clipboardSvg:',
    //   clipboardSvg
    // )

    // expect(clipboardSvg).toEqual(Clipboard())
  })

  it('renders a logo text', () => {
    const logoText = screen.getByRole('link', {
      name: /todo wohoo/i,
    })

    expect(logoText).toBeInTheDocument()
  })

  describe('displays the links of unauthenticated user', () => {
    it('renders a signup link text', () => {
      const signUpLink = screen.getByRole('link', {
        name: /sign up/i,
      })

      expect(signUpLink).toHaveAttribute('href', '/sign-up')
      expect(signUpLink).toBeInTheDocument()
    })
    it('renders a login link text', () => {
      const loginLink = screen.getByRole('link', {
        name: /login/i,
      })

      expect(loginLink).toHaveAttribute('href', '/login')
      expect(loginLink).toBeInTheDocument()
    })
  })

  describe('displays the links of authenticated user', () => {
    it('renders a current link text', async () => {
      await waitFor(() => {
        const store = setupStore
        store.dispatch(setToken({ token: 'authToken', username: 'JohnDoe' }))
      })

      const currentLink = screen.getByRole('link', {
        name: /current/i,
      })

      const signUpLink = screen.queryByRole('link', {
        name: /sign up/i,
      })

      expect(currentLink).toHaveAttribute('href', '/current-todo')
      expect(currentLink).toBeInTheDocument()
      expect(signUpLink).not.toBeInTheDocument
    })
  })

  describe('will able to logut user', () => {
    it('renders a current link text', async () => {
      await waitFor(() => {
        const store = setupStore
        store.dispatch(setToken({ token: 'authToken', username: 'JohnDoe' }))
      })

      const currentLink = screen.getByRole('link', {
        name: /current/i,
      })

      const signUpLink = screen.queryByRole('link', {
        name: /sign up/i,
      })

      expect(currentLink).toHaveAttribute('href', '/current-todo')
      expect(currentLink).toBeInTheDocument()
      expect(signUpLink).not.toBeInTheDocument
    })
  })
})

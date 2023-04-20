import 'whatwg-fetch'
import { screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { setToken } from '@/redux/auth/slice'
import { setupStore } from '@/redux/store'
import NavBar from '../components/NavBar'
import { renderWithProviders } from '@/utils/redux-test-utils'
import Clipboard from '@/components/icons/Clipboard'

const view = () => renderWithProviders(<NavBar />)

afterEach(() => cleanup)

jest.mock('next/router', () => {
  return {
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
    }),
  }
})

describe('NavBar Component', () => {
  it('renders nav bar', () => {
    view()

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
    view()

    const logoText = screen.getByRole('link', {
      name: /todo wohoo/i,
    })

    expect(logoText).toBeInTheDocument()
  })

  describe('displays the links of unauthenticated user', () => {
    it('renders a signup link text', () => {
      view()

      const signUpLink = screen.getByRole('link', {
        name: /sign up/i,
      })

      expect(signUpLink).toHaveAttribute('href', '/signup')
      expect(signUpLink).toBeInTheDocument()
    })
    it('renders a login link text', () => {
      view()

      const loginLink = screen.getByRole('link', {
        name: /login/i,
      })

      expect(loginLink).toHaveAttribute('href', '/login')
      expect(loginLink).toBeInTheDocument()
    })
  })

  describe('displays the links of authenticated user', () => {
    it('renders a current link text', async () => {
      view()

      await waitFor(() => {
        setupStore.dispatch(
          setToken({ token: 'thisIsAToken', username: 'JohnDoe' })
        )
      })

      const currentLink = screen.getByRole('link', {
        name: /current/i,
      })

      const signUpLink = screen.queryByRole('link', {
        name: /sign up/i,
      })

      expect(currentLink).toHaveAttribute('href', '/current-todo?page=1')
      expect(currentLink).toBeInTheDocument()
      expect(signUpLink).not.toBeInTheDocument
    })
  })

  describe('will able to logut user', () => {
    it('renders a current link text', async () => {
      view()

      const user = userEvent.setup()

      const logoutLink = screen.getByText('Logout')

      await user.click(logoutLink)

      const token = setupStore.getState().auth.token

      const signUpLink = await screen.findByRole('link', {
        name: /sign up/i,
      })

      expect(signUpLink).toHaveTextContent('Sign Up')
      expect(signUpLink).toBeInTheDocument()
      expect(logoutLink).not.toBeInTheDocument()
      expect(token).toEqual('')
    })
  })
})

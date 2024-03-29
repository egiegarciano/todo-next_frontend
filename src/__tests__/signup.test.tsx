import 'whatwg-fetch'
import { useRouter } from 'next/router'
import userEvent from '@testing-library/user-event'
import { screen, renderHook, waitFor, render } from '@testing-library/react'

import { setupApiStore } from '@/utils/redux-test-utils'
import { useRegisterMutation } from '@/services/auth'
import { baseApi } from '@/services/base'
import AuthReducer from '../redux/auth/slice'
import SignUp from '@/pages/signup'
import { setupRegisterErrorHandler } from '@/mocks/errorHandlers'

jest.mock('next/router', () => {
  return {
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
    }),
  }
})

const storeRef = setupApiStore(baseApi, { auth: AuthReducer })

const view = () => render(<SignUp />, { wrapper: storeRef.wrapper })

describe('Sign Up Page', () => {
  it('will render heading text', () => {
    view()

    const heading = screen.getByRole('heading', {
      name: /sign up/i,
    })

    expect(heading).toBeInTheDocument()
  })

  it('will render input fields with label', () => {
    view()

    const usernameInput = screen.getByRole('textbox', {
      name: /username:/i,
    })
    const emailInput = screen.getByRole('textbox', {
      name: /email:/i,
    })
    const passwordInput = screen.getByLabelText('Password:')
    const confirmPasswordInput = screen.getByLabelText('Confirm Password:')

    expect(usernameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(confirmPasswordInput).toBeInTheDocument()
  })

  it('will render submit button', () => {
    view()

    const submitBtn = screen.getByRole('button', {
      name: /submit/i,
    })

    expect(submitBtn).toBeInTheDocument()
  })

  it('will focus the input field when clicked and can type text', async () => {
    view()

    const passwordInput = screen.getByLabelText('Password:')

    const user = userEvent.setup()

    await user.type(passwordInput, 'Password')

    expect(passwordInput).toHaveValue('Password')
    expect(passwordInput).toHaveFocus()
  })

  it('will submit the form successfully', async () => {
    view()

    const user = userEvent.setup()

    const data = {
      username: 'John Doe',
      email: 'johndoe@test.com',
      password: 'Password',
      password2: 'Password',
    }

    const mockRouter = {
      push: jest.fn(),
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    const { result } = renderHook(() => useRegisterMutation(), {
      wrapper: storeRef.wrapper,
    })

    const [authRegister] = result.current

    const usernameInput = screen.getByRole('textbox', {
      name: /username:/i,
    })
    const emailInput = screen.getByRole('textbox', {
      name: /email:/i,
    })
    const passwordInput = screen.getByLabelText('Password:')
    const confirmPasswordInput = screen.getByLabelText('Confirm Password:')

    await user.type(usernameInput, 'johndoe123')
    await user.type(emailInput, 'johndoe123@test.com')
    await user.type(passwordInput, 'Password@123')
    await user.type(confirmPasswordInput, 'Password@123')

    const submitBtn = screen.getByRole('button', {
      name: /submit/i,
    })

    await waitFor(async () => {
      await user.click(submitBtn)

      await authRegister(data).unwrap()

      expect(mockRouter.push).toHaveBeenCalledWith('/')
    })

    const { isSuccess } = result.current[1]

    expect(isSuccess).toBeTruthy()

    const { username, token } = storeRef.store.getState().auth

    expect(token).toEqual('authToken123')
    expect(username).toEqual('johndoe123')
  })
})

describe('Handling register error', () => {
  beforeEach(() => setupRegisterErrorHandler())

  it('will handle error', async () => {
    view()

    const data = {
      username: 'John Doe',
      email: 'johndoe@test.com',
      password: 'Password',
      password2: 'Password',
    }

    const { result } = renderHook(() => useRegisterMutation(), {
      wrapper: storeRef.wrapper,
    })

    const [authRegister] = result.current

    await waitFor(async () => {
      try {
        const res = await authRegister(data).unwrap()
        expect(res).toBeCalled() // this will not be called since the response returns error
      } catch (error: any) {
        expect(error.status).toEqual(400)
        expect(error.data).toEqual(null)
      }
    })

    const { isSuccess } = result.current[1]

    expect(isSuccess).toBeFalsy()

    const token = storeRef.store.getState().auth.token

    expect(token).toEqual('')
  })
})

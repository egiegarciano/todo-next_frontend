import 'whatwg-fetch'
import { useRouter } from 'next/router'
import userEvent from '@testing-library/user-event'
import { screen, waitFor, render, renderHook } from '@testing-library/react'

import { setupApiStore } from '@/utils/redux-test-utils'
import { baseApi } from '@/services/base'
import AuthReducer from '../redux/auth/slice'
import { useLoginMutation } from '@/services/auth'
import Login from '@/pages/login'
import { setupLoginErrorHandler } from '@/mocks/errorHandlers'

jest.mock('next/router', () => {
  return {
    useRouter: jest.fn(),
  }
})

const storeRef = setupApiStore(baseApi, { auth: AuthReducer })

beforeEach(() => render(<Login />, { wrapper: storeRef.wrapper }))

describe('will display the login page', () => {
  it('will render heading text', () => {
    const heading = screen.getByRole('heading', {
      name: /login/i,
    })

    expect(heading).toBeInTheDocument()
  })

  it('will render input fields with label', () => {
    const usernameInput = screen.getByRole('textbox', {
      name: /username:/i,
    })

    const passwordInput = screen.getByLabelText('Password:')

    expect(usernameInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
  })

  it('will render submit button', () => {
    const submitBtn = screen.getByRole('button', {
      name: /submit/i,
    })

    expect(submitBtn).toBeInTheDocument()
  })

  it('will focus the input field when clicked and can type text', async () => {
    const user = userEvent.setup()

    const usernameInput = screen.getByRole('textbox', {
      name: /username:/i,
    })

    await user.type(usernameInput, 'johndoe')

    expect(usernameInput).toHaveValue('johndoe')
    expect(usernameInput).toHaveFocus()
  })
})

describe('will able to login successfully', () => {
  it('will submit form successfully', async () => {
    const user = userEvent.setup()
    const mockRouter = {
      push: jest.fn(),
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    const submitBtn = screen.getByRole('button', {
      name: 'Submit',
    })

    await waitFor(async () => {
      try {
        await user.click(submitBtn)
        expect(mockRouter.push).toHaveBeenCalledWith('/')
      } catch (error) {
        // of course error this will not be equal to null, this is just an example
        // I think try/catch is not needed here since we intercept the api to be success
        expect(error).toEqual(null)
      }
    })

    const token = storeRef.store.getState().auth.token

    expect(token).toEqual('authToken143')
  })
})

describe('Handling login error', () => {
  beforeEach(() => setupLoginErrorHandler())

  it('will handle error', async () => {
    const data = {
      username: 'John Doe',
      password: 'Password',
    }

    const { result } = renderHook(() => useLoginMutation(), {
      wrapper: storeRef.wrapper,
    })
    const [authLogin] = result.current

    await waitFor(async () => {
      try {
        await authLogin(data).unwrap()
        // I think its okay also to put her user.click(button) instead of the hook
        // since we only want the error
      } catch (error: any) {
        expect(error.status).toEqual(400)
        expect(error.data).toEqual(null)
      }
    })
    const token = storeRef.store.getState().auth.token

    expect(token).toEqual('')
  })
})

import 'whatwg-fetch'
import { PropsWithChildren } from 'react'
import userEvent from '@testing-library/user-event'
import { screen, cleanup, renderHook, act } from '@testing-library/react'

import { renderWithProviders, setupApiStore } from '@/utils/redux-test-utils'
import { useRegisterMutation } from '@/services/auth'
import { baseApi } from '@/services/base'
import AuthReducer from '../redux/auth/slice'
import SignUp from '@/pages/sign-up'
import { Provider } from 'react-redux'
import { setupRegisterErrorHandler } from '@/mocks/errorHandlers'

beforeEach(() => renderWithProviders(<SignUp />))

jest.mock('next/router', () => {
  return {
    useRouter: () => ({
      push: jest.fn(() => Promise.resolve(true)),
    }),
  }
})

const storeRef = setupApiStore(baseApi, { auth: AuthReducer })
const wrapper = ({ children }: PropsWithChildren<{}>) => {
  return <Provider store={storeRef.store}>{children}</Provider>
}

describe('Sign Up Page', () => {
  it('will render heading text', () => {
    const heading = screen.getByRole('heading', {
      name: /sign up/i,
    })

    expect(heading).toBeInTheDocument()
  })

  it('will render input fields with label', () => {
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
    const submitBtn = screen.getByRole('button', {
      name: /submit/i,
    })

    expect(submitBtn).toBeInTheDocument()
  })

  it('will focus the input field when clicked and can type text', async () => {
    const passwordInput = screen.getByLabelText('Password:')

    const user = userEvent.setup()

    await user.type(passwordInput, 'Password')

    expect(passwordInput).toHaveValue('Password')
    expect(passwordInput).toHaveFocus()
  })

  it('will submit the form successfully', async () => {
    const data = {
      username: 'John Doe',
      email: 'johndoe@test.com',
      password: 'Password',
      password2: 'Password',
    }

    const { result } = renderHook(() => useRegisterMutation(), {
      wrapper,
    })

    const [authRegister] = result.current

    const user = userEvent.setup()

    const submitBtn = screen.getByRole('button', {
      name: /submit/i,
    })

    await user.click(submitBtn)

    await act(async () => {
      const { response, token } = await authRegister(data).unwrap()

      expect(response).toEqual('Successfully registered')
      expect(token).toEqual('authToken123')
    })

    const { isSuccess } = result.current[1]

    expect(isSuccess).toBeTruthy()
  })
})

describe('Handling register error', () => {
  beforeEach(() => setupRegisterErrorHandler())

  it('will handle error', async () => {
    const data = {
      username: 'John Doe',
      email: 'johndoe@test.com',
      password: 'Password',
      password2: 'Password',
    }

    const { result } = renderHook(() => useRegisterMutation(), {
      wrapper,
    })

    const [authRegister] = result.current

    await act(async () => {
      try {
        const res = await authRegister(data).unwrap()
        expect(res).toBeCalled()
      } catch (error: any) {
        expect(error.status).toEqual(400)
        expect(error.data).toEqual(null)
      }
    })

    const { isSuccess } = result.current[1]
    expect(isSuccess).toBeFalsy()
  })
})

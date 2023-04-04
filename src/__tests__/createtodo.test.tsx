import 'whatwg-fetch'
import { useRouter } from 'next/router'
import userEvent from '@testing-library/user-event'
import { screen, waitFor, render } from '@testing-library/react'

import { setupApiStore } from '@/utils/redux-test-utils'
import { baseApi } from '@/services/base'
import AuthReducer, { setToken } from '../redux/auth/slice'
import CreateTodo from '@/pages/create-todo'
import { setupCreateTodoErrorHandler } from '@/mocks/errorHandlers'

jest.mock('next/router', () => {
  return {
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
    }),
  }
})

const storeRef = setupApiStore(baseApi, { auth: AuthReducer })

beforeEach(() => render(<CreateTodo />, { wrapper: storeRef.wrapper }))

describe('will display the create-todo page', () => {
  it('will render heading text', () => {
    const heading = screen.getByRole('heading', {
      name: /create a to do/i,
    })

    expect(heading).toBeInTheDocument()
  })

  it('will render input fields with label', () => {
    const titleInput = screen.getByRole('textbox', {
      name: /title:/i,
    })

    const memoInput = screen.getByRole('textbox', {
      name: /memo:/i,
    })

    const checkbox = screen.getByRole('checkbox', {
      name: /mark as important:/i,
    })

    expect(titleInput).toBeInTheDocument()
    expect(memoInput).toBeInTheDocument()
    expect(checkbox).toBeInTheDocument()
  })

  it('will render submit button', () => {
    const submitBtn = screen.getByRole('button', {
      name: /submit/i,
    })

    expect(submitBtn).toBeInTheDocument()
  })

  it('will focus the input field when clicked and can type text', async () => {
    const user = userEvent.setup()

    const memoInput = screen.getByRole('textbox', {
      name: /memo:/i,
    })

    await user.type(memoInput, 'johndoe')

    expect(memoInput).toHaveValue('johndoe')
    expect(memoInput).toHaveFocus()
  })

  it('will check and uncheck the checkbox when clicked', async () => {
    const user = userEvent.setup()

    const checkbox = screen.getByRole('checkbox', {
      name: /mark as important:/i,
    })

    await user.click(checkbox)

    expect(checkbox).toBeChecked()
  })
})

describe('will create a todo successfully', () => {
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
      storeRef.store.dispatch(
        setToken({ token: 'sampleToken123', username: 'johndoe' })
      )

      await user.click(submitBtn)

      expect(mockRouter.push).toHaveBeenCalledWith('/current-todo')
    })

    const token = storeRef.store.getState().auth.token

    expect(token).toEqual('sampleToken123')
  })
})

describe('Handling login error', () => {
  beforeEach(() => setupCreateTodoErrorHandler())

  it('will handle error', async () => {
    const user = userEvent.setup()

    const submitBtn = screen.getByRole('button', {
      name: 'Submit',
    })

    await waitFor(async () => {
      try {
        storeRef.store.dispatch(
          setToken({ token: 'sampleToken123', username: 'johndoe' })
        )

        await user.click(submitBtn)
      } catch (error: any) {
        expect(error.status).toEqual(400)
        expect(error.data).toEqual(null)
      }
    })
  })
})

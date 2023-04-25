import 'whatwg-fetch'
import userEvent from '@testing-library/user-event'
import { screen, waitFor, render } from '@testing-library/react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

import { setupApiStore } from '@/utils/redux-test-utils'
import { baseApi } from '@/services/base'
import AuthReducer from '../redux/auth/slice'
import TodoDetail from '@/pages/current-todo/[id]'
import { setupTodoDetailErrorHandler } from '@/mocks/errorHandlers'
import { setHandleCompletedTodo } from '@/mocks/commonHandlers'

jest.mock('next/router', () => {
  return {
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
      query: { id: 1 },
    }),
  }
})

const storeRef = setupApiStore(baseApi, { auth: AuthReducer })

const view = () => render(<TodoDetail />, { wrapper: storeRef.wrapper })

jest.mock('js-cookie', () => jest.fn())
;(Cookies as any).mockImplementation(() => ({ get: () => 'token' }))

describe('will render the current-todo detail page', () => {
  it('will display heading text', () => {
    view()

    const heading = screen.getByRole('heading', {
      name: /todo details/i,
    })

    expect(heading).toBeInTheDocument()
  })

  it('will display the inputs fields in the form', async () => {
    view()

    const titleInput = await screen.findByRole('textbox', {
      name: /title:/i,
    })

    const memoInput = await screen.findByRole('textbox', {
      name: /memo:/i,
    })

    const checkbox = await screen.findByRole('checkbox', {
      name: /mark as important:/i,
    })

    expect(titleInput).toBeInTheDocument()
    expect(titleInput).toHaveValue('Todo name')
    expect(memoInput).toBeInTheDocument()
    expect(checkbox).toBeInTheDocument()
  })

  it('will display the buttons of the form', async () => {
    view()

    const deleteBtn = await screen.findByRole('button', {
      name: /delete/i,
    })

    const updateBtn = await screen.findByRole('button', {
      name: /update/i,
    })

    const completeBtn = await screen.findByRole('button', {
      name: /complete/i,
    })

    expect(deleteBtn).toBeInTheDocument()
    expect(updateBtn).toBeInTheDocument()
    expect(completeBtn).toBeInTheDocument()
  })
})

describe('can update the todo detail', () => {
  it('will update the todo detail after clicking update button', async () => {
    view()

    const user = userEvent.setup()

    const updateBtn = await screen.findByRole('button', {
      name: /update/i,
    })

    const titleInput = await screen.findByRole('textbox', {
      name: /title:/i,
    })

    await user.type(titleInput, ' - updated')

    await user.click(updateBtn)

    expect(titleInput).toHaveValue('Todo name - updated')
  })
})

describe('can delete the todo detail', () => {
  it('will delete the todo detail after clicking delete button', async () => {
    view()

    const mockRouter = {
      push: jest.fn(),
      query: { id: 1 },
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    const user = userEvent.setup()

    const deleteBtn = await screen.findByRole('button', {
      name: /delete/i,
    })

    await user.click(deleteBtn)

    expect(mockRouter.push).toHaveBeenCalledWith('/current-todo')
  })
})

describe('can mark as complete the todo', () => {
  beforeEach(() => setHandleCompletedTodo())

  it('will mark as complete the todo after clicking complete button', async () => {
    view()

    const mockRouter = {
      push: jest.fn(),
      query: { id: 1 },
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    const user = userEvent.setup()

    const completeBtn = await screen.findByRole('button', {
      name: /complete/i,
    })

    await user.click(completeBtn)

    expect(mockRouter.push).toHaveBeenCalledWith('/current-todo')
  })
})

describe('message will render if the todo detail is not found', () => {
  beforeEach(() => setupTodoDetailErrorHandler())

  it('will display the message', async () => {
    view()

    const mockRouter = {
      push: jest.fn(),
      query: { id: 'notfoundid' },
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    const message = await screen.findByText(
      /sorry but there is something to the page you are trying to access/i
    )

    expect(message).toBeInTheDocument()
  })
})

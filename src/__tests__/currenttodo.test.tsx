import 'whatwg-fetch'
import userEvent from '@testing-library/user-event'
import { screen, waitFor, render } from '@testing-library/react'
import Cookies from 'js-cookie'

import { setupApiStore } from '@/utils/redux-test-utils'
import { baseApi } from '@/services/base'
import AuthReducer, { setToken } from '../redux/auth/slice'
import CurrentTodo from '@/pages/current-todo'

const storeRef = setupApiStore(baseApi, { auth: AuthReducer })

beforeEach(async () => {
  render(<CurrentTodo />, { wrapper: storeRef.wrapper })

  await waitFor(() => {
    storeRef.store.dispatch(
      setToken({ token: 'sampleToken143', username: 'johndoe' })
    )
  })
})

jest.mock('js-cookie', () => jest.fn())
;(Cookies as any).mockImplementation(() => ({ get: () => 'token' }))

describe('will display the current-todo page', () => {
  it('will render heading text', () => {
    const heading = screen.getByRole('heading', {
      name: /current todos/i,
    })

    expect(heading).toBeInTheDocument()
  })

  it('will render the message when theres no currently todos yet', () => {
    const message = screen.getByText(/you don't have any todos/i)

    const link = screen.getByRole('link', {
      name: /create a todo here/i,
    })

    expect(message).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'create-todo/')
  })
})

describe('will render the list of todos', () => {
  it('will render the current todos', async () => {
    const link = await screen.findByRole('link', {
      name: 'First page todo',
    })

    expect(link).toBeInTheDocument()
  })
})

describe('will render the pagination', () => {
  it('will render next and previous page button', async () => {
    const prevBtn = await screen.findByRole('button', {
      name: /previous page/i,
    })

    expect(prevBtn).toBeInTheDocument()

    const nextBtn = await screen.findByRole('button', {
      name: /next page/i,
    })

    expect(nextBtn).toBeInTheDocument()
  })

  it('will render start and end page button', async () => {
    const startBtn = await screen.findByRole('button', {
      name: /start page/i,
    })

    expect(startBtn).toBeInTheDocument()

    const endBtn = await screen.findByRole('button', {
      name: /end page/i,
    })

    expect(endBtn).toBeInTheDocument()
  })

  it('will change the todo list when clicking the page number button', async () => {
    const user = userEvent.setup()

    const pageTwoBtn = await screen.findByRole('button', {
      name: /page 2/i,
    })

    await user.click(pageTwoBtn)

    const pageTwoTodo = await screen.findByRole('link', {
      name: 'Second page todo',
    })

    expect(pageTwoTodo).toBeInTheDocument()
  })

  it('will change the todo list when clicking the next and prev button', async () => {
    const user = userEvent.setup()

    const nextBtn = await screen.findByRole('button', {
      name: /next page/i,
    })

    await user.click(nextBtn)

    expect(
      await screen.findByRole('link', {
        name: 'Second page todo',
      })
    ).toBeInTheDocument()

    const prevBtn = await screen.findByRole('button', {
      name: /previous page/i,
    })

    await user.click(prevBtn)

    expect(
      await screen.findByRole('link', {
        name: 'First page todo',
      })
    ).toBeInTheDocument()
  })

  it('will change the todo list when clicking the start and end button', async () => {
    const user = userEvent.setup()

    const startBtn = await screen.findByRole('button', {
      name: /start page/i,
    })

    expect(startBtn).toBeDisabled()

    const endBtn = await screen.findByRole('button', {
      name: /end page/i,
    })

    await user.click(endBtn)

    expect(
      await screen.findByRole('link', {
        name: 'Second page todo',
      })
    ).toBeInTheDocument()

    expect(endBtn).toBeDisabled()

    await user.click(startBtn)

    expect(
      await screen.findByRole('link', {
        name: 'First page todo',
      })
    ).toBeInTheDocument()
  })
})

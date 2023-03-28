import 'whatwg-fetch'
import userEvent from '@testing-library/user-event'
import { screen, waitFor, render, renderHook } from '@testing-library/react'

import { setupApiStore } from '@/utils/redux-test-utils'
import { baseApi } from '@/services/base'
import AuthReducer, { setToken } from '../redux/auth/slice'
import CurrentTodo from '@/pages/current-todo'
import { useCurrentTodosQuery } from '@/services/todo'
import ChevronRight from '@/components/icons/ChevronRight'

const storeRef = setupApiStore(baseApi, { auth: AuthReducer })

beforeEach(() => render(<CurrentTodo />, { wrapper: storeRef.wrapper }))

describe('will display the current-todo page', () => {
  it('will render heading text', () => {
    const heading = screen.getByRole('heading', {
      name: /current todos/i,
    })

    expect(heading).toBeInTheDocument()
  })

  it('will render the message when theres no currently todos yet', () => {
    const message = screen.getByText(/no current todo yet/i)

    const link = screen.getByRole('link', {
      name: /create todo here/i,
    })

    expect(message).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'create-todo/')
  })

  it('will render the current todos', async () => {
    await waitFor(() => {
      storeRef.store.dispatch(
        setToken({ token: 'sampleToken143', username: 'johndoe' })
      )
    })

    await waitFor(() => {
      const link = screen.getByRole('link', {
        name: 'Todo name',
      })

      expect(link).toBeInTheDocument()
    })
  })

  it('will render the pagination', async () => {
    await waitFor(() => {
      storeRef.store.dispatch(
        setToken({ token: 'sampleToken143', username: 'johndoe' })
      )
    })

    const user = userEvent.setup()

    // const pagination = await screen.findByRole('navigation', {
    //   name: /pagination/i,
    // })

    // expect(pagination).toBeInTheDocument()

    const startBtn = await screen.findByRole('button', {
      name: /start page/i,
    })

    expect(startBtn).toBeInTheDocument()

    const nextBtn = await screen.findByRole('button', {
      name: /next page/i,
    })

    expect(nextBtn).toBeInTheDocument()

    const pageTwoBtn = await screen.findByRole('button', {
      name: /page 2/i,
    })

    expect(nextBtn).toBeInTheDocument()

    await user.click(nextBtn)

    const link = screen.getByRole('link', {
      name: 'Second page todo',
    })
  })
})

// describe('will create a todo successfully', () => {
//   it('will submit form successfully', async () => {
//     const user = userEvent.setup()

//     const mockRouter = {
//       push: jest.fn(),
//     }
//     ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

//     const submitBtn = screen.getByRole('button', {
//       name: 'Submit',
//     })

//     await waitFor(async () => {
//       storeRef.store.dispatch(
//         setToken({ token: 'sampleToken123', username: 'johndoe' })
//       )

//       await user.click(submitBtn)

//       expect(mockRouter.push).toHaveBeenCalledWith('/current-todo')
//     })

//     const token = storeRef.store.getState().auth.token

//     expect(token).toEqual('sampleToken123')
//   })
// })

// describe('Handling login error', () => {
//   beforeEach(() => setupCreateTodoErrorHandler())

//   it('will handle error', async () => {
//     const user = userEvent.setup()

//     const submitBtn = screen.getByRole('button', {
//       name: 'Submit',
//     })

//     await waitFor(async () => {
//       try {
//         storeRef.store.dispatch(
//           setToken({ token: 'sampleToken123', username: 'johndoe' })
//         )

//         await user.click(submitBtn)
//       } catch (error: any) {
//         expect(error.status).toEqual(400)
//         expect(error.data).toEqual(null)
//       }
//     })
//   })
// })

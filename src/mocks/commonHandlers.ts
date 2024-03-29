import { rest } from 'msw'
import { server } from './server'

export const commonHandlers = [
  rest.post('http://localhost:8000/auth/logout/', async (req, res, ctx) => {
    return res(
      ctx.json({
        message: 'Successfully logout',
      }),
      ctx.status(200)
    )
  }),

  rest.post('http://localhost:8000/auth/register/', async (req, res, ctx) => {
    return res(
      ctx.json({
        response: 'Successfully registered',
        username: 'johndoe123',
        email: 'johndoe123@test.com',
        token: 'authToken123',
      }),
      ctx.status(200)
    )
  }),

  rest.post('http://localhost:8000/auth/login/', async (req, res, ctx) => {
    return res(
      ctx.json({
        token: 'authToken143',
      }),
      ctx.status(200)
    )
  }),

  rest.post(
    'http://localhost:8000/todo/create-todo/',
    async (req, res, ctx) => {
      return res(
        ctx.json({
          id: 1,
          user: 1,
          name: 'Todo name',
          memo: 'This is a sample todo',
          created_at: 'dateCreated',
          completed_at: null,
          is_important: false,
        }),
        ctx.status(200)
      )
    }
  ),

  rest.get('http://localhost:8000/todo/current-todos/', (req, res, ctx) => {
    const page = req.url.searchParams.get('page')

    if (page === '1') {
      return res(
        ctx.json({
          next: null,
          previous: null,
          total_items: 2,
          total_pages: 2,
          page: 1,
          results: [
            {
              id: 1,
              user: 1,
              name: 'First page todo',
              memo: 'This is a sample todo',
              created_at: 'dateCreated',
              completed_at: null,
              is_important: false,
              next: null,
            },
          ],
        }),
        ctx.status(200)
      )
    } else if (page === '2') {
      return res(
        ctx.json({
          next: null,
          previous: null,
          total_items: 2,
          total_pages: 2,
          page: 2,
          results: [
            {
              id: 2,
              user: 1,
              name: 'Second page todo',
              memo: 'This is a sample todo',
              created_at: 'dateCreated',
              completed_at: null,
              is_important: false,
              next: null,
            },
          ],
        }),
        ctx.status(200)
      )
    }
  }),

  rest.get(
    'http://localhost:8000/todo/todo-detail/1',
    async (req, res, ctx) => {
      return res(
        ctx.json({
          id: 1,
          user: 1,
          name: 'Todo name',
          memo: 'This is a sample todo',
          created_at: 'dateCreated',
          completed_at: null,
          is_important: false,
        }),
        ctx.status(200)
      )
    }
  ),

  rest.patch(
    'http://localhost:8000/todo/todo-detail/1',
    async (req, res, ctx) => {
      return res(
        ctx.json({
          id: 1,
          user: 1,
          name: 'Todo name - updated',
          memo: 'This is a sample todo',
          created_at: 'dateCreated',
          completed_at: null,
          is_important: false,
        }),
        ctx.status(200)
      )
    }
  ),

  rest.delete(
    'http://localhost:8000/todo/todo-detail/1',
    async (req, res, ctx) => {
      return res(ctx.status(204))
    }
  ),
]

export const setHandleCompletedTodo = () => {
  server.use(
    rest.patch(
      'http://localhost:8000/todo/todo-detail/1',
      async (req, res, ctx) => {
        return res(
          ctx.json({
            id: 1,
            user: 1,
            name: 'Todo name',
            memo: 'This is a sample todo',
            created_at: 'dateCreated',
            completed_at: 'dateCompleted',
            is_important: false,
          }),
          ctx.status(200)
        )
      }
    )
  )
}

export const setEmptyCurrentTodoData = () => {
  server.use(
    rest.get('http://localhost:8000/todo/current-todos/', (req, res, ctx) => {
      return res(
        ctx.json({
          next: null,
          previous: null,
          total_items: 1,
          total_pages: 1,
          page: 1,
          results: [],
        }),
        ctx.status(200)
      )
    })
  )
}

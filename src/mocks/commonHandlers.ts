import { rest } from 'msw'

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
        username: 'John Doe',
        email: 'johndoe@test.com',
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
    'http://localhost:8000/todo/sampleToken123/create-todo/',
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

  rest.get(
    'http://localhost:8000/todo/current-todos/sampleToken143/',
    (req, res, ctx) => {
      const page = req.url.searchParams.get('page')

      if (page === '1') {
        return res(
          ctx.json({
            next: null,
            previous: null,
            total_items: 2,
            total_pages: 2,
            page: page,
            results: [
              {
                id: 1,
                user: 1,
                name: 'Todo name',
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
            page: page,
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
    }
  ),
]

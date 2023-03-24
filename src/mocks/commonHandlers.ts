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
]

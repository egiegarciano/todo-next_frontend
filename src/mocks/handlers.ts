import { rest } from 'msw'

export const handlers = [
  rest.post('http://localhost:8000/auth/logout/', async (req, res, ctx) => {
    return res(
      ctx.json({
        message: 'Successfully logout',
      }),
      ctx.status(200)
    )
  }),
]

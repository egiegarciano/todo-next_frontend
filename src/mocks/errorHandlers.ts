import { rest } from 'msw'
import { server } from './server'

export const errorHandlers = [
  rest.post('http://localhost:8000/auth/register/', async (req, res, ctx) => {
    return res(ctx.json(null), ctx.status(400))
  }),
]

export const setupRegisterErrorHandler = () => {
  server.use(
    rest.post('http://localhost:8000/auth/register/', async (req, res, ctx) => {
      return res.once(ctx.json(null), ctx.status(400))
    })
  )
}

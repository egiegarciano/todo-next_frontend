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

export const setupLoginErrorHandler = () => {
  server.use(
    rest.post('http://localhost:8000/auth/login/', async (req, res, ctx) => {
      return res(ctx.json(null), ctx.status(400))
    })
  )
}

export const setupCreateTodoErrorHandler = () => {
  server.use(
    rest.post(
      'http://localhost:8000/todo/sampleToken123/create-todo/',
      async (req, res, ctx) => {
        return res(ctx.json(null), ctx.status(400))
      }
    )
  )
}

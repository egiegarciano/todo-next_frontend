import { setupServer } from 'msw/node'
import { commonHandlers } from './commonHandlers'

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...commonHandlers)

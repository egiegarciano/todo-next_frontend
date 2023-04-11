import { render, screen } from '@testing-library/react'
import Cookies from 'js-cookie'

import Home from '../pages/index'

const view = () => render(<Home />)

jest.mock('js-cookie', () => jest.fn())
;(Cookies as any).mockImplementation(() => ({ get: () => 'token' }))

describe('Home', () => {
  it('renders a heading', () => {
    view()

    const heading = screen.getByRole('heading', {
      name: /simply your todos\. woohoo!/i,
    })

    expect(heading).toBeInTheDocument()
  })

  describe('renders a create todo button', () => {
    it('displays a link button with correct text', () => {
      view()

      const createTodoBtn = screen.getByRole('link', {
        name: /create todo/i,
      })

      expect(createTodoBtn).toBeInTheDocument()
    })
    it('have the correct value of href attribute', () => {
      view()

      const createTodoBtn = screen.getByRole('link', {
        name: /create todo/i,
      })

      expect(createTodoBtn).toHaveAttribute('href', '/create-todo')
    })
  })
})

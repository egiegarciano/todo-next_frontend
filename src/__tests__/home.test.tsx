import { render, screen } from '@testing-library/react'

import Home from '../pages/index'

describe('Home', () => {
  beforeEach(() => render(<Home />))

  it('renders a heading', () => {
    const heading = screen.getByRole('heading', {
      name: /simply your todos\. woohoo!/i,
    })

    expect(heading).toBeInTheDocument()
  })

  describe('renders a create todo button', () => {
    it('displays a link button with correct text', () => {
      const createTodoBtn = screen.getByRole('link', {
        name: /create todo/i,
      })

      expect(createTodoBtn).toBeInTheDocument()
    })
    it('have the correct value of href attribute', () => {
      const createTodoBtn = screen.getByRole('link', {
        name: /create todo/i,
      })

      expect(createTodoBtn).toHaveAttribute('href', '/create-todo')
    })
  })
})

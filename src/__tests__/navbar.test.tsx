import { render, screen } from '@testing-library/react'

import Home from '../pages/index'
import NavBar from '../components/NavBar'

beforeEach(() => render(<NavBar />))

describe('NavBar Component', () => {
  it('renders a logo text', () => {
    const logoText = screen.getByRole('link', {
      name: /todo wohoo/i,
    })

    expect(logoText).toBeInTheDocument()
  })

  // describe('renders a create todo button', () => {
  //   it('displays a link button with correct text', () => {
  //     const createTodoBtn = screen.getByRole('link', {
  //       name: /create todo/i,
  //     })

  //     expect(createTodoBtn).toBeInTheDocument()
  //   })
  //   it('have the correct value of href attribute', () => {
  //     const createTodoBtn = screen.getByRole('link', {
  //       name: /create todo/i,
  //     })

  //     expect(createTodoBtn).toHaveAttribute('href', '/create-todo')
  //   })
  // })
})

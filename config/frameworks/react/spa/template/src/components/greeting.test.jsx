import React from 'react'
import { render, screen } from '@testing-library/react'
import Greeting from './greeting'

test('renders greeting with name', () => {
  render(<Greeting name="John" />)
  const greetingElement = screen.getByText(/Hello, John!/i)
  expect(greetingElement).toBeInTheDocument()
})
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ButtonComponent from './button';

describe('ButtonComponent', () => {
  test('renders the button with the label', () => {
    const handleClick = jest.fn();
    const label = 'Click me';
    const { getByText } = render(
      <ButtonComponent label={label} onClick={handleClick} />,
    );

    const buttonElement = getByText(label);
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onClick when the button is clicked', () => {
    const handleClick = jest.fn();
    const label = 'Click me';
    const { getByText } = render(
      <ButtonComponent label={label} onClick={handleClick} />,
    );

    const buttonElement = getByText(label);
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

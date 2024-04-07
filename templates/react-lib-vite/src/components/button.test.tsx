import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import { Button } from './button';

describe('Button', () => {
  it('renders the button with the correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});

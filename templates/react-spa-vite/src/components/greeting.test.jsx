import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Greeting from './greeting';

describe('Greeting', () => {
  it('deve exibir a saudação correta', () => {
    render(<Greeting name="World" />);
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';

import Home from './page';

describe('Home', () => {
  it('renders the main heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { level: 2, name: 'Docs ->' });
    expect(heading).toBeInTheDocument();
  });

  it('renders the Vercel logo', () => {
    render(<Home />);
    const vercelLogo = screen.getByAltText('Vercel Logo');
    expect(vercelLogo).toBeInTheDocument();
  });

  it('renders the Next.js logo', () => {
    render(<Home />);
    const nextLogo = screen.getByAltText('Next.js Logo');
    expect(nextLogo).toBeInTheDocument();
  });

  it('renders the grid with five cards', () => {
    render(<Home />);
    const cards = screen.getAllByRole('link', { class: 'card' });
    expect(cards).toHaveLength(5);
  });

  it('renders the "Get started by editing" text', () => {
    render(<Home />);
    const text = screen.getByText(/Get started by editing/i);
    expect(text).toBeInTheDocument();
  });
});

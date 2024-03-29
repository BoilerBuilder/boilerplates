import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import LoadingComponent from './loading';

describe('LoadingComponent', () => {
  test('shows loading status correctly', () => {
    render(
      <Provider store={store}>
        <LoadingComponent />
      </Provider>,
    );

    // Verifica se inicialmente mostra "Not Loading"
    expect(screen.getByText('Not Loading')).toBeInTheDocument();

    // Clica no botão para mudar o estado
    fireEvent.click(screen.getByText('Toggle Loading'));

    // Verifica se o texto mudou para "Loading"
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';

import AppRoutes from './router';

import './styles/index.scss';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  </React.StrictMode>,
);
